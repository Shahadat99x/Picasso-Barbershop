import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Locale, defaultLocale } from "@/i18n/locales";

const sectionCopy: Record<Locale, {
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
}> = {
  lt: {
    title: "Picasso skirtumas",
    subtitle: "Kodel renkasi mus",
    description:
      "Aukstas standartas prasideda nuo konsultacijos, atmosferos ir nuoseklaus rezultato kiekviename vizite.",
    features: [
      {
        title: "Patyre meistrai",
        description:
          "Komanda dirba tiek su klasikinemis technikomis, tiek su siuolaikiniu stiliaus formavimu.",
      },
      {
        title: "Premium atmosfera",
        description:
          "Rami aplinka, kokybiski produktai ir aiskus, neskubantis aptarnavimas sukuria aukstesnes klases patirti.",
      },
      {
        title: "Demesys detalems",
        description:
          "Kiekvienas vizitas planuojamas taip, kad rezultatas atrodytu tiksliai ir islaikytu forma ilgiau.",
      },
    ],
  },
  en: {
    title: "The Picasso difference",
    subtitle: "Why choose us",
    description:
      "A premium standard starts with consultation, atmosphere, and a result that stays consistent from visit to visit.",
    features: [
      {
        title: "Experienced specialists",
        description:
          "Our team works confidently across classic techniques and contemporary styling expectations.",
      },
      {
        title: "Premium atmosphere",
        description:
          "Calm surroundings, quality products, and unhurried service create a more elevated appointment.",
      },
      {
        title: "Attention to detail",
        description:
          "Every appointment is paced to deliver a sharper finish and a result that ages well between visits.",
      },
    ],
  },
};

interface WhyChooseUsSectionProps {
  locale?: Locale;
}

export function WhyChooseUsSection({ locale = defaultLocale }: WhyChooseUsSectionProps) {
  const copy = sectionCopy[locale];

  return (
    <Section className="relative overflow-hidden bg-[#171414] text-[#f5efe7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,123,74,0.14),transparent_34%),linear-gradient(180deg,#191515_0%,#141212_100%)]" />
      <Container>
        <div className="relative flex flex-col items-start gap-12 md:flex-row lg:gap-24">
          <div className="md:w-1/3">
            <SectionHeading 
              title={copy.title}
              subtitle={copy.subtitle}
              description={copy.description}
              align="left"
              theme="inverse"
            />
          </div>
          
          <div className="grid md:w-2/3 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {copy.features.map((feature, idx) => (
              <div key={idx} className="rounded-[1.75rem] border border-white/8 bg-white/4 p-6 shadow-sm shadow-black/10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#8c6842]/45 bg-[#211915]">
                  <span className="text-lg font-bold text-[#d0ae86]">{idx + 1}</span>
                </div>
                <h3 className="mb-3 text-xl font-medium text-[#faf5ee]">{feature.title}</h3>
                <p className="text-sm leading-7 text-[#c8bcaf]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
