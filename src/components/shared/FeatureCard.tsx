import React from "react";

import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export function FeatureCard({
  eyebrow,
  title,
  description,
  icon,
  footer,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <span className="mb-3 inline-flex text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}
          <h3 className="text-xl font-medium tracking-tight">{title}</h3>
        </div>
        {icon ? (
          <div className="rounded-full border border-border/60 bg-secondary/20 p-3 text-primary">
            {icon}
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {footer ? <div className="mt-6 border-t border-border/50 pt-4">{footer}</div> : null}
    </div>
  );
}
