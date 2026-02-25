# AGENTS.md — Master Plan for Keystone v1

## Project Overview
**App:** Keystone  
**Goal:** An AI Chief of Staff that turns Gmail + Google Calendar activity into a **Today Command Center** with receipts-first summaries and safe drafting—so nothing falls through the cracks.  
**User:** Solo founder / startup operator (single-user first)  
**Stack (v1):**
- **Web:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui (Vercel)
- **API:** Node.js + Fastify (Railway)
- **Workers:** Node.js worker service (Railway)
- **DB/Auth/Storage:** Supabase (Postgres + Auth magic link + Storage)
- **Analytics:** PostHog (PII-safe events only)
- **Email:** Resend
- **LLM:** Multi-provider abstraction (Claude primary, OpenAI fallback)

**Primary risk to de-risk first:** Sync correctness (duplicates, missed items, drift)  
**Timeline target:** ~4 weeks (see Roadmap)  
**Budget target:** \(\le\) $50/mo (LLM usage capped; avoid Redis/extra infra in v1)

## Non‑Negotiables (Product + Engineering)
1. **No auto-send**: No emails/messages may be sent without explicit user approval. v1 should not contain any “send” capability; drafts only.
2. **Least-privilege Google scopes**: Start read-only; use **incremental auth** for Gmail draft creation only when a user enables it.
3. **PII-safe observability**: Do not log raw email/calendar content (no subject/body). Use hashing + counters.
4. **Real deletion**: Retention + “delete my data” must delete tokens, cached data, and derived artifacts, and prevent further background sync.
5. **Receipts-first outputs**: No unsupported claims. Every summary bullet must reference evidence IDs; otherwise return “unknown/not in thread”.

## How I Should Think
1. **Understand intent first**: Identify what the user needs and what phase Keystone is in.
2. **Ask if unsure**: If a critical detail is missing, ask a single specific question before coding.
3. **Plan before coding**: Propose a brief plan (files touched, approach, risks). Wait for approval if the change is non-trivial.
4. **Verify after changes**: Run the relevant checks (typecheck/lint/tests). Fix failures before proceeding.
5. **Explain trade-offs**: When choosing a path, list alternatives and why the chosen option fits Keystone v1 constraints.

## Plan → Execute → Verify (Required Workflow)
1. **Plan**: A short plan (what/where/why, rollback notes, test plan).
2. **Execute**: Implement one small slice at a time (single feature or slice of the sync loop).
3. **Verify**: Run checks and validate behavior. No “ship broken” exceptions.

## Engineering Constraints (Developer-level)
### Type Safety (No Compromises)
- `any` is **forbidden**. Use `unknown` + type guards.
- All public functions must have typed inputs/outputs.
- Validate inbound data with Zod (or equivalent) at boundaries (API, webhooks, job payloads).

### Architectural Sovereignty
- Route handlers/controllers do request/response only.
- Business logic lives in `core/` or `services/`.
- DB access lives in `db/` layer (no ad-hoc queries in routes).
- Workers consume jobs; they do not serve HTTP except health endpoints.

### Library Governance
- Check existing `package.json` before adding dependencies.
- Prefer platform/native APIs over libraries when feasible.
- Avoid deprecated patterns; keep dependencies stable.

### “No Apologies” Rule
- Don’t apologize for errors—fix them.
- Don’t add filler text. Be concise and specific.

## Context Files (Load only what you need)
- `agent_docs/product_requirements.md`: PRD-derived requirements, constraints, success metrics
- `agent_docs/tech_stack.md`: stack choices, service boundaries, commands
- `agent_docs/project_brief.md`: conventions, repo structure, deployment/env rules
- `agent_docs/code_patterns.md`: code-level patterns for sync correctness, idempotency, logging, LLM grounding
- `agent_docs/testing.md`: verification strategy + commands (unit/integration/e2e/evals)
- `agent_docs/resources.md`: curated references

## Current State (Update this as you build)
**Last Updated:** 2026-02-23  
**Current Phase:** Phase 1 — Foundation  
**Working On:** Project initialization (repo structure, base services, auth scaffold)  
**Recently Completed:** Technical design doc (`TechDesign-Keystone-MVP.md`)  
**Blocked By:** None

## Roadmap (Aligned to PRD gates)
### Phase 1 — Foundations (Week 1)
- [ ] Initialize repo structure (web/api/worker + shared)
- [ ] Supabase project(s): local/staging/prod separated
- [ ] Supabase Auth (magic link) integrated in web + API auth checks
- [ ] Google OAuth connect (read-only) with incremental-scope design for drafts
- [ ] Token vault (envelope encryption), audit events, PII-safe logging helpers
- [ ] Today UI scaffold (premium dark UI tokens, skeletons, empty states)

### Phase 2 — Sync Correctness (Week 2)
- [ ] Postgres-backed job queue (no Redis in v1)
- [ ] Gmail watch + historyId delta sync + invalid-history repair flow
- [ ] Calendar syncToken delta sync + 410 recovery (+ watch if used)
- [ ] Drift detection + repair jobs + metrics dashboards (PII-safe)
- [ ] Replay tests + timezone/recurrence suites

### Phase 3 — Trustworthy Summaries (Week 3)
- [ ] Evidence bundle builder + receipts model
- [ ] Receipts-first summaries (grounded output contract)
- [ ] LLM eval harness (50+ gold examples) and repeatable runs/CI schedule
- [ ] Today prioritization v0 (heuristics) + “why ranked” UI
- [ ] Weekly command briefing (wins/blockers/asks/upcoming) grounded to receipts

### Phase 4 — Safe Drafts + Controls + Polish (Week 4)
- [ ] Draft generation + risk checks + editable UI + copy-to-clipboard
- [ ] Optional Gmail Draft creation via incremental scope upgrade
- [ ] Retention settings + delete-my-data end-to-end (prevents future sync)
- [ ] “Screenshot test” polish for Today/Thread/Weekly screens

## What NOT To Do
- Do NOT delete files without explicit confirmation.
- Do NOT add features not in the current phase.
- Do NOT introduce “send email/message” functionality.
- Do NOT log raw email/calendar content.
- Do NOT bypass failing checks or hooks.
- Do NOT change DB schemas casually—write a migration plan and verify data safety.

