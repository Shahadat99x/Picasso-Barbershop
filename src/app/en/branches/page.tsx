import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BranchCard } from "@/components/shared/BranchCard";
import { mockBranches } from "@/data/mock";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { Locale } from "@/i18n/locales";

export const metadata = createLocalizedPageMetadata({
  title: "Our Locations",
  description:
    "Find your nearest Picasso Barbershop location in Vilnius. Three branches: Old Town, Žvėrynas, and City Center.",
  path: "/en/branches",
  locale: "en" as Locale,
});

export default function EnBranchesPage() {
  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-20">
          <Container className="relative z-10">
            <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
              Our Locations
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4a4a4a] max-w-xl">
              Three convenient locations across Vilnius. Find the branch closest to you and experience premium grooming.
            </p>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockBranches.map((branch, idx) => (
              <BranchCard 
                key={idx}
                name={branch.name}
                address={branch.address}
                hours={branch.hours}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-secondary/10">
        <Container>
          <SectionHeading 
            title="Why Visit Us?" 
            subtitle="The Picasso Barbershop experience" 
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✂️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
              <p className="text-muted-foreground">
                Every visit includes a consultation, premium products, and attention to detail.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Masters</h3>
              <p className="text-muted-foreground">
                Our team of skilled barbers brings years of experience and passion to every cut.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🪒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Traditional Techniques</h3>
              <p className="text-muted-foreground">
                We combine classic barbering with modern styling for the perfect look.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
