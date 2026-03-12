create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  workflow_step_id uuid not null references public.workflow_steps(id) on delete cascade,
  approver_profile_id uuid references public.profiles(id) on delete set null,
  status public.approval_status not null default 'pending',
  decision_note text,
  due_at timestamptz,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists approvals_workflow_idx on public.approvals(workflow_id);
create index if not exists approvals_status_idx on public.approvals(status);
