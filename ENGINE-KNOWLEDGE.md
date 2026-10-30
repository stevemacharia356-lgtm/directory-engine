# KNOWLEDGE.md — KEDIRECTORY ENGINE V1.8 (COMPLETE)

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

## AI LAYOUT ENGINE (V1.8) — THE CORE
The Engine is now **100% driven by AI-generated layouts** stored in Firestore (`nicheFields/{nicheSlug}`).
- **Dynamic Directory Cards:** Cards are rendered based on the `directoryCard` array (e.g., `["thumbnail", "name", "priceCategory", "amenities"]`). This makes cards compact and scannable (UX Rule #9).
- **Dynamic Listing Pages:** The `[slug].astro` page is a pure renderer. It loops through the `listingPage` array (e.g., `[hero, decision_facts, details_table, photos, deep_content]`) and renders each section in the exact order Gemini designed.
- **Unknown Means No:** If a field is empty or null, that section is hidden entirely.
- **Fallback:** If an AI layout is missing, the Engine uses a `defaultLayout` fallback so nothing breaks.
- **Helper Function:** `getNicheFieldDefs()` in `src/lib/firestore.ts` now returns BOTH `fields` and `layout`.

## PROGRESSIVE DISCLOSURE (V1.8)
Following UX Rule #29:
- **Location Description:** On the Directory page, long descriptions are truncated to 3 lines with a custom "Read More" toggle (`LocationIntro.astro`).
- **Business Summary:** On the Listing page, long summaries are truncated to 3 lines with a "Read More" toggle in the Hero section.
- **Internal Linking:** All cross-linking sections are inside `<details>` tags at the bottom of the page.
- **Global FAQs (V1.8, commit 6a18100):** `GlobalFaq.astro` renders directory-level FAQs as a native `<details>` accordion — white card, animated +/× icon, no JS. The component does NOT render its own heading or section wrapper; the parent page (`[directory]/index.astro`) owns the `<h2>❓ Frequently Asked Questions</h2>` and wraps it in `<section id="faq">`. This avoids a duplicate header and provides an in-page anchor for the TOC.

## NICHES (UNLIMITED — DYNAMIC)
Original 5: Guesthouse, Hotel, Apartment, School, Health.
Now supports ANY niche via dynamic Gemini fields and layout from dashboard.
Custom field definitions and layouts are saved to Firestore (`nicheFields/{nicheSlug}`) and loaded dynamically so they never regenerate on edit.

## AI ASSISTANT CHAT WIDGET (V1.7)
- **Feature:** Floating chat widget on Listing and Directory pages.
- **UI:** Built with `ChatWidget.astro`. Renders Markdown and uses a modern bubble layout.
- **Listing Mode:** Reads ONLY the specific listing's data. If no answer, it tells the user to call the business's phone number.
- **Directory Mode:** Reads ALL listings in the directory AND related directories (other categories in that location).
- **Firebase:** `BaseLayout.astro` loads Firebase SDK and initializes with the public API key.

## DYNAMIC FOOTER (V1.6)
- **Listing & Business Pages:** Shows the specific business's phone number and WhatsApp.
- **Directory & Home Pages:** Shows a "Kedirectory Helpline" button. Clicking it opens a secure modal with your number (Base64 encoded to prevent scraping).

## INTERNAL LINKING MESH (V1.6)
- Directory, Listing, Homepage, and Business pages all have collapsible internal linking sections to spread SEO authority.
- **Helper Function:** `getRelatedDirectories()` in `src/lib/firestore.ts`.

## STRICT CUSTOM NICHE FILTERING (V1.6)
In `src/pages/[directory]/[slug].astro`, custom niche details are strictly filtered.
The engine will **HIDE** any field if its value is:
- `false` (Boolean), `null` or empty string
- `"Other"`, `"Other County"`, `"N/A"`
- Empty arrays

## PRICE CATEGORIES
Budget, Mid-range, Premium, Luxury — displayed on public pages. Exact numeric price optional.

## VISUAL REFRESH (V1.5 - V1.8)
- Modern card design: white cards, box-shadow, 12px border-radius
- Sticky header with white background and shadow
- Dark navy footer with white text
- Collapsible blog reviews, collapsible internal linking
- Blue amenity pills, green price badges

## JSON-LD SCHEMAS
- Directory pages: LocalBusiness per listing, ItemList, FAQPage, BreadcrumbList
- Individual listing pages: Niche schema (fallback LocalBusiness), Article, BreadcrumbList, geo coordinates
- Business pages: LocalBusiness, FAQPage, Article
- All schemas include addressCountry: "KE"

## ALL FILES
src/lib/registry.ts — Regex patterns per niche
src/lib/firestore.ts — Firebase Admin, types, getRelatedDirectories(), loads nicheFieldDefs AND nicheLayout
src/lib/schema.ts — JSON-LD generators
src/layouts/BaseLayout.astro — HTML shell, Firebase SDK init
src/components/Header.astro — Sticky header
src/components/Footer.astro — Dynamic footer
src/components/LocationIntro.astro — Truncated location description with Read More toggle
src/components/ChatWidget.astro — AI Assistant widget
src/components/GlobalFaq.astro — Directory-level FAQ accordion (details/summary, no own heading — parent page renders the h2 and section#faq)
src/components/ListingFaqs.astro — Listing-level FAQ accordion (same details/summary style)
src/components/BlogArticle.astro — Renders the Gemini-generated blog article on listing/business pages
src/components/TableOfContents.astro — Collapsible "On this page" menu (anchors: #faq, etc.)
src/components/MapFacade.astro — Lazy-loaded map facade (defers map load until user interaction)
src/components/WrittenDirections.astro — Text directions block on listing pages
src/components/PhoneButton.astro — Call button; locked for free listings, unlocked for verified/paid
src/components/WhatsAppButton.astro — WhatsApp button; locked for free listings, unlocked for verified/paid
src/components/niches/GenericListing.astro — Generic card for custom niches
src/components/niches/GuesthouseListing.astro — Per-niche card renderer (Guesthouse)
src/components/niches/HotelListing.astro — Per-niche card renderer (Hotel)
src/components/niches/ApartmentListing.astro — Per-niche card renderer (Apartment)
src/components/niches/SchoolListing.astro — Per-niche card renderer (School)
src/components/niches/HealthListing.astro — Per-niche card renderer (Health)
src/pages/index.astro — Homepage with collapsible Browse sections
src/pages/about.astro — About page
src/pages/privacy.astro — Privacy page
src/pages/404.astro — Not found page
src/pages/robots.txt.ts — Dynamic robots.txt endpoint
src/pages/sitemap.xml.ts — Dynamic sitemap.xml endpoint
src/pages/[directory]/index.astro — Directory page with compact AI-driven cards; owns <section id="faq"> and the ❓ heading for GlobalFaq
src/pages/[directory]/[slug].astro — Dynamic Listing page (loops through AI listingPage layout)
src/pages/business/[business].astro — Business page with cross-linking
astro.config.mjs — site: kedirectory.co.ke
firebase.json — Hosting config
.github/workflows/deploy.yml — CI/CD
scripts/check-build.js — Build verification script
AGENTS.md / CLAUDE.md — AI agent instruction files
README.md — Repo readme
tsconfig.json — TypeScript config

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