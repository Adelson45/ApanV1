# Script para fazer push do projeto para o GitHub
# Execute: .\push-github.ps1

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  PREPARANDO PUSH PARA GITHUB" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não está instalado!" -ForegroundColor Red
    Write-Host "Instale o Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Configurar git se necessario
$gitUser = git config user.name
$gitEmail = git config user.email

if (-not $gitUser) {
    $gitUser = Read-Host "Digite seu nome para configuração do Git"
    git config user.name "$gitUser"
}

if (-not $gitEmail) {
    $gitEmail = Read-Host "Digite seu e-mail para configuração do Git"
    git config user.email "$gitEmail"
}

Write-Host "✅ Git configurado: $gitUser <$gitEmail>" -ForegroundColor Green

# Verificar remote
$remote = git remote -v
Write-Host ""

if (-not $remote) {
    Write-Host "⚠️  Nenhum remote configurado!" -ForegroundColor Yellow
    $repoUrl = Read-Host "Digite a URL do repositório GitHub (ex: https://github.com/username/repo.git)"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "✅ Remote 'origin' adicionado: $repoUrl" -ForegroundColor Green
    } else {
        Write-Host "❌ URL não fornecida. Abortando." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Remotes configurados:" -ForegroundColor Green
    Write-Host $remote -ForegroundColor Gray
}

# Verificar arquivos modificados
Write-Host ""
Write-Host "📁 Verificando arquivos..." -ForegroundColor Cyan

$status = git status --short
$count = ($status | Measure-Object).Count

if ($count -eq 0) {
    Write-Host "✅ Nenhuma mudança pendente. Tudo está commitado." -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "📊 $count arquivo(s) modificado(s):" -ForegroundColor Yellow
    Write-Host $status -ForegroundColor Gray
    Write-Host ""
    
    # Adicionar todos os arquivos
    Write-Host "➕ Adicionando arquivos..." -ForegroundColor Cyan
    git add -A
    Write-Host "✅ Arquivos adicionados" -ForegroundColor Green
    
    # Commit
    $commitMsg = Read-Host "Digite a mensagem do commit (ou pressione Enter para 'Adiciona todas as páginas e componentes')"
    if (-not $commitMsg) {
        $commitMsg = "Adiciona todas as páginas e componentes"
    }
    
    Write-Host "📝 Fazendo commit..." -ForegroundColor Cyan
    git commit -m "$commitMsg"
    Write-Host "✅ Commit realizado: '$commitMsg'" -ForegroundColor Green
}

# Push
Write-Host ""
Write-Host "🚀 Fazendo push para GitHub..." -ForegroundColor Cyan

try {
    $branch = git branch --show-current
    git push -u origin $branch
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "  ✅ PUSH REALIZADO COM SUCESSO!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Verifique seu repositório no GitHub!" -ForegroundColor Cyan
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao fazer push!" -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
    Write-Host ""
    Write-Host "Possíveis soluções:" -ForegroundColor Yellow
    Write-Host "1. Verifique sua conexão com a internet" -ForegroundColor Yellow
    Write-Host "2. Configure autenticação do GitHub (token ou SSH)" -ForegroundColor Yellow
    Write-Host "3. Verifique se tem permissão no repositório" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎉 Processo concluído!" -ForegroundColor Green
