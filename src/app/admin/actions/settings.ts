"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { revalidateSiteSettingsPublicPaths } from "./revalidate-public";

type SiteSettingsUpdate = Database["public"]["Tables"]["site_settings"]["Update"];

export async function getSiteSettings() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("settings_key", "default")
    .single();

  if (error) {
    // If no settings exist, return null - the form will handle creation
    return null;
  }

  return data;
}

export async function updateSiteSettings(input: SiteSettingsUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  // First check if settings exist
  const { data: existing } = await supabase
    .from("site_settings")
    .select("id")
    .eq("settings_key", "default")
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from("site_settings")
      .update(input)
      .eq("settings_key", "default")
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/settings");
    revalidateSiteSettingsPublicPaths();
    return { data };
  } else {
    // Create new settings
    const { data, error } = await supabase
      .from("site_settings")
      .insert({ ...input, settings_key: "default" })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/settings");
    revalidateSiteSettingsPublicPaths();
    return { data };
  }
}
