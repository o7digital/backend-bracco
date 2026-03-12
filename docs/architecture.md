# Architecture

Bracco Process Hub is structured as a lightweight enterprise monorepo with one presentation app, one API app, two shared packages, and a Supabase data model.

## Layers

### Presentation

[apps/web](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/apps/web) is an Astro application that renders a polished admin-style landing page. React islands are used where stateful UI adds value, such as pipeline switching and AI sentiment filtering.

### Service Layer

[apps/api](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/apps/api) is an Express service written in TypeScript. It uses a modular folder layout so each workflow domain can evolve independently without introducing framework-heavy coupling.

### Shared Contracts

[packages/types](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/packages/types) contains cross-workspace interfaces and enums. [packages/config](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/packages/config) contains the placeholder corporate metadata, fake dashboard content, and shared constants used by both apps.

### Data Platform

[supabase/schema](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/supabase/schema) defines relational tables for profiles, workflows, approvals, documents, AI insights, and notifications. Seed data in [supabase/seed.sql](/Users/oliviersteineur/backend-bracco/crm-suites-o7-main/supabase/seed.sql) keeps the local environment demoable without touching production-like records.

## Deployment Shape

- `apps/web` can be deployed as a static Astro site or served from a Node adapter later.
- `apps/api` exposes an Express server that binds to `PORT`, which makes it ready for Railway.
- Supabase handles auth, relational persistence, and document storage.
- Turbo coordinates workspace builds while pnpm manages dependencies and linking.

## Suggested Runtime Flow

1. A user signs in through Supabase auth.
2. The frontend requests workflow dashboards and approval queues from the API.
3. The API reads workflow, document, approval, and insight data from Supabase.
4. Notifications and AI summaries are attached to workflow decision points.
5. Executive management reviews only the escalated or threshold-crossing items.

## Design Principles

- Keep the API modular and shallow rather than deeply abstracted.
- Share contracts between apps to reduce shape drift.
- Use fake content everywhere until a real integration plan exists.
- Separate schema files by business entity to make review easier.
