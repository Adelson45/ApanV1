import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Para GitHub Pages, descomente a linha abaixo e ajuste o nome do repositório
// const base = '/nome-do-repositorio';
const base = undefined;

export default defineConfig({
  site: 'https://jovemapan.com.br',
  base: base,
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    format: 'file'
  }
});
