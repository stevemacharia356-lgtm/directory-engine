import type { APIRoute } from 'astro';
import { getAllDirectorySlugs } from '../lib/firestore';

export const GET: APIRoute = async () => {
  const slugs = await getAllDirectorySlugs();
  
  const urls = slugs.map(slug => 
    `  <url>
    <loc>https://mymaindomain.co.ke/${slug}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
};