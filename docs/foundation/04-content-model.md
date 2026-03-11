# Content Model

## Principles
- Lithuanian is the primary content language
- English is the secondary content language
- bilingual fields should be stored in the same entity where possible
- content should support SEO fields
- content should support publish state
- content should support ordering when needed

## Common Field Patterns
Use these patterns where relevant:
- `title_lt`
- `title_en`
- `slug_lt`
- `slug_en` or shared slug strategy where appropriate
- `excerpt_lt`
- `excerpt_en`
- `description_lt`
- `description_en`
- `meta_title_lt`
- `meta_title_en`
- `meta_description_lt`
- `meta_description_en`
- `og_image_url`
- `is_published`
- `sort_order`
- `created_at`
- `updated_at`

## Entity: Branches
Purpose:
Represents a physical salon branch in Vilnius.

Suggested fields:
- id
- name_lt
- name_en
- slug_lt
- slug_en
- short_description_lt
- short_description_en
- full_description_lt
- full_description_en
- address_lt
- address_en
- city
- postal_code
- phone
- email
- map_url
- latitude
- longitude
- parking_info_lt
- parking_info_en
- transport_info_lt
- transport_info_en
- cover_image_url
- gallery_preview_image_url
- booking_url
- opening_hours_json
- is_active
- sort_order
- meta_title_lt
- meta_title_en
- meta_description_lt
- meta_description_en
- og_image_url
- created_at
- updated_at

## Entity: Services
Purpose:
Represents a salon service.

Suggested fields:
- id
- title_lt
- title_en
- slug_lt
- slug_en
- short_description_lt
- short_description_en
- full_description_lt
- full_description_en
- category
- starting_price
- price_note_lt
- price_note_en
- duration_minutes
- cover_image_url
- is_featured
- is_published
- sort_order
- meta_title_lt
- meta_title_en
- meta_description_lt
- meta_description_en
- og_image_url
- created_at
- updated_at

## Entity: ServiceBranchAvailability
Purpose:
Maps which branches offer which services.

Suggested fields:
- id
- service_id
- branch_id
- is_available
- branch_specific_price_note_lt
- branch_specific_price_note_en
- created_at
- updated_at

## Entity: Specialists
Purpose:
Represents team members / specialists.

Suggested fields:
- id
- full_name
- role_lt
- role_en
- bio_lt
- bio_en
- photo_url
- years_experience
- specialties_lt
- specialties_en
- branch_id
- is_featured
- is_active
- sort_order
- created_at
- updated_at

## Entity: GalleryItems
Purpose:
Represents visual work shown in gallery.

Suggested fields:
- id
- title_lt
- title_en
- alt_text_lt
- alt_text_en
- image_url
- image_public_id
- service_id
- branch_id
- specialist_id optional
- is_before_after
- before_image_url optional
- after_image_url optional
- is_featured
- is_visible
- sort_order
- created_at
- updated_at

## Entity: Promotions
Purpose:
Represents special offers and campaigns.

Suggested fields:
- id
- title_lt
- title_en
- description_lt
- description_en
- banner_image_url
- discount_label_lt
- discount_label_en
- cta_text_lt
- cta_text_en
- cta_url
- branch_id nullable
- service_id nullable
- starts_at
- ends_at
- is_featured
- is_active
- sort_order
- meta_title_lt optional
- meta_title_en optional
- meta_description_lt optional
- meta_description_en optional
- created_at
- updated_at

## Entity: BlogPosts
Purpose:
Represents blog articles.

Suggested fields:
- id
- title_lt
- title_en
- slug_lt
- slug_en
- excerpt_lt
- excerpt_en
- body_lt
- body_en
- cover_image_url
- author_name
- category
- tags_json
- related_branch_id optional
- related_service_id optional
- published_at
- is_published
- meta_title_lt
- meta_title_en
- meta_description_lt
- meta_description_en
- og_image_url
- created_at
- updated_at

## Entity: Testimonials
Purpose:
Represents customer testimonials.

Suggested fields:
- id
- customer_name
- quote_lt
- quote_en
- rating optional
- branch_id optional
- service_id optional
- is_featured
- is_visible
- sort_order
- created_at
- updated_at

## Entity: Leads
Purpose:
Represents contact form submissions or inquiries.

Suggested fields:
- id
- full_name
- phone
- email
- preferred_branch_id optional
- message
- source_page
- status
- internal_note
- created_at
- updated_at

Suggested statuses:
- new
- in_progress
- answered
- closed

## Entity: SiteSettings
Purpose:
Represents global site settings.

Suggested fields:
- id
- business_name
- default_phone
- default_email
- logo_url
- favicon_url
- social_instagram
- social_facebook
- social_tiktok optional
- footer_text_lt
- footer_text_en
- default_meta_title_lt
- default_meta_title_en
- default_meta_description_lt
- default_meta_description_en
- analytics_ga4_id optional
- theme_color
- updated_at

## Optional Entity: SeoOverrides
Purpose:
Used only if page-level SEO overrides become complex.

Not required for initial implementation if metadata is stored directly in each content type.

## Publishing Rules
For public content:
- unpublished content must not appear publicly
- drafts must be visible only in admin
- content ordering should be controlled with `sort_order` where needed

## Localization Rules
- Lithuanian fields are required wherever public content is required
- English fields can initially be optional during build
- missing English should be clearly visible in admin for later completion

## Slug Rules
- slugs must be unique within their locale scope
- service pages and branch pages must not collide
- keep slugs human-readable and SEO-friendly