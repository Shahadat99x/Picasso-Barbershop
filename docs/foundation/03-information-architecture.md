# Information Architecture

## Public Site Navigation
Primary navigation:
- Home
- Services
- Branches
- Gallery
- About
- Blog
- Contact
- Book Now
- Language Switcher (LT / EN)

## Main Public Pages
### Core Pages
- Home
- Services index
- Service detail
- Branches index
- Branch detail
- Gallery
- About
- Blog index
- Blog article
- Contact

### Utility Pages
- 404
- Privacy Policy
- Terms if needed
- basic offline fallback page for future PWA phase

## Route Structure
Recommended route structure for V1:

### Lithuanian
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

### English
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

## Home Page Sections
- Hero
- Featured services
- Featured branches
- Why choose us
- Specialists preview
- Gallery preview
- Testimonials
- Promotions
- Latest blog posts
- Booking CTA
- Contact/map preview

## Services Section
### Services Index
Must include:
- service categories
- featured services
- service cards
- branch availability indicators
- CTA to booking

### Service Detail Page
Must include:
- title
- short description
- full description
- price or starting price
- duration
- branch availability
- gallery previews if relevant
- FAQ
- internal links
- booking CTA

## Branches Section
### Branches Index
Must include:
- all 3 branches
- short branch highlights
- branch cards
- branch CTA
- easy map access

### Branch Detail Page
Must include:
- branch title
- unique branch intro
- address
- phone
- email if used
- working hours
- map
- parking / transport info
- available services
- branch gallery
- branch-specific promotions
- booking CTA

## Gallery Section
Must support:
- visual grid
- filter by service
- filter by branch
- before/after tagging if used
- mobile-friendly layout

## About Page
Must include:
- business story
- brand tone
- trust-building content
- team / specialists preview
- why clients choose the salon

## Blog Section
### Blog Index
Must include:
- article cards
- categories/tags if helpful
- recent content
- search/filter optional later

### Blog Article Page
Must include:
- title
- cover image
- publish date
- article body
- internal links
- related posts
- CTA where appropriate

## Contact Page
Must include:
- contact form
- all branches
- phone
- email if used
- maps
- opening hours
- social links
- booking CTA

## Admin Information Architecture
Admin navigation:
- Dashboard
- Branches
- Services
- Specialists
- Gallery
- Promotions
- Blog
- Testimonials
- Leads
- SEO
- Settings

## Relationship Notes
- branch pages connect to services, promotions, specialists, and gallery
- service pages connect to branches, gallery, and FAQ
- blog can connect to branch or service topics
- homepage pulls featured items from multiple sections

## IA Rules
- do not overload navigation
- keep CTA visible on mobile
- keep language switching simple
- prioritize user booking path
- prioritize local SEO path
- keep internal linking natural and useful