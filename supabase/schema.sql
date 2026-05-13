-- =========================================================
-- Schema do painel admin Jovem Apan
-- Rode este SQL inteiro no editor SQL do Supabase
-- =========================================================

-- COMENTÁRIOS
create table if not exists public.comments (
  id           bigserial primary key,
  page_slug    text not null,
  author_name  text not null,
  author_email text not null,
  content      text not null,
  status       text not null default 'pending'
               check (status in ('pending', 'approved', 'rejected')),
  ip_address   text,
  user_agent   text,
  created_at   timestamptz not null default now(),
  approved_at  timestamptz
);

create index if not exists idx_comments_slug_status
  on public.comments (page_slug, status, created_at desc);

create index if not exists idx_comments_status_created
  on public.comments (status, created_at desc);

-- NEWSLETTER
create table if not exists public.newsletter_subscribers (
  id           bigserial primary key,
  email        text not null unique,
  confirmed    boolean not null default true,
  ip_address   text,
  source       text,
  created_at   timestamptz not null default now()
);

create index if not exists idx_newsletter_created
  on public.newsletter_subscribers (created_at desc);

-- RATE LIMIT (controle simples por IP)
create table if not exists public.rate_limit (
  id         bigserial primary key,
  ip_address text not null,
  action     text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rate_limit_ip_action_created
  on public.rate_limit (ip_address, action, created_at desc);

-- ROW LEVEL SECURITY
-- Tudo é acessado via SERVICE_ROLE pelas APIs do servidor.
-- O cliente anon NÃO deve ler/escrever direto, então RLS fica habilitado e sem policy.
alter table public.comments enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.rate_limit enable row level security;
