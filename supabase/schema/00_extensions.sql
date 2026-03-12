create extension if not exists pgcrypto;

do $$
begin
  create type public.workflow_status as enum (
    'draft',
    'in_review',
    'awaiting_approval',
    'approved',
    'changes_requested'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.workflow_priority as enum ('standard', 'high', 'critical');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.step_status as enum ('pending', 'in_review', 'approved', 'at_risk');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.approval_status as enum ('pending', 'approved', 'changes_requested');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.document_status as enum ('draft', 'ready', 'approved', 'archived');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.sentiment_label as enum ('positive', 'neutral', 'attention');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.notification_channel as enum ('email', 'slack', 'in_app');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.notification_status as enum ('queued', 'delivered', 'action_required');
exception
  when duplicate_object then null;
end
$$;
