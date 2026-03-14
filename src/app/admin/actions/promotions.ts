"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type PromotionInsert = Database["public"]["Tables"]["promotions"]["Insert"];
type PromotionUpdate = Database["public"]["Tables"]["promotions"]["Update"];

export async function getPromotions() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch promotions: ${error.message}`);
  }

  return data;
}

export async function getPromotion(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch promotion: ${error.message}`);
  }

  return data;
}

export async function createPromotion(input: PromotionInsert) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("promotions").insert(input).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/promotions");
  return { data };
}

export async function updatePromotion(id: string, input: PromotionUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("promotions")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/promotions");
  return { data };
}

export async function deletePromotion(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("promotions").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/promotions");
  return { success: true };
}
