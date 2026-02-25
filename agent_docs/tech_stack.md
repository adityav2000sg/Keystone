# Tech Stack & Tools — Keystone v1

Source of truth: `TechDesign-Keystone-MVP.md`

## Runtime / Languages
- **TypeScript everywhere** (web + API + workers)
- **Node.js** for API/workers

## Frontend
- **Framework**: Next.js (App Router)
- **UI**: shadcn/ui + Radix UI primitives
- **Styling**: Tailwind CSS
- **Design**: Dark-first “premium glass” UI tokens (see `agent_docs/product_requirements.md`)

## Backend
- **HTTP API**: Fastify
- **Jobs/Workers**: Separate worker service consuming a Postgres-backed queue
- **Validation**: Zod at boundaries (API/webhooks/job payloads)

## Data
- **Primary DB**: Supabase Postgres
- **Auth**: Supabase Auth (magic link)
- **Object storage**: Supabase Storage

## Integrations
- **Google**: Gmail API + Google Calendar API
  - Least-priv scopes, incremental auth for draft creation only
- **Email**: Resend
- **Analytics**: PostHog (PII-safe events only)
- **LLM**: Multi-provider abstraction (Claude primary, OpenAI fallback)

## Hosting
- **Web**: Vercel
- **API + Worker**: Railway
- **DB/Auth/Storage**: Supabase

## Repo Structure (recommended for a modular monolith)

Single repo, multiple deployables:

```
keystone/
├── apps/
│   ├── web/            # Next.js app (Vercel)
│   ├── api/            # Fastify HTTP API (Railway)
│   └── worker/         # background jobs + schedulers (Railway)
├── packages/
│   ├── shared/         # shared types, Zod schemas, utilities
│   └── google/          # Google API client wrappers + scope definitions
├── agent_docs/         # living docs for agents
├── AGENTS.md           # master plan + current state
└── TechDesign-Keystone-MVP.md
```

## Key Commands (fill in once code exists)
- Web: `pnpm --filter web dev` (or `npm run dev`)
- API: `pnpm --filter api dev`
- Worker: `pnpm --filter worker dev`
- Typecheck: `pnpm -r typecheck`
- Lint: `pnpm -r lint`
- Unit tests: `pnpm -r test`
- E2E: `pnpm --filter web test:e2e`

## Dependency Policy
- Add dependencies only when necessary; keep versions stable.
- Pin via lockfile; avoid broad upgrades during MVP.

