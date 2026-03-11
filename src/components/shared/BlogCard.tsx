/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  category?: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  imageUrl,
  category,
  className,
  ...props
}: BlogCardProps) {
  return (
    <div
      className={cn("group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-md transition-all cursor-pointer", className)}
      {...props}
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 bg-secondary/20">
            Cover Placeholder
          </div>
        )}
        {category && (
          <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground tracking-wide">
            {category}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <time className="text-xs text-muted-foreground mb-3 tracking-wide">{date}</time>
        <h3 className="text-xl font-medium tracking-tight mb-3 group-hover:text-primary/70 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-auto">
          {excerpt}
        </p>
      </div>
    </div>
  );
}
