/**
 * Public data access layer for bilingual content
 * These functions fetch from Supabase without requiring admin authentication
 * They use the anon key and are suitable for public site usage
 */

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Get all active branches
 */
export async function getPublicBranches() {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching branches:", error);
    return [];
  }

  return data || [];
}

/**
 * Get a single branch by ID
 */
export async function getPublicBranch(id: string) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching branch:", error);
    return null;
  }

  return data;
}

/**
 * Get a single branch by slug
 */
export async function getPublicBranchBySlug(slugLt: string) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("slug_lt", slugLt)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching branch by slug:", error);
    return null;
  }

  return data;
}

/**
 * Get all published services
 */
export async function getPublicServices() {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data || [];
}

/**
 * Get a single service by ID
 */
export async function getPublicService(id: string) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching service:", error);
    return null;
  }

  return data;
}

/**
 * Get a single service by slug
 */
export async function getPublicServiceBySlug(slugLt: string) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug_lt", slugLt)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }

  return data;
}

/**
 * Get featured services
 */
export async function getFeaturedServices(limit = 6) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured services:", error);
    return [];
  }

  return data || [];
}

/**
 * Get visible gallery items
 */
export async function getPublicGalleryItems() {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }

  return data || [];
}

/**
 * Get featured gallery items
 */
export async function getFeaturedGalleryItems(limit = 6) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("is_visible", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured gallery items:", error);
    return [];
  }

  return data || [];
}

/**
 * Get published blog posts
 */
export async function getPublicBlogPosts() {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data || [];
}

/**
 * Get a single blog post by ID
 */
export async function getPublicBlogPost(id: string) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}

/**
 * Get a single blog post by slug
 */
export async function getPublicBlogPostBySlug(slugLt: string) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug_lt", slugLt)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }

  return data;
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(limit = 3) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }

  return data || [];
}

/**
 * Get visible testimonials
 */
export async function getPublicTestimonials() {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return data || [];
}

/**
 * Get featured testimonials
 */
export async function getFeaturedTestimonials(limit = 3) {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_visible", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured testimonials:", error);
    return [];
  }

  return data || [];
}

/**
 * Get active promotions
 */
export async function getPublicPromotions() {
  const supabase = createSupabaseServerClient();
  
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching promotions:", error);
    return [];
  }

  return data || [];
}

/**
 * Get featured promotions
 */
export async function getFeaturedPromotions(limit = 3) {
  const supabase = createSupabaseServerClient();
  
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured promotions:", error);
    return [];
  }

  return data || [];
}

/**
 * Get settings
 */
export async function getPublicSettings() {
  const supabase = createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching settings:", error);
    return null;
  }

  return data;
}
