"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { revalidateSpecialistPublicPaths } from "./revalidate-public";

type SpecialistInsert = Database["public"]["Tables"]["specialists"]["Insert"];
type SpecialistUpdate = Database["public"]["Tables"]["specialists"]["Update"];

export async function getSpecialists() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("specialists")
    .select("*, branches(name_lt)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch specialists: ${error.message}`);
  }

  return data;
}

export async function getSpecialist(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("specialists").select("*").eq("id", id).single();

  if (error) {
    throw new Error(`Failed to fetch specialist: ${error.message}`);
  }

  return data;
}

export async function createSpecialist(input: SpecialistInsert) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("specialists").insert(input).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/specialists");
  revalidateSpecialistPublicPaths(data);
  return { data };
}

export async function updateSpecialist(id: string, input: SpecialistUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("specialists")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/specialists");
  revalidateSpecialistPublicPaths(data);
  return { data };
}

export async function deleteSpecialist(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const existing = await getSpecialist(id);
  const { error } = await supabase.from("specialists").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/specialists");
  revalidateSpecialistPublicPaths(existing);
  return { success: true };
}
