create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text not null,
  executive_lane boolean not null default false,
  sort_order integer not null unique,
  created_at timestamptz not null default now(),
  constraint departments_code_check check (
    code in (
      'commercial',
      'procurement',
      'finance',
      'legal',
      'executive_management'
    )
  )
);
