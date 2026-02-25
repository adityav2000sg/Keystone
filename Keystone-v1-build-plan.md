# Keystone v1 build plan (decision-oriented)

Below is a decision-oriented “v1 build plan” for an AI Chief of Staff that turns **Gmail + Google Calendar** into: (1) prioritized daily view, (2) trustworthy summaries, (3) safe drafts (no auto-send).

I’ll explicitly label **Sourced facts** vs **Reasoned recommendations**. I’ll also include **2 architectures + decision matrix**, **2 Mermaid diagrams**, a **Google compliance checklist**, **sync design**, **summaries + drafts guardrails**, **security + retention model**, **cost model to hit <$3/user/mo**, a **4-week plan**, and a **1-page ICP table**.

---

## 1) Architecture recommendation + decision matrix

### Viable Architecture A (recommended default): **Modular monolith + queue**

**What it is:** Next.js app + Node API (TS) + Postgres/Prisma, with a background worker (BullMQ/Cloud Tasks/SQS) for sync + summarization.  
**Why:** fastest to ship in 4 weeks while still safe/correct; isolates long-running sync and rate-limit handling.

**Sourced facts:** Gmail and Calendar both support push notifications/watch flows that you should use to reduce polling costs. ([Google for Developers][1])

### Viable Architecture B: **Services split (API + Sync service + LLM service)**

**What it is:** separate deployables for API/UI, sync ingestion, and LLM orchestration; shared Postgres; optional event bus.  
**Why:** clean boundaries; scales team + throughput; but slower for v1.

### Decision matrix (v1 speed vs correctness)

| Criteria                                |         A) Modular monolith + queue |        B) Split services |
| --------------------------------------- | ----------------------------------: | -----------------------: |
| Ship in 4 weeks                         |                            **Best** |                   Medium |
| Correctness under rate limits/retries   | **Best** (single codebase + worker) | Best (but more plumbing) |
| Operational complexity                  |                             **Low** |                     High |
| Cost control early                      |                            **Best** |                   Medium |
| Future extensibility (Slack/Drive etc.) |                                Good |                 **Best** |

**Recommendation:** Start with **A**, but enforce “service-like” module boundaries: `auth/`, `sync/`, `rank/`, `llm/`, `audit/`.

### Mermaid: recommended default architecture

```mermaid
flowchart TB
  UI[Next.js Web UI] --> API[Node/TS API - Auth + Read Models]
  API --> DB[(Postgres + Prisma)]
  API --> Cache[(Redis - caching + job dedupe)]
  API --> Queue[Job Queue (BullMQ/SQS)]
  Queue --> Worker[Background Worker - Sync + Summarize]
  Worker --> DB
  Worker --> LLM[LLM Gateway (routing/batching/caching)]
  Worker --> Google[Gmail/Calendar APIs]
  Google --> PubSub[Push: Gmail Pub/Sub + Calendar Channels]
  PubSub --> Webhook[Webhook Receiver]
  Webhook --> Queue
  API --> Audit[PII-safe Audit Log]
  Worker --> Audit
```

---

## 2) OAuth + scope strategy (least privilege + incremental auth)

### Scopes: pick a **read-first wedge** (reduces verification friction)

**Sourced facts:** Gmail scopes include **restricted** categories and may require restricted-scope verification + potentially a security assessment when storing/transmitting restricted-scope data. ([Google for Developers][2])  
**Sourced facts:** Google documents restricted scope verification requirements and indicates additional reviews + possible security assessment. ([Google for Developers][3])  
**Sourced facts:** Calendar API supports OAuth scopes, and incremental sync tokens are a first-class design pattern for calendar sync. ([Google for Developers][4])

**Reasoned recommendation (v1 default):**

- **Phase 1 (v1 “trust wedge”):**
  - Gmail: `gmail.readonly` (or `gmail.metadata` if you can live without bodies; often you can’t for summaries)
  - Calendar: `calendar.readonly`
- **Phase 2 (post-v1 “action drafts”):**
  - Gmail: `gmail.compose` to create **drafts** (still no auto-send).
  - Calendar: `calendar.events` to create/update events **only after user explicitly uses “Create event”**.

**Why this matters:** requesting fewer scopes earlier reduces user fear + review burden. (The restricted/sensitive scope verification processes are real and can become your critical path.) ([Google for Developers][3])

### Incremental authorization (granular permissions)

**Sourced facts:** Google has guidance on granular permissions and how apps should handle them. ([Google for Developers][5])  
**Reasoned recommendation:** Use **incremental auth**:

- Connect account with **read-only** scopes → deliver value immediately.
- When user clicks an “Enable drafting” or “Enable scheduling” toggle → request additional scopes.

### Refresh tokens + re-consent edge cases

**Sourced facts:** Google’s web-server OAuth flow covers refresh tokens, revocation, incremental authorization, etc. ([Google for Developers][6])  
**Reasoned recommendation (practical rules):**

- Always request offline access (refresh token) for background sync.
- Design for “refresh token missing” and “refresh token revoked” cases; when detected, prompt user to re-consent.
- Store **token “health”** state: `{ok | needs_reauth | revoked}` and surface it in UI.

*(Note: there are many community posts about refresh-token behavior; treat those as implementation hints, not policy.)* ([Google for Developers][6])

---

## 3) Ingestion + sync design (Gmail + Calendar)

### Gmail sync (recommended)

**Sourced facts:**

- Gmail push notifications exist and are built around **Pub/Sub**; you set a watch on a mailbox and Gmail publishes changes. ([Google for Developers][1])
- Gmail sync best practice is to use **historyId** and `users.history.list`; historyIds are chronological but not contiguous, and can become invalid; invalid/out-of-date startHistoryId typically yields errors and triggers full resync. ([Google for Developers][7])
- Gmail has explicit quota limits (quota units per minute per user/project). ([Google for Developers][8])

**Reasoned recommendation (implementation):**

- **Initial backfill (on connect):**
  - Fetch last N days or last X messages per label (`INBOX`, optionally `SENT`), prioritize threads with recent activity.
  - Store: message metadata + minimal body excerpt needed for summaries.
- **Steady-state delta:**
  - `users.watch` → Pub/Sub notification contains latest `historyId`.
  - Worker calls `users.history.list(startHistoryId=lastHistoryId)` to fetch changes.
  - For each changed message/thread, call `messages.get(format=metadata|full)` depending on what you need.
- **Failure modes:**
  - If historyId is too old/invalid → do a **repair job**: backfill last N days and reset baseline historyId. (Gmail explicitly notes history validity windows and out-of-date behavior.) ([Google for Developers][7])
- **Idempotency keys:**
  - `gmail_event_dedupe_key = userId + historyId`
  - message upserts keyed by `messageId`
- **Retries:**
  - exponential backoff + jitter on `403 rateLimitExceeded` / `429`. (Quota docs + Google error guidance imply this pattern.) ([Google for Developers][8])

### Calendar sync (recommended)

**Sourced facts:**

- Calendar supports push notifications via channels/watch. ([Google for Developers][9])
- Calendar supports incremental sync using `syncToken`/`nextSyncToken`. If token is invalidated, server returns **410 Gone**, requiring full resync. ([Google for Developers][4])

**Reasoned recommendation:**

- **Initial full sync:**
  - `events.list(timeMin=now-30d, timeMax=now+90d, singleEvents=true)`
  - store `nextSyncToken`
- **Delta sync:**
  - On push notification: call `events.list(syncToken=storedToken, showDeleted=true)` (Calendar requires deleted events be included during incremental sync). ([Google for Developers][10])
- **Failure mode (410):**
  - wipe local calendar snapshot for that calendar and full sync again. ([Google for Developers][4])
- **Idempotency keys:**
  - `eventId` upsert; cancellations update status

### Mermaid: ingestion/sync flow

```mermaid
flowchart LR
  subgraph Gmail
    W1[users.watch -> Pub/Sub] --> N1[Notification: historyId]
    N1 --> H1[users.history.list(startHistoryId)]
    H1 --> M1[messages.get / threads.get]
    M1 --> GDB[(Store: messages/threads + lastHistoryId)]
  end

  subgraph Calendar
    C1[events.watch -> Channel] --> N2[Webhook ping]
    N2 --> E1[events.list(syncToken)]
    E1 --> CDB[(Store: events + nextSyncToken)]
    E1 -->|410 Gone| R1[Full resync + reset token]
  end

  N1 --> Q[Queue jobs + dedupe]
  N2 --> Q
  Q --> Worker[Sync Worker]
  Worker --> Gmail
  Worker --> Calendar
```

---

## 4) Trustworthy summaries (grounding + hallucination controls)

### Core principle: “show receipts”

**Reasoned recommendation:** Every summary should include:

- a short summary (3–6 bullets),
- an **“Evidence”** section with quoted snippets + message links/ids,
- a confidence indicator (e.g., “High / Medium / Low coverage”).

**Sourced facts (why you can rely on message IDs/history):** Gmail’s sync model is based on message/thread identifiers and history-based deltas. ([Google for Developers][7])

### Prompting/guardrails pattern (practical)

**Reasoned recommendation (summary prompt shape):**

- Provide the model only the minimal thread text + metadata.
- Require:
  - bullets each tied to evidence snippet,
  - no claims without quotes,
  - “Unknown / not in thread” if missing.
- Redact PII before model input when possible (emails/phones) unless necessary for actionability.

### Evaluation plan (v1-friendly)

**Reasoned recommendation: build a gold set + rubric**

- 50–100 real threads/events (with user consent; or synthetic corpora mimicking real formats).
- Rubric per output:
  - **Faithfulness** (no unsupported claims)
  - **Coverage** (captures all asks/deadlines)
  - **Actionability** (clear next steps)
  - **Attribution** (evidence links/snippets present)
- Automated checks:
  - verify each bullet has a quote span
  - detect named entities not present in sources

---

## 5) Safe drafting (no autosend) + approval UX

### Drafting approach: “assist, don’t act”

**Reasoned recommendation:**

- Generate **draft text + subject + suggested recipients**, but:
  - never send
  - never modify mailbox state automatically
  - require explicit user click: **“Create Gmail draft”** (optional scope upgrade) or “Copy to clipboard”.

**Sourced facts:** Gmail scopes include specific permissions like compose/send; requesting restricted scopes can trigger verification requirements. ([Google for Developers][2])

### Guardrails

**Reasoned recommendation:**

- Tone controls: user selects “Brief / Neutral / Warm / Firm” + signature defaults.
- Safety filters:
  - detect sensitive situations: legal threats, HR, medical, financial instructions → force “Review mode” banner + ask user to confirm intent.
  - refuse to fabricate attachments, meetings, or prior actions; show “needs info” checklist.

### Approval UX pattern (works well for trust)

- Side-by-side diff:
  - **Context** (thread highlights + quotes)
  - **Draft** (editable)
  - **Risk checks** (e.g., “mentions pricing”, “promises deadline”, “contains links”)
- Explicit action buttons:
  - “Copy”
  - “Create draft in Gmail”
  - “Schedule suggestion” (not creation unless authorized)

---

## 6) Security, storage, retention, deletion, audit logs (PII-safe)

### Token vaulting / encryption

**Sourced facts:** Google APIs user-data policies and Workspace developer policy emphasize limited use disclosures and policy adherence. ([Google for Developers][11])  
**Sourced facts:** AWS KMS pricing/keys are documented (useful for choosing an approach). ([Amazon Web Services, Inc.][12])

**Reasoned recommendation (AWS-friendly):**

- Store OAuth refresh tokens encrypted using envelope encryption:
  - Data key per user (or per tenant) encrypted by a KMS CMK.
  - Token ciphertext stored in Postgres.
- Strict access:
  - only sync worker + auth service role can decrypt.
  - short-lived STS credentials per service.

### Data minimization model (helps cost + compliance)

**Reasoned recommendation:**

- Default: store **metadata + extracted tasks** + cached summaries, not full raw bodies forever.
- Raw email bodies:
  - store temporarily (e.g., 7–30 days) or not at all (fetch on demand) depending on UX.
- Observability:
  - no raw subject/body in logs
  - hashed identifiers; structured events like `SYNC_GMAIL_HISTORY_APPLIED` with counts only.

### Retention + deletion workflows

**Reasoned recommendation:**

- User-facing controls:
  - “Delete all my data now”
  - “Export my digests/summaries”
  - “Retention: 7d / 30d / 90d / off”
- Deletion implementation:
  - hard-delete tokens, message cache, embeddings, summaries
  - keep minimal audit events (non-PII) for abuse/security if needed.

---

## 7) Cost / unit economics model to hit **<$3 per active user / month**

### LLM pricing anchors (use routing)

**Sourced facts (OpenAI pricing page):** shows per-token costs for models like `gpt-4.1-mini`, `gpt-4o-mini`, etc. ([OpenAI Developers][13])  
**Sourced facts (Gemini API pricing exists):** Google publishes Gemini API pricing. ([Google AI for Developers][14])

*(Pick one provider initially for simplicity; add multi-provider routing later.)*

### Back-of-envelope v1 budget (reasoned)

Target: **$3.00/user/mo** all-in (LLM + infra).  
Assume “active user” = 20 workdays/month.

**Reasoned recommendation: optimize by workload type**

1. **Daily digest** (1x/day):
   - Use a small/cheap model (`mini`) + heavy caching.
   - Input: only *deltas* (new emails since last digest, today’s events).

2. **On-demand summaries** (user clicks):
   - Use medium model for quality; still require grounding quotes.

3. **Drafting** (user triggers):
   - Use medium model for tone/quality; keep outputs short.

**Concrete levers that usually make/break the <$3 target**

- **Delta-only context** (don’t re-summarize the whole inbox daily).
- **Thread memoization**: store per-thread “state summary”; update only when new message arrives.
- **Batching**: summarize multiple small emails in one call when possible.
- **Caching**: if no change since last run, skip LLM.
- **Routing**: mini model for triage/ranking; bigger model only for “final text user sees”.

### Sensitivity: what breaks the target

**Reasoned:**

- If you summarize *full bodies for every email every day*, token usage explodes.
- If you store full text + embed everything, infra and vector costs rise.
- If you don’t use push/watch and instead poll aggressively, API + compute waste grows (push exists specifically to avoid this). ([Google for Developers][1])

---

## 8) 4-week phased v1 plan (scope cuts + quality gates)

### Week 1 — Foundations (must-pass gate)

- OAuth web-server flow, token vaulting, consent screen draft.
- Read-only Gmail + Calendar fetch.
- Data model + audit log (PII-safe).  
  **Gate:** connect account, show raw “Today” view, pass basic security checklist.

### Week 2 — Sync correctness

- Gmail: backfill + historyId delta + Pub/Sub watch.
- Calendar: full sync + syncToken delta + watch channels + 410 handling.
- Rate limit/backoff + idempotency.  
  **Gate:** “drift test” (disconnect network, replay notifications, no dupes, eventual consistency).

### Week 3 — Trustworthy summaries + daily briefing

- Daily prioritized view v0 (heuristics).
- Summaries with evidence quotes.
- Offline eval harness + 50 test threads/events.  
  **Gate:** faithfulness rubric threshold (e.g., 0 unsupported claims in gold set).

### Week 4 — Safe drafts + polish

- Draft generation (copy-to-clipboard).
- Optional incremental auth to create Gmail drafts / calendar events.
- UX: review, diff, confidence, “why ranked”.  
  **Gate:** “No autosend” enforced + audit trails + deletion workflow works end-to-end.

---

## 9) Prioritized daily view ranking (signals + evaluation)

**Reasoned recommendation: start heuristic, then learn**

Signals (cheap, strong):

- Recency, sender importance (manual pin + reply history), thread length, “direct ask” patterns, deadlines (date extraction), meeting proximity, unread count.
- Calendar: upcoming within 24h, travel time buffers, conflicts, meeting owner/attendees.

Evaluation metrics:

- User actions: open rate, “mark as important”, “snooze”, time-to-first-action, manual reordering frequency.
- Quality: “top 5 contains at least one true priority” (daily quick prompt).

---

## 10) Competitor / market wedge (practical conclusions)

**Sourced facts:** Merlin positions as “AI chief of staff” that prioritizes inbox/calendar and helps complete tasks quickly. ([merlin.computer][15])  
**Sourced facts:** Marketplace apps like Gmelius and others market AI assistants inside Gmail. ([Google Workspace][16])  
**Sourced facts:** Google is experimenting with email-based daily brief agents (“Your Day Ahead”) in Labs (shows platform direction + user expectation). ([Tom's Guide][17])

**Reasoned wedge for you (to win trust fast):**

- “Receipts-first” summaries + explicit reasoning for ranking.
- A privacy posture that feels enterprise-grade even for solo users:
  - read-only first
  - minimal retention by default
  - no training on user data (explicit statement)
- “No autosend” as a product feature, not a limitation.

---

# Required deliverable: OAuth + Google policy compliance checklist (v1-min viable)

**Sourced facts:** Google API Services User Data Policy governs access to Google user data. ([Google for Developers][11])  
**Sourced facts:** Workspace API user data developer policy requires Limited Use adherence disclosure language. ([Google for Developers][18])  
**Sourced facts:** Restricted scope verification requirements exist and can require security assessment. ([Google for Developers][3])  
**Sourced facts:** Gmail scopes page explicitly warns restricted scopes and assessment if storing/transmitting restricted-scope data. ([Google for Developers][2])

**Checklist (v1):**

- [ ] Scopes minimized (read-only first; incremental auth for drafting/scheduling)
- [ ] Consent screen: clear purpose + data use explanation
- [ ] Limited Use disclosure present in-product and/or on website/privacy policy
- [ ] Verified domain + authorized redirect URIs
- [ ] Token encryption at rest + strict access controls
- [ ] Deletion workflow (tokens + cached data) user-triggerable
- [ ] Audit logs without raw PII
- [ ] Incident response + security contact email
- [ ] If requesting restricted Gmail scopes: prepare for verification/security assessment path

---

# Required deliverable: 1-page ICP summary table

| ICP                          | Primary pain                       | Switching costs | Trust/privacy objection     | WTP signals                          | Recommended wedge                         |
| ---------------------------- | ---------------------------------- | --------------- | --------------------------- | ------------------------------------ | ----------------------------------------- |
| Solo founders                | Inbox overload + missed follow-ups | Medium          | “Don’t read my email”       | Pays for Notion/Linear, $20–50 tools | Read-only + “receipts” + fast daily brief |
| Execs / operators            | Priority clarity + meeting prep    | High            | Needs strong security story | Assistants, premium tools            | Calendar-first daily plan + prep packs    |
| Sales / CS                   | Follow-ups + thread context        | Medium          | Client data sensitivity     | Pays for CRM, sequencers             | Thread summaries + safe reply drafts      |
| Recruiters / hiring managers | Scheduling + high volume email     | Medium          | Candidate privacy           | Pays for ATS                         | Scheduling suggestions + templates        |
| Finance/legal-heavy users    | Risk of wrong wording              | High            | Extreme data sensitivity    | Pays for compliance tools            | “Review mode” + strict guardrails         |

---

# Sources (URLs + access date)

Access date for all sources below: **2026-02-23**.

```text
Gmail Push Notifications: https://developers.google.com/workspace/gmail/api/guides/push
Gmail users.watch: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users/watch
Gmail users.history.list: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list
Gmail Sync Guide: https://developers.google.com/workspace/gmail/api/guides/sync
Gmail Quotas: https://developers.google.com/workspace/gmail/api/reference/quota
Gmail Scopes: https://developers.google.com/workspace/gmail/api/auth/scopes

Calendar Push: https://developers.google.com/workspace/calendar/api/guides/push
Calendar Events watch: https://developers.google.com/workspace/calendar/api/v3/reference/events/watch
Calendar Sync Guide: https://developers.google.com/workspace/calendar/api/guides/sync
Calendar Events list (syncToken): https://developers.google.com/workspace/calendar/api/v3/reference/events/list
Calendar Errors (410): https://developers.google.com/workspace/calendar/api/guides/errors
Calendar Quotas: https://developers.google.com/workspace/calendar/api/guides/quota

OAuth Web Server Flow: https://developers.google.com/identity/protocols/oauth2/web-server
Granular permissions: https://developers.google.com/identity/protocols/oauth2/resources/granular-permissions
Restricted scope verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification
Sensitive scope verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
OAuth App verification help: https://support.google.com/cloud/answer/13463073
Restricted scopes list (Cloud help): https://support.google.com/cloud/answer/13464325
Google API Services User Data Policy: https://developers.google.com/terms/api-services-user-data-policy
Workspace API user data developer policy: https://developers.google.com/workspace/workspace-api-user-data-developer-policy

OpenAI API pricing: https://developers.openai.com/api/docs/pricing/ (and https://openai.com/api/pricing/)
Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing
AWS KMS pricing: https://aws.amazon.com/kms/pricing/
AWS KMS concepts: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html

Merlin site: https://www.merlin.computer/
Merlin privacy page: https://www.merlin.computer/privacy
Google Labs “CC” coverage (example): https://www.tomsguide.com/ai/google-just-launched-a-new-ai-agent-that-runs-your-inbox-heres-what-cc-actually-does
```

---

If you want, I can turn this into a concrete **v1 schema + API surface** (Prisma models, job types, and endpoint list) that matches your TS/Next/Postgres stack and enforces your non-negotiables (no autosend, least privilege, deletion controls) from day one.

[1]: https://developers.google.com/workspace/gmail/api/guides/push?utm_source=chatgpt.com "Push Notifications | Gmail"
[2]: https://developers.google.com/workspace/gmail/api/auth/scopes?utm_source=chatgpt.com "Choose Gmail API scopes"
[3]: https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification?utm_source=chatgpt.com "Restricted scope verification | App verification to use ..."
[4]: https://developers.google.com/workspace/calendar/api/guides/sync?utm_source=chatgpt.com "Synchronize resources efficiently | Google Calendar"
[5]: https://developers.google.com/identity/protocols/oauth2/resources/granular-permissions?utm_source=chatgpt.com "How to handle granular permissions"
[6]: https://developers.google.com/identity/protocols/oauth2/web-server?utm_source=chatgpt.com "Using OAuth 2.0 for Web Server Applications | Authorization"
[7]: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list?utm_source=chatgpt.com "Method: users.history.list | Gmail"
[8]: https://developers.google.com/workspace/gmail/api/reference/quota?utm_source=chatgpt.com "Usage limits | Gmail"
[9]: https://developers.google.com/workspace/calendar/api/guides/push?utm_source=chatgpt.com "Push notifications | Google Calendar"
[10]: https://developers.google.com/workspace/calendar/api/v3/reference/events/list?utm_source=chatgpt.com "Events: list | Google Calendar"
[11]: https://developers.google.com/terms/api-services-user-data-policy?utm_source=chatgpt.com "Google API Services User Data Policy"
[12]: https://aws.amazon.com/kms/pricing/?utm_source=chatgpt.com "Pricing - AWS Key Management Service (KMS)"
[13]: https://developers.openai.com/api/docs/pricing/?utm_source=chatgpt.com "Pricing | OpenAI API"
[14]: https://ai.google.dev/gemini-api/docs/pricing?utm_source=chatgpt.com "Gemini Developer API pricing"
[15]: https://www.merlin.computer/?utm_source=chatgpt.com "Merlin - Your AI chief of staff. Finally."
[16]: https://workspace.google.com/marketplace/app/gmelius_shared_inboxes_ai_assistants_for/535790240972?utm_source=chatgpt.com "Gmelius: Shared Inboxes & AI Assistants for Gmail"
[17]: https://www.tomsguide.com/ai/google-just-launched-a-new-ai-agent-that-runs-your-inbox-heres-what-cc-actually-does?utm_source=chatgpt.com "Google just launched a new AI agent that runs your inbox: Here's what CC actually does"
[18]: https://developers.google.com/workspace/workspace-api-user-data-developer-policy?utm_source=chatgpt.com "Workspace API user data and developer policy"

