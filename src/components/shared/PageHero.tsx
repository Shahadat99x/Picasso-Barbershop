import React from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

interface HeroStat {
  value: string;
  label: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  stats?: HeroStat[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  stats,
  actions,
  aside,
  className,
}: PageHeroProps) {
  return (
    <Section
      className={cn(
        "relative overflow-hidden border-b border-border/50 bg-secondary/10 pb-16 pt-24 md:pb-24 md:pt-32",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(199,177,152,0.18),transparent_65%)]" />
      <div className="absolute left-1/2 top-20 h-48 w-48 -translate-x-1/2 rounded-full border border-border/40 opacity-50 blur-3xl" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {eyebrow}
            </span>
            <h1 className="max-w-4xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {description}
            </p>

            {actions ? <div className="mt-8 flex flex-col gap-4 sm:flex-row">{actions}</div> : null}

            {stats && stats.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-4 border-t border-border/50 pt-8 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={`${stat.label}-${stat.value}`}>
                    <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {aside ? (
            <div className="rounded-[2rem] border border-border/60 bg-background/90 p-6 shadow-sm shadow-black/5">
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
