import React from "react";
import { cn } from "@/lib/utils";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { getSlugFromHref } from "@/lib/analytics";

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: string;
  duration: string;
  href?: string;
  startingLabel?: string;
  detailLabel?: string;
}

export function ServiceCard({
  title,
  description,
  price,
  duration,
  href,
  startingLabel = "Starting from",
  detailLabel = "Details",
  className,
  ...props
}: ServiceCardProps) {
  const CardContent = (
    <div
      className={cn(
        "relative flex h-full flex-col justify-between overflow-hidden rounded-[1.85rem] border border-border/60 bg-card/95 p-6 shadow-sm shadow-black/5 transition-all motion-reduce:transition-none",
        !href && "group",
        href && "cursor-pointer hover:border-primary/50 group-focus-visible:border-primary/50",
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />

      <div>
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-secondary/35 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {duration}
          </span>
          {href ? (
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary/80 transition-colors group-hover:text-primary group-focus-visible:text-primary motion-reduce:transition-none">
              {detailLabel}
            </span>
          ) : null}
        </div>
        <h3 className="mb-3 text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary group-focus-visible:text-primary motion-reduce:transition-none">
          {title}
        </h3>
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
      </div>

      <div className="mt-8 flex items-end justify-between border-t border-border/50 pt-5">
        <div>
          <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {startingLabel}
          </span>
          <span className="text-2xl font-medium tracking-tight text-foreground">{price}</span>
        </div>
        <div className="rounded-full border border-border/60 bg-background px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:border-primary/25 group-hover:text-primary/80 group-focus-visible:border-primary/25 group-focus-visible:text-primary/80 motion-reduce:transition-none">
          {href ? `${detailLabel} ->` : duration}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <TrackedLink
        href={href}
        analyticsEvent="service_explore_intent"
        analyticsParams={{
          cta_label: detailLabel,
          service_slug: getSlugFromHref(href),
          placement: "service_card",
        }}
        className="focus-ring group block h-full rounded-[1.85rem]"
      >
        {CardContent}
      </TrackedLink>
    );
  }

  return CardContent;
}
