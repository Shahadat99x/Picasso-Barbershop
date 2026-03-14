"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import type { LeadStatus } from "@/lib/supabase/types";

type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];

export async function getLeads() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch leads: ${error.message}`);
  }

  return data;
}

export async function getLead(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch lead: ${error.message}`);
  }

  return data;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/leads");
  return { data };
}

export async function updateLeadNote(id: string, internal_note: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .update({ internal_note })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/leads");
  return { data };
}
