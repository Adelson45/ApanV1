# 🚀 Push para GitHub

## Opção 1: Script Automático (Recomendado)

Execute no PowerShell:
```powershell
.\push-github.ps1
```

O script irá:
1. ✅ Verificar instalação do Git
2. ✅ Configurar remote se necessário
3. ✅ Adicionar todos os arquivos
4. ✅ Fazer commit
5. 🚀 Push para GitHub

---

## Opção 2: Comandos Manuais

### 1. Configure o remote (primeira vez apenas)
```bash
git remote add origin https://github.com/SEU-USUARIO/NOME-REPO.git
```

### 2. Adicione os arquivos
```bash
git add -A
```

### 3. Faça o commit
```bash
git commit -m "Adiciona todas as páginas e componentes do site"
```

### 4. Push para GitHub
```bash
git push -u origin main
```

---

## 📋 Status Atual

### Páginas Criadas:
- ✅ Home (`index.html`)
- ✅ Melhores Capacetes (`melhor-capacete.html`)
- ✅ Custo Benefício (`custo-beneficio.html`)
- ✅ Capacete Aberto (`capacete-aberto.html`)
- ✅ Cadeados (`cadeados-para-moto.html`)
- ✅ Luvas (`melhor-capacete/luvas.html`)
- ✅ Jaquetas (`dica-melhor-jaqueta-motociclistas.html`)
- ✅ Capas de Chuva (`melhor-capacete/capa-de-chuva.html`)
- ✅ Intercomunicadores (`melhor-capacete/intercomunicadores.html`)
- ✅ Reviews (`category/reviews.html`)
- ✅ Dicas (`category/dicas.html`)
- ✅ Review Peels (`capacete-peels-review.html`)
- ✅ Contato (`contato.html`)
- ✅ Política de Privacidade
- ✅ 404

### Componentes:
- ✅ Header com menu dropdown
- ✅ Footer com links completos
- ✅ Layout base
- ✅ Estilos CSS

---

## 🔧 Configurações Git

Se for primeira vez usando Git:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 🆘 Troubleshooting

### Erro de autenticação:
Configure token GitHub:
1. Acesse: https://github.com/settings/tokens
2. Gere um token com permissão `repo`
3. Use: `git remote set-url origin https://TOKEN@github.com/USER/REPO.git`

### Branch principal:
Se sua branch for `master` em vez de `main`:
```bash
git push -u origin master
```
