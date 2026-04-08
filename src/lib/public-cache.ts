export const PUBLIC_CACHE_REVALIDATE_SECONDS = 300;

export const PUBLIC_CACHE_TAGS = {
  siteSettings: "public:site-settings",
  services: "public:services",
  branches: "public:branches",
  specialists: "public:specialists",
  gallery: "public:gallery",
  testimonials: "public:testimonials",
  blog: "public:blog",
  promotions: "public:promotions",
} as const;

export const ALL_PUBLIC_CACHE_TAGS = Object.values(PUBLIC_CACHE_TAGS);
