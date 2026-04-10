# Decisions Log

## Decision 001

Lithuanian is the default language.
English is the secondary language.

Reason:
The business is based in Vilnius and Lithuanian is the primary market language.

## Decision 002

Public website quality is the highest priority.

Reason:
The main business value comes from premium frontend, local SEO, and booking conversion.

## Decision 003

Admin will not be built first.

Reason:
The public site defines the content shape. Admin should manage a proven content model, not invent it too early.

## Decision 004

V1 admin uses only one role: Super Admin.

Reason:
The business is small and currently does not need complex permissions.

## Decision 005

Cloudinary is the media source of truth.

Reason:
The site is image-heavy and needs strong media optimization.

## Decision 006

V1 booking is simple.

Reason:
The business needs conversion-focused booking CTAs, not a complex custom scheduling engine.

## Decision 007

The website must support strong local SEO through branch pages and service pages.

Reason:
Local business discovery is a core acquisition path.

## Decision 008

English support must be planned from the start, but Lithuanian-first implementation is acceptable early in development.

Reason:
This reduces build complexity while preserving long-term bilingual structure.

## Decision 009

Basic PWA is in scope.
Advanced offline-first behavior is not in scope for V1.

Reason:
Installability adds value without overcomplicating the first release.

## Decision 010

The project must be delivered phase-by-phase.

Reason:
This supports AI-agent workflows, smaller commits, better handoffs, and reduced context loss.

## Decision 011

Phase 1 established a soft off-white and warm beige aesthetic with rounded cards and deep charcoal text, adhering to the premium and minimal requirement without being overly generic.

Reason:
As defined in the design system foundation, the 'minimal luxury with soft editorial feel' fits best with these specific Tailwind token values.

## Decision 012

Phase 2 introduced a centralized navigation object inside \config/navigation.ts\ mapped across SiteHeader and SiteFooter. This centralizes links allowing easier injection of localization routines in a later phase without hardcoding UI shells.

Reason:
As defined in Phase 2 scope, keeping public layout wrappers reusable.

## Decision 013

Phase 2a establishes mock.ts acting as the data service boundary. All shared UI card components in Phase 1 read gracefully from these static lists inside the newly composed Homepage wrapper. This avoids building hardcoded component trees that would be thrown away in Phase 3.

Reason:
Requirement requested production-minded architecture built without connecting Supabase but ready for it.

## Decision 014

Phase 2b introduces internal taxonomy mapping in mock data, utilizing Next.js \generateStaticParams\ effectively generating \/paslaugos/[slug]\ templates natively mimicking a fast SSG headless CMS payload.

Reason:
Requirement to remain premium and fast while avoiding connecting to Supabase yet. Ensures when CMS wires in, the data shape swap is trivial.

## Decision 015

Phase 2c implements the branch specific physical locations structure natively. Map modules are held off behind visual placeholders to deliberately isolate Mapbox/Google API implementations for later interactive optimization phases.

## Decision 016

Phase 3 focuses strictly on Branches (Index and Dynamic Details) based on `src/data/branches.ts`.
Reason:
The Phase Index numbering drifted from actual implementation. Booking scaffolding was completed earlier (as Phase 2c in logs), so Phase 3 is now dedicated to Branches to correctly match the implemented history.

## Decision 017

Phase 3a is reserved for Gallery, About, and Contact, while Blog foundation moves to Phase 3b.

Reason:
The implemented order now reflects the actual delivery sequence: Branches were completed first as Phase 3, and the remaining public editorial/contact pages now form the next slice before Blog.

## Decision 018

Gallery, About, and Contact are built on local structured mock data, with gallery visuals represented by local SVG editorial placeholders.

Reason:
This keeps the frontend premium and production-minded without prematurely wiring Supabase or Cloudinary, while preserving clean future relations between gallery items, branches, and services.

## Decision 019

Phase 3b blog content uses a structured local article model with typed body blocks, related service/branch references, and local editorial SVG cover placeholders.

Reason:
This keeps the blog foundation CMS-ready while preserving a premium reading experience before Supabase and Cloudinary are connected for production content.

## Decision 020

Phase 3c uses a lightweight SEO utility layer with shared metadata helpers, route-generated sitemap and robots files, and page-level JSON-LD only where the content already supports it naturally.

Reason:
This keeps the SEO foundation maintainable and effective without overengineering schema management or introducing premature CMS/admin SEO tooling.

## Decision 021

Phase 4 stores richer editorial and UI-managed content in JSON-capable fields where the content is naturally block- or list-based, including opening hours, trust points, service benefits/FAQ, and blog article bodies.

Reason:
The current frontend already uses structured local content. Mirroring that shape in Supabase reduces translation friction and makes later admin CRUD/UI block editing more realistic than flattening everything into plain text.

## Decision 022

Phase 4 enables RLS on all core content tables with no public policies yet, using service-role access as the safe backend baseline until the admin and public data-access phases are implemented.

Reason:
This avoids accidentally exposing new tables through Supabase before explicit read/write policies are designed, while keeping the schema ready for Phase 4a and later content wiring.

## Decision 023

Phase 4a uses Supabase email/password auth with server-managed HTTP-only session cookies and a `SUPABASE_SUPERADMIN_EMAILS` allowlist instead of introducing a custom roles table or multi-role permission layer.

Reason:
V1 only needs a single superadmin. This keeps access control minimal, production-minded, and compatible with the current schema while avoiding premature auth complexity.

## Decision 024

Public website routes now live inside a `(site)` route group so the `/admin` area can use an isolated shell and metadata strategy without path-based layout branching.

Reason:
This keeps the public and admin experiences cleanly separated in the App Router and makes future admin expansion easier to maintain.

## Decision 025

Phase 4b replaces placeholder `[section]` routes for Branches, Services, and Specialists with real CRUD interfaces using Next.js Server Actions and shadcn/ui forms.

Reason:
Server actions provide a secure mechanism for executing Supabase service-role mutations without exposing admin credentials to the client, while keeping form implementations lightweight and production-minded.

## Decision 026

Phase 4c implements real CRUD admin modules for Gallery, Promotions, Blog, Testimonials, Leads, and Settings using Next.js Server Actions and shadcn/ui forms.

Reason:
This completes the admin content management capabilities for V1, allowing the owner to manage all core content entities (gallery, promotions, blog, testimonials, leads, and global settings) directly from the admin panel.

## Decision 027

Phase 5 implements a bilingual localization system with Lithuanian as the default language and English as secondary.

Reason:
The website targets a primarily Lithuanian audience in Vilnius, but needs English support for tourists and expats. The approach uses:

- Clean locale routing (/en prefix for English pages)
- UI dictionaries for static text
- Bilingual content helpers for database content with LT-first fallback
- Language switcher that preserves page context

## Decision 028

Phase 5 uses URL-based locale detection rather than cookies or headers for simplicity and SEO-friendliness.

Reason:
URL-based locale is the most reliable for:

- SEO (search engines can crawl both locales)
- User bookmarking and sharing
- No dependency on cookie consent
- Clear user experience with visible locale in URL

## Decision 029

Phase 5 keeps Lithuanian as the default without a prefix (e.g., /paslaugos not /lt/paslaugos) to maintain backward compatibility with existing URLs.

Reason:
The existing Lithuanian site is already live. Adding /en prefix for English while keeping LT paths unchanged maintains SEO and avoids redirects or broken links.

## Decision 030

Phase 5a implements translation status tracking for admin content modules to help identify missing English translations.

Reason:
Admin users need visibility into which content items have complete English translations vs. Lithuanian-only content. This enables targeted translation work and maintains bilingual data quality. The implementation includes:

- TranslationStatusBadge component showing "Complete", "LT only", or "Empty" states
- Translation status columns added to all admin list views
- Translation completeness helper functions in src/i18n/get-content.ts
- Fields tracked: title_lt/title_en, quote_lt/quote_en, role_lt/role_en, etc.

## Decision 031

Phase 5b implements hreflang support for bilingual SEO with proper canonical URLs.

Reason:
The website needs proper international SEO signals for both Lithuanian and English versions. The implementation includes:

- hreflang tags with lt, en, and x-default values in metadata alternates
- Locale-aware canonical URLs that correctly point to LT or EN versions
- createLocalizedPageMetadata helper function in src/lib/metadata.ts
- generateHreflangAlternates for generating language tag mappings
- Sitemap updated to include both LT and EN routes
- Key pages (homepage, services, branches, blog, gallery, about, contact) updated with localized metadata

## Decision 032

Phase 5b uses URL-based locale routing without subdirectory prefix for LT (default) and /en prefix for English.

Reason:

- Maintains backward compatibility with existing LT URLs
- Clear visual distinction for English pages
- SEO-friendly (search engines can crawl both versions)
- User-friendly (visible locale in URL)
- Consistent with Phase 5 localization approach

## Decision 033

Phase 4d implements a reusable ImageUpload component with Cloudinary integration for admin media management.

Reason:

The admin forms previously used raw URL text inputs for images, which required manual Cloudinary uploads and copy-pasting URLs. This created a poor UX. The solution includes:

- ImageUpload component with drag-and-drop, click-to-upload, and URL paste fallback

## Decision 034

Phase 6 standardizes public image rendering around `next/image` plus a shared Cloudinary-aware preprocessing layer that injects automatic format and quality transforms before delivery.

Reason:

The public site is image-heavy and relies on Cloudinary as the media source of truth. Centralizing the delivery logic keeps responsive sizing consistent across homepage, services, branches, gallery, and blog surfaces without degrading the premium crop direction.

## Decision 035

Phase 6 moves public Supabase-backed route data onto a 5-minute Next.js cache with tag-based invalidation from admin mutations.

Reason:

The public site should not stay fully dynamic for mostly editorial content. A short revalidation window improves real-world performance and deployability while explicit tag invalidation keeps admin changes from lingering unnecessarily.
- Server-side Cloudinary upload API route that keeps secrets secure
- Integration in Blog, Gallery, Specialists, Promotions, and Settings modules
- File validation (type: JPEG/PNG/WebP/GIF, max 10MB)
- Image preview with remove functionality
- Hidden input fields to maintain FormData compatibility

## Decision 034

Phase 5d centralizes LT/EN public route mapping inside a shared route helper layer used by navigation, metadata, sitemap generation, language switching, and public links.

Reason:

The earlier implementation mixed localized routes with naive `/en` prefixing, which caused broken switches and mismatched canonical/detail links once translated route segments and dynamic pages were introduced. A single route map keeps public navigation and SEO behavior consistent.

## Decision 035

Public service, branch, and blog detail pages resolve content by either Lithuanian or English slug, while localized field content still follows EN-first-with-LT-fallback behavior.

Reason:

Admin content is bilingual but not always translated at the same time. Matching on both slug columns prevents 404s for partially translated records, and field-level fallback preserves a stable public experience while translations are completed.

## Decision 036

Specialist and team cards remain intentionally non-clickable in V1. No public specialist detail route is introduced in Phase 5d.

Reason:

The current information architecture documents specialists as preview/supporting content rather than a required public detail surface. Leaving clickable cards without a dedicated route would create broken navigation. A specialist detail route should only be added when there is explicit product scope, page design, and content depth for individual profiles.

## Decision 037

The mobile navigation drawer is rendered as a viewport-level overlay and explicitly suppresses the sticky mobile booking CTA while open.

Reason:

Keeping the drawer inside the sticky header stacking context caused visual interference with page content and the bottom booking CTA on mobile. Rendering the menu as a portal-style overlay, locking scroll, and hiding the sticky CTA during the open state produces a cleaner premium mobile navigation experience without redesigning the site shell.

## Decision 038

Phase 3.5 cleans up the admin dashboard UI and sidebar by removing implementation status cards (like \
Single-role
model\ and \Readiness\) and placeholder dev copy.

Reason:

The admin MVP is complete enough that the UI needs to sound like a finished owner-facing product rather than a developer handoff milestone tracker. This provides a calmer, premium experience for the salon owner.

## Decision 039

Admin module list tables use responsive column hiding rather than a card-based mobile layout.

Reason:

All 9 admin module list pages share the same table-based pattern. Converting them to card layouts on mobile would be a significant redesign. Instead, secondary columns (slug, translation status, category, dates, featured badges) are hidden on sub-md screens using `hidden md:table-cell`, keeping only the primary name/title column, status, and action button visible on mobile. This provides a usable mobile experience while keeping the implementation minimal, consistent, and easy to maintain.

## Decision 040

Admin sidebar branding block is hidden on sub-lg screens.

Reason:

On mobile and tablet, the sidebar renders as a horizontal scrolling navigation strip. The full branding block (logo, name, description paragraph) consumed too much vertical space in this mode without adding navigation value. Hiding it below lg frees space for content. The compact navigation items also use reduced padding and icon sizes on smaller screens for better density.

## Decision 041

Public-facing copy on the marketing site must remain customer-facing and must not explain CMS, admin, data-model, or implementation details.

Reason:

The public website is the highest-priority product surface and needs to read like a finished premium brand experience, not a product handoff or system demo. Editorially, the site should speak about craft, trust, atmosphere, services, branches, and direct contact rather than how content is stored or managed behind the scenes.

## Decision 042

Public header and navigation UX should be clarified through stronger active-page state and a cleaner language switcher without changing the route structure or overall information architecture.

Reason:

The existing header already matches the intended IA, but users need a clearer signal about where they are and a calmer, more intentional language-switching control. Strengthening active-state feedback and switcher presentation improves usability on both desktop and mobile while preserving the LT-default and `/en` route strategy.

## Decision 043

The public header uses a floating rounded shell with grouped navigation, while Home remains implicit through the brand/logo link instead of becoming a separate top-level nav item.

Reason:

This keeps the header visually premium and editorial without expanding the information architecture. The grouped nav improves clarity, the floating shell gives the public site a calmer luxury feel, and keeping Home on the logo preserves the simple booking-first navigation model already defined for LT and EN routes.

## Decision 044

Phase 6a standardizes public accessibility hardening through shared focus-ring utilities, skip links, keyboard-safe mobile navigation behavior, and reduced-motion-safe interaction defaults.

Reason:

Accessibility issues were spread across the public shell rather than isolated to one page. Solving them in shared layout, button, and navigation layers creates consistent keyboard and focus behavior across LT and EN routes without changing the route strategy or visual direction.

## Decision 045

The public contact page now submits lightweight enquiries through a small server-side API route that writes into the existing `leads` table, while keeping validation and messaging localized in the frontend.

Reason:

The previous contact form was only a placeholder, which created a real UX and accessibility problem. A minimal route-based submission flow keeps the implementation deployable, works with the current single-role admin lead inbox, avoids reopening the broader content/admin scope, and gives the public site a usable contact path now.

## Decision 046

Phase 6b keeps public analytics optional and lightweight: GA4 loads only when a measurement ID exists, preferring the existing `site_settings.analytics_ga4_id` value with an environment fallback via `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (or `GA4_MEASUREMENT_ID`), while Search Console readiness uses an optional `GOOGLE_SITE_VERIFICATION` meta token.

Reason:

The project already had a lightweight settings slot for a GA4 ID, and deployment planning called for clean environment/config discipline. This approach keeps analytics production-ready without hardcoding IDs, avoids a heavy consent/dashboard scope, preserves public SEO behavior, and makes future Google-side setup straightforward from either admin settings or environment configuration.
