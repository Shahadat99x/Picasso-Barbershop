import React from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Locale, defaultLocale } from "@/i18n/locales";
import type { GalleryMosaicItem } from "@/lib/public-data";
import { cn } from "@/lib/utils";
import { getLocalizedRoute } from "@/lib/site-routes";

interface GallerySectionProps {
  items: GalleryMosaicItem[];
  locale?: Locale;
}

interface GalleryPreviewCardProps {
  item: GalleryMosaicItem;
  className?: string;
  imageClassName?: string;
  sizes: string;
}

function GalleryPreviewCard({
  item,
  className,
  imageClassName,
  sizes,
}: GalleryPreviewCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-sm shadow-black/5",
        className,
      )}
    >
      <div className={cn("relative h-full w-full", imageClassName)}>
        <OptimizedImage
          src={item.imageSrc}
          alt={item.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/24 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {item.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-medium tracking-tight md:text-[1.7rem]">
            {item.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-7 text-white/82">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function GallerySection({
  items,
  locale = defaultLocale,
}: GallerySectionProps) {
  const previewItems = items.slice(0, 3);
  const [leadItem, ...secondaryItems] = previewItems;

  if (!leadItem) {
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
          align="left"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-6">
          <GalleryPreviewCard
            item={leadItem}
            className="min-h-[22rem] lg:min-h-[36rem]"
            imageClassName="aspect-[4/5] lg:h-full"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />

          {secondaryItems.length > 0 ? (
            <div
              className={cn(
                "grid gap-4 lg:gap-6",
                secondaryItems.length > 1 && "md:grid-cols-2 lg:grid-cols-1",
              )}
            >
              {secondaryItems.map((item) => (
                <GalleryPreviewCard
                  key={item.id}
                  item={item}
                  className="min-h-[18rem]"
                  imageClassName="aspect-[4/5] md:aspect-[16/10]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 34vw"
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border/50 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            {locale === "en"
              ? "A tighter homepage edit keeps the first impression polished while the full gallery remains one step away."
              : "Trumpesne namu puslapio atranka leidzia islaikyti tvarkinga pirma ispudi, o visa galerija lieka vos vienu paspaudimu toliau."}
          </p>
          <SecondaryButton
            href={getLocalizedRoute("gallery", locale)}
            className="border-border/70 bg-background px-8"
            analyticsEvent="cta_click"
            analyticsParams={{
              cta_label:
                locale === "en" ? "Explore the full gallery" : "Ziureti visa galerija",
              placement: "homepage_gallery_preview",
            }}
          >
            {locale === "en" ? "Explore the full gallery" : "Ziureti visa galerija"}
          </SecondaryButton>
        </div>
      </Container>
    </Section>
  );
}
