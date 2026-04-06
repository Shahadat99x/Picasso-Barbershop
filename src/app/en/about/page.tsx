import Link from "next/link";
import { CheckCircle2, MapPin, Scissors, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { TeamPreviewCard } from "@/components/shared/TeamPreviewCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getActiveBranches,
  getActiveSpecialists,
  getLocalizedContent,
  transformSpecialistForCard,
} from "@/lib/public-data";
import { getBookingPath, getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "About",
  description:
    "Learn about the Picasso Barbershop brand, its specialist team, and how the premium experience is managed across Vilnius branches.",
  path: getLocalizedRoute("about", "en"),
  locale: "en",
});

const valueIcons = [
  <Scissors key="cut" className="h-5 w-5" />,
  <ShieldCheck key="shield" className="h-5 w-5" />,
  <MapPin key="map" className="h-5 w-5" />,
  <CheckCircle2 key="check" className="h-5 w-5" />,
];

const valuePillars = [
  {
    title: "Clear consultations",
    description:
      "Appointments start with understanding the client, the maintenance rhythm, and the result they want after the first week.",
  },
  {
    title: "Premium without friction",
    description:
      "The atmosphere is elevated, while the actual experience stays calm, practical, and reliable.",
  },
  {
    title: "Consistency across branches",
    description:
      "Different neighborhoods, the same quality bar, service rhythm, and booking logic.",
  },
  {
    title: "Built for repeat trust",
    description:
      "The goal is not a one-off impression. It is a service standard that makes the next visit feel obvious.",
  },
];

export default async function EnAboutPage() {
  const [specialists, branches] = await Promise.all([
    getActiveSpecialists(3),
    getActiveBranches(),
  ]);
  const branchMap = new Map(
    branches.map((branch) => [branch.id, getLocalizedContent(branch, "name", "en")]),
  );
  const specialistCards = specialists.map((specialist) =>
    transformSpecialistForCard(
      specialist,
      "en",
      branchMap.get(specialist.branch_id || ""),
    ),
  );

  return (
    <main>
      <PublicPageIntro
        eyebrow="About the brand"
        title="A brand built on calm execution, consistency, and repeat trust."
        description="The Picasso Barbershop story now sits inside the same premium public system as the homepage, services, and branches pages, while the team preview remains connected to the live specialist module."
        stats={[
          { label: "Vilnius branches", value: String(branches.length) },
          { label: "Featured specialists", value: String(specialists.length) },
          { label: "Content model", value: "LT/EN" },
        ]}
      />

      <Section className="bg-background">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
              <SectionHeading
                title="Craft, atmosphere, and consistency under one name"
                subtitle="Our story"
                description="Picasso Barbershop is built around the idea that premium grooming should feel calm, sharply delivered, and easy to trust from the first visit onward."
                align="left"
              />
              <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                <p>
                  Each branch keeps the same quality standard while adapting to a different city
                  rhythm. That shows up not only in the atmosphere, but also in the way services
                  are explained, how consultations are framed, and how booking feels publicly.
                </p>
                <p>
                  The public site now reflects that same order: from first impression through to
                  choosing a service or branch, each step is meant to reduce hesitation and make
                  the next move feel clear.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-[#171311] p-8 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                How we work
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-tight">
                Appointments are built around people, not volume.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Consultation is part of the result, not a formality.",
                  "Every location follows the same standard for quality, service, and presentation.",
                  "The real goal is a result that still feels right well after the appointment.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-[#d9cfc5]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Link href={getLocalizedRoute("services", "en")}>
                  <PrimaryButton className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]">
                    View services
                  </PrimaryButton>
                </Link>
                <Link href={getLocalizedRoute("branches", "en")}>
                  <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                    View branches
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
        <Container>
          <SectionHeading
            title="Why clients choose us"
            subtitle="Values"
            description="The principles that shape both the service standard and the public-facing Picasso Barbershop experience."
            align="left"
            className="max-w-3xl"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valuePillars.map((pillar, index) => (
              <FeatureCard
                key={pillar.title}
                eyebrow="Trust"
                title={pillar.title}
                description={pillar.description}
                icon={valueIcons[index]}
              />
            ))}
          </div>
        </Container>
      </Section>

      {specialists.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Team preview"
              subtitle="CMS-managed specialists"
              description="A concise look at the specialists drawn from the live content module, used here to reinforce trust and service level."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {specialistCards.map((specialist) => (
                <TeamPreviewCard
                  key={specialist.id}
                  name={specialist.name}
                  role={specialist.title}
                  imageUrl={specialist.imageUrl}
                  branch={specialist.branchLabel}
                  experience={specialist.experienceLabel}
                  specialties={specialist.specialties}
                  summary={specialist.summary}
                  eyebrowLabel="Team"
                  href={specialist.href}
                  ctaLabel="View profile"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="bg-background pt-0">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Next
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  A brand matters only when it is backed by real service quality.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                  If you are ready to move from the story into a practical choice, compare
                  services, review branches, or contact us directly.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={getLocalizedRoute("contact", "en")}>
                  <PrimaryButton className="w-full">Contact us</PrimaryButton>
                </Link>
                <Link href={getLocalizedRoute("services", "en")}>
                  <SecondaryButton className="w-full">View services</SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection locale="en" />
    </main>
  );
}
