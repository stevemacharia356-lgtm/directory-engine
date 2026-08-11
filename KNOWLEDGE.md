# KNOWLEDGE.md — POLYMORPHIC LOCAL AUTHORITY ENGINE V1

## PROJECT OVERVIEW
Astro static site engine for a Kenya local directory platform. Reads from Firestore, generates pages for 5 business niches per location. Zero hardcoded content. Deployed via GitHub Actions to Firebase Hosting.

## STACK
Astro SSG + Firestore Admin SDK + Firebase Hosting + GitHub Actions

## URL STRUCTURE (NEVER CHANGES)
- Directory pages: mymaindomain.co.ke/{directory}/
- Individual listing pages: mymaindomain.co.ke/{directory}/{slug}/
- Homepage: mymaindomain.co.ke/
- About: mymaindomain.co.ke/about/
- Privacy: mymaindomain.co.ke/privacy/

## 5 NICHES
Guesthouse (LocalBusiness), Hotel (Hotel), Apartment (ApartmentComplex), School (EducationalOrganization), Health (MedicalOrganization)

## PRICE CATEGORIES
Budget, Mid-range, Premium, Luxury — displayed on public pages. Exact numeric price stored for reference only, not shown publicly.

## TWO-LEVEL PAGE STRUCTURE
Directory page: Minimal listing cards with thumbnail, name, price category, summary, amenities, phone/WhatsApp buttons, "See Full Details →" link.
Individual page: Full details, all photos, complete blog review, FAQs, amenities, written directions, map, back-link to directory.

## ALL FILES
src/lib/registry.ts — Regex patterns mapping directory prefixes to niche configs with priceSuffix
src/lib/firestore.ts — Firebase Admin SDK, TypeScript interfaces, getDirectoryData(), getAllDirectorySlugs(), formatPrice(), Markdown parsing with XSS sanitization
src/lib/schema.ts — JSON-LD generators for all 5 niches + Article + FAQPage + ItemList
src/layouts/BaseLayout.astro — HTML shell, meta tags, OG tags, geo meta tags, global CSS
src/components/Header.astro — Breadcrumbs with BreadcrumbList JSON-LD
src/components/Footer.astro — Copyright, nav links to Home, About, Privacy
src/components/LocationIntro.astro — H1, hero image, description
src/components/TableOfContents.astro — Anchor link navigation
src/components/PhoneButton.astro — Green tel: link
src/components/WhatsAppButton.astro — Green wa.me link
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
src/pages/index.astro — Homepage grid of published directories
src/pages/[directory]/index.astro — Directory page with minimal listing cards
src/pages/[directory]/[slug].astro — Individual listing page with full details
src/pages/about.astro — About page with WhatsApp and email contacts
src/pages/404.astro — Custom 404
src/pages/privacy.astro — Privacy policy (Kenya DPA)
src/pages/robots.txt.ts — Dynamic robots.txt
src/pages/sitemap.xml.ts — Dynamic sitemap (directories + individual listings, equal priority)
astro.config.mjs — Astro config with passthrough images
firebase.json — Hosting config with cache headers
.github/workflows/deploy.yml — CI/CD (schedule + dispatch + workflow_dispatch)
scripts/check-build.js — Performance and document size checks

## KEY RULES
- Only directories with status "published" are rendered
- Draft directories are invisible to engine and Google
- URLs never change; premium features added in place
- Price category displayed publicly; numeric price stored for reference
- Images passthrough mode (dashboard pre-optimizes WebP)
- Markdown parsed at data fetch time (firestore.ts)
- Conditional rendering per niche (Astro tree-shakes)
- getStaticPaths fetches data once, passes via props
- All icons have null fallbacks
- Geo meta tags on every directory and individual page
- HTML cache max-age=0 must-revalidate
- Both directory and individual listing pages have equal sitemap priority (0.8)

## GITHUB SECRETS
FIREBASE_SERVICE_ACCOUNT_BASE64
FIREBASE_TOKEN

## DASHBOARD
Separate project at admin-dashboard-dc821.web.app. Connects to same Firestore and Storage. Dashboard creates directories and listings. Engine automatically generates both directory pages and individual listing pages from one save.

## CONTACT
WhatsApp: 0741 986 556
Email: stevemacharia356@gmail.com