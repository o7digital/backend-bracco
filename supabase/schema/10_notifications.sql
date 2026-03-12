create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  workflow_id uuid references public.workflows(id) on delete set null,
  channel public.notification_channel not null,
  status public.notification_status not null default 'queued',
  title text not null,
  message text not null,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_profile_idx on public.notifications(profile_id);
create index if not exists notifications_status_idx on public.notifications(status);
