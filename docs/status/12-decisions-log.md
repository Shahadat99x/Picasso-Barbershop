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
