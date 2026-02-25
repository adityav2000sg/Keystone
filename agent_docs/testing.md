# Testing Strategy — Keystone v1

Source: `TechDesign-Keystone-MVP.md` + PRD “sync correctness” and “receipts-first” gates.

## Guiding principle
Keystone’s tests exist to prevent the two MVP-killers:
1) sync drift/duplicates/missed items  
2) ungrounded/hallucinated summaries and unsafe drafts

## Test layers (v1)

### Unit tests (fast)
- Pure functions:
  - prioritization scoring + “why ranked”
  - evidence bundle construction (shape, redaction rules)
  - idempotency key generation
  - retention policy calculators

### Integration tests (most important)
- Gmail sync pipeline:
  - historyId delta replay idempotency
  - invalid-history repair path
  - dedupe assertions (same delta processed twice yields same DB state)
- Calendar sync pipeline:
  - syncToken delta replay
  - 410 recovery
- Job queue:
  - retry/backoff behavior
  - dead-letter after N attempts
- Deletion:
  - delete-my-data removes tokens + data and prevents further sync

### E2E tests (small set)
Use Playwright for core journeys:
1. Sign in (magic link) → connect Google (mock if needed) → Today renders
2. Open thread → summary shows receipts → generate draft → copy
3. Settings → delete my data → verify app blocks sync + data is gone

### LLM eval harness (required)
- Maintain a gold set (50+ examples) for:
  - faithfulness
  - “unsupported claim” detection
  - evidence coverage
- Run:
  - locally on demand
  - in CI nightly or on a schedule (cost-aware)

## Verification loop (per feature)
After implementing any feature slice:
1. Typecheck
2. Lint/format
3. Run relevant unit/integration tests
4. If UI changed: quick manual screenshot sanity check for Today/Thread/Weekly

## Pre-commit hooks (recommended once repo exists)
Run on staged files:
- formatter (Prettier)
- lint (ESLint)
- typecheck (tsc)
- unit tests (fast subset)

## Manual checks (always)
- Confirm **no auto-send** UI or backend paths exist
- Confirm logs contain **no raw subject/body**
- Confirm delete-my-data stops background sync

