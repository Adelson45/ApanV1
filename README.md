# Jovem Apan - Reviews de Capacetes

Site de reviews e comparativos de capacetes para moto, bike e mais. Migrado de WordPress para Astro + Bun.

## 🚀 Tecnologias

- **[Astro](https://astro.build/)** - Framework web para sites de conteúdo
- **Bun** - Runtime e gerenciador de pacotes (alternativa ao Node.js)
- **TypeScript** - Tipagem estática
- **CSS Vanilla** - Estilização sem frameworks externos

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Layout base com SEO
│   ├── components/
│   │   ├── Header.astro          # Navegação principal
│   │   └── Footer.astro          # Rodapé
│   └── pages/
│       ├── index.astro           # Página inicial
│       ├── contato.astro         # Página de contato
│       ├── politica-de-privacidade.astro
│       ├── 404.astro             # Página não encontrada
│       └── api/
│           └── contact.ts        # API Route para formulário
├── public/
│   ├── styles/
│   │   └── main.css              # Estilos globais
│   ├── fonts/                    # Fontes locais
│   ├── images/                   # Imagens do site
│   └── robots.txt
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

## 🛠️ Instalação

```bash
# Com Bun (recomendado)
bun install

# Ou com npm
npm install
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
bun run dev          # ou: npm run dev

# Build para produção
bun run build        # ou: npm run build

# Preview da build
bun run preview      # ou: npm run preview
```

## ✨ Funcionalidades

- ✅ **SEO Otimizado**: Meta tags, Schema.org, Open Graph, Sitemap automático
- ✅ **Performance**: HTML estático, zero JavaScript runtime
- ✅ **Acessibilidade**: ARIA labels, navegação por teclado, contraste adequado
- ✅ **Responsivo**: Layout adaptável a todos os dispositivos
- ✅ **Formulário de Contato**: API Route com validação
- ✅ **Analytics**: Google Analytics e Google Tag Manager
- ✅ **Newsletter**: Cadastro de e-mails

## 🔧 Configuração

### Variáveis de Ambiente (opcional)

Crie um arquivo `.env` na raiz:

```env
# Para envio de e-mails via API de contato
RESEND_API_KEY=sua_chave_aqui
CONTACT_EMAIL=contato@jovemapan.com.br
```

### Google Analytics

O GA e GTM já estão configurados no Layout.astro. Para alterar os IDs:

```astro
<!-- Layout.astro -->
<script async src="https://www.googletagmanager.com/gtag/js?id=SEU_GA_ID"></script>
```

## 🖼️ Migração de Imagens

As imagens do projeto original estão em `images/`. Para usar no Astro:

1. Copie as imagens necessárias para `public/images/`
2. Atualize os caminhos no código (ex: `/images/logo.png`)

## 📄 Páginas

| Página | Descrição |
|--------|-----------|
| `/` | Home com categorias e reviews em destaque |
| `/contato` | Formulário de contato com API |
| `/politica-de-privacidade` | Página de privacidade LGPD/GDPR |
| `/404` | Página não encontrada |

## 🔍 SEO

O projeto inclui:
- Meta tags dinâmicas por página
- Schema.org JSON-LD (Organization, WebSite, WebPage)
- Sitemap XML automático (`/sitemap-index.xml`)
- Canonical URLs
- Twitter Cards e Open Graph

## 🚧 Roadmap

- [ ] Integração com Resend para envio de e-mails
- [ ] Páginas de reviews individuais
- [ ] Sistema de busca
- [ ] Filtros de comparativos
- [ ] Páginas de categoria (/capacetes-moto, etc.)

## 📞 Contato

- **E-mail**: contato@jovemapan.com.br
- **Telefone**: +55 (11) 96803-7428
- **Site**: https://jovemapan.com.br

---

Desenvolvido com ❤️ usando Astro + Bun
