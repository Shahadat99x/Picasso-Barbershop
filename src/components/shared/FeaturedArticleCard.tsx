import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeaturedArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  featuredLabel?: string;
  readLabel?: string;
}

export function FeaturedArticleCard({
  title,
  excerpt,
  category,
  date,
  readingTime,
  imageUrl,
  imageAlt,
  href,
  featuredLabel = "Featured",
  readLabel = "Read article",
}: FeaturedArticleCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm shadow-black/5 transition-all hover:shadow-md">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="relative min-h-[18rem] overflow-hidden bg-muted md:min-h-[24rem]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-col justify-between p-8 md:p-10">
            <div>
              <span className="inline-flex rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {featuredLabel} · {category}
              </span>
              <h2 className="mt-5 text-3xl font-medium tracking-tight md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {excerpt}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border/50 pt-6 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-3">
                <time>{date}</time>
                <span>{readingTime}</span>
              </div>
              <span className="font-medium text-primary">{readLabel}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
