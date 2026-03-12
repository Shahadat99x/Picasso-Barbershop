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

