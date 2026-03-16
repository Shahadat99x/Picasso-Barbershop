import React from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { GalleryMosaic } from "@/components/shared/GalleryMosaic";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Locale, defaultLocale } from "@/i18n/locales";
import type { GalleryMosaicItem } from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

interface GallerySectionProps {
  items: GalleryMosaicItem[];
  locale?: Locale;
}

export function GallerySection({
  items,
  locale = defaultLocale,
}: GallerySectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section id="gallery" className="bg-background">
      <Container>
        <SectionHeading
          title={locale === "en" ? "Inside the salon" : "Salono akimirkos"}
          subtitle={locale === "en" ? "Gallery" : "Galerija"}
          description={
            locale === "en"
              ? "A curated look inside the atmosphere, finish quality, and real in-salon moments behind the chair."
              : "Atrinktas zvilgsnis i atmosfera, rezultato kokybe ir tikras salono akimirkas prie kedes."
          }
          align="center"
        />

        <GalleryMosaic items={items} className="mt-12" />

        <div className="mt-10 text-center">
          <Link href={getLocalizedRoute("gallery", locale)}>
            <SecondaryButton className="border-border/70 bg-background px-8">
              {locale === "en" ? "Explore the full gallery" : "Ziureti visa galerija"}
            </SecondaryButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
