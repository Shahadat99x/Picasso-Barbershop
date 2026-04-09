"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { revalidateGalleryPublicPaths } from "./revalidate-public";

type GalleryItemInsert = Database["public"]["Tables"]["gallery_items"]["Insert"];
type GalleryItemUpdate = Database["public"]["Tables"]["gallery_items"]["Update"];

export async function getGalleryItems() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch gallery items: ${error.message}`);
  }

  return data;
}

export async function getGalleryItem(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch gallery item: ${error.message}`);
  }

  return data;
}

export async function createGalleryItem(input: GalleryItemInsert) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("gallery_items").insert(input).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/gallery");
  revalidateGalleryPublicPaths();
  return { data };
}

export async function updateGalleryItem(id: string, input: GalleryItemUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/gallery");
  revalidateGalleryPublicPaths();
  return { data };
}

export async function deleteGalleryItem(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("gallery_items").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/gallery");
  revalidateGalleryPublicPaths();
  return { success: true };
}
