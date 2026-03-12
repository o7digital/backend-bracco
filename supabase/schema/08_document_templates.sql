create table if not exists public.document_templates (
  id uuid primary key default gen_random_uuid(),
  template_code text not null unique,
  name text not null,
  description text not null,
  department_id uuid not null references public.departments(id) on delete restrict,
  country_id uuid references public.countries(id) on delete set null,
  language_code text not null,
  automation_level text not null,
  storage_path text not null,
  version text not null default 'v1',
  created_at timestamptz not null default now(),
  constraint document_templates_automation_level_check check (
    automation_level in ('guided', 'semi_automatic', 'ready_for_handoff')
  )
);

create index if not exists document_templates_department_idx on public.document_templates(department_id);
