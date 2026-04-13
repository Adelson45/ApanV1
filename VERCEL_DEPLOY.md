# Deploy na Vercel

Este guia mostra como fazer deploy do projeto Astro na Vercel.

## 🚀 Deploy Automático (Recomendado)

### 1. Importar Projeto

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Selecione **"Import Git Repository"**
4. Conecte sua conta GitHub e escolha o repositório `jovemapan`
5. Clique em **"Import"**

### 2. Configurar Projeto

A Vercel detectará automaticamente que é um projeto Astro. Verifique as configurações:

| Configuração | Valor |
|--------------|-------|
| **Framework Preset** | Astro |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 3. Variáveis de Ambiente (Opcional)

Se precisar configurar env vars (ex: para email), adicione em **Settings** → **Environment Variables**:

```
RESEND_API_KEY = sua_chave_aqui
CONTACT_EMAIL = contato@jovemapan.com.br
```

### 4. Deploy

Clique em **"Deploy"** e aguarde ~2 minutos.

## 🔗 Domínio Customizado

Após o deploy:

1. Vá em **Settings** → **Domains**
2. Digite: `jovemapan.com.br`
3. Siga as instruções para configurar DNS na sua hospedagem:
   - Tipo: `CNAME`
   - Nome: `www`
   - Valor: `cname.vercel-dns.com`
   - 
   - Tipo: `A`
   - Nome: `@`
   - Valor: `76.76.21.21`

## 📦 Build Local (Teste)

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Preview local (simula Vercel)
npx serve dist
```

## ⚡ Features Otimizadas para Vercel

- ✅ **Static Generation**: HTML pré-renderizado
- ✅ **Edge Network**: CDN global da Vercel
- ✅ **Headers de Segurança**: Configurados em `vercel.json`
- ✅ **Cache Otimizado**: Assets com cache longo
- ✅ **Compressão**: Gzip/Brotlig automático
- ✅ **HTTPS**: SSL gratuito

## 🔄 Deploy Contínuo

A cada `push` na branch `main`, a Vercel:
1. Detecta a mudança
2. Executa build
3. Deploy automático
4. Preview URL para testes

## 🛠️ Troubleshooting

### Build falha?
```bash
# Limpar cache
rm -rf dist node_modules
npm install
npm run build
```

### Assets não carregam?
- Verifique se estão em `public/`
- Confira os caminhos (devem começar com `/`)

### 404 em páginas?
- Verifique `vercel.json` → `rewrites`
- Certifique-se de que `dist/` contém os arquivos HTML

## 📞 Suporte Vercel

- [Documentação Astro na Vercel](https://vercel.com/docs/frameworks/astro)
- [Vercel Support](https://vercel.com/support)

---

Deploy rápido com `vercel --prod` (com CLI instalada)
