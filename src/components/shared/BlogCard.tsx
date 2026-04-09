import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  category?: string;
  readingTime?: string;
  href?: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  imageUrl,
  category,
  readingTime,
  href,
  className,
  ...props
}: BlogCardProps) {
  const cardContent = (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-border/60 bg-card transition-all hover:shadow-md hover:shadow-black/5",
        href && "cursor-pointer hover:border-primary/40",
        className,
      )}
      {...props}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <OptimizedImage
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(210,175,136,0.2),transparent_44%),linear-gradient(180deg,rgba(28,24,22,0.08),rgba(28,24,22,0.02))]" />
        )}
        {category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/88 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-4 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <time>{date}</time>
          {readingTime ? <span>{readingTime}</span> : null}
        </div>
        <h3 className="mb-4 text-[1.55rem] font-medium tracking-tight transition-colors group-hover:text-primary/70">
          {title}
        </h3>
        <p className="mt-auto line-clamp-3 text-sm leading-7 text-muted-foreground">
          {excerpt}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
