# Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

## 🚀 Instruções para Deploy

### 1. Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `jovemapan` (ou outro nome de sua preferência)
3. Deixe como **Público**
4. NÃO inicialize com README (já temos um)
5. Clique em **Create repository**

### 2. Conectar Repositório Local ao GitHub

Após criar o repositório, execute no terminal:

```bash
git remote add origin https://github.com/SEU_USERNAME/jovemapan.git
git branch -M main
git push -u origin main
```

Substitua `SEU_USERNAME` pelo seu nome de usuário do GitHub.

### 3. Configurar GitHub Pages

1. No GitHub, vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. O workflow já está configurado em `.github/workflows/deploy.yml`

### 4. Aguardar Deploy

1. Vá em **Actions** no menu do repositório
2. Aguarde o workflow "Deploy to GitHub Pages" completar
3. O site estará disponível em: `https://SEU_USERNAME.github.io/jovemapan`

### 5. Configurar Domínio Customizado (Opcional)

Se quiser usar `jovemapan.com.br`:

1. No GitHub, vá em **Settings** → **Pages**
2. Em **Custom domain**, digite: `jovemapan.com.br`
3. Clique em **Save**
4. Na sua hospedagem de DNS, adicione um registro CNAME:
   - Nome: `@`
   - Valor: `SEU_USERNAME.github.io`

## 📝 Configuração do Astro para GitHub Pages

O arquivo `astro.config.mjs` já está configurado, mas se você usar um repositório com nome diferente, ajuste:

```javascript
// astro.config.mjs
const base = '/nome-do-seu-repositorio';

export default defineConfig({
  site: 'https://SEU_USERNAME.github.io',
  base: base,
  // ... resto da configuração
});
```

## 🔧 Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build local
npm run build

# Preview da build
npm run preview
```

## 🔄 Deploy Automático

Após a configuração inicial, toda vez que você fizer push para a branch `main`, o site será automaticamente recompilado e deployado:

```bash
git add .
git commit -m "Nova funcionalidade"
git push origin main
```

Aguarde ~2 minutos e o site estará atualizado!

## ⚠️ Notas Importantes

1. **GitHub Pages gratuito** apenas para repositórios públicos
2. O deploy pode levar até 10 minutos após o push
3. O site usa **Bun** (mais rápido que npm) no workflow
4. Imagens devem estar na pasta `public/images/` para funcionar no deploy

## 📞 Suporte

Se encontrar problemas:
1. Verifique em **Actions** se o workflow falhou
2. Confira os logs de erro no GitHub
3. Certifique-se de que todas as dependências estão em `package.json`

---

Deploy configurado com ❤️ usando Astro + GitHub Actions
