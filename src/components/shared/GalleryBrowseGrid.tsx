import React from "react";

import { OptimizedImage } from "@/components/shared/OptimizedImage";
import type { GalleryMosaicItem } from "@/lib/public-data";
import { cn } from "@/lib/utils";

interface GalleryBrowseGridProps {
  items: GalleryMosaicItem[];
  className?: string;
}

export function GalleryBrowseGrid({
  items,
  className,
}: GalleryBrowseGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6",
        className,
      )}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className="group overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm shadow-black/5"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <OptimizedImage
              src={item.imageSrc}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
          </div>

          <div className="p-5 md:p-6">
            {item.tags[0] ? (
              <span className="inline-flex rounded-full border border-border/70 bg-background px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {item.tags[0]}
              </span>
            ) : null}

            <h3 className="mt-3 text-[1.2rem] font-medium tracking-tight text-foreground md:text-[1.35rem]">
              {item.title}
            </h3>

            {item.description ? (
              <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
