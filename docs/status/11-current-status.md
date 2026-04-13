# Current Status

## Current Phase

Phase B - Scalable gallery preview cleanup (Completed on fix branch)

This fix-branch slice replaces brittle public gallery preview compositions with a scalable shared rail system. Homepage and detail-page gallery previews now keep a stable image-led rhythm as more items appear, with calmer overlays, intentional mobile scrolling, and a controlled continuation path into the full gallery.

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
- Phase F1 - Homepage UX fixes
- Phase F2 - Multi-city branch and service reality update
- Phase F3 - Blog reading experience and legal/trust pages

## In Progress

- No active implementation phase at the moment

## Next Planned Phase

Phase F4 - Launch-readiness QA and follow-on public polish

## Current Public CMS State

These public surfaces are now fully CMS-backed with LT/EN fallback behavior where the schema supports it:

- homepage services, branches, branch-aware specialists preview, curated gallery preview, testimonials, blog preview, and promotions
- services index and detail pages
- branches index and detail pages
- specialist detail pages
- blog index and detail pages
- gallery index page
- contact page branch/contact blocks
- shared header/footer/settings-driven UI
- sitemap entries for services, branches, specialists, and blog posts

These surfaces are partially CMS-backed by design:

- about page: specialist/team section is CMS-backed, but the editorial brand-story framing remains code-authored

These surfaces remain intentionally static/editorial for now:

- homepage hero copy
- homepage why-choose-us/value framing
- homepage final CTA copy
- about page story/value/closing CTA copy
- legal pages (privacy, terms, cookie policy)

## Phase 5.5 Delivery Summary

Public editorial cleanup:

- homepage, services, branches, gallery, about, and contact pages were rewritten to sound customer-facing instead of implementation-facing
- LT and EN metadata on the touched index pages now describe the brand, services, branches, and contact journey without referencing admin/CMS behavior
- empty states on the touched public pages now read like polished customer-facing fallbacks instead of admin activation notices

Shared public language alignment:

- global header/mobile booking CTA wording now aligns to the branch-first direction (`Aplankyti filialą` / `Visit branch`)
- hero and page-level service-discovery CTAs now use service exploration wording instead of generic or inconsistent labels
- branch card fallback labels and public card media fallbacks were cleaned up so missing images do not show placeholder copy

## Phase F1 Delivery Summary

Homepage team preview:

- homepage team preview no longer mixes specialists from all branches into one flat row
- users now switch branches through a pill-style selector
- specialist cards in the shared preview system now link directly to public specialist profiles
- each branch shows only a small curated preview, with a clear branch continuation CTA

## Phase A Delivery Summary

Shared team preview cleanup:

- homepage and About now use the same shared branch-filtered team preview component instead of separate treatments
- branch pills were reduced to a more elegant segmented-filter style and use shorter branch naming
- About now exposes the full relevant branch filter set instead of feeling limited to a flatter single-slice preview
- specialist cards keep the premium editorial layout but the full card is once again the primary click target
- team cards now show cleaner location metadata and fewer specialty chips to reduce lower-card noise
- mobile team previews use a compact horizontal rail so all three specialists stay accessible without oversized stacked cards

## Phase B Delivery Summary

Shared gallery preview cleanup:

- shared gallery previews now use a stable horizontal rail instead of a brittle exact-count mosaic composition
- homepage gallery preview now supports a richer 6-image preview without depending on a fixed 3-card arrangement
- branch and service detail gallery previews now inherit the same scalable rail system through the shared gallery layer
- gallery cards now use more consistent image ratios, lighter overlays, and less text density on supporting cards
- the shared gallery system now handles 3, 4, 5, 6+ images more gracefully by showing a controlled preview strip with an inline `+N more` continuation signal when needed

Homepage gallery preview:

- homepage gallery preview now renders as a curated 3-item composition
- desktop layout now favors an editorial lead image with two supporting frames instead of the older forced mosaic balance
- the gallery page itself was not redesigned as part of this phase

Homepage services preview and CTA cleanup:

- homepage services remain limited to 3 featured cards
- a clearer continuation CTA now points users to the full services index
- the touched homepage preview sections now use more consistent continuation rows, spacing rhythm, and section-level CTA treatment

## Phase F2 Delivery Summary

Branch reality update:

- public branch surfaces now represent the business as a multi-city network rather than a Vilnius-only set of locations
- Kaunas is treated as a first-class public branch in the branches index, branch detail routes, and branch availability surfaces
- shared branch cards now render the actual branch city instead of a hardcoded Vilnius label

Branches and services consistency:

- LT and EN branches index pages now use multi-city copy and stats instead of outdated Vilnius-only framing
- LT and EN services index pages now use more accurate city coverage framing and no longer imply Vilnius-only availability
- service and contact branch summary cards now surface the branch city more clearly where branch availability is already shown

Shared public continuity:

- homepage branch metadata and branch-preview copy were updated where needed for factual consistency
- shared default public descriptions, footer fallbacks, and local business schema coverage now align with a Vilnius-and-Kaunas public representation
- about page summary copy was minimally updated where it still implied a Vilnius-only branch footprint

## Phase F3 Delivery Summary

Blog article reading experience:

- blog article pages now render inside a tighter editorial reading column with a calmer premium content wrapper
- the shared article body renderer now supports inline strong text and inline links instead of showing markdown syntax as plain text
- plain-text or markdown-like article bodies are normalized into headings, paragraphs, lists, and quotes before rendering, which keeps admin-authored content readable without introducing a heavy rich-text dependency

Legal and trust surfaces:

- added LT and EN public Privacy Policy pages with localized metadata and alternate-language links
- added LT and EN public Terms pages with lightweight but real launch-ready terms copy
- added LT and EN public Cookie Policy pages that stay aligned with the project's limited analytics/cookie reality
- footer legal links now route through localized public paths instead of hardcoded non-localized URLs
- legal routes are now included in the public sitemap

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

Specialist route status:

- public specialist detail routes now exist in both LT and EN
- shared public team-preview cards link directly to those profiles instead of using non-clickable preview-only cards

## Route Coverage

### Lithuanian (LT) - Default

- `/`
- `/paslaugos`
- `/paslaugos/[slug]`
- `/filialai`
- `/filialai/[slug]`
- `/specialistai/[slug]`
- `/galerija`
- `/apie-mus`
- `/blogas`
- `/blogas/[slug]`
- `/kontaktai`
- `/privatumo-politika`
- `/taisykles`
- `/slapuku-politika`

### English (EN)

- `/en`
- `/en/services`
- `/en/services/[slug]`
- `/en/branches`
- `/en/branches/[slug]`
- `/en/specialists/[slug]`
- `/en/gallery`
- `/en/about`
- `/en/blog`
- `/en/blog/[slug]`
- `/en/contact`
- `/en/privacy-policy`
- `/en/terms`
- `/en/cookie-policy`

## Current Risks

- some premium editorial sections are still intentionally code-authored rather than admin-managed
- content quality on EN pages still depends on translation completeness in admin, even though runtime fallback is now safe
- homepage preview sections are intentionally curated, so requests to surface more inventory there should be treated as information architecture decisions rather than quick content changes
- some public narrative still depends on admin-entered branch content quality, so future city expansion should continue through branch data first and copy polish second
- legal documents are currently code-authored rather than CMS-managed, so future business/legal changes still require a code/content pass
- live browser QA for the shared team preview behavior is still worth repeating on preview after deploy, especially across touch devices and real content mixes

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
Phase F4 should build on the new public launch-quality trust surfaces without reopening F1-F3 unless a regression is found.
