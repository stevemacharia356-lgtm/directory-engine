import type { APIRoute } from 'astro';
import { getAllDirectorySlugs, getDirectoryData, getAllBusinessSlugs } from '../lib/firestore';

export const GET: APIRoute = async () => {
  const slugs = await getAllDirectorySlugs();
  const businessSlugs = await getAllBusinessSlugs();
  
  let urls = '';
  
  for (const slug of slugs) {
    // Directory page
    urls += `  <url>
    <loc>https://kedirectory.co.ke/${slug}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    
    // Individual listing pages - same priority as directory pages
    const data = await getDirectoryData(slug);
    if (data && data.listings) {
      for (const listing of data.listings) {
        urls += `  <url>
    <loc>https://kedirectory.co.ke/${slug}/${listing.slug}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
      }
    }
  }
  
  // Business pages
  for (const bizSlug of businessSlugs) {
    urls += `  <url>
    <loc>https://kedirectory.co.ke/business/${bizSlug}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
};