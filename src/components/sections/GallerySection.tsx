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
  variant?: "home" | "supporting";
  analyticsPlacement?: string;
  maxVisibleItems?: number;
}

interface GalleryPreviewCardProps {
  item: GalleryMosaicItem;
  className?: string;
  sizes: string;
  showDescription?: boolean;
  remainingCount?: number;
  locale: Locale;
}

function GalleryPreviewCard({
  item,
  className,
  sizes,
  showDescription = false,
  remainingCount = 0,
  locale,
}: GalleryPreviewCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-sm shadow-black/5",
        className,
      )}
    >
      <div className="relative aspect-[4/5] h-full w-full">
        <OptimizedImage
          src={item.imageSrc}
          alt={item.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {item.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/28 bg-white/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="max-w-[16rem] text-[1.25rem] font-medium tracking-tight md:text-[1.45rem]">
            {item.title}
          </h3>
          {showDescription && item.description ? (
            <p className="mt-2 max-w-sm line-clamp-2 text-sm leading-6 text-white/80">
              {item.description}
            </p>
          ) : null}
        </div>
        {remainingCount > 0 ? (
          <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/24 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/92 backdrop-blur-sm md:right-5 md:top-5">
            +{remainingCount} {locale === "en" ? "more" : "daugiau"}
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/8" />
      </div>
    </article>
  );
}

function getGallerySectionCopy(locale: Locale, variant: "home" | "supporting") {
  if (locale === "en") {
    return {
      title: variant === "home" ? "Inside the salon" : "Gallery moments",
      subtitle: "Gallery",
      description:
        variant === "home"
          ? "A polished preview of the atmosphere, finish quality, and work behind the chair."
          : "Selected visual moments from the chair, the finish, and the feel of the space.",
      note: "More cuts, texture, and in-salon moments live in the full gallery.",
      ctaLabel: "Explore the full gallery",
    };
  }

  return {
    title: variant === "home" ? "Salono akimirkos" : "Galerijos akcentai",
    subtitle: "Galerija",
    description:
      variant === "home"
        ? "Atrinkta perziura i atmosfera, rezultato kokybe ir darba prie kedes."
        : "Atrinktos akimirkos is darbo, rezultato ir pacios erdves nuotaikos.",
    note: "Daugiau kirpimu, teksturu ir salono akimirku rasite visoje galerijoje.",
    ctaLabel: "Ziureti visa galerija",
  };
}

function getGalleryCardWidthClass(
  variant: "home" | "supporting",
  index: number,
) {
  if (variant === "home" && index === 0) {
    return "w-[86vw] sm:w-[25rem] lg:w-[29rem]";
  }

  return variant === "home"
    ? "w-[72vw] sm:w-[19rem] lg:w-[21rem]"
    : "w-[74vw] sm:w-[18rem] lg:w-[19.5rem]";
}

function getGalleryCardSizes(
  variant: "home" | "supporting",
  index: number,
) {
  if (variant === "home" && index === 0) {
    return "(max-width: 640px) 86vw, (max-width: 1024px) 25rem, 29rem";
  }

  return variant === "home"
    ? "(max-width: 640px) 72vw, (max-width: 1024px) 19rem, 21rem"
    : "(max-width: 640px) 74vw, (max-width: 1024px) 18rem, 19.5rem";
}

export function GallerySection({
  items,
  locale = defaultLocale,
  variant = "supporting",
  analyticsPlacement = "gallery_preview",
  maxVisibleItems = 6,
}: GallerySectionProps) {
  const previewItems = items.slice(0, maxVisibleItems);
  const remainingCount = Math.max(0, items.length - previewItems.length);
  const copy = getGallerySectionCopy(locale, variant);

  if (previewItems.length === 0) {
    return null;
  }

  return (
    <Section id="gallery" className="bg-background">
      <Container>
        <SectionHeading
          title={copy.title}
          subtitle={copy.subtitle}
          description={copy.description}
          align="left"
          className="max-w-3xl"
        />

        <div className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f8f4ee_0%,#ffffff_100%)] p-5 shadow-sm shadow-black/5 md:p-6">
          <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:gap-5">
            {previewItems.map((item, index) => (
              <GalleryPreviewCard
                key={item.id}
                item={item}
                className={cn(
                  "shrink-0 snap-start",
                  getGalleryCardWidthClass(variant, index),
                )}
                sizes={getGalleryCardSizes(variant, index)}
                showDescription={variant === "home" && index === 0}
                remainingCount={
                  index === previewItems.length - 1 ? remainingCount : 0
                }
                locale={locale}
              />
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-border/50 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              {copy.note}
            </p>
            <SecondaryButton
              href={getLocalizedRoute("gallery", locale)}
              className="border-border/70 bg-background px-8"
              analyticsEvent="cta_click"
              analyticsParams={{
                cta_label: copy.ctaLabel,
                placement: analyticsPlacement,
              }}
            >
              {copy.ctaLabel}
            </SecondaryButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
