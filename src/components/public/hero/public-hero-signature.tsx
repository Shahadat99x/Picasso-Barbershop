import type { StaticImageData } from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface HeroAction {
  href: string;
  label: string;
}

interface PublicHeroSignatureProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  plaqueLabel: string;
  imagePriority?: boolean;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
}

export function PublicHeroSignature({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  plaqueLabel,
  imagePriority = true,
  primaryAction,
  secondaryAction,
}: PublicHeroSignatureProps) {
  return (
    <Section
      className="relative overflow-hidden bg-[#141414] text-[#f5efe7]"
      variant="none"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,123,74,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,123,74,0.10),transparent_32%),linear-gradient(180deg,#191919_0%,#111111_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b98b57]/35 to-transparent" />
        <div className="absolute left-[-8%] top-24 h-40 w-40 rounded-full bg-[#9c7145]/8 blur-3xl" />
      </div>

      <Container className="relative py-6 pb-16 md:py-10 md:pb-20 lg:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(24rem,31rem)] lg:gap-16">
          <div className="order-2 lg:order-1">
            <span className="inline-flex rounded-full border border-[#7c5d3c]/45 bg-[#1a1a1a]/84 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#cfb08a]">
              {eyebrow}
            </span>

            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.4rem,7vw,5.15rem)] leading-[0.96] tracking-[-0.028em] text-[#faf5ee]">
              {title}
            </h1>

            <p className="mt-5 max-w-[35rem] text-base leading-7 text-[#c6b9ab] md:mt-6 md:text-[1.05rem] md:leading-8">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <Link
                href={primaryAction.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c1a07a] bg-[#c1a07a] px-6 py-3 text-sm font-semibold tracking-[0.02em] text-[#17120d] shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#cfb08a]"
              >
                {primaryAction.label}
              </Link>
              <Link
                href={secondaryAction.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#6c5134] bg-[#191614]/65 px-6 py-3 text-sm font-semibold tracking-[0.02em] text-[#f5efe7] transition-colors hover:border-[#8f6942] hover:bg-[#201a16]"
              >
                {secondaryAction.label}
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[31rem]">
              <div className="absolute inset-4 rounded-[2rem] border border-[#9e7750]/10" />
              <div className="relative overflow-hidden rounded-[2rem] border border-[#7d6040]/45 bg-[#100f0d] p-[0.78rem] shadow-[0_28px_72px_rgba(0,0,0,0.38)]">
                <div className="relative aspect-[5/6] overflow-hidden rounded-[1.45rem] bg-[#1c1c1c] md:aspect-[4/5]">
                  <OptimizedImage
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority={imagePriority}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 74vw, 38vw"
                    className="object-cover object-[center_24%] sm:object-[center_20%] lg:object-[center_18%]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.03)_8%,rgba(17,17,17,0.26)_100%)]" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center px-6">
                <div className="rounded-full border border-[#7b5d3d]/60 bg-[#161210]/92 px-4 py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#cfb08a] shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                  {plaqueLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
