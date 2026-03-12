create table if not exists public.workflow_steps (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  department_id uuid not null references public.departments(id) on delete restrict,
  step_order integer not null,
  step_name text not null,
  approver_role text not null,
  instructions text not null default '',
  sla_hours integer not null default 48,
  status public.step_status not null default 'pending',
  is_required boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workflow_id, step_order)
);

create index if not exists workflow_steps_workflow_idx on public.workflow_steps(workflow_id);
create index if not exists workflow_steps_department_idx on public.workflow_steps(department_id);
