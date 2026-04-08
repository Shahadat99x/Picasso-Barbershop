import { revalidatePath, revalidateTag } from "next/cache";

import { PUBLIC_CACHE_TAGS } from "@/lib/public-cache";
import type { Database } from "@/lib/supabase/types";
import { getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type BranchRow = Database["public"]["Tables"]["branches"]["Row"];
type SpecialistRow = Database["public"]["Tables"]["specialists"]["Row"];
type PromotionRow = Database["public"]["Tables"]["promotions"]["Row"];

function revalidatePublicPaths(paths: string[]) {
  [...new Set(paths)].forEach((path) => revalidatePath(path));
}

function revalidatePublicTags(tags: string[]) {
  [...new Set(tags)].forEach((tag) => revalidateTag(tag, "max"));
}

export function revalidateServicePublicPaths(service?: Pick<ServiceRow, "slug_lt" | "slug_en"> | null) {
  const paths = [
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
    getLocalizedRoute("services", "lt"),
    getLocalizedRoute("services", "en"),
    getLocalizedRoute("gallery", "lt"),
    getLocalizedRoute("gallery", "en"),
  ];

  if (service?.slug_lt) {
    paths.push(getLocalizedDetailRoute("services", service.slug_lt, "lt"));
  }

  if (service?.slug_en) {
    paths.push(getLocalizedDetailRoute("services", service.slug_en, "en"));
  }

  revalidatePublicPaths(paths);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.services]);
}

export function revalidateBranchPublicPaths(branch?: Pick<BranchRow, "slug_lt" | "slug_en"> | null) {
  const paths = [
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
    getLocalizedRoute("branches", "lt"),
    getLocalizedRoute("branches", "en"),
    getLocalizedRoute("contact", "lt"),
    getLocalizedRoute("contact", "en"),
    getLocalizedRoute("about", "lt"),
    getLocalizedRoute("about", "en"),
    getLocalizedRoute("gallery", "lt"),
    getLocalizedRoute("gallery", "en"),
  ];

  if (branch?.slug_lt) {
    paths.push(getLocalizedDetailRoute("branches", branch.slug_lt, "lt"));
  }

  if (branch?.slug_en) {
    paths.push(getLocalizedDetailRoute("branches", branch.slug_en, "en"));
  }

  revalidatePublicPaths(paths);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.branches]);
}

export function revalidateSpecialistPublicPaths(
  specialist?: Pick<SpecialistRow, "slug"> | null,
) {
  const paths = [
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
    getLocalizedRoute("about", "lt"),
    getLocalizedRoute("about", "en"),
  ];

  if (specialist?.slug) {
    paths.push(getLocalizedDetailRoute("specialists", specialist.slug, "lt"));
    paths.push(getLocalizedDetailRoute("specialists", specialist.slug, "en"));
  }

  revalidatePublicPaths(paths);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.specialists]);
}

export function revalidatePromotionPublicPaths(_promotion?: Pick<PromotionRow, "id"> | null) {
  void _promotion;
  revalidatePublicPaths([
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
  ]);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.promotions]);
}

export function revalidateBlogPublicPaths() {
  revalidatePublicPaths([
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
    getLocalizedRoute("blog", "lt"),
    getLocalizedRoute("blog", "en"),
  ]);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.blog]);
}

export function revalidateGalleryPublicPaths() {
  revalidatePublicPaths([
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
    getLocalizedRoute("gallery", "lt"),
    getLocalizedRoute("gallery", "en"),
  ]);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.gallery]);
}

export function revalidateSiteSettingsPublicPaths() {
  revalidatePublicPaths([
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
    getLocalizedRoute("about", "lt"),
    getLocalizedRoute("about", "en"),
    getLocalizedRoute("contact", "lt"),
    getLocalizedRoute("contact", "en"),
    "/",
    "/en",
  ]);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.siteSettings]);
}

export function revalidateTestimonialPublicPaths() {
  revalidatePublicPaths([
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
  ]);
  revalidatePublicTags([PUBLIC_CACHE_TAGS.testimonials]);
}
