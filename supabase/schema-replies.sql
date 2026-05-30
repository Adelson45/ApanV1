-- =========================================================
-- Adiciona suporte a resposta do admin nos comentários
-- Rode este SQL no editor SQL do Supabase
-- =========================================================

alter table public.comments
  add column if not exists admin_reply        text,
  add column if not exists admin_reply_author text,
  add column if not exists admin_reply_at     timestamptz;
