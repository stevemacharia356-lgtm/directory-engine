// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://kedirectory.co.ke',
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    },
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [{ protocol: 'https' }]
  }
});