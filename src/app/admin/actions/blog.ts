"use server";

import { revalidatePath } from "next/cache";

import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { revalidateBlogPublicPaths } from "./revalidate-public";

type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

export async function getBlogPosts() {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }

  return data;
}

export async function getBlogPost(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch blog post: ${error.message}`);
  }

  return data;
}

export async function createBlogPost(input: BlogPostInsert) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.from("blog_posts").insert(input).select().single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidateBlogPublicPaths();
  return { data };
}

export async function updateBlogPost(id: string, input: BlogPostUpdate) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidateBlogPublicPaths();
  return { data };
}

export async function deleteBlogPost(id: string) {
  await requireAuthenticatedAdminUser();
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidateBlogPublicPaths();
  return { success: true };
}
