import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog";
import { mockBranches } from "@/data/branches";
import { mockServices } from "@/data/services";
import { siteConfig } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  
  // LT static routes (default)
  const ltStaticRoutes = [
    "/",
    "/paslaugos",
    "/filialai",
    "/galerija",
    "/apie-mus",
    "/kontaktai",
    "/blogas",
  ];

  // EN static routes
  const enStaticRoutes = [
    "/en",
    "/en/services",
    "/en/branches",
    "/en/gallery",
    "/en/about",
    "/en/contact",
    "/en/blog",
  ];

  // Generate LT dynamic routes
  const ltServiceRoutes = mockServices.map((service) => ({
    url: new URL(`/paslaugos/${service.slug}`, siteConfig.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const ltBranchRoutes = mockBranches.map((branch) => ({
    url: new URL(`/filialai/${branch.slug}`, siteConfig.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const ltBlogRoutes = blogPosts.map((post) => ({
    url: new URL(`/blogas/${post.slug}`, siteConfig.siteUrl).toString(),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Generate EN dynamic routes
  const enServiceRoutes = mockServices.map((service) => ({
    url: new URL(`/en/services/${service.slug}`, siteConfig.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const enBranchRoutes = mockBranches.map((branch) => ({
    url: new URL(`/en/branches/${branch.slug}`, siteConfig.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const enBlogRoutes = blogPosts.map((post) => ({
    url: new URL(`/en/blog/${post.slug}`, siteConfig.siteUrl).toString(),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Combine all routes
  return [
    // LT static routes
    ...ltStaticRoutes.map((path) => ({
      url: new URL(path, siteConfig.siteUrl).toString(),
      lastModified: now,
      changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : 0.8,
    })),
    // EN static routes
    ...enStaticRoutes.map((path) => ({
      url: new URL(path, siteConfig.siteUrl).toString(),
      lastModified: now,
      changeFrequency: (path === "/en" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/en" ? 1 : 0.8,
    })),
    // LT dynamic routes
    ...ltServiceRoutes,
    ...ltBranchRoutes,
    ...ltBlogRoutes,
    // EN dynamic routes
    ...enServiceRoutes,
    ...enBranchRoutes,
    ...enBlogRoutes,
  ];
}
