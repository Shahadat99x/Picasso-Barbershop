import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog";
import { mockBranches } from "@/data/branches";
import { mockServices } from "@/data/services";
import { siteConfig } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/paslaugos",
    "/filialai",
    "/galerija",
    "/apie-mus",
    "/kontaktai",
    "/blogas",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path, siteConfig.siteUrl).toString(),
      lastModified: now,
      changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : 0.8,
    })),
    ...mockServices.map((service) => ({
      url: new URL(`/paslaugos/${service.slug}`, siteConfig.siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...mockBranches.map((branch) => ({
      url: new URL(`/filialai/${branch.slug}`, siteConfig.siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: new URL(`/blogas/${post.slug}`, siteConfig.siteUrl).toString(),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
