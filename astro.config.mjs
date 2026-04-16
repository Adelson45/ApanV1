import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jovemapan.com.br',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: true
    }
  }
});
// Triggering deploy after activating GitHub Pages
