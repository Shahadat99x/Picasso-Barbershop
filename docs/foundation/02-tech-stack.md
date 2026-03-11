# Tech Stack

## Core Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vercel
- Cloudinary
- Supabase

## Frontend
### Framework
Next.js App Router is the primary web framework.

Reasons:
- strong SEO support
- good metadata patterns
- good routing architecture
- excellent Vercel deployment compatibility
- suitable for hybrid static and dynamic content

### Language
TypeScript is required.

### Styling
Tailwind CSS is required for utility-first styling and consistency.

### UI Components
shadcn/ui is the preferred component base.

Rules:
- keep components clean and reusable
- avoid unnecessary heavy UI libraries
- do not mix inconsistent component systems

### Animation
Use subtle animation only.
Preferred:
- Framer Motion only where it adds real UX value
- minimal motion for premium feel
- do not over-animate the public site

## Backend / Content Layer
### Database and CMS
Supabase will be used for:
- content entities
- admin auth
- admin CRUD
- blog data
- gallery metadata
- branch and service content
- lead storage if needed

Supabase will not be used for a full advanced booking engine in V1.

## Media
### Cloudinary
Cloudinary is the source of truth for:
- service images
- gallery images
- branch images
- blog cover images
- other editorial media

Rules:
- responsive media delivery
- compressed image transforms
- appropriate alt text management
- mobile performance priority

## Hosting / Deployment
### Vercel
Vercel is the hosting platform.

Reasons:
- native Next.js support
- preview deployments
- easy environment variable management
- fast iteration

## Forms / Leads
Use server actions or route handlers where appropriate.
Contact submissions may be stored in Supabase.

## Localization
Localization should be supported structurally from the beginning.
Lithuanian is the default locale.
English is the secondary locale.

## PWA
Basic PWA support is planned:
- manifest
- icons
- installability
- standalone mode

Advanced offline-first architecture is not required for V1.

## Analytics
Planned analytics:
- GA4
- Search Console
- CTA click tracking
- booking CTA events
- contact form submissions

## Tooling
- ESLint
- Prettier
- environment variable discipline
- clean `.env.example`
- lint/build checks before completion of major phases

## Package Philosophy
Preferred:
- stable, common, well-supported packages
- minimum necessary dependencies
- avoid overengineering
- avoid adding packages without strong reason

## Do Not Introduce Without Review
- heavy state management libraries
- multiple CSS systems
- complex CMS frameworks
- advanced booking engines
- experimental architecture changes

## Architecture Principles
- mobile-first
- SEO-first public page design
- reusable content model
- admin as content management tool, not as product center
- premium UX with simple maintainable implementation