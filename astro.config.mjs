import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import fs from 'node:fs';
import path from 'node:path';

// Em dev, o Vite trata qualquer requisicao .js como modulo a transformar e se
// recusa a servir arquivos vindos de /public. Isso quebra o carregamento do
// indice do Pagefind, que e justamente um bundle .js + wasm em public/pagefind.
// Este plugin serve /pagefind/* direto do disco, antes dos middlewares internos
// do Vite. Nao afeta o build: em producao esses arquivos sao estaticos comuns.
const MIME = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.wasm': 'application/wasm'
};

function servePagefindInDev() {
  return {
    name: 'serve-pagefind-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (!url.startsWith('/pagefind/')) return next();

        const rel = decodeURIComponent(url.slice('/pagefind/'.length));
        const root = path.join(process.cwd(), 'public', 'pagefind');
        const file = path.join(root, rel);

        // Impede escapar da pasta do indice via ".." na URL.
        if (!file.startsWith(root) || !fs.existsSync(file)) return next();

        res.setHeader('Content-Type', MIME[path.extname(file)] ?? 'application/octet-stream');
        fs.createReadStream(file).pipe(res);
      });
    }
  };
}

export default defineConfig({
  site: 'https://jovemapan.com.br',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'always',
  compressHTML: true,
  redirects: {
    '/ls2-ou-norisk': '/ls2-x-norisk'
  },
  integrations: [sitemap()],
  security: {
    checkOrigin: false
  },
  build: {
    format: 'directory'
  },
  vite: {
    plugins: [servePagefindInDev()],
    build: {
      cssCodeSplit: true,
      minify: true
    },
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/dist/**', '**/.astro/**', '**/.git/**', '**/.vercel/**']
      }
    }
  }
});
