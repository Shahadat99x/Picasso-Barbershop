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