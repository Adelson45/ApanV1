import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jovemapan.com.br',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    format: 'file'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: true
    }
  }
});
