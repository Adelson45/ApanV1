-- =========================================================
-- Adiciona tabela de mensagens do formulário de contato
-- Rode este SQL inteiro no editor SQL do Supabase
-- =========================================================

create table if not exists public.contact_messages (
  id         bigserial primary key,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  ip_address text,
  user_agent text,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_messages_created
  on public.contact_messages (created_at desc);

create index if not exists idx_contact_messages_read
  on public.contact_messages (read, created_at desc);

alter table public.contact_messages enable row level security;
