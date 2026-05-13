# Painel Admin — Setup

Painel para moderar comentários e gerenciar a newsletter, conectado ao Supabase.

## 1. Instalar dependências

```bash
npm install
```

Isso instala: `@astrojs/vercel`, `@supabase/supabase-js`.

## 2. Criar o schema no Supabase

1. Acesse seu projeto no Supabase
2. Vá em **SQL Editor → New query**
3. Cole o conteúdo de `supabase/schema.sql` e clique em **Run**

## 3. Criar o usuário admin

1. No Supabase, vá em **Authentication → Users → Add user → Create new user**
2. Preencha e-mail e senha que você usará no painel
3. Marque **Auto Confirm User**

## 4. Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz (copie de `.env.example`):

```
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

As chaves estão em **Project Settings → API** no Supabase.

> ⚠️ **NUNCA** commite o `.env`. O `SERVICE_ROLE_KEY` dá acesso total ao banco.

## 5. Configurar no Vercel

Em **Vercel → Project → Settings → Environment Variables**, adicione as três variáveis acima (Production + Preview + Development).

## 6. Rodar localmente

```bash
npm run dev
```

- Site: http://localhost:4321
- Login admin: http://localhost:4321/admin/login

## 7. Deploy

```bash
git add .
git commit -m "feat: painel admin + newsletter + comentários"
git push
```

O Vercel detecta o adapter e faz o build híbrido automaticamente.

## Rotas criadas

**Públicas**
- `POST /api/comments/submit` — envia comentário (vai para fila pendente)
- `GET  /api/comments/list?slug=/pagina/` — lista aprovados (usado pelo PostLayout)
- `POST /api/newsletter/subscribe` — inscreve e-mail

**Admin (exigem login)**
- `GET  /admin/login` — tela de login
- `GET  /admin` — painel: pendentes, aprovados, newsletter
- `POST /api/admin/moderate` — aprovar/rejeitar/excluir
- `GET  /api/admin/newsletter-export` — baixa CSV
- `POST /api/admin/logout`

## Anti-spam embutido

- **Honeypot**: campo `website` oculto — bots preenchem, humanos não
- **Rate limit por IP**: 5 comentários/hora e 5 inscrições/hora
- **Moderação obrigatória**: comentários só aparecem na página depois que você aprovar
- **RLS habilitado**: cliente público não tem acesso direto às tabelas — tudo via API server

## Como funciona o fluxo

1. Visitante envia comentário no fim do post → fica em `status: pending`
2. Você acessa `/admin`, vê a fila de pendentes
3. Clica em **Aprovar** → comentário aparece na página
4. Clica em **Rejeitar** ou **Excluir** se for spam
