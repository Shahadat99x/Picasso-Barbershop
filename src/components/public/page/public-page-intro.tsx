import React from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface IntroStat {
  label: string;
  value: string;
}

interface PublicPageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  stats?: IntroStat[];
}

export function PublicPageIntro({
  eyebrow,
  title,
  description,
  stats,
}: PublicPageIntroProps) {
  return (
    <Section className="relative overflow-hidden bg-[#161313] pb-16 pt-24 text-[#f5efe7] md:pb-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,123,74,0.16),transparent_34%),linear-gradient(180deg,#191616_0%,#121010_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ba8c59]/35 to-transparent" />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#7d5d3b]/45 bg-[#1b1715]/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d3b08a]">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl lg:text-[4.35rem]">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#c8bbaf] md:text-lg">
            {description}
          </p>

          {stats && stats.length > 0 ? (
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="rounded-[1.5rem] border border-white/8 bg-white/4 px-5 py-5"
                >
                  <div className="text-2xl font-medium tracking-tight text-[#faf5ee] [overflow-wrap:anywhere]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-[#bcae9f]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
