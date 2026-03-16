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
        "group relative overflow-hidden rounded-[1.9rem] border border-border/60 bg-card/95 p-6 shadow-sm shadow-black/5 transition-all hover:border-primary/35 hover:shadow-md hover:shadow-black/5",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-70" />
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <span className="mb-3 inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}
          <h3 className="text-[1.45rem] font-medium tracking-tight text-foreground">{title}</h3>
        </div>
        {icon ? (
          <div className="rounded-[1rem] border border-primary/15 bg-[linear-gradient(180deg,rgba(210,175,136,0.12),rgba(210,175,136,0.04))] p-3 text-primary">
            {icon}
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>

      {footer ? <div className="mt-6 border-t border-border/50 pt-5">{footer}</div> : null}
    </div>
  );
}
