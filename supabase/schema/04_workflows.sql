create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  workflow_code text not null unique,
  title text not null,
  summary text not null,
  requestor_profile_id uuid references public.profiles(id) on delete set null,
  country_id uuid not null references public.countries(id) on delete restrict,
  owning_department_id uuid not null references public.departments(id) on delete restrict,
  language_code text not null,
  priority public.workflow_priority not null default 'standard',
  status public.workflow_status not null default 'draft',
  current_step_order integer not null default 1,
  submitted_at timestamptz,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workflows_country_idx on public.workflows(country_id);
create index if not exists workflows_status_idx on public.workflows(status);
create index if not exists workflows_priority_idx on public.workflows(priority);
