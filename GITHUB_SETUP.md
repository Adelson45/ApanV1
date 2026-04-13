# Configurar Deploy no GitHub Pages

## Passo 1: Criar Repositório no GitHub

1. Acesse https://github.com/new
2. **Repository name**: `jovemapan`
3. Selecione **Public** (ou Private se quiser)
4. **NÃO** marque "Initialize this repository with a README"
5. Clique em **Create repository**

## Passo 2: Conectar e Fazer Push

Após criar o repositório, execute estes comandos no terminal:

```bash
# Configurar remote
git remote add origin https://github.com/SEU_USERNAME/jovemapan.git

# Renomear branch para main (opcional, mas recomendado)
git branch -M main

# Fazer push
git push -u origin main
```

**Substitua `SEU_USERNAME` pelo seu nome de usuário do GitHub.**

## Passo 3: Configurar GitHub Pages

1. No GitHub, vá em **Settings** → **Pages** (no menu lateral)
2. Em **Build and deployment** → **Source**, selecione: **GitHub Actions**
3. O workflow já está configurado em `.github/workflows/deploy.yml`

## Passo 4: Verificar Deploy

1. Vá em **Actions** no menu superior do repositório
2. Aguarde o workflow "Deploy to GitHub Pages" completar (cerca de 2-3 minutos)
3. Quando aparecer ✅ verde, o site estará no ar

## URL do Site

Após o deploy, seu site estará em:
```
https://SEU_USERNAME.github.io/jovemapan
```

## Deploy Automático

Toda vez que você fizer push para a branch `main`, o site será automaticamente atualizado:

```bash
git add .
git commit -m "Nova atualização"
git push origin main
```

## Troubleshooting

### Erro de autenticação?
Configure suas credenciais GitHub:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

Ou use GitHub CLI:
```bash
gh auth login
```

### Workflow não aparece?
Verifique se o arquivo `.github/workflows/deploy.yml` existe:
```bash
dir .github\workflows
```

---

**Alternativa mais simples**: Use o botão "Deploy with Vercel" - não requer configuração de GitHub Actions e é mais rápido!
