import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface DetailMetaItem {
  label: string;
  value: React.ReactNode;
}

interface PublicDetailHeroProps {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: DetailMetaItem[];
  actions?: React.ReactNode;
  visual?: React.ReactNode;
}

export function PublicDetailHero({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  meta,
  actions,
  visual,
}: PublicDetailHeroProps) {
  return (
    <Section className="relative overflow-hidden bg-[#161313] pb-16 pt-24 text-[#f5efe7] md:pb-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,123,74,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,123,74,0.10),transparent_30%),linear-gradient(180deg,#191616_0%,#121010_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ba8c59]/35 to-transparent" />

      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:gap-14">
          <div>
            <Link
              href={backHref}
              className="mb-8 inline-flex text-sm font-medium text-[#bfae9d] transition-colors hover:text-[#f5efe7]"
            >
              {backLabel}
            </Link>

            <span className="inline-flex rounded-full border border-[#7d5d3b]/45 bg-[#1b1715]/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d3b08a]">
              {eyebrow}
            </span>

            <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-tight md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#c8bbaf] md:text-lg">
              {description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-white/8 bg-white/4 px-5 py-5"
                >
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#bfae9d]">
                    {item.label}
                  </div>
                  <div className="mt-2 text-lg font-medium text-[#faf5ee]">{item.value}</div>
                </div>
              ))}
            </div>

            {actions ? <div className="mt-8 flex flex-col gap-4 sm:flex-row">{actions}</div> : null}
          </div>

          {visual ? (
            <div className="rounded-[2rem] border border-[#735637]/45 bg-[#120f0e] p-3 shadow-[0_28px_72px_rgba(0,0,0,0.32)]">
              {visual}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
