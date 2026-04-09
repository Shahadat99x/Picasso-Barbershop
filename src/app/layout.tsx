import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { siteConfig } from "@/config/navigation";
import { getSiteSettingsWithDefaults } from "@/lib/public-data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsWithDefaults();
  const defaultTitle = settings.default_meta_title_lt || siteConfig.name;
  const defaultDescription =
    settings.default_meta_description_lt || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${settings.business_name}`,
    },
    description: defaultDescription,
    applicationName: settings.business_name,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "lt_LT",
      url: siteConfig.siteUrl,
      siteName: settings.business_name,
      title: settings.business_name,
      description: defaultDescription,
      images: [{ url: siteConfig.defaultOgImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.business_name,
      description: defaultDescription,
      images: [siteConfig.defaultOgImage],
    },
    icons: settings.favicon_url
      ? {
          icon: settings.favicon_url,
          shortcut: settings.favicon_url,
          apple: settings.favicon_url,
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
