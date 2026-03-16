import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PromoBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  eyebrow?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function PromoBanner({
  title,
  description,
  eyebrow,
  ctaText,
  ctaHref,
  className,
  ...props
}: PromoBannerProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] border border-[#7a5b39]/40 bg-[linear-gradient(135deg,#171311_0%,#241b16_50%,#171311_100%)] px-6 py-10 text-primary-foreground shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:flex-row md:items-center md:px-12 md:py-14",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-52 w-52 rounded-full bg-[#aa7e4d]/12 blur-3xl" />
      
      <div className="relative z-10 max-w-xl text-left">
        {eyebrow ? (
          <span className="mb-3 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d5b08b]">
            {eyebrow}
          </span>
        ) : null}
        <h3 className="mb-3 text-2xl font-medium tracking-tight md:text-[2rem]">{title}</h3>
        <p className="text-sm leading-7 text-primary-foreground/78 md:text-base">
          {description}
        </p>
      </div>
      
      {ctaText && (
        ctaHref ? (
          <Link
            href={ctaHref}
            className="relative z-10 shrink-0 rounded-full border border-[#d6b996] bg-[#d6b996] px-7 py-3 text-sm font-semibold text-[#18120d] transition-colors hover:bg-[#e1c3a1]"
          >
            {ctaText}
          </Link>
        ) : (
          <div className="relative z-10 shrink-0 rounded-full border border-[#d6b996] bg-[#d6b996] px-7 py-3 text-sm font-semibold text-[#18120d]">
            {ctaText}
          </div>
        )
      )}
    </div>
  );
}
