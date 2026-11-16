import type { APIRoute } from 'astro';
import { getAllDirectorySlugs, getDirectoryData, getAllBusinessSlugs } from '../lib/firestore';

export const GET: APIRoute = async () => {
  try {
    const slugs = await getAllDirectorySlugs();
    const businessSlugs = await getAllBusinessSlugs();
    
    let urls = '';
    
    for (const slug of slugs) {
      // Strict safety check: ensure slug is a valid, non-empty string
      if (!slug || typeof slug !== 'string' || slug.trim() === '') continue;

      // Directory page
      urls += `  <url>
    <loc>https://kedirectory.co.ke/${slug}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
      
      // Individual listing pages - same priority as directory pages
      const data = await getDirectoryData(slug);
      if (data && data.listings && Array.isArray(data.listings)) {
        for (const listing of data.listings) {
          if (!listing || !listing.slug) continue;
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
      if (!bizSlug || typeof bizSlug !== 'string' || bizSlug.trim() === '') continue;
      
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
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return a minimal valid sitemap to prevent build crash
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`, {
      headers: { 'Content-Type': 'application/xml' }
    });
  }
};