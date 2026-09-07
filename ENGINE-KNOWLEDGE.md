# KNOWLEDGE.md — KEDIRECTORY ENGINE V1.5 (COMPLETE)

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
- Business slug format: business-{location}-{name}
- Homepage: kedirectory.co.ke/
- About: kedirectory.co.ke/about/
- Privacy: kedirectory.co.ke/privacy/
- Favicon: kedirectory.co.ke/favicon.svg (dark navy "KE")

## NICHES (UNLIMITED — DYNAMIC)
Original 5: Guesthouse (LocalBusiness), Hotel (Hotel), Apartment (ApartmentComplex), School (EducationalOrganization), Health (MedicalOrganization).
Now supports ANY niche via GenericListing fallback + dynamic Gemini fields from dashboard.
Custom niches use LocalBusiness schema with generic listing display.

## PRICE CATEGORIES
Budget, Mid-range, Premium, Luxury — displayed on public pages. Exact numeric price optional.

## V1.5 VISUAL REFRESH (DEPLOYED)
- Modern card design: white cards, box-shadow, 12px border-radius
- Sticky header with white background and shadow
- Dark navy footer with white text
- Body background #fafafa for contrast
- Collapsible blog reviews with "Click to Read Full Review" hint
- Dark navy "KE" favicon
- Images hide alt text during loading
- Blue amenity pills, green price badges

## V1.5 FEATURES (DEPLOYED)
- Verified toggle with locked contact buttons for free listings
- ✓ Verified badge on public pages
- Photo gallery with dynamic categories and lightbox viewer
- Locked gallery state for free listings
- Collapsible blog reviews
- Generic listing component for custom niches
- Business pages with verified badge, gallery, lightbox

## TWO-LEVEL PAGE STRUCTURE
Directory page: Listing cards with photo on top, name, price badge, summary, amenity pills, phone/WhatsApp buttons, "See Full Details →" link.
Individual page: Hero section, verified badge, contact buttons (or locked), photo gallery (or locked), amenities, details, directions, map (or locked), FAQs, collapsible blog review, back-link.

## BUSINESS PAGES (V1.5 COMPLETE)
Standalone one-page websites. Same features as listings: verified badge, locked buttons, photo gallery, collapsible blog, FAQs, opening hours.

## JSON-LD SCHEMAS
- Directory pages: LocalBusiness per listing, ItemList, FAQPage, BreadcrumbList
- Individual listing pages: Niche schema (fallback LocalBusiness), Article, BreadcrumbList, geo coordinates
- Business pages: LocalBusiness, FAQPage, Article
- All schemas include addressCountry: "KE"

## ALL FILES
src/lib/registry.ts — Regex patterns per niche with priceSuffix
src/lib/firestore.ts — Firebase Admin, types, directory+business functions, Markdown parsing with XSS sanitization
src/lib/schema.ts — JSON-LD generators (5 niches + Article + FAQPage + ItemList)
src/layouts/BaseLayout.astro — HTML shell, favicon, geo meta tags, global CSS
src/components/Header.astro — Sticky header, conditional JSON-LD
src/components/Footer.astro — Dark navy footer
src/components/LocationIntro.astro — H1, hero image, description
src/components/TableOfContents.astro — Anchor links
src/components/PhoneButton.astro — Green Call button (150px)
src/components/WhatsAppButton.astro — Green WhatsApp button (150px)
src/components/WrittenDirections.astro — Yellow directions box
src/components/MapFacade.astro — Google Maps link
src/components/ListingFaqs.astro — Details/summary FAQs
src/components/BlogArticle.astro — Blog with pre-parsed HTML
src/components/GlobalFaq.astro — Location-level FAQs
src/components/niches/GuesthouseListing.astro — Guesthouse card
src/components/niches/HotelListing.astro — Hotel card
src/components/niches/ApartmentListing.astro — Apartment card
src/components/niches/SchoolListing.astro — School card
src/components/niches/HealthListing.astro — Health card
src/components/niches/GenericListing.astro — Generic card for custom niches
src/pages/index.astro — Homepage with directories + Featured Businesses
src/pages/[directory]/index.astro — Directory page with modern cards
src/pages/[directory]/[slug].astro — Individual listing page with lightbox, verified badge, locked buttons
src/pages/business/[business].astro — Business page with lightbox, verified badge, locked buttons
src/pages/about.astro — About page
src/pages/404.astro — Custom 404
src/pages/privacy.astro — Privacy policy with real contact details
src/pages/robots.txt.ts — robots.txt
src/pages/sitemap.xml.ts — Dynamic sitemap
public/favicon.svg — Dark navy "KE"
astro.config.mjs — site: kedirectory.co.ke
firebase.json — Hosting config
.github/workflows/deploy.yml — CI/CD
scripts/check-build.js — Performance checks

## KEY RULES
- Only published directories and businesses rendered
- Drafts invisible to engine and Google
- URLs never change
- Price category displayed publicly
- Images direct upload, client-side compression
- Markdown parsed at data fetch time
- Conditional rendering per niche with GenericListing fallback
- getStaticPaths fetches once, passes via props
- Icons have null fallbacks
- Geo meta tags on all pages
- HTML cache max-age=0 must-revalidate
- Equal sitemap priority (0.8)
- Phone/WhatsApp buttons equal size
- Blog reviews collapsible via <details>
- Photo galleries with lightbox
- Locked contact buttons for free listings
- Verified badge for paid listings

## GOOGLE/BING STATUS
- Google Search Console: verified, sitemap success
- Bing Webmaster Tools: verified
- Structured data: valid
- #1 ranking for "Kenya accommodation directory"
- PageSpeed: Performance 98, SEO 100, Best Practices 100, Accessibility 95

## GITHUB SECRETS
FIREBASE_SERVICE_ACCOUNT_BASE64
FIREBASE_TOKEN

## DASHBOARD
Separate project at admin-dashboard-dc821.web.app. V1.5 complete with Gemini AI for niche fields, location descriptions, summaries, and blogs.

## V2 PLANNED
1. Premium pricing display on public pages
2. Claim business flow with verification
3. Business owner dashboard (edit own page)
4. M-Pesa integration (Daraja API)
5. AI FAQ assistant on listing pages
6. Review and rating system

## CONTACT
WhatsApp: 0741 986 556
Email: stevemacharia356@gmail.com