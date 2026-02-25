# Product Requirements — Keystone v1 (from PRD)

Source: `PRD-Keystone-v1.md` (2026-02-23)

## One-line
Keystone is an AI Chief of Staff that turns Gmail + Google Calendar activity into a **Today Command Center** with clear priorities, **receipts-first** summaries, and **safe drafts/follow-ups**.

## Target Users
### Primary persona
Solo founder / startup operator (2–10 person team) living in Gmail + Google Calendar.

### Jobs to be done (exact)
1. **Turn conversations into execution:** extract decisions/action items/owners/deadlines into a trusted system.
2. **Run the follow-up engine:** nudge/remind/escalate until closed (without micromanaging).
3. **Command briefing:** weekly summary (wins/blockers/asks/upcoming) sourced from real activity.

## Non‑negotiables (exact)
- **No auto-send** of any email/message without explicit user approval.
- **Least-privilege Google scopes** with incremental authorization.
- **PII-safe observability** (no raw subject/body in logs).
- **User-controlled retention + delete-my-data** that actually deletes.

## Functional Requirements (MoSCoW)

### Must Have (P0) — v1 (exact headings)
1. **Google OAuth Connect (Gmail + Calendar)**
   - Least-priv scopes, incremental auth, re-auth states, token “health” surfaced in UI.
2. **Ingestion + Sync Correctness**
   - Gmail: watch + historyId deltas + repair flow when history invalid.
   - Calendar: syncToken deltas + 410 recovery + watch channels.
3. **Today Command Center (Prioritization v0)**
   - Heuristic ranking with visible rationale (“why ranked”).
4. **Trustworthy Summaries (Receipts-First)**
   - Summary bullets tied to evidence (quotes/snippets + message/event ids/links).
5. **Safe Drafting (No Auto-send)**
   - Draft suggestions; minimum: copy-to-clipboard.
   - Optional: create Gmail draft only after incremental scope upgrade.
6. **Settings: Retention + Delete My Data**
   - Retention presets; immediate delete workflow (tokens + cached data + derived artifacts).
7. **Audit Logs + PII-safe Observability**
   - Structured events; no raw email/calendar content in logs.

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

## Non‑Functional Requirements
### Performance (exact targets)
- Today view: **p95 < 2s** load (excluding long LLM calls; use cached/partial rendering).
- API (non-LLM): **p95 < 300ms**.
- Sync freshness: normal-case catch-up **< 2 minutes** after push notification.

### Security & Privacy (exact items)
- OAuth tokens encrypted at rest (envelope encryption + KMS or equivalent).
- Strict least-priv scopes; incremental auth for drafting/scheduling.
- Prompt injection defenses (treat email links/docs as untrusted input).
- PII-safe logs: no raw subject/body; redact sensitive strings in traces.

### Accessibility
- WCAG 2.1 AA for core screens (Today, Thread View, Weekly Brief).

### Scalability
- Single-user first, but do not block future multi-tenant (module boundaries, auditability, data model ready).

## UX / Design Requirements (Keystone “Merlin-level”)
### North star (exact)
**Modern, minimal, glassy, high-contrast, premium SaaS — calm control room + hint of arcane seal.**

### Visual tokens (implement immediately)
- **Dark-first palette** (near-black background; glass cards 8–14% opacity; hairline borders 12–18% opacity)
- **Accent:** exactly one accent color (Teal OR Ember OR Gold)
- **Type:** Inter/system; max 2 weights per screen
- **Layout:** 8pt grid; radii (cards 16–20, buttons 12–16, inputs 12–14); subtle blur (8–16px)
- **Motion:** subtle transitions (150–220ms); skeleton → content; restrained hover lift/glow
- “Keystone Seal” loading indicator

### Layout rules
- Primary column: Today Command Center header + prioritized cards
- Secondary column: Activity / Follow-ups / Brief
- Premium empty states; perfect alignment

### Screenshot test screens
1. Today (Command Center)
2. Thread View (action item + context + approvals)
3. Weekly Brief (exportable, investor-ready)

### Component system (exact)
- **shadcn/ui + Tailwind + Radix**

## Success Metrics (v1 beta targets)
- **Activation:** 60%+ connect Gmail+Calendar and see Today within 10 minutes.
- **Engagement:** 3+ days/week active usage.
- **Retention:** 30%+ of activated users still active in week 4.
- **Revenue (post-beta):** $29/mo single-user plan; target 10%+ conversion of active beta (or first 10 paying).

## Delivery Plan (PRD’s 4-week gates)
- Week 1: OAuth + token vault + Today scaffold + audit log
- Week 2: Sync correctness (Gmail historyId + Calendar syncToken) + drift repair + idempotency
- Week 3: Receipts-first summaries + eval harness + prioritization v0
- Week 4: Safe drafts + incremental scope + deletion workflow + UI polish

