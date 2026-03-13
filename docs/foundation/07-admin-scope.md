# Admin Scope

## Admin Model
V1 uses a single role:
- Super Admin

The salon owner is the only admin user in scope for V1.

## Admin Goals
- manage public website content
- update business information without developer help
- maintain services, branches, blog, and gallery
- review contact leads
- manage SEO metadata for content pages

## Admin Navigation
- Dashboard
- Branches
- Services
- Specialists
- Gallery
- Promotions
- Blog
- Testimonials
- Leads
- Settings

## Dashboard
Should show:
- total branches
- total services
- total blog posts
- total gallery items
- active promotions
- recent leads
- translation completeness warnings later
- draft/unpublished content reminders

Phase 4a baseline:
- protected dashboard shell
- summary totals or safe placeholders
- richer operational widgets can be added in later admin phases

## Branches Module
Super Admin can:
- create, edit, hide, and reorder branches
- update branch contact details
- update hours
- update map links
- update descriptions in LT/EN
- update booking URL
- update SEO metadata

## Services Module
Super Admin can:
- create, edit, publish, and unpublish services
- manage category
- manage descriptions in LT/EN
- manage starting price and duration
- assign service availability to branches
- manage FAQ content later if included
- manage SEO metadata

## Specialists Module
Super Admin can:
- create and edit specialist profiles
- assign branch
- manage role and bio in LT/EN
- upload photo
- mark active/inactive
- choose featured order

## Gallery Module
Super Admin can:
- upload or attach Cloudinary images
- assign gallery items to service/branch
- mark before/after if needed
- manage alt text LT/EN
- feature or hide items
- reorder visible items

## Promotions Module
Super Admin can:
- create promo entries
- assign to branch or service if needed
- set active dates
- manage CTA text and URL
- feature promotion on homepage

## Blog Module
Super Admin can:
- create/edit blog posts
- manage cover image
- manage LT/EN fields
- publish/unpublish
- manage category/tags
- manage SEO metadata

## Testimonials Module
Super Admin can:
- add testimonials
- mark visible/hidden
- feature on homepage
- assign to branch/service optionally

## Leads Module
Super Admin can:
- view contact submissions
- filter by status
- update status
- store internal notes

## SEO Controls
SEO controls are expected to live primarily inside each content type and in global Settings rather than as a dedicated sidebar module in V1.

Minimum SEO controls needed:
- title
- description
- OG image
- index visibility if needed

## Settings Module
Super Admin can:
- update business name
- update logo
- update favicon
- update social links
- update default contact details
- update footer text
- update default metadata
- update analytics ID when needed

## Security Rules
- admin area must be protected
- only authenticated superadmin can access admin
- no public exposure of admin data
- unpublished content must not leak to public pages

## Out of Scope for V1
- multiple roles
- permission matrix
- activity logs
- editorial workflow approvals
- staff scheduling
- payroll
- inventory
- CRM pipeline
