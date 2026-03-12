# Bracco Process Hub

Bracco Process Hub is a pnpm monorepo for an internal workflow platform designed for multi-country teams handling approval flows across Commercial, Procurement, Finance, Legal, and Executive Management.

Everything in this repository uses placeholder data only. No real Bracco assets, production credentials, or customer records are included.

## Stack

- Frontend: Astro + React + TypeScript + Tailwind CSS
- Backend: Node.js + TypeScript + Express
- Data platform: Supabase for auth, database, and storage
- Workspace tooling: pnpm workspaces + Turborepo

## Workspace Layout

```text
apps/
  api/        Express API for workflow orchestration services
  web/        Astro admin-style landing experience
packages/
  config/     Shared mock content, constants, and app metadata
  types/      Shared TypeScript contracts
supabase/
  schema/     SQL schema files
  seed.sql    Fake seed data
docs/
  architecture.md
  modules.md
  product-vision.md
```

## Local Setup

1. Enable Corepack if `pnpm` is not already available:

   ```bash
   corepack enable
   ```

2. Install dependencies from the repository root:

   ```bash
   pnpm install
   ```

3. Copy environment examples:

   ```bash
   cp apps/web/.env.example apps/web/.env
   cp apps/api/.env.example apps/api/.env
   ```

4. Start the workspace:

   ```bash
   pnpm dev
   ```

5. Build the apps:

   ```bash
   pnpm build
   ```

## Scripts

- `pnpm dev` runs the web app and API together through Turbo
- `pnpm dev:web` starts Astro only
- `pnpm dev:api` starts the Express API only
- `pnpm build` builds shared packages and both apps
- `pnpm typecheck` runs workspace type checks
- `pnpm check` runs the build plus type checks

## Environment

`apps/web/.env.example`

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_API_BASE_URL`

`apps/api/.env.example`

- `NODE_ENV`
- `PORT`
- `APP_ORIGIN`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Supabase

The SQL model is split into table-focused files under [supabase/schema](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/supabase/schema). Apply them in order, then load [seed.sql](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/supabase/seed.sql) for fake operational data.

## Documentation

- [architecture.md](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/docs/architecture.md)
- [modules.md](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/docs/modules.md)
- [product-vision.md](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/docs/product-vision.md)
