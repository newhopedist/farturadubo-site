create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text not null,
  page text,
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;

