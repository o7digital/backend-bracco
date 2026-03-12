create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  region text not null,
  default_language text not null,
  supported_languages text[] not null default '{}',
  timezone text not null,
  compliance_focus text not null,
  created_at timestamptz not null default now(),
  constraint countries_code_length check (char_length(code) = 2)
);
