import type { APIRoute } from 'astro';
import { getAllDirectorySlugs, getDirectoryData } from '../lib/firestore';

export const GET: APIRoute = async () => {
  const slugs = await getAllDirectorySlugs();
  
  let urls = '';
  
  for (const slug of slugs) {
    // Directory page
    urls += `  <url>
    <loc>https://mymaindomain.co.ke/${slug}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    
    // Individual listing pages
    const data = await getDirectoryData(slug);
    if (data && data.listings) {
      for (const listing of data.listings) {
        urls += `  <url>
    <loc>https://mymaindomain.co.ke/${slug}/${listing.slug}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
      }
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
};