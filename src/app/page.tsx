import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { BranchCard } from "@/components/shared/BranchCard";
import { PromoBanner } from "@/components/shared/PromoBanner";
import Link from "next/link";
import { siteConfig } from "@/config/navigation";

export default function Home() {
  return (
    <main>
      {/* Temporary Hero */}
      <Section className="bg-secondary/10 border-b border-border/50">
        <Container>
          <div className="py-20 md:py-32 max-w-3xl text-center mx-auto">
            <span className="block mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Welcome to
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8">
              {siteConfig.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={siteConfig.bookingUrl}>
                <PrimaryButton className="w-full sm:w-auto px-8 text-base h-12">
                  Book an Appointment
                </PrimaryButton>
              </Link>
              <Link href="/#services">
                <SecondaryButton className="w-full sm:w-auto px-8 text-base h-12">
                  View Services
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Temporary Services Preview */}
      <Section id="services" className="bg-background">
        <Container>
          <SectionHeading 
            title="Our Services" 
            subtitle="Tailored for the modern gentleman" 
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              title="Classic Haircut"
              description="A precision cut tailored to your face shape and style preferences."
              price="€35"
              duration="45 min"
            />
            <ServiceCard 
              title="Beard Trim & Shape"
              description="Expert shaping and fading using straight razor techniques."
              price="€25"
              duration="30 min"
            />
            <ServiceCard 
              title="The Full Experience"
              description="Haircut, beard sculpt, hot towel shave, and scalp massage."
              price="€65"
              duration="90 min"
            />
          </div>
        </Container>
      </Section>

      {/* Temporary Promo */}
      <Section className="bg-background !py-0">
        <Container>
          <PromoBanner 
            title="Experience The Full Treatment"
            description="Book our signature package this month and receive a complimentary styling product tailored to your hair type."
            ctaText="Book Package"
          />
        </Container>
      </Section>

      {/* Temporary Branches Preview */}
      <Section id="branches" className="bg-background">
        <Container>
          <SectionHeading 
            title="Our Locations" 
            subtitle="Find a branch near you" 
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BranchCard 
              name="Old Town Classic"
              address="Vilniaus g. 22, Vilnius"
              hours="Mon-Sun: 9:00 - 20:00"
            />
            <BranchCard 
              name="Užupis Retreat"
              address="Užupio g. 14, Vilnius"
              hours="Mon-Sat: 10:00 - 19:00"
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
