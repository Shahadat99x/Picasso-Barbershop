import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  theme?: "default" | "inverse";
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = "left",
  theme = "default",
  className,
  ...props
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const subtitleClass =
    theme === "inverse" ? "text-[#d2b18b]" : "text-muted-foreground";
  const titleClass = theme === "inverse" ? "text-[#faf5ee]" : "text-foreground";
  const descriptionClass =
    theme === "inverse" ? "text-[#cbbeb0]" : "text-muted-foreground";
  
  return (
    <div className={cn("mb-10 md:mb-14 max-w-2xl", alignClass, className)} {...props}>
      {subtitle && (
        <span
          className={cn(
            "mb-3 block text-xs font-semibold uppercase tracking-[0.24em]",
            subtitleClass,
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl font-medium tracking-tight md:text-4xl lg:text-[3.15rem]",
          titleClass,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-sm leading-7 md:text-base", descriptionClass)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
