import React from "react";
import { Locale, defaultLocale } from "@/i18n/locales";
import { PublicHeroSignature } from "@/components/public/hero/public-hero-signature";
import { getBookingPath, getLocalizedRoute } from "@/lib/site-routes";

const heroImage = {
  src: "/images/hero/picasso-team-hero.jpg",
  plaqueLabel: "Real Team. Real Craft.",
};

const heroContent: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    secondaryCta: string;
    imageAlt: string;
  }
> = {
  lt: {
    eyebrow: "Meistriskai kurta barberystes patirtis",
    title: "Kur prieziura tampa jusu braizu.",
    description:
      "Preciziski kirpimai, astrus barzdos formavimas ir premium barbershop atmosfera, sukurta pasitikejimui ir detalems.",
    cta: "Aplankyti filialą",
    secondaryCta: "Musu paslaugos",
    imageAlt: "Picasso Barbershop komanda salone",
  },
  en: {
    eyebrow: "Crafted barber experience",
    title: "Where grooming becomes a signature.",
    description:
      "Expert cuts, sharp beard work, and a premium barbershop atmosphere designed around confidence and detail.",
    cta: "Visit branch",
    secondaryCta: "Our Services",
    imageAlt: "Picasso Barbershop team inside the salon",
  },
};

interface HeroSectionProps {
  locale?: Locale;
}

export function HeroSection({ locale = defaultLocale }: HeroSectionProps) {
  const content = heroContent[locale];

  return (
    <PublicHeroSignature
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      imageSrc={heroImage.src}
      imageAlt={content.imageAlt}
      plaqueLabel={heroImage.plaqueLabel}
      primaryAction={{
        href: getLocalizedRoute("branches", locale),
        label: content.cta,
      }}
      secondaryAction={{
        href: `${getLocalizedRoute("home", locale)}#services`,
        label: content.secondaryCta,
      }}
    />
  );
}
