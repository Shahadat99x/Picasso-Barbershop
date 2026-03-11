# Project Overview

## Project Name
Vilnius Salon Web App

## Summary
A premium bilingual salon website and lightweight admin-managed web app for a Vilnius-based salon business with 3 branches.

The primary goal is to build a high-conversion, mobile-first, SEO-optimized public website with a strong visual frontend and a simple Super Admin dashboard for managing content.

## Business Context
The salon operates in Vilnius and currently has 3 branches. The website should support Lithuanian as the primary language and English as the secondary language.

The product should help the business:
- attract new local customers
- improve search visibility in Vilnius
- showcase services, specialists, and gallery work
- make booking easier
- manage content without developer involvement for day-to-day updates

## Primary Goals
- premium frontend quality
- excellent mobile responsiveness
- strong local SEO
- bilingual support (LT primary, EN secondary)
- easy content management via Super Admin
- fast performance and modern UX
- deploy on Vercel

## Non-Goals for V1
- advanced CRM
- payroll/staff attendance
- inventory management
- complex loyalty system
- full custom booking engine with calendar logic
- multi-role enterprise admin

## Target Users
### External Users
- local Lithuanian customers
- English-speaking residents in Vilnius
- returning salon clients
- mobile-first visitors
- users searching for branch-specific or service-specific salon options

### Internal Users
- salon owner as Super Admin

## Core Public Features
- Home page
- Services listing and service detail pages
- Branches listing and branch detail pages
- Gallery
- About page
- Blog
- Contact page
- Booking CTA flow
- bilingual language switcher
- strong local SEO structure

## Core Admin Features
- manage branches
- manage services
- manage specialists
- manage gallery items
- manage promotions
- manage blog posts
- manage testimonials
- manage contact leads
- manage SEO metadata
- manage global settings

## Language Strategy
- Primary language: Lithuanian
- Secondary language: English
- Lithuanian is the default content and default UX path
- English content must be supported structurally from the start

## Booking Strategy
V1 should use a simple booking approach:
- branch-specific booking links
- service pages linking to booking
- strong CTA placement
- fallback contact CTA

A full custom booking system is out of scope for V1 unless business requirements change.

## Media Strategy
- Cloudinary is the source of truth for public media assets
- optimized responsive images are required
- gallery, branch cover images, service images, and blog cover images should all support Cloudinary delivery

## SEO Strategy Summary
The website must be designed around:
- service-specific pages
- branch-specific pages
- localized metadata
- bilingual SEO support
- sitemap and robots
- structured data
- fast mobile performance
- clean internal linking

## PWA Strategy
V1 should plan for basic PWA support:
- installable website
- manifest
- app icons
- standalone mobile experience

Advanced offline support and push notifications are not required in V1.

## Success Criteria
The project is successful when:
- the public site looks premium on mobile and desktop
- all major pages are implemented and responsive
- Lithuanian is fully supported as primary language
- English structure is supported and ready
- admin can manage core content
- SEO foundations are complete
- the site is deployed cleanly on Vercel