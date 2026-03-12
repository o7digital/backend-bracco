create table if not exists public.ai_insights (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  country_id uuid references public.countries(id) on delete set null,
  insight_type text not null,
  sentiment_label public.sentiment_label not null default 'neutral',
  confidence_score numeric(5,2) not null,
  summary text not null,
  recommended_action text not null,
  created_at timestamptz not null default now(),
  constraint ai_insights_confidence_check check (confidence_score >= 0 and confidence_score <= 100)
);

create index if not exists ai_insights_workflow_idx on public.ai_insights(workflow_id);
create index if not exists ai_insights_sentiment_idx on public.ai_insights(sentiment_label);
