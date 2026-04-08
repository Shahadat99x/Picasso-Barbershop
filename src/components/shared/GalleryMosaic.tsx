import React from "react";

import type { GalleryLayout, GalleryMosaicItem } from "@/lib/public-data";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface GalleryMosaicProps {
  items: GalleryMosaicItem[];
  className?: string;
}

const layoutClasses: Record<GalleryLayout, string> = {
  hero: "sm:col-span-2 sm:row-span-2",
  portrait: "sm:row-span-2",
  landscape: "sm:col-span-2",
  square: "",
};

const aspectClasses: Record<GalleryLayout, string> = {
  hero: "aspect-[4/5] sm:aspect-auto",
  portrait: "aspect-[4/5] sm:aspect-auto",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

export function GalleryMosaic({ items, className }: GalleryMosaicProps) {
  const getSizes = (layout: GalleryLayout) => {
    switch (layout) {
      case "hero":
      case "landscape":
        return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw";
      case "portrait":
      case "square":
      default:
        return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[14rem] lg:grid-cols-4 lg:auto-rows-[15rem] lg:gap-6",
        className,
      )}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className={cn(
            "group relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-sm shadow-black/5",
            "min-h-[20rem] sm:min-h-[18rem]",
            layoutClasses[item.layout],
          )}
        >
          <div className={cn("relative h-full w-full", aspectClasses[item.layout])}>
            <OptimizedImage
              src={item.imageSrc}
              alt={item.alt}
              fill
              sizes={getSizes(item.layout)}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                {item.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
                {item.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
