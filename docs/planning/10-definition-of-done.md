# Definition of Done

## Purpose

This document defines the minimum completion standard for project phases and major deliverables.

A phase is not complete just because code exists. It must meet quality, UX, and implementation expectations.

## General Phase Completion Rules

A phase is done when:

- scope items are implemented
- the implementation matches documented decisions
- the UI is responsive
- no major broken flows remain
- lint/build status is acceptable
- the phase can be safely handed off to the next phase

## Public UI Completion Rules

For public pages and components:

- mobile layout is implemented
- desktop layout is implemented
- CTA behavior is clear
- visuals match premium direction
- content is readable
- no obvious broken spacing or layout issues
- image handling is appropriate
- loading state is acceptable if needed

## SEO Completion Rules

For SEO-relevant pages:

- title is defined
- meta description is defined
- heading hierarchy is reasonable
- internal links are present where relevant
- page is indexable or intentionally blocked
- no obvious duplicate metadata pattern remains
- images have alt text support

## Localization Completion Rules

For localization-related work:

- Lithuanian path is correct
- English structure is correct
- untranslated placeholders are documented if still expected
- mixed-language rendering is avoided
- switcher behavior is correct

## Admin Completion Rules

For admin modules:

- access is protected
- create works
- edit works
- view works
- delete/hide behavior is safe
- public visibility rules are respected
- draft/publish logic works if in scope

## Form Completion Rules

For contact/admin forms:

- validation exists
- errors are understandable
- mobile usage is acceptable
- success/failure behavior is clear

## Performance Completion Rules

At minimum:

- no obviously unoptimized hero media
- no unnecessary large client-only surfaces
- no severe layout shift issues
- images use proper responsive strategy

## Code Quality Rules

At minimum:

- no unnecessary dead code in phase deliverables
- no random inconsistent patterns
- no hardcoded secrets
- no major console errors
- files are named logically
- implementation remains maintainable

## Documentation Rules

A phase is only fully done when:

- `current-status.md` is updated
- decisions are added to `decisions-log.md` if needed
- backlog is updated if scope was deferred
- any major new architecture assumption is documented

## Required Verification

Before marking a phase complete:

- run app locally
- verify major routes
- verify mobile layout manually
- verify no obvious regressions to previous phase
- verify key interactions for that phase

## Minimum Acceptance Statement

A phase should only be marked complete if another AI session can continue work without confusion and without needing to rediscover what was built.
