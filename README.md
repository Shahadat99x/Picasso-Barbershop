# Picasso Barbershop Website & Admin Platform

Production website and content-admin platform for **Picasso Barbershop (Vilnius)**.

- Live domain: **https://picassobarber.lt**
- Locale strategy: **LT (default)** and **EN**
- Maintained end-to-end: system design, frontend, backend/content layer, and deployment

## Project Overview

This repository contains a real-world Next.js application powering:

- A premium, mobile-first public marketing website
- A bilingual content experience (Lithuanian + English)
- An admin dashboard for managing business content
- SEO-focused route architecture for local discoverability

## Core Features

### Public Site
- Home, Services, Branches, Gallery, About, Blog, Contact
- Dynamic service, branch, and blog detail pages
- Strong CTA/booking flow and mobile-first UX
- Localized route structure for LT and EN
- SEO metadata, sitemap, and robots handling

### Admin
- Secure admin login and protected routes
- CRUD modules for branches, services, specialists, gallery, blog, promotions, testimonials, leads, and settings
- Content-driven public rendering through Supabase-backed data

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling/UI:** Tailwind CSS + shadcn/ui
- **Backend/Data:** Supabase
- **Media:** Cloudinary
- **Hosting/Deploy:** Vercel

## Route Structure (Public)

### Lithuanian (default)
- `/`
- `/paslaugos`, `/paslaugos/[slug]`
- `/filialai`, `/filialai/[slug]`
- `/galerija`
- `/apie-mus`
- `/blogas`, `/blogas/[slug]`
- `/kontaktai`

### English
- `/en`
- `/en/services`, `/en/services/[slug]`
- `/en/branches`, `/en/branches/[slug]`
- `/en/gallery`
- `/en/about`
- `/en/blog`, `/en/blog/[slug]`
- `/en/contact`

## Local Development

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Copy `.env.example` to `.env.local` and set values:

```bash
cp .env.example .env.local
```

Required categories:
- App URL
- Supabase credentials
- Cloudinary cloud name

### 3) Run development server
```bash
npm run dev
```

Open: `http://localhost:3000`

## Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Deployment

Primary deployment target is **Vercel**.

High-level flow:
- connect repository to Vercel
- configure environment variables
- set production domain and SSL
- validate public routes, admin auth, media delivery, and SEO endpoints

## Documentation

Detailed project planning and architecture docs are available in:

- `/docs/foundation`
- `/docs/planning`
- `/docs/status`

Recommended starting points:
- `/docs/foundation/01-project-overview.md`
- `/docs/foundation/02-tech-stack.md`
- `/docs/planning/09-deployment-strategy.md`
