"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { revalidateBranchPublicPaths } from "./revalidate-public";

type BranchInsert = Database["public"]["Tables"]["branches"]["Insert"];
type BranchUpdate = Database["public"]["Tables"]["branches"]["Update"];

export async function getBranches() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch branches: ${error.message}`);
  }

  return data;
}

export async function getBranch(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("branches").select("*").eq("id", id).single();

  if (error) {
    throw new Error(`Failed to fetch branch: ${error.message}`);
  }

  return data;
}

export async function createBranch(input: BranchInsert) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("branches").insert(input).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/branches");
  revalidateBranchPublicPaths(data);
  return { data };
}

export async function updateBranch(id: string, input: BranchUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("branches")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/branches");
  revalidateBranchPublicPaths(data);
  return { data };
}

export async function deleteBranch(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const existing = await getBranch(id);
  const { error } = await supabase.from("branches").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/branches");
  revalidateBranchPublicPaths(existing);
  return { success: true };
}
