import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/navigation";
import {
  getActiveBranches,
  getLocalizedSlug,
  getPublishedBlogPosts,
  getPublishedServices,
} from "@/lib/public-data";
import { getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

function toSitemapEntry(path: string, lastModified: Date, priority: number) {
  return {
    url: new URL(path, siteConfig.siteUrl).toString(),
    lastModified,
    changeFrequency: (priority >= 0.8 ? "weekly" : "monthly") as "weekly" | "monthly",
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [services, branches, blogPosts] = await Promise.all([
    getPublishedServices(),
    getActiveBranches(),
    getPublishedBlogPosts(),
  ]);

  const staticRoutes = [
    toSitemapEntry(getLocalizedRoute("home", "lt"), now, 1),
    toSitemapEntry(getLocalizedRoute("services", "lt"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("branches", "lt"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("gallery", "lt"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("about", "lt"), now, 0.7),
    toSitemapEntry(getLocalizedRoute("contact", "lt"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("blog", "lt"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("home", "en"), now, 0.9),
    toSitemapEntry(getLocalizedRoute("services", "en"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("branches", "en"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("gallery", "en"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("about", "en"), now, 0.7),
    toSitemapEntry(getLocalizedRoute("contact", "en"), now, 0.8),
    toSitemapEntry(getLocalizedRoute("blog", "en"), now, 0.8),
  ];

  const serviceRoutes = services.flatMap((service) => [
    toSitemapEntry(
      getLocalizedDetailRoute("services", getLocalizedSlug(service, "lt"), "lt"),
      new Date(service.updated_at),
      0.7,
    ),
    toSitemapEntry(
      getLocalizedDetailRoute("services", getLocalizedSlug(service, "en"), "en"),
      new Date(service.updated_at),
      0.7,
    ),
  ]);

  const branchRoutes = branches.flatMap((branch) => [
    toSitemapEntry(
      getLocalizedDetailRoute("branches", getLocalizedSlug(branch, "lt"), "lt"),
      new Date(branch.updated_at),
      0.7,
    ),
    toSitemapEntry(
      getLocalizedDetailRoute("branches", getLocalizedSlug(branch, "en"), "en"),
      new Date(branch.updated_at),
      0.7,
    ),
  ]);

  const blogRoutes = blogPosts.flatMap((post) => [
    toSitemapEntry(
      getLocalizedDetailRoute("blog", getLocalizedSlug(post, "lt"), "lt"),
      new Date(post.updated_at),
      0.6,
    ),
    toSitemapEntry(
      getLocalizedDetailRoute("blog", getLocalizedSlug(post, "en"), "en"),
      new Date(post.updated_at),
      0.6,
    ),
  ]);

  return [...staticRoutes, ...serviceRoutes, ...branchRoutes, ...blogRoutes];
}
