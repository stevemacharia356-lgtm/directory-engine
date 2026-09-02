# KNOWLEDGE.md — KEDIRECTORY ENGINE V1.5

## PROJECT OVERVIEW
Astro static site engine for Kenya Accommodation & Business Directory. Reads from Firestore, generates pages for 5 business niches per location plus standalone business pages. Zero hardcoded content. Live at kedirectory.co.ke. Deployed via GitHub Actions to Firebase Hosting.

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
- Business slug format: business-{location}-{name}
- Homepage: kedirectory.co.ke/
- About: kedirectory.co.ke/about/
- Privacy: kedirectory.co.ke/privacy/
- Favicon: kedirectory.co.ke/favicon.svg (dark navy "KE")

## 5 NICHES
Guesthouse (LocalBusiness), Hotel (Hotel), Apartment (ApartmentComplex), School (EducationalOrganization), Health (MedicalOrganization)

## PRICE CATEGORIES
Budget, Mid-range, Premium, Luxury — displayed on public pages. Exact numeric price optional.

## V1.5 VISUAL REFRESH (DEPLOYED)
- Modern card design: white cards, box-shadow, 12px border-radius
- Sticky header with white background and shadow
- Dark navy footer with white text
- Body background #fafafa for contrast
- Collapsible blog reviews using native <details> with "Click to Read Full Review" hint
- Favicon: dark navy rounded square with "KE"
- Images: border-radius 12px, color:transparent to hide alt text during loading
- Amenities as blue pills instead of green
- Price as green badge instead of plain text
- Better line heights and spacing throughout

## TWO-LEVEL PAGE STRUCTURE
Directory page: Modern listing cards with photo on top (full width), name, price badge, summary, amenity pills, phone/WhatsApp buttons, "See Full Details →" link.
Individual page: Hero section (photo, name, price badge, summary), contact buttons, amenities, details, directions, map, FAQs, collapsible blog review, back-link.

## BUSINESS PAGES (SEPARATE FEATURE)
Standalone one-page websites under main domain. Created via dashboard Business Pages tab. Fields: name, location, category, tagline, description, phone, WhatsApp, services, opening hours, directions, coordinates, hero image, FAQs, optional blog. Modern card styling matching listing pages. Collapsible blog review.

## JSON-LD SCHEMAS
- Directory pages: LocalBusiness per listing, ItemList, FAQPage, BreadcrumbList
- Individual listing pages: Niche schema, Article, BreadcrumbList, geo coordinates
- Business pages: LocalBusiness, FAQPage, Article
- All schemas include addressCountry: "KE"

## ALL FILES
src/lib/registry.ts — Regex patterns per niche with priceSuffix
src/lib/firestore.ts — Firebase Admin, types, directory+business functions, Markdown parsing with XSS sanitization
src/lib/schema.ts — JSON-LD generators (5 niches + Article + FAQPage + ItemList)
src/layouts/BaseLayout.astro — HTML shell, favicon link, geo meta tags, global CSS (modern, color:transparent on img)
src/components/Header.astro — Sticky header, breadcrumbs with conditional JSON-LD
src/components/Footer.astro — Dark navy footer, copyright, nav, phone/WhatsApp
src/components/LocationIntro.astro — H1, hero image, description
src/components/TableOfContents.astro — Anchor links
src/components/PhoneButton.astro — Green Call button (no number, 150px equal width)
src/components/WhatsAppButton.astro — Green WhatsApp button (150px equal width)
src/components/WrittenDirections.astro — Yellow directions box
src/components/MapFacade.astro — Google Maps link (no API key)
src/components/ListingFaqs.astro — Details/summary FAQs
src/components/BlogArticle.astro — Blog with pre-parsed HTML
src/components/GlobalFaq.astro — Location-level FAQs
src/components/niches/GuesthouseListing.astro — Guesthouse card
src/components/niches/HotelListing.astro — Hotel card
src/components/niches/ApartmentListing.astro — Apartment card
src/components/niches/SchoolListing.astro — School card
src/components/niches/HealthListing.astro — Health card
src/pages/index.astro — Homepage with directories + Featured Businesses
src/pages/[directory]/index.astro — Directory page with modern cards
src/pages/[directory]/[slug].astro — Individual listing page with hero, collapsible review
src/pages/business/[business].astro — Business page with JSON-LD, collapsible review
src/pages/about.astro — About page
src/pages/404.astro — Custom 404
src/pages/privacy.astro — Privacy policy (Kenya DPA)
src/pages/robots.txt.ts — robots.txt with kedirectory.co.ke sitemap URL
src/pages/sitemap.xml.ts — Dynamic sitemap (directories + listings + businesses)
public/favicon.svg — Dark navy "KE" favicon
astro.config.mjs — site: kedirectory.co.ke
firebase.json — Hosting config
.github/workflows/deploy.yml — CI/CD
scripts/check-build.js — Performance checks

## KEY RULES
- Only published directories and businesses rendered
- Drafts invisible to engine and Google
- URLs never change
- Price category displayed publicly
- Images direct upload, client-side compression (800px, 70% quality)
- Markdown parsed at data fetch time
- Conditional rendering per niche
- getStaticPaths fetches once, passes via props
- Icons have null fallbacks
- Geo meta tags on all pages
- HTML cache max-age=0 must-revalidate
- Equal sitemap priority (0.8)
- Phone/WhatsApp buttons equal size
- Listing cards: photo top, content below
- Alt text hidden during image loading
- Blog reviews collapsible via <details>

## GOOGLE/BING STATUS
- Google Search Console: verified, sitemap submitted and success
- Bing Webmaster Tools: verified
- Structured data: all valid, no errors
- First ranking: #1 for "Kenya accommodation directory"
- PageSpeed: Performance 98, SEO 100, Best Practices 100, Accessibility 95

## GITHUB SECRETS
FIREBASE_SERVICE_ACCOUNT_BASE64
FIREBASE_TOKEN

## DASHBOARD
Separate project at admin-dashboard-dc821.web.app. Handles directories, listings, business pages. Button locking prevents double-clicks. Minimal required fields.

## V1.5 PLANNED (NOT YET BUILT)
1. Photo gallery with dynamic categories (Option A: type category → add photos)
2. Verified toggle (Yes/No switch in dashboard)
3. Locked contact buttons for free listings (phone/WhatsApp/map not clickable)
4. ✓ Verified badge on public pages
5. Gemini blog generator (Cloud Function proxy, EEAT prompt, completeness check)

## V2 PLANNED FEATURES
1. Premium pricing display
2. Claim business flow
3. Business owner dashboard
4. M-Pesa integration

## CONTACT
WhatsApp: 0741 986 556
Email: stevemacharia356@gmail.com