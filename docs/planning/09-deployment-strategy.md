# Deployment Strategy

## Deployment Platform
Primary hosting platform:
- Vercel

## Goals
- clean production deployment
- repeatable preview deployments
- stable environment variable handling
- simple rollback path
- smooth Next.js hosting workflow

## Environments
Recommended environments:
- local
- preview
- production

## Environment Variables
All required environment variables must be documented in `.env.example`.

Expected categories:
- Supabase URL and keys
- Cloudinary credentials
- analytics IDs
- optional booking/config variables
- admin auth related variables if needed

Rules:
- never hardcode secrets
- keep variable names consistent across environments
- production values only in platform secret storage

## Supabase Deployment Notes
- create production project or production-ready setup
- verify tables and RLS policies if used
- verify auth redirect configuration
- verify admin access rules
- verify content access rules

## Cloudinary Deployment Notes
- production cloud name configured
- image transformation strategy validated
- upload flow or image reference flow validated
- responsive image delivery tested

## Vercel Notes
- connect repository
- configure preview and production settings
- add environment variables
- verify domain and SSL
- verify build command and output are standard

## Domain Strategy
Production domain should:
- support HTTPS
- support canonical strategy
- support language route structure
- be verified in Search Console after launch

## Pre-Deployment Checklist
- lint passes or known issues documented
- build passes
- no major console errors
- all critical routes load
- public metadata is present
- admin authentication works
- image delivery works
- contact form works
- booking links work
- mobile layout checked

## Post-Deployment Checklist
- test homepage
- test service pages
- test branch pages
- test blog
- test admin login
- test admin CRUD basics
- test language switching
- test sitemap
- test robots
- test canonical output
- test contact submission
- test production images

## Rollback Philosophy
Keep changes phased and incremental.
Avoid merging major unfinished work.
Prefer small deployable slices.

## Build Discipline
Before production deploy:
- ensure current phase is complete
- avoid shipping half-wired content models
- validate env vars
- verify no accidental draft content leaks