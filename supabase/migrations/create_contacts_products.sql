-- contacts table
create table if not exists public.contacts (
  id bigserial primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  interest text,
  created_at timestamptz default now()
);

create index if not exists contacts_email_idx on public.contacts (email);

-- products table (simplificada para catálogo inicial)
create table if not exists public.products (
  id bigserial primary key,
  slug text unique not null,
  name text not null,
  description text,
  category text,
  price numeric,
  active boolean default true,
  created_at timestamptz default now()
);