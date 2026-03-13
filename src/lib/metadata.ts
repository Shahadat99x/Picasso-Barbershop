import type { Metadata } from "next";

import { siteConfig } from "@/config/navigation";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function getCanonicalUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
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
