# Current Status

## Current Phase

Phase 5.5 - Public frontend editorial and copy cleanup (Completed)

This phase removed developer, demo, and system-style wording from the key public marketing pages and replaced it with calmer, customer-facing salon copy in both Lithuanian and English. Shared CTA wording now follows the current branch-first direction, and placeholder text no longer leaks onto public cards when media is missing.

## Completed Phases

- Phase 0 - Foundation and repo bootstrap
- Phase 1 - Design system and UI foundation
- Phase 2 - Public shell and global layout
- Phase 2a - Homepage
- Phase 2b - Services
- Phase 2c - Booking flow and auth scaffolding
- Phase 3 - Branches
- Phase 3a - Gallery, About, Contact
- Phase 3b - Blog foundation
- Phase 3c - Core SEO implementation
- Phase 3.5 - Admin placeholder and product-copy cleanup
- Phase 4 - Supabase schema and content architecture
- Phase 4a - Admin auth and admin shell
- Phase 4b - Admin content modules I
- Phase 4c - Admin content modules II
- Phase 4d - Admin media upload UX
- Phase 5 - Localization system
- Phase 5a - Translation operations and bilingual QA
- Phase 5b - Localized SEO expansion
- Phase 5d - Public data wiring and route integrity
- Phase 4 (responsive) - Admin responsiveness and usability hardening
- Phase 5.5 - Public frontend editorial and copy cleanup

## In Progress

- No active implementation phase at the moment

## Next Planned Phase

Phase 6 - Performance optimization

## Current Public CMS State

These public surfaces are now fully CMS-backed with LT/EN fallback behavior where the schema supports it:

- homepage services, branches, specialists preview, gallery, testimonials, blog preview, and promotions
- services index and detail pages
- branches index and detail pages
- blog index and detail pages
- gallery index page
- contact page branch/contact blocks
- shared header/footer/settings-driven UI
- sitemap entries for services, branches, and blog posts

These surfaces are partially CMS-backed by design:

- about page: specialist/team section is CMS-backed, but the editorial brand-story framing remains code-authored

These surfaces remain intentionally static/editorial for now:

- homepage hero copy
- homepage why-choose-us/value framing
- homepage final CTA copy
- about page story/value/closing CTA copy

## Phase 5.5 Delivery Summary

Public editorial cleanup:

- homepage, services, branches, gallery, about, and contact pages were rewritten to sound customer-facing instead of implementation-facing
- LT and EN metadata on the touched index pages now describe the brand, services, branches, and contact journey without referencing admin/CMS behavior
- empty states on the touched public pages now read like polished customer-facing fallbacks instead of admin activation notices

Shared public language alignment:

- global header/mobile booking CTA wording now aligns to the branch-first direction (`Aplankyti filialą` / `Visit branch`)
- hero and page-level service-discovery CTAs now use service exploration wording instead of generic or inconsistent labels
- branch card fallback labels and public card media fallbacks were cleaned up so missing images do not show placeholder copy

## Phase 5d Delivery Summary

Route integrity and localization:

- service detail pages now resolve against real CMS slugs instead of mock data
- branch detail pages now resolve against real CMS slugs instead of mock data
- blog detail pages now resolve against real CMS slugs instead of mock data
- added the missing `/en/branches/[slug]` route
- language switching now maps translated route segments correctly instead of relying on naive `/en` prefix swapping
- EN pages use EN fields when present and safely fall back to LT when EN content is missing

Public CMS wiring:

- homepage sections now read real admin-managed content for services, branches, specialists, gallery, testimonials, blog previews, and promotions
- services, branches, blog, gallery, contact, and about/team pages now use shared public data helpers instead of seed/mock collections
- empty or missing content now hides sections safely instead of leaving broken cards or dead links

Settings and media:

- business name, logo, favicon, footer copy, contact info, and social links are now reflected publicly from site settings with defaults
- service and branch admin forms now support image uploads needed for public rendering
- public pages now render Cloudinary-hosted media correctly

Specialist route decision:

- there is still no public specialist detail route in V1
- specialist/team cards are intentionally non-clickable to avoid dead-end navigation until a dedicated IA and content model exist for specialist profiles

## Route Coverage

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
- `/en/branches/[slug]`
- `/en/gallery`
- `/en/about`
- `/en/blog`
- `/en/blog/[slug]`
- `/en/contact`

## Current Risks

- some premium editorial sections are still intentionally code-authored rather than admin-managed
- content quality on EN pages still depends on translation completeness in admin, even though runtime fallback is now safe
- specialist detail pages remain out of scope until product and IA requirements exist for them

## Post-Phase 5d UX Hardening

Mobile navigation overlay fix delivered:

- mobile navigation now renders through a viewport-level overlay instead of being visually constrained by the sticky header stacking context
- drawer/backdrop behavior now sits above page content and above the sticky mobile booking CTA
- opening the mobile menu now locks page scroll cleanly
- sticky mobile booking CTA now fades out and becomes non-interactive while the menu is open
- drawer spacing and safe-area padding were refined for small mobile screens
- language switcher and booking CTA are grouped inside a cleaner bottom action block in the drawer

## Notes for Next AI Session

Read these files first:

- `/docs/foundation/01-project-overview.md`
- `/docs/foundation/03-information-architecture.md`
- `/docs/foundation/04-content-model.md`
- `/docs/foundation/06-design-system.md`
- `/docs/status/12-decisions-log.md`

Do not reopen public CMS wiring unless a real regression is reported.
Phase 6 work should focus on performance, caching, media optimization, and rendering efficiency rather than more route or content architecture changes.
