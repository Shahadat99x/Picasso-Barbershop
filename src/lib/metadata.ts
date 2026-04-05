import type { Metadata } from "next";

import { Locale, defaultLocale } from "@/i18n/locales";
import { siteConfig } from "@/config/navigation";
import { localizePath } from "@/lib/site-routes";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function getCanonicalUrl(path: string, locale: Locale = defaultLocale) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (/\.[a-z0-9]+$/i.test(path)) {
    return new URL(path, siteConfig.siteUrl).toString();
  }

  return new URL(localizePath(path, locale), siteConfig.siteUrl).toString();
}

/**
 * Get the alternate locale path for a given path
 */
export function getAlternateLocalePath(path: string, currentLocale: Locale): string {
  const alternateLocale: Locale = currentLocale === defaultLocale ? "en" : defaultLocale;
  return localizePath(path, alternateLocale);
}

/**
 * Generate hreflang alternates for a given path
 * Returns array of locale -> URL mappings for hreflang tags
 */
export function generateHreflangAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};

  alternates["lt"] = new URL(localizePath(path, "lt"), siteConfig.siteUrl).toString();
  alternates["x-default"] = alternates["lt"];
  alternates["en"] = new URL(localizePath(path, "en"), siteConfig.siteUrl).toString();

  return alternates;
}

interface LocalizedPageMetadataInput {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  alternatePath?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

/**
 * Create locale-aware page metadata with proper hreflang and canonical URLs
 */
export function createLocalizedPageMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  alternatePath,
  image,
  type = "website",
  noIndex = false,
}: LocalizedPageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const ogImage = image ?? siteConfig.defaultOgImage;
  const localizedPath = localizePath(path, locale);
  const ogLocale = locale === defaultLocale ? "lt_LT" : "en_US";
  const alternateLocale: Locale = locale === defaultLocale ? "en" : defaultLocale;
  const resolvedAlternatePath =
    alternatePath ?? getAlternateLocalePath(localizedPath, locale);
  const ltPath = locale === defaultLocale ? localizedPath : resolvedAlternatePath;
  const enPath = locale === "en" ? localizedPath : resolvedAlternatePath;
  const canonicalUrl = getCanonicalUrl(localizedPath, locale);
  const alternateUrl = getCanonicalUrl(resolvedAlternatePath, alternateLocale);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "lt": getCanonicalUrl(ltPath, "lt"),
        "en": getCanonicalUrl(enPath, "en"),
        "x-default": getCanonicalUrl(ltPath, "lt"),
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type,
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: ogLocale,
      alternateLocale: locale === defaultLocale ? "en_US" : "lt_LT",
      images: [
        {
          url: getCanonicalUrl(ogImage, locale),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [getCanonicalUrl(ogImage, locale)],
    },
    other: {
      "alternate-path": resolvedAlternatePath,
      "alternate-url": alternateUrl,
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const ogImage = image ?? siteConfig.defaultOgImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type,
      url: getCanonicalUrl(path),
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "lt_LT",
      images: [
        {
          url: getCanonicalUrl(ogImage),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [getCanonicalUrl(ogImage)],
    },
  };
}
