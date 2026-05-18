import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

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
    build: {
      cssCodeSplit: true,
      minify: true
    }
  }
});
