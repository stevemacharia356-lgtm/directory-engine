import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = [
    'User-agent: *',
    'Allow: /',
    '',
    'Sitemap: https://kedirectory.co.ke/sitemap.xml'
  ].join('\n');

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' }
  });
};