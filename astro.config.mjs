import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adelson45.github.io',
  base: '/ApanV1',
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
