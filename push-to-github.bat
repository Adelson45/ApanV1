@echo off
chcp 65001 >nul
echo ==========================================
echo    Push para GitHub - Jovem Apan
echo ==========================================
echo.
echo Este script vai fazer push do projeto para o GitHub.
echo.

set /p username="Digite seu nome de usuário do GitHub: "

if "%username%"=="" (
    echo [ERRO] Nome de usuário é obrigatório!
    pause
    exit /b 1
)

echo.
echo [1/4] Configurando remote...
git remote remove origin 2>nul
git remote add origin https://github.com/%username%/jovemapan.git
if errorlevel 1 (
    echo [ERRO] Falha ao configurar remote
    pause
    exit /b 1
)

echo [2/4] Mudando para branch main...
git branch -M main

echo [3/4] Fazendo push...
git push -u origin main
if errorlevel 1 (
    echo.
    echo [ERRO] Push falhou!
    echo.
    echo Verifique:
    echo 1. Se você criou o repositório "jovemapan" no GitHub
    echo 2. Se seu username está correto
    echo 3. Se você tem autenticação configurada (token SSH ou HTTPS)
    echo.
    echo Para configurar token HTTPS:
    echo git config --global credential.helper cache
    pause
    exit /b 1
)

echo.
echo [4/4] ✓ Push concluído com sucesso!
echo.
echo ==========================================
echo Próximos passos:
echo ==========================================
echo 1. Acesse: https://github.com/%username%/jovemapan
echo 2. Vá em Settings ^> Pages
echo 3. Selecione "GitHub Actions" como source
echo 4. Aguarde o deploy (2-3 minutos)
echo.
echo Seu site estará em:
echo https://%username%.github.io/jovemapan
echo.
pause
