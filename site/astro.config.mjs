// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fintechfellow.org',
  integrations: [sitemap()],
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    server: {
      host: '0.0.0.0',
      // ngrok ve benzeri tünel hostları (her oturumda alt alan adı değişir)
      allowedHosts: true,
    },
  },
});
