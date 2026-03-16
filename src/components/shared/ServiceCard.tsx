import React from "react";
import { cn } from "@/lib/utils";

import Link from "next/link";

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
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.85rem] border border-border/60 bg-card/95 p-6 shadow-sm shadow-black/5 transition-all",
        href && "hover:border-primary/50 cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-secondary/35 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {duration}
          </span>
          {href ? (
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary/80 transition-colors group-hover:text-primary">
              {detailLabel}
            </span>
          ) : null}
        </div>
        <h3 className="mb-3 text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
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
        <div className="rounded-full border border-border/60 bg-background px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:border-primary/25 group-hover:text-primary/80">
          {href ? `${detailLabel} ->` : duration}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{CardContent}</Link>;
  }

  return CardContent;
}
