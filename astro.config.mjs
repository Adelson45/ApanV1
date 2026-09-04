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
    '/ls2-ou-norisk': '/ls2-x-norisk',
    '/reveiw-do-shoei-j-cruise': '/review-do-shoei-j-cruise',
    '/reveiw-hjc-i90-hollen': '/review-hjc-i90-hollen',
    '/capacete-protork-review': '/capacete-pro-tork-review',
    '/melhores-capacetes-peels-aberto': '/melhor-capacete-peels',
    '/capacete-viagens-longas': '/capacete-para-viagens-longas',
    '/conserto-de-capacete': '/reparo-e-acessorios',
    '/capacete-permitido-na-pilotagem.astro': '/capacete-permitido-na-pilotagem',
    '/custo-beneficio/fechado-bom-e-barato': '/custo-beneficio/bom-e-barato',
    '/tag/leticia-spiller': '/',
    '/category/capacetes': '/melhor-capacete',
    '/melhor-capacete-para-big-trail': '/capacete-big-trail',
    '/custo-beneficio/capacetes-ate-200': '/custo-beneficio/ate-300-reais',
    '/camera-para-capacete': '/melhor-capacete/intercomunicadores',
    '/comparacao-x11vs-bieffe': '/capacete-x11-review',
    '/capacete-com-oculos': '/capacete-para-quem-usa-oculos',
    '/author/adelson': '/sobre',
    '/tag/beto-simonetti': '/',
    '/custo-beneficio/bom-e-barato-para-estrada': '/melhor-capacete/para-estrada',
    '/melhor-site-para-comprar': '/qual-compra',
    '/capacetes-selo-inmetro': '/capacetes-com-selo-inmetro',
    '/tag/julian-ercolini': '/',
    '/reviews': '/category/reviews'
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api') &&
        !page.includes('/404') &&
        !page.includes('_exemplo')
    })
  ],
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
