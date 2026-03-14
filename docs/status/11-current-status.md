# Current Status

## Current Phase

Phase 5a — Translation operations and bilingual QA (Completed)

## Completed Phases

- Phase 0 — Foundation and repo bootstrap
- Phase 1 — Design system and UI foundation
- Phase 2 — Public shell and global layout
- Phase 2a — Homepage
- Phase 2b — Public Pages (Services, Branches, Specialists)
- Phase 2c — Booking flow & Authentication scaffolding
- Phase 3 — Branches
- Phase 3a — Gallery, About, Contact
- Phase 3b — Blog foundation
- Phase 3c — Core SEO implementation
- Phase 4 — Supabase schema and content architecture
- Phase 4a — Admin auth and admin shell
- Phase 4b — Admin content modules I
- Phase 4c — Admin content modules II
- Phase 5 — Localization system
- Phase 5a — Translation operations and bilingual QA

## In Progress

- none

## Next Planned Phase

Phase 5b — Content population from admin

## Known Decisions Already Confirmed

- Lithuanian is the primary language
- English is the secondary language
- public site should be built before full admin modules
- one Super Admin is enough for V1
- Next.js + Cloudinary + Vercel + optional Supabase stack is approved
- basic PWA is planned
- premium frontend is the highest priority

## Current Risks

- real brand identity may still need refinement
- real service list may evolve
- branch-specific content may not yet be final
- gallery assets may not yet be finalized
- blog article topics and production imagery may still evolve
- booking provider details may still need final confirmation
- hreflang and CMS-managed SEO controls are still deferred to later phases

## Notes for Next AI Session

Read these files first:

- `/docs/foundation/01-project-overview.md`
- `/docs/foundation/03-information-architecture.md`
- `/docs/foundation/04-content-model.md`
- `/docs/planning/08-phase-index.md`
- `/docs/foundation/06-design-system.md`

Implement only one phase at a time.
Do not overbuild admin before public templates are proven.
Current public routes delivered in this phase:

### Lithuanian (LT) - Default

- `/`
- `/paslaugos`
- `/paslaugos/[slug]`
- `/filialai`
- `/filialai/[slug]`
- `/galerija`
- `/apie-mus`
- `/blogas`
- `/blogas/[slug]`
- `/kontaktai`

### English (EN)

- `/en`
- `/en/services`
- `/en/services/[slug]`
- `/en/branches`
- `/en/gallery`
- `/en/about`
- `/en/blog`
- `/en/blog/[slug]`
- `/en/contact`

Localization system delivered in this phase:

- i18n locale configuration (`src/i18n/locales.ts`)
- UI dictionaries for navigation and common elements (`src/i18n/dictionaries/ui.ts`)
- Bilingual content helpers (`src/i18n/get-content.ts`)
- Language switcher component with actual routing
- English versions of all public pages
- Navigation config updated with locale-aware paths
