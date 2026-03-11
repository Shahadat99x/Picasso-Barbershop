import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  
  return (
    <div className={cn("mb-10 md:mb-14 max-w-2xl", alignClass, className)} {...props}>
      {subtitle && (
        <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}
