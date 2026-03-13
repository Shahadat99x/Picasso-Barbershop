begin;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

alter table public.branches
  add constraint branches_opening_hours_json_is_array check (jsonb_typeof(opening_hours_json) = 'array'),
  add constraint branches_trust_points_lt_is_array check (jsonb_typeof(trust_points_lt) = 'array'),
  add constraint branches_trust_points_en_is_array check (jsonb_typeof(trust_points_en) = 'array');

alter table public.services
  add constraint services_starting_price_non_negative check (starting_price is null or starting_price >= 0),
  add constraint services_duration_minutes_positive check (duration_minutes is null or duration_minutes > 0),
  add constraint services_benefits_lt_is_array check (jsonb_typeof(benefits_lt) = 'array'),
  add constraint services_benefits_en_is_array check (jsonb_typeof(benefits_en) = 'array'),
  add constraint services_faq_lt_is_array check (jsonb_typeof(faq_lt) = 'array'),
  add constraint services_faq_en_is_array check (jsonb_typeof(faq_en) = 'array');

alter table public.specialists
  add constraint specialists_years_experience_non_negative check (years_experience is null or years_experience >= 0),
  add constraint specialists_specialties_lt_is_array check (jsonb_typeof(specialties_lt) = 'array'),
  add constraint specialists_specialties_en_is_array check (jsonb_typeof(specialties_en) = 'array');

alter table public.gallery_items
  add constraint gallery_items_tags_lt_is_array check (jsonb_typeof(tags_lt) = 'array'),
  add constraint gallery_items_tags_en_is_array check (jsonb_typeof(tags_en) = 'array'),
  add constraint gallery_items_before_after_assets_check check (
    is_before_after = false
    or (before_image_url is not null and after_image_url is not null)
  );

alter table public.promotions
  add constraint promotions_schedule_order_check check (
    starts_at is null
    or ends_at is null
    or ends_at >= starts_at
  );

alter table public.blog_posts
  add constraint blog_posts_body_lt_is_array check (jsonb_typeof(body_lt) = 'array'),
  add constraint blog_posts_body_en_is_array check (jsonb_typeof(body_en) = 'array'),
  add constraint blog_posts_tags_json_is_array check (jsonb_typeof(tags_json) = 'array');

alter table public.testimonials
  add constraint testimonials_rating_range check (rating is null or rating between 1 and 5);

create index if not exists idx_branches_sort_order on public.branches(sort_order);
create index if not exists idx_branches_is_active on public.branches(is_active);

create index if not exists idx_services_category on public.services(category);
create index if not exists idx_services_is_published on public.services(is_published);
create index if not exists idx_services_sort_order on public.services(sort_order);

create index if not exists idx_service_branch_availability_branch_id on public.service_branch_availability(branch_id);
create index if not exists idx_service_branch_availability_service_id on public.service_branch_availability(service_id);

create index if not exists idx_specialists_branch_id on public.specialists(branch_id);
create index if not exists idx_specialists_is_active on public.specialists(is_active);
create index if not exists idx_specialists_sort_order on public.specialists(sort_order);

create index if not exists idx_gallery_items_branch_id on public.gallery_items(branch_id);
create index if not exists idx_gallery_items_service_id on public.gallery_items(service_id);
create index if not exists idx_gallery_items_specialist_id on public.gallery_items(specialist_id);
create index if not exists idx_gallery_items_is_visible on public.gallery_items(is_visible);
create index if not exists idx_gallery_items_sort_order on public.gallery_items(sort_order);

create index if not exists idx_promotions_branch_id on public.promotions(branch_id);
create index if not exists idx_promotions_service_id on public.promotions(service_id);
create index if not exists idx_promotions_is_active on public.promotions(is_active);
create index if not exists idx_promotions_sort_order on public.promotions(sort_order);

create index if not exists idx_blog_posts_category on public.blog_posts(category);
create index if not exists idx_blog_posts_is_published on public.blog_posts(is_published);
create index if not exists idx_blog_posts_published_at on public.blog_posts(published_at desc);
create index if not exists idx_blog_posts_related_branch_id on public.blog_posts(related_branch_id);
create index if not exists idx_blog_posts_related_service_id on public.blog_posts(related_service_id);

create index if not exists idx_testimonials_branch_id on public.testimonials(branch_id);
create index if not exists idx_testimonials_service_id on public.testimonials(service_id);
create index if not exists idx_testimonials_is_visible on public.testimonials(is_visible);
create index if not exists idx_testimonials_sort_order on public.testimonials(sort_order);

create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_created_at on public.leads(created_at desc);
create index if not exists idx_leads_preferred_branch_id on public.leads(preferred_branch_id);

drop trigger if exists set_branches_updated_at on public.branches;
create trigger set_branches_updated_at
before update on public.branches
for each row
execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();

drop trigger if exists set_service_branch_availability_updated_at on public.service_branch_availability;
create trigger set_service_branch_availability_updated_at
before update on public.service_branch_availability
for each row
execute function public.set_updated_at();

drop trigger if exists set_specialists_updated_at on public.specialists;
create trigger set_specialists_updated_at
before update on public.specialists
for each row
execute function public.set_updated_at();

drop trigger if exists set_gallery_items_updated_at on public.gallery_items;
create trigger set_gallery_items_updated_at
before update on public.gallery_items
for each row
execute function public.set_updated_at();

drop trigger if exists set_promotions_updated_at on public.promotions;
create trigger set_promotions_updated_at
before update on public.promotions
for each row
execute function public.set_updated_at();

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row
execute function public.set_updated_at();

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.branches enable row level security;
alter table public.services enable row level security;
alter table public.service_branch_availability enable row level security;
alter table public.specialists enable row level security;
alter table public.gallery_items enable row level security;
alter table public.promotions enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.leads enable row level security;
alter table public.site_settings enable row level security;

commit;
