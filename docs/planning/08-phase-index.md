# Phase Index

## Overview
This project is implemented in phases to support AI-agent execution, maintain clarity, reduce context loss, and ensure stable delivery.

Each AI session should ideally work on one phase only.

## Phase 0 — Foundation and repo bootstrap
- initialize project structure
- finalize docs
- configure stack
- prepare environment strategy
- confirm architecture decisions
- include basic PWA planning in docs

## Phase 1 — Design system and UI foundation
- define visual tokens
- create reusable UI primitives
- establish spacing and layout rules
- create reusable card and CTA patterns

## Phase 2 — Public shell and global layout
- header
- footer
- mobile nav
- language switcher placeholder
- global layout
- sticky mobile booking CTA

## Phase 2a — Homepage
- hero
- featured services
- featured branches
- gallery preview
- testimonials
- promotions
- latest blog preview
- CTA sections

## Phase 2b — Services
- services index
- service card system
- service detail template
- pricing and duration blocks
- FAQ/CTA sections

## Phase 2c — Branches
- branches index
- branch detail template
- branch contact blocks
- map/hours/transport/booking sections

## Phase 3 — Gallery, About, Contact
- gallery page
- about page
- contact page
- contact form UI
- social/contact blocks

## Phase 3a — Blog foundation
- blog index
- blog article template
- blog cards
- article layout

## Phase 3b — Booking flow
- booking CTA strategy
- branch-specific booking buttons
- service-specific booking links
- fallback contact CTA

## Phase 3c — Core SEO implementation
- metadata
- sitemap
- robots
- canonical strategy
- OG support
- schema foundation
- internal linking review

## Phase 4 — Supabase schema and content architecture
- define tables
- define relationships
- define bilingual content structure
- prepare content model implementation

## Phase 4a — Admin auth and admin shell
- login flow
- protected admin area
- sidebar
- dashboard shell
- superadmin guard

## Phase 4b — Admin content modules I
- branches CRUD
- services CRUD
- specialists CRUD

## Phase 4c — Admin content modules II
- gallery CRUD
- promotions CRUD
- blog CRUD
- testimonials CRUD
- leads view/status handling
- settings

## Phase 5 — Localization system
- LT as default
- EN support
- locale routing
- translation dictionaries for UI
- language switcher completion

## Phase 5a — Translation operations and bilingual QA
- missing translation handling
- admin bilingual validation
- mixed-language cleanup

## Phase 5b — Localized SEO expansion
- hreflang
- localized metadata refinement
- branch/service internal linking improvements
- local search content polish

## Phase 6 — Performance optimization
- image optimization
- client/server rendering review
- loading optimization
- caching and bundle review

## Phase 6a — Accessibility and UX hardening
- keyboard support
- contrast/focus improvements
- form accessibility
- motion review

## Phase 6b — Analytics and tracking
- GA4
- Search Console readiness
- CTA click events
- booking event tracking
- lead form tracking

## Phase 6c — Basic PWA
- manifest
- icons
- installability
- standalone mode
- simple offline fallback if lightweight

## Phase 7 — Content entry and production fill
- populate services
- populate branches
- populate gallery
- populate blog
- populate settings
- populate SEO content

## Phase 7a — QA and UAT
- mobile QA
- multilingual QA
- SEO QA
- admin QA
- link checks
- content checks

## Phase 8 — Deployment and launch
- Vercel production config
- env vars
- domain setup
- production checks
- deployment validation

## Phase 8a — Post-launch validation
- Search Console submission
- sitemap verification
- analytics validation
- production bug fixes
- final optimization pass