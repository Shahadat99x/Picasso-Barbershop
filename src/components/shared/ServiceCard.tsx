import React from "react";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: string;
  duration: string;
  href?: string;
}

export function ServiceCard({
  title,
  description,
  price,
  duration,
  href,
  className,
  ...props
}: ServiceCardProps) {
  const CardContent = (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm border border-border/50 hover:shadow-md transition-all h-full",
        href && "hover:border-primary/50 cursor-pointer",
        className
      )}
      {...props}
    >
      <div>
        <h3 className="mb-2 text-xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="mt-6 flex items-end justify-between border-t border-border/50 pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting from</span>
          <span className="text-lg font-medium">{price}</span>
        </div>
        <div className="text-sm text-muted-foreground flex flex-col items-end gap-1">
          <span>{duration}</span>
          {href && (
            <span className="text-xs font-medium text-primary uppercase tracking-wider mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              Details →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{CardContent}</Link>;
  }

  return CardContent;
}
