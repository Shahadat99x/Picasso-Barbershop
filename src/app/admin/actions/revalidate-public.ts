import { revalidatePath } from "next/cache";

import type { Database } from "@/lib/supabase/types";
import { getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type BranchRow = Database["public"]["Tables"]["branches"]["Row"];
type SpecialistRow = Database["public"]["Tables"]["specialists"]["Row"];
type PromotionRow = Database["public"]["Tables"]["promotions"]["Row"];

function revalidatePublicPaths(paths: string[]) {
  [...new Set(paths)].forEach((path) => revalidatePath(path));
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
}

export function revalidatePromotionPublicPaths(_promotion?: Pick<PromotionRow, "id"> | null) {
  void _promotion;
  revalidatePublicPaths([
    getLocalizedRoute("home", "lt"),
    getLocalizedRoute("home", "en"),
  ]);
}
