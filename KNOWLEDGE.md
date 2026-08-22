# KNOWLEDGE.md — POLYMORPHIC LOCAL AUTHORITY ENGINE V1

## PROJECT OVERVIEW
Astro static site engine for a Kenya local directory platform. Reads from Firestore, generates pages for 5 business niches per location plus standalone business pages. Zero hardcoded content. Deployed via GitHub Actions to Firebase Hosting.

## STACK
Astro SSG + Firestore Admin SDK + Firebase Hosting + GitHub Actions

## URL STRUCTURE (NEVER CHANGES)
- Directory pages: mymaindomain.co.ke/{directory}/
- Individual listing pages: mymaindomain.co.ke/{directory}/{slug}/
- Business pages: mymaindomain.co.ke/business/{business-slug}/
- Business slug format: business-{location}-{name}
- Homepage: mymaindomain.co.ke/
- About: mymaindomain.co.ke/about/
- Privacy: mymaindomain.co.ke/privacy/

## 5 NICHES
Guesthouse (LocalBusiness), Hotel (Hotel), Apartment (ApartmentComplex), School (EducationalOrganization), Health (MedicalOrganization)

## PRICE CATEGORIES
Budget, Mid-range, Premium, Luxury — displayed on public pages. Exact numeric price optional, for reference only.

## TWO-LEVEL PAGE STRUCTURE
Directory page: Listing cards with photo on top (full width), name, price category, summary, amenities, phone/WhatsApp buttons below photo, "See Full Details →" link.
Individual page: Full details, complete blog review, FAQs, amenities, written directions, map, back-link to directory.

## BUSINESS PAGES (SEPARATE FEATURE)
Standalone one-page business websites under the main domain. Created via dashboard Business Pages tab. Fields: business name, location, category, tagline, description, phone, WhatsApp, services, opening hours, directions, coordinates, hero image, FAQs, optional blog. URL includes location and name. Business pages link to same-location directories. Homepage displays business pages in Featured Businesses section.

## JSON-LD SCHEMAS
- Directory pages: LocalBusiness per listing, ItemList, FAQPage, BreadcrumbList
- Individual listing pages: Niche schema, Article, BreadcrumbList, geo coordinates
- Business pages: LocalBusiness, FAQPage (if FAQs), Article (if blog)
- All schemas include addressCountry: "KE"

## ALL FILES
src/lib/registry.ts — Regex patterns mapping directory prefixes to niche configs with priceSuffix
src/lib/firestore.ts — Firebase Admin SDK, TypeScript interfaces, directory functions, business functions (getAllBusinessSlugs, getBusinessData), Markdown parsing with XSS sanitization
src/lib/schema.ts — JSON-LD generators for all 5 niches + Article + FAQPage + ItemList
src/layouts/BaseLayout.astro — HTML shell, meta tags, OG tags, geo meta tags, global CSS
src/components/Header.astro — Breadcrumbs with BreadcrumbList JSON-LD
src/components/Footer.astro — Copyright, nav links to Home, About, Privacy
src/components/LocationIntro.astro — H1, hero image, description
src/components/TableOfContents.astro — Anchor link navigation
src/components/PhoneButton.astro — Green Call button (no number, equal width 150px)
src/components/WhatsAppButton.astro — Green WhatsApp button (equal width 150px)
src/components/WrittenDirections.astro — Yellow directions box
src/components/MapFacade.astro — Google Maps link (no API key needed)
src/components/ListingFaqs.astro — Details/summary per-listing FAQs
src/components/BlogArticle.astro — Blog with pre-parsed HTML, numbered
src/components/GlobalFaq.astro — Location-level FAQs
src/components/niches/GuesthouseListing.astro — Guesthouse card with icons
src/components/niches/HotelListing.astro — Hotel card with icons
src/components/niches/ApartmentListing.astro — Apartment card with icons
src/components/niches/SchoolListing.astro — School card with icons
src/components/niches/HealthListing.astro — Health card with icons
src/pages/index.astro — Homepage with directories grid + Featured Businesses section
src/pages/[directory]/index.astro — Directory page with photo-on-top listing cards
src/pages/[directory]/[slug].astro — Individual listing page with full details
src/pages/business/[business].astro — Business page with JSON-LD schema, FAQs, internal links
src/pages/about.astro — About page with contact details
src/pages/404.astro — Custom 404
src/pages/privacy.astro — Privacy policy (Kenya DPA)
src/pages/robots.txt.ts — Dynamic robots.txt
src/pages/sitemap.xml.ts — Dynamic sitemap (directories + individual listings, equal priority)
astro.config.mjs — Astro config with passthrough images
firebase.json — Hosting config with cache headers
.github/workflows/deploy.yml — CI/CD (schedule + dispatch + workflow_dispatch)
scripts/check-build.js — Performance and document size checks

## KEY RULES
- Only published directories and businesses are rendered
- Drafts invisible to engine and Google
- URLs never change; premium features added in place
- Price category displayed publicly; numeric price optional
- Images direct upload, no Cloud Function processing
- Markdown parsed at data fetch time
- Conditional rendering per niche (Astro tree-shakes)
- getStaticPaths fetches data once, passes via props
- All icons have null fallbacks
- Geo meta tags on every directory, individual, and business page
- HTML cache max-age=0 must-revalidate
- Directory and individual listing pages have equal sitemap priority (0.8)
- Business pages linked from homepage
- Phone and WhatsApp buttons equal size (150px min-width, no phone number displayed)
- Listing cards: photo on top full width, content below

## GITHUB SECRETS
FIREBASE_SERVICE_ACCOUNT_BASE64
FIREBASE_TOKEN

## DASHBOARD
Separate project at admin-dashboard-dc821.web.app. Connects to same Firestore and Storage. Dashboard handles directories, listings, and business pages. All buttons have locking to prevent double-clicks. Only name/location required for saving.

## POST-LAUNCH TASKS (after domain purchase)
1. Google Search Console verification and sitemap submission
2. Bing Webmaster Tools verification
3. Robots.txt live check
4. Google Business Profile
5. Analytics setup
6. PageSpeed Insights verification

## CONTACT
WhatsApp: 0741 986 556
Email: stevemacharia356@gmail.com