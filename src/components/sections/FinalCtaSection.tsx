import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { Locale, defaultLocale } from "@/i18n/locales";
import { getBookingPath } from "@/lib/site-routes";

const ctaCopy: Record<Locale, { title: string; description: string; cta: string }> = {
  lt: {
    title: "Pasiruose naujam ivaizdziui?",
    description:
      "Rezervuokite vizita ir pasirinkite jums tinkamiausia paslauga bei filiala be bereikalingu trikdziu.",
    cta: "Rezervuoti vizita",
  },
  en: {
    title: "Ready for your next look?",
    description:
      "Book your appointment and choose the service and branch that fit you best without unnecessary friction.",
    cta: "Book an appointment",
  },
};

interface FinalCtaSectionProps {
  locale?: Locale;
}

export function FinalCtaSection({ locale = defaultLocale }: FinalCtaSectionProps) {
  const copy = ctaCopy[locale];

  return (
    <Section className="bg-[linear-gradient(180deg,#171311_0%,#110f0e_100%)] py-20 text-primary-foreground md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d3b08c]">
            {locale === "en" ? "Next appointment" : "Kitas vizitas"}
          </span>
          <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-5xl">
            {copy.title}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-primary-foreground/78 leading-8 md:text-lg">
            {copy.description}
          </p>
          <Link href={getBookingPath(locale)}>
            <PrimaryButton className="h-14 border-none bg-[#d2af88] px-10 text-base font-semibold text-[#18120d] hover:bg-[#dec09c]">
              {copy.cta}
            </PrimaryButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
