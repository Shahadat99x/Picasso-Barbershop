import React from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: string;
  duration: string;
}

export function ServiceCard({
  title,
  description,
  price,
  duration,
  className,
  ...props
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm border border-border/50 hover:shadow-md transition-all",
        className
      )}
      {...props}
    >
      <div>
        <h3 className="mb-2 text-xl font-medium tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="mt-6 flex items-end justify-between border-t border-border/50 pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting from</span>
          <span className="text-lg font-medium">{price}</span>
        </div>
        <div className="text-sm text-muted-foreground">{duration}</div>
      </div>
    </div>
  );
}
