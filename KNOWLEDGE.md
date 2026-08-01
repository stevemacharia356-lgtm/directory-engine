# KNOWLEDGE.md — POLYMORPHIC LOCAL AUTHORITY ENGINE V1

## PROJECT OVERVIEW
Engine for a Kenya local directory platform. Astro static site reads from Firestore, generates pages for 5 business niches per location. Zero hardcoded content. Deployed via GitHub Actions to Firebase Hosting.

## STACK
Astro SSG + Firestore Admin SDK + Firebase Hosting + GitHub Actions

## URL STRUCTURE (NEVER CHANGES)
mymaindomain.co.ke/{directory}/
Example: mymaindomain.co.ke/guesthouse-mpeketoni/

## 5 NICHES
Guesthouse (LocalBusiness, /night), Hotel (Hotel, /night), Apartment (ApartmentComplex, /month), School (EducationalOrganization, /term), Health (MedicalOrganization, no suffix)

## FILES CREATED
src/lib/registry.ts — Regex patterns mapping directory prefixes to niche configs
src/lib/firestore.ts — Firebase Admin SDK init, TypeScript interfaces, getDirectoryData(), getAllDirectorySlugs(), formatPrice()
src/lib/schema.ts — JSON-LD generators for all 5 niches + Article + FAQPage + ItemList
src/layouts/BaseLayout.astro — HTML shell, meta tags, geo meta tags, global CSS
src/components/Header.astro — Breadcrumbs + BreadcrumbList JSON-LD
src/components/Footer.astro — Copyright, nav links
src/components/LocationIntro.astro — H1, hero image, description
src/components/TableOfContents.astro — Anchor link navigation
src/components/PhoneButton.astro — Green tel: link
src/components/WhatsAppButton.astro — Green wa.me link
src/components/WrittenDirections.astro — Yellow directions box
src/components/MapFacade.astro — Static map + click to load interactive
src/components/ListingFaqs.astro — Details/summary per-listing FAQs
src/components/BlogArticle.astro — Blog with pre-parsed HTML
src/components/GlobalFaq.astro — Location-level FAQs
src/components/niches/GuesthouseListing.astro — Guesthouse card with icons
src/components/niches/HotelListing.astro — Hotel card with icons
src/components/niches/ApartmentListing.astro — Apartment card with icons
src/components/niches/SchoolListing.astro — School card with icons
src/components/niches/HealthListing.astro — Health card with icons
src/pages/index.astro — Homepage grid of published directories
src/pages/[directory]/index.astro — Engine page (conditional niche rendering)
src/pages/404.astro — Custom 404
src/pages/privacy.astro — Privacy policy (Kenya DPA)
src/pages/robots.txt.ts — Dynamic robots.txt
src/pages/sitemap.xml.ts — Dynamic sitemap (published only)
astro.config.mjs — Astro config with passthrough images
firebase.json — Hosting config with cache headers
.github/workflows/deploy.yml — CI/CD (schedule + dispatch + workflow_dispatch)
scripts/check-build.js — Performance and document size checks

## KEY RULES
- Only directories with status "published" are rendered
- Draft directories are invisible to engine and Google
- URLs never change; premium features added in place
- Price computed by engine, never stored as text
- Images passthrough mode (dashboard pre-optimizes WebP)
- Markdown parsed at data fetch time (firestore.ts)
- Conditional rendering per niche (Astro tree-shakes)
- getStaticPaths fetches data once, passes via props
- All icons have null fallbacks
- Geo meta tags on every directory page
- HTML cache max-age=0 must-revalidate

## GITHUB SECRETS
FIREBASE_SERVICE_ACCOUNT_BASE64 — Base64-encoded service account JSON
FIREBASE_TOKEN — Firebase CI login token

## ALL PHASES COMPLETE
Phase 1: Scaffold & Infrastructure — DONE
Phase 2: 12 Shared Components — DONE
Phase 3: 5 Niche Components — DONE
Phase 4: SEO Infrastructure — DONE
Phase 5: Engine Pages — DONE
Phase 6: Performance & Deployment — DONE