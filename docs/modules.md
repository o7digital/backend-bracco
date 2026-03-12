# Modules

The API is organized around workflow responsibilities instead of technical layers. Each module owns its placeholder service and routes.

## Current Modules

### `auth`

Defines the authentication surface, current session policy, and a placeholder view of how Supabase SSO would be exposed to the platform.

### `users`

Represents the internal directory for approvers, reviewers, and cross-country coordinators.

### `workflows`

Represents workflow records, playbooks, and current routing states across departments.

### `approvals`

Represents pending approvals, change requests, and queue summaries by department.

### `documents`

Represents generated packets, templates, and document automation readiness.

### `ai`

Represents placeholder sentiment and risk signals attached to workflow narratives.

### `notifications`

Represents internal notification delivery and action-required signals.

### `countries`

Represents market coverage, supported languages, and coordination models.

### `dashboard`

Aggregates the executive summary layer for the homepage and internal overview screens.

## Module Convention

Each module folder contains:

- `service.ts` for domain-shaped placeholder logic
- `routes.ts` for the HTTP interface

This keeps the current codebase simple while leaving room for controllers, repositories, or integrations later if the product grows.
