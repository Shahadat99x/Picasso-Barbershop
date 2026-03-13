begin;

insert into public.site_settings (
  settings_key,
  business_name,
  default_phone,
  default_email,
  social_instagram,
  social_facebook,
  footer_text_lt,
  footer_text_en,
  default_meta_title_lt,
  default_meta_title_en,
  default_meta_description_lt,
  default_meta_description_en,
  theme_color
)
values (
  'default',
  'Picasso Barbershop',
  '+370 600 00000',
  'hello@picassobarbershop.lt',
  'https://instagram.com',
  'https://facebook.com',
  'Picasso Barbershop. Premium salon experience in Vilnius.',
  'Picasso Barbershop. Premium salon experience in Vilnius.',
  'Premium salon in Vilnius',
  'Premium salon in Vilnius',
  'Premium grooming, haircut, beard, and salon experiences across three Vilnius branches.',
  'Premium grooming, haircut, beard, and salon experiences across three Vilnius branches.',
  '#3B3C40'
)
on conflict (settings_key) do update
set
  business_name = excluded.business_name,
  default_phone = excluded.default_phone,
  default_email = excluded.default_email,
  social_instagram = excluded.social_instagram,
  social_facebook = excluded.social_facebook,
  footer_text_lt = excluded.footer_text_lt,
  footer_text_en = excluded.footer_text_en,
  default_meta_title_lt = excluded.default_meta_title_lt,
  default_meta_title_en = excluded.default_meta_title_en,
  default_meta_description_lt = excluded.default_meta_description_lt,
  default_meta_description_en = excluded.default_meta_description_en,
  theme_color = excluded.theme_color;

commit;
