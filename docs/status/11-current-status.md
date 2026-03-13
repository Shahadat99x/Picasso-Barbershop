# Current Status

## Current Phase
Phase 4 — Supabase schema and content architecture (Completed)

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

## In Progress
- none

## Next Planned Phase
Phase 4a — Admin auth and admin shell

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
- Lithuanian content layer is still structurally deferred until the localization phase
- hreflang and CMS-managed SEO controls are still deferred to later phases
- public pages still read local mock data until Phase 4a+ wiring begins
- RLS is enabled as a safe baseline, but public/admin policies still need deliberate implementation

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
- `/galerija`
- `/apie-mus`
- `/kontaktai`
- `/blogas`
- `/blogas/[slug]`
SEO foundation delivered in this phase:
- refined root and page metadata
- `/sitemap.xml`
- `/robots.txt`
- base JSON-LD on homepage, service pages, branch pages, and blog articles
Supabase foundation delivered in this phase:
- `supabase/migrations` for the core relational content model
- `supabase/seed.sql` starter seed scaffold
- `src/lib/supabase` helpers and typed database interface
Booking CTAs currently funnel to `/kontaktai#rezervacija` as the public fallback until the final booking provider link is wired.
