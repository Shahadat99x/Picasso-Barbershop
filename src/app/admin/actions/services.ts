"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { revalidateServicePublicPaths } from "./revalidate-public";

type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];
type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"];

export async function getServices() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch services: ${error.message}`);
  }

  return data;
}

export async function getService(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("services").select("*").eq("id", id).single();

  if (error) {
    throw new Error(`Failed to fetch service: ${error.message}`);
  }

  return data;
}

export async function createService(input: ServiceInsert) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("services").insert(input).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/services");
  revalidateServicePublicPaths(data);
  return { data };
}

export async function updateService(id: string, input: ServiceUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("services")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/services");
  revalidateServicePublicPaths(data);
  return { data };
}

export async function deleteService(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const existing = await getService(id);
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/services");
  revalidateServicePublicPaths(existing);
  return { success: true };
}
