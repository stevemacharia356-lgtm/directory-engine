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
  // 301 Permanent Redirects (SEO Fix)
  redirects: {
    // 1. Guesthouse Mpeketoni
    '/guesthouse-premium-mpeketoni': '/guesthouse-mpeketoni',
    '/guesthouse-premium-mpeketoni/british-hotel-mpeketoni': '/guesthouse-mpeketoni/british-hotel-mpeketoni',
    '/guesthouse-premium-mpeketoni/asterin-guest-house-and-restaurant': '/guesthouse-mpeketoni/asterin-guest-house-and-restaurant',
    '/guesthouse-premium-mpeketoni/garden-city-hotel-and-accommodation': '/guesthouse-mpeketoni/garden-city-hotel-and-accommodation',
    '/guesthouse-premium-mpeketoni/baroness-hotel': '/guesthouse-mpeketoni/baroness-hotel',
    '/guesthouse-premium-mpeketoni/farmers-guest-hotel-and-lodge': '/guesthouse-mpeketoni/farmers-guest-hotel-and-lodge',

    // 2. Health Hindi
    '/health-private-hindi': '/health-hindi',
    '/health-private-hindi/mephi-hospital': '/health-hindi/mephi-hospital',
    '/health-private-hindi/al-bathar-pharmacy': '/health-hindi/al-bathar-pharmacy',
    '/health-private-hindi/elbi-health-center': '/health-hindi/elbi-health-center',

    // 3. Guesthouse Hindi
    '/guesthouse-premium-hindi': '/guesthouse-hindi',
    '/guesthouse-premium-hindi/mama-maendeleo-resort': '/guesthouse-hindi/mama-maendeleo-resort',
    '/guesthouse-premium-hindi/new-joy-guesthouse': '/guesthouse-hindi/new-joy-guesthouse',
    '/guesthouse-premium-hindi/baraka-park-guesthouse': '/guesthouse-hindi/baraka-park-guesthouse',
    '/guesthouse-premium-hindi/subira-guesthouse': '/guesthouse-hindi/subira-guesthouse',
    '/guesthouse-premium-hindi/river-inn-resort': '/guesthouse-hindi/river-inn-resort',
  }
});