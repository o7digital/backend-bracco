create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  uploaded_by_profile_id uuid references public.profiles(id) on delete set null,
  document_name text not null,
  document_type text not null,
  template_code text,
  storage_bucket text not null default 'workflow-documents',
  storage_path text not null,
  version text not null default 'v1',
  language_code text not null,
  status public.document_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists documents_workflow_idx on public.documents(workflow_id);
create index if not exists documents_status_idx on public.documents(status);
