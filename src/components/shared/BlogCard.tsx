import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

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
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/50 bg-card transition-all hover:shadow-md",
        href && "cursor-pointer hover:border-primary/40",
        className,
      )}
      {...props}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/20 text-muted-foreground/30">
            Cover Placeholder
          </div>
        )}
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium tracking-wide text-foreground backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs tracking-wide text-muted-foreground">
          <time>{date}</time>
          {readingTime ? <span>{readingTime}</span> : null}
        </div>
        <h3 className="mb-3 text-xl font-medium tracking-tight transition-colors group-hover:text-primary/70">
          {title}
        </h3>
        <p className="mt-auto line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
