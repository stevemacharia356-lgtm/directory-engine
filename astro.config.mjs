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
  },
  // 301 Permanent Redirect for Guesthouse Hindi ONLY
  redirects: {
    '/guesthouse-premium-hindi': '/guesthouse-hindi',
    '/guesthouse-premium-hindi/mama-maendeleo-resort': '/guesthouse-hindi/mama-maendeleo-resort',
    '/guesthouse-premium-hindi/new-joy-guesthouse': '/guesthouse-hindi/new-joy-guesthouse',
    '/guesthouse-premium-hindi/baraka-park-guesthouse': '/guesthouse-hindi/baraka-park-guesthouse',
    '/guesthouse-premium-hindi/subira-guesthouse': '/guesthouse-hindi/subira-guesthouse',
    '/guesthouse-premium-hindi/river-inn-resort': '/guesthouse-hindi/river-inn-resort',
  }
});