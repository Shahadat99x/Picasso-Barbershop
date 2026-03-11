import React from "react";
import { cn } from "@/lib/utils";

interface PromoBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  ctaText?: string;
  onClickCta?: () => void;
}

export function PromoBanner({
  title,
  description,
  ctaText,
  onClickCta,
  className,
  ...props
}: PromoBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-primary px-6 py-12 md:px-12 md:py-16 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8",
        className
      )}
      {...props}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-xl text-center md:text-left">
        <h3 className="mb-3 text-2xl font-medium tracking-tight md:text-3xl">{title}</h3>
        <p className="text-primary-foreground/80 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
      
      {ctaText && (
        <button
          onClick={onClickCta}
          className="relative z-10 shrink-0 rounded-full bg-background px-8 py-4 text-sm font-medium text-foreground transition-all hover:bg-secondary"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}
