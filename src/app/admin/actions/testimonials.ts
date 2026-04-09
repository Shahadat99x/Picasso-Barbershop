"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { revalidateTestimonialPublicPaths } from "./revalidate-public";

type TestimonialInsert = Database["public"]["Tables"]["testimonials"]["Insert"];
type TestimonialUpdate = Database["public"]["Tables"]["testimonials"]["Update"];

export async function getTestimonials() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch testimonials: ${error.message}`);
  }

  return data;
}

export async function getTestimonial(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch testimonial: ${error.message}`);
  }

  return data;
}

export async function createTestimonial(input: TestimonialInsert) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("testimonials").insert(input).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/testimonials");
  revalidateTestimonialPublicPaths();
  return { data };
}

export async function updateTestimonial(id: string, input: TestimonialUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("testimonials")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/testimonials");
  revalidateTestimonialPublicPaths();
  return { data };
}

export async function deleteTestimonial(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/testimonials");
  revalidateTestimonialPublicPaths();
  return { success: true };
}
