create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text not null unique,
  full_name text not null,
  title text not null,
  locale text not null default 'en',
  department_id uuid references public.departments(id) on delete set null,
  home_country_id uuid references public.countries(id) on delete set null,
  region text not null,
  is_executive boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_department_idx on public.profiles(department_id);
create index if not exists profiles_country_idx on public.profiles(home_country_id);
