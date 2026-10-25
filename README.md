# Jovem Apan - Reviews de Capacetes

Site de reviews e comparativos de capacetes e acessórios para moto ([jovemapan.com.br](https://jovemapan.com.br)). Migrado de WordPress para Astro.

## 🚀 Tecnologias

- **[Astro 5](https://astro.build/)** - páginas estáticas + rotas de servidor (adapter Vercel)
- **TypeScript** e **CSS puro**
- **[Supabase](https://supabase.com/)** - comentários, newsletter, mensagens de contato e login do admin
- **[Brevo](https://www.brevo.com/)** - envio de e-mails (contato e respostas a comentários)
- **[Pagefind](https://pagefind.app/)** - busca do site, gerada no build

## 📁 Estrutura

```
src/
├── components/   # Header, Footer, SearchModal, ProductCard, ProsCons, ReviewSchema
├── layouts/      # Layout (base/SEO), PostLayout (posts), AdminLayout (painel)
├── lib/          # supabase, auth (admin), ratelimit
└── pages/
    ├── *.astro   # posts e páginas do site
    ├── admin/    # painel admin (login, comentários, contatos, inscritos)
    └── api/      # comentários, newsletter, contato e ações do admin
public/           # imagens, fontes, estilos, robots.txt
supabase/         # SQL das tabelas
```

## 🛠️ Desenvolvimento

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build + índice de busca do Pagefind
npm run preview
```

Copie `.env.example` para `.env` e preencha as variáveis (Supabase, Brevo e `ADMIN_EMAILS`). O passo a passo do painel admin está em [`ADMIN_SETUP.md`](./ADMIN_SETUP.md).

## 🚀 Deploy

O deploy é feito na **Vercel**, automaticamente a cada push na branch `main`. As mesmas variáveis do `.env` precisam estar em **Vercel → Settings → Environment Variables**.

Redirects 301 de URLs antigas ficam em `redirects` no [`astro.config.mjs`](./astro.config.mjs).

## 📞 Contato

- **E-mail**: contato@jovemapan.com.br
- **Site**: https://jovemapan.com.br
