# Project Brief (Persistent) — Keystone v1

## Product vision
Keystone is a trusted command center for a founder’s Gmail + Google Calendar: prioritized Today view, receipts-first summaries, safe drafts, and real retention/deletion controls.

## Current constraints
- Web-first for speed; no native mobile app in v1
- Single-user first, but do not paint into a corner for multi-tenant
- Budget \(\le\) $50/mo (avoid extra infra like Redis in v1)
- Primary risk: sync correctness (drift/duplicates/missed items)

## Repository conventions
- **Monorepo, modular monolith** (see `agent_docs/tech_stack.md`)
- **Boundary rules**
  - `apps/web` calls `apps/api` only (no direct DB)
  - `apps/api` owns HTTP + auth boundary + job enqueue
  - `apps/worker` owns ingestion + LLM + schedulers
  - `packages/shared` owns cross-cutting types + Zod schemas (no environment secrets)

## Engineering rules (must follow)
### Type safety
- `any` forbidden; use `unknown` + guards.
- All external inputs validated with Zod (HTTP, webhooks, jobs).

### Logging / analytics
- **Never log** raw Gmail/Calendar content (no subject/body).
- Allowlist only: internal IDs, hashed provider IDs, counters, durations, state transitions.
- PostHog: product events only (feature used, counts), no provider IDs, no content.

### Google OAuth + scopes
- Start read-only scopes.
- Incremental auth required for “create Gmail draft” capability.
- Surface token health + reauth states in UI.

### “No auto-send” guarantee
- No API endpoints for sending.
- Worker must never call Gmail send APIs.
- Draft creation is allowed only when explicitly invoked and authorized.

## Environments
- **local / staging / prod** are separate for:
  - Supabase project
  - Google OAuth client credentials
  - Vercel project
  - Railway services

## Deployment expectations
- Every PR should have a deploy preview (web).
- Staging is the proving ground for OAuth + sync correctness before prod.

## Update cadence
- Update `AGENTS.md` “Current State” whenever:
  - a phase starts/ends
  - a major milestone ships
  - a blocker appears

