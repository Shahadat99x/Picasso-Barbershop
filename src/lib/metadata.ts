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
  image,
  type = "website",
  noIndex = false,
}: LocalizedPageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const ogImage = image ?? siteConfig.defaultOgImage;
  const canonicalUrl = getCanonicalUrl(path, locale);
  const hreflangAlternates = generateHreflangAlternates(path);
  
  // Determine OpenGraph locale
  const ogLocale = locale === defaultLocale ? "lt_LT" : "en_US";
  const alternateLocale: Locale = locale === defaultLocale ? "en" : defaultLocale;
  const alternatePath = getAlternateLocalePath(path, locale);
  const alternateUrl = getCanonicalUrl(alternatePath, alternateLocale);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "lt": hreflangAlternates["lt"],
        "en": hreflangAlternates["en"],
        "x-default": hreflangAlternates["x-default"],
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
