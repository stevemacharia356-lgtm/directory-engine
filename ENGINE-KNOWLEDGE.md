# KNOWLEDGE.md — KEDIRECTORY ENGINE V1.6 (COMPLETE)

## PROJECT OVERVIEW
Astro static site engine for Kenya Accommodation & Business Directory. Reads from Firestore, generates pages for unlimited business niches per location plus standalone business pages. Zero hardcoded content. Live at kedirectory.co.ke. Deployed via GitHub Actions to Firebase Hosting.

## STACK
Astro SSG + Firestore Admin SDK + Firebase Hosting + GitHub Actions + Cloudflare (DNS)

## LIVE DOMAIN
kedirectory.co.ke
Dashboard: admin-dashboard-dc821.web.app
Google Search Console: verified
Bing Webmaster Tools: verified

## URL STRUCTURE (NEVER CHANGES)
- Directory pages: kedirectory.co.ke/{directory}/
- Individual listing pages: kedirectory.co.ke/{directory}/{slug}/
- Business pages: kedirectory.co.ke/business/{business-slug}/
- Homepage: kedirectory.co.ke/
- About: kedirectory.co.ke/about/
- Privacy: kedirectory.co.ke/privacy/

## NICHES (UNLIMITED — DYNAMIC)
Original 5: Guesthouse, Hotel, Apartment, School, Health.
Now supports ANY niche via GenericListing fallback + dynamic Gemini fields from dashboard.
Custom field definitions are saved to Firestore (`nicheFields/{nicheSlug}`) and loaded dynamically so they never regenerate on edit.

## INTERNAL LINKING MESH (V1.6)
- **Directory Page:** Shows "Other Locations" (same niche) and "Other Categories" (same location).
- **Listing Page:** Shows "More [Niche] in [Location]", "Same Niche in Other Locations", and "Other Categories".
- **Homepage:** Shows "Browse by Location" and "Browse by Category".
- **Business Page:** Shows "Explore Directories in [Location]", "Other [Category] Businesses", and "Other Businesses in [Location]".
- **Helper Function:** `getRelatedDirectories()` in `src/lib/firestore.ts`.

## STRICT CUSTOM NICHE FILTERING (V1.6)
In `src/pages/[directory]/[slug].astro`, custom niche details are strictly filtered.
The engine will **HIDE** any field if its value is:
- `false` (Boolean)
- `null` or empty string
- `"Other"`, `"Other County"`, `"N/A"`
- Empty arrays

## PRICE CATEGORIES
Budget, Mid-range, Premium, Luxury — displayed on public pages. Exact numeric price optional.

## V1.5 & V1.6 VISUAL REFRESH (DEPLOYED)
- Modern card design: white cards, box-shadow, 12px border-radius
- Sticky header with white background and shadow
- Dark navy footer with white text
- Collapsible blog reviews
- Images hide alt text during loading
- Blue amenity pills, green price badges

## TWO-LEVEL PAGE STRUCTURE
Directory page: Listing cards with photo, name, price badge, summary, amenity pills, contact buttons, "See Full Details →" link, plus internal linking sections.
Individual page: Hero section, verified badge, contact buttons, photo gallery, amenities, details, directions, map, FAQs, collapsible blog review, internal linking sections, back-link.

## JSON-LD SCHEMAS
- Directory pages: LocalBusiness per listing, ItemList, FAQPage, BreadcrumbList
- Individual listing pages: Niche schema (fallback LocalBusiness), Article, BreadcrumbList, geo coordinates
- Business pages: LocalBusiness, FAQPage, Article
- All schemas include addressCountry: "KE"

## ALL FILES
src/lib/registry.ts — Regex patterns per niche
src/lib/firestore.ts — Firebase Admin, types, getRelatedDirectories(), loads custom fields
src/lib/schema.ts — JSON-LD generators
src/layouts/BaseLayout.astro — HTML shell
src/components/Header.astro — Sticky header
src/components/Footer.astro — Dark navy footer
src/components/niches/GenericListing.astro — Generic card for custom niches
src/pages/index.astro — Homepage with Browse by Location/Category
src/pages/[directory]/index.astro — Directory page with cross-linking
src/pages/[directory]/[slug].astro — Individual listing page with cross-linking and strict filtering
src/pages/business/[business].astro — Business page with cross-linking
astro.config.mjs — site: kedirectory.co.ke
firebase.json — Hosting config
.github/workflows/deploy.yml — CI/CD

## KEY RULES
- Only published directories and businesses rendered
- URLs never change
- Images direct upload, client-side compression
- Markdown parsed at data fetch time
- Geo meta tags on all pages
- HTML cache max-age=0 must-revalidate
- Blog reviews collapsible via <details>
- Photo galleries with lightbox
- Locked contact buttons for free listings
- Verified badge for paid listings

## GITHUB SECRETS
FIREBASE_SERVICE_ACCOUNT_BASE64
FIREBASE_TOKEN

## CONTACT
WhatsApp: 0741 986 556
Email: stevemacharia356@gmail.com