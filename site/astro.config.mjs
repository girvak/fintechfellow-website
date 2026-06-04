// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fintechfellow.com',
  integrations: [sitemap()],
  vite: {
    server: {
      // ngrok ve benzeri tünel hostları (her oturumda alt alan adı değişir)
      allowedHosts: true,
    },
  },
});
