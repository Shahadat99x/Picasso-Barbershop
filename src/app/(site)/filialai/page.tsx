import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { mockBranches } from "@/data/branches";
import { BranchCard } from "@/components/shared/BranchCard";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { defaultLocale } from "@/i18n/locales";

export const metadata = createLocalizedPageMetadata({
  title: "Filialai",
  description:
    "Compare all Picasso Barbershop branches in Vilnius, including atmosphere, hours, and contact details.",
  path: "/filialai",
  locale: defaultLocale,
});

export default function BranchesIndexPage() {
  return (
    <main>
      {/* Intro Header */}
      <Section className="bg-secondary/10 border-b border-border/50 pb-16 md:pb-24 pt-24 md:pt-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Our Locations
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the highest standard of grooming across Vilnius. Each of our branches offers a distinct atmosphere while sharing our uncompromising dedication to the barbering craft.
            </p>
          </div>
        </Container>
      </Section>

      {/* Locations Grid */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {mockBranches.map((branch) => {
              // Summarize hours for the card view based on the first day in the array (e.g. Mon-Fri)
              const primaryHours = branch.hours[0] 
                ? `${branch.hours[0].day}: ${branch.hours[0].time}`
                : "Hours available on profile";

              return (
                <BranchCard
                  key={branch.id}
                  name={branch.name}
                  address={branch.address}
                  hours={primaryHours}
                  href={`/filialai/${branch.slug}`}
                />
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Global Booking CTA */}
      <FinalCtaSection />
    </main>
  );
}
