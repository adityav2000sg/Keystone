# Product Requirements Document: Keystone v1

## Executive Summary

- **Product**: Keystone
- **Version**: v1 (single-user first; real Merlin competitor)
- **Status**: Draft
- **Last Updated**: 2026-02-23

### Vision

Keystone is an AI Chief of Staff that turns Gmail + Google Calendar activity into a **Today Command Center**: clear priorities, **receipts-first** summaries, and **safe drafts/follow-ups**—so nothing falls through the cracks.

### Non-negotiables

- **No auto-send** of any email/message without explicit user approval.
- **Least-privilege Google scopes** with incremental authorization.
- **PII-safe observability** (no raw subject/body in logs).
- **User-controlled retention + delete-my-data** that actually deletes.

---

## Problem Statement

### Problem

Solo founders and operators run their company inside inbox + calendar. Action items and decisions are scattered across threads and meetings, causing:

- Missed follow-ups that directly impact revenue
- Unclear ownership/deadlines
- Context switching and “I’ll do it later” backlog
- Painful weekly updates (investor/team)

### Why now

- Users are primed for “AI assistant” workflows, but trust/privacy friction is high.
- The winning wedge is **trust + execution loop**, not novelty.

---

## Target Audience

### Primary Persona: Solo Founder / Startup Operator (2–10 person team)

- **Context**: Pre-seed/seed; product + sales + ops; lives in Gmail + Google Calendar (+ Slack/WhatsApp, Notion/Linear).
- **Overload**: 20–35 meetings/week; inbound from customers/investors/candidates; follow-ups buried; decisions not captured; owners unclear.

**Jobs to be done**

1. **Turn conversations into execution:** extract decisions/action items/owners/deadlines into a trusted system.
2. **Run the follow-up engine:** nudge/remind/escalate until closed (without micromanaging).
3. **Command briefing:** weekly summary (wins/blockers/asks/upcoming) sourced from real activity.

### Secondary Personas

- **Agency/consulting operator (5–30 ppl):** client deliverables, approvals, deadlines; ruthless follow-up needed.
- **Founder-led sales (B2B):** many threads/next steps; wants “what’s next + who owes what” and hygiene.

---

## User Stories

### Epic: Today Command Center (Core Loop)

1. **Connect & Trust**
   - As a solo founder, I want to connect Gmail and Calendar with minimal permissions so that I can try Keystone without fear.
2. **See Today Clearly**
   - As a solo founder, I want a prioritized Today view with “why this matters” so that I know what to do next.
3. **Receipts-First Summaries**
   - As a solo founder, I want summaries with quotes/links (“receipts”) so that I can trust them and act quickly.
4. **Safe Draft Assistance**
   - As a solo founder, I want Keystone to draft replies/follow-ups that I approve so that I can move faster without mistakes.
5. **Retention + Deletion Control**
   - As a privacy-conscious user, I want retention settings and delete-my-data so that I stay in control of my data lifecycle.

---

## Functional Requirements (MoSCoW)

### Must Have (P0) — v1

1. **Google OAuth Connect (Gmail + Calendar)**
   - Least-priv scopes, incremental auth, re-auth states, token “health” surfaced in UI.
   - **Acceptance Criteria:**
     - [ ] User can connect Gmail+Calendar and see connection status.
     - [ ] Token stored encrypted at rest; access restricted to required services only.

2. **Ingestion + Sync Correctness**
   - Gmail: watch + historyId deltas + repair flow when history invalid.
   - Calendar: syncToken deltas + 410 recovery + watch channels.
   - **Acceptance Criteria:**
     - [ ] No duplicate items across replays/retries (idempotent upserts).
     - [ ] Sync drift repair job exists and is observable.

3. **Today Command Center (Prioritization v0)**
   - Heuristic ranking with visible rationale (“why ranked”).
   - **Acceptance Criteria:**
     - [ ] Shows top priorities (tasks/follow-ups/meetings) for today.
     - [ ] Each item has a reason label (deadline, recency, direct ask, meeting proximity, pinned sender, etc.).

4. **Trustworthy Summaries (Receipts-First)**
   - Summary bullets tied to evidence (quotes/snippets + message/event ids/links).
   - **Acceptance Criteria:**
     - [ ] No unsupported claims; “unknown/not in thread” when missing.
     - [ ] Every bullet includes an evidence reference.

5. **Safe Drafting (No Auto-send)**
   - Draft suggestions; minimum: copy-to-clipboard.
   - Optional: create Gmail draft only after incremental scope upgrade.
   - **Acceptance Criteria:**
     - [ ] No send action exists without explicit user click.
     - [ ] Draft UI includes context highlights + editable output + risk checks.

6. **Settings: Retention + Delete My Data**
   - Retention presets; immediate delete workflow (tokens + cached data + derived artifacts).
   - **Acceptance Criteria:**
     - [ ] Delete-my-data completes and prevents further background sync.

7. **Audit Logs + PII-safe Observability**
   - Structured events; no raw email/calendar content in logs.
   - **Acceptance Criteria:**
     - [ ] User-visible actions recorded (connect, reauth, delete, draft created).
     - [ ] Logs contain hashed identifiers and counts only.

### Should Have (P1)

- Weekly command briefing (wins/blockers/asks/upcoming)
- Feedback loop controls (pin senders, mark priority, snooze, “why ranked”)
- Calendar meeting prep pack (agenda + thread context)

### Could Have (P2)

- “Later” stubs for Slack/WhatsApp ingestion (no full implementation)
- Export/share weekly brief (lightweight)

### Won’t Have (This v1)

- **Auto-send** emails/messages
- Fully automated calendar writes without explicit confirmation
- Native mobile app

---

## Non-Functional Requirements

### Performance

- Today view: **p95 < 2s** load (excluding long LLM calls; use cached/partial rendering).
- API (non-LLM): **p95 < 300ms**.
- Sync freshness: normal-case catch-up **< 2 minutes** after push notification.

### Security & Privacy

- OAuth tokens encrypted at rest (envelope encryption + KMS or equivalent).
- Strict least-priv scopes; incremental auth for drafting/scheduling.
- Prompt injection defenses (treat email links/docs as untrusted input).
- PII-safe logs: no raw subject/body; redact sensitive strings in traces.

### Accessibility

- WCAG 2.1 AA for core screens (Today, Thread View, Weekly Brief).

### Scalability

- Single-user first, but do not block future multi-tenant (module boundaries, auditability, data model ready).

---

## UX / Design Requirements (Keystone “Merlin-level”)

### North star

**Modern, minimal, glassy, high-contrast, premium SaaS — calm control room + hint of arcane seal.**

### Visual tokens (implement immediately)

- **Dark-first palette**
  - Background: near-black graphite/ink tint
  - Surfaces: glass cards (8–14% opacity)
  - Borders: hairline strokes (12–18% opacity)
  - Accent: **one** accent color only (Teal OR Ember OR Gold)
  - Semantic colors: muted success/warn/error
- **Type**
  - Inter/system; modern grotesk feel
  - Max 2 weights per screen
- **Layout**
  - 8pt grid
  - Card radius 16–20; button radius 12–16; inputs 12–14
  - Subtle blur (8–16px), soft vignette background
- **Motion**
  - Subtle transitions (150–220ms)
  - Skeleton → content transitions
  - Hover lift + subtle glow (restrained)
  - “Keystone Seal” loading indicator (animated mark)

### Layout rules

- Primary column: **Today Command Center** header + prioritized cards
- Secondary column: Activity / Follow-ups / Brief
- Perfect alignment; consistent spacing; designed empty states

### “Screenshot test”

These screens must look premium even with placeholder data:

1. Today (Command Center)
2. Thread View (action item + context + approvals)
3. Weekly Brief (exportable, investor-ready)

### Component system

- **shadcn/ui + Tailwind + Radix** (fastest to premium)
- Early components: Card, Badge, Tabs, Command, Dialog/Drawer, Toast, Skeleton, Tooltip, Dropdown, DataTable

---

## Key User Flows

### Flow 1: Connect → First Value (Activation)

```mermaid
flowchart LR
  Landing[Landing/Signup] --> OAuth[Google OAuth (read-only scopes)]
  OAuth --> Sync[Initial backfill + baseline tokens]
  Sync --> Today[Today Command Center rendered]
  Today --> Trust[User opens item, sees receipts]
```

### Flow 2: Summary → Draft (Human-in-loop)

```mermaid
flowchart LR
  Today[Priority item] --> Thread[Thread View]
  Thread --> Summary[Receipts-first summary]
  Summary --> Draft[Generate draft (editable)]
  Draft --> Copy[Copy to clipboard]
  Draft -->|Optional scope upgrade| GmailDraft[Create Gmail draft]
```

---

## Success Metrics (v1 beta targets)

- **Activation:** 60%+ of signups connect Gmail+Calendar and see Today view within 10 minutes.
- **Engagement:** 3+ days/week active usage (open Today or generate brief).
- **Retention:** 30%+ of activated users still active in week 4.
- **Revenue (post-beta):** $29/mo single-user plan; target 10%+ conversion of active beta (or first 10 paying).

---

## Risks & Mitigations

### Technical

- **Trust & safety mistakes (wrong recipient/owner/follow-up)**
  - Mitigate: no autosend; explicit approvals; risk checks; receipts; conservative defaults.
- **LLM reliability/hallucinations**
  - Mitigate: grounding-only outputs; eval harness + rubrics; deterministic formatting; caching + memoization.
- **OAuth/security failures**
  - Mitigate: least scope; encryption; strict roles; redaction; security review checklist.
- **Integration brittleness + rate limits**
  - Mitigate: push + delta sync; backoff/jitter; repair jobs; idempotency.
- **Latency**
  - Mitigate: async jobs; partial renders; cache summaries; “delta-only” updates.

### Market

- **Positioning too broad (“AI Chief of Staff”)**
  - Mitigate: narrow wedge: Today Command Center + follow-up closure + weekly brief.
- **Trust barrier connecting inbox**
  - Mitigate: read-only first; minimal retention; clear disclosures; delete-my-data.

### Execution

- **Overbuilding**
  - Mitigate: strict MoSCoW; week-by-week gates; “cut lines” enforced.
- **QA burden**
  - Mitigate: drift tests, replay tests, timezone/recurrence suites, synthetic corpora.

---

## Compliance & Policy (v1 minimum)

- Adhere to Google API Services User Data Policy and Workspace user data policy.
- Prefer read-only scopes; incremental auth for drafts/events.
- Prepare for additional verification/security assessment if restricted scopes are required.
- Provide clear disclosures + user controls for retention/deletion.

---

## 4-Week v1 Delivery Plan (Phased Milestones)

- **Week 1 (Foundations / Gate):**
  - OAuth flow, token vault, consent disclosures, basic Today scaffold, audit log.
  - Gate: connect works; basic security checklist; Today renders.
- **Week 2 (Sync correctness / Gate):**
  - Gmail historyId + Pub/Sub watch; Calendar syncToken + 410 recovery; retries/idempotency.
  - Gate: drift + replay test passes; no dupes; observable repair.
- **Week 3 (Trustworthy summaries / Gate):**
  - Receipts-first summaries; eval harness (50+ examples); Today prioritization v0.
  - Gate: faithfulness threshold; no unsupported claims in gold set.
- **Week 4 (Safe drafts + polish / Gate):**
  - Draft UX, copy-to-clipboard; optional Gmail draft via incremental auth; deletion workflow.
  - Gate: “no autosend” enforced; screenshot test for 3 screens; ship beta.

---

## Definition of Done (v1)

- [ ] All P0 features shipped with acceptance criteria met
- [ ] Sync drift repair and idempotency verified
- [ ] Receipts-first summaries with eval harness in CI or repeatable scripts
- [ ] No autosend guarantee enforced at product + code level
- [ ] Retention + delete-my-data verified end-to-end
- [ ] PII-safe logs and audit trail in place
- [ ] Today/Thread/Weekly Brief pass screenshot test (premium UI)

