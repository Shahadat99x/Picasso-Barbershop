import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { mockSpecialists } from "@/data/mock";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Us - Picasso Barbershop",
  description:
    "Learn about Picasso Barbershop's story, our team of expert barbers, and our commitment to premium grooming in Vilnius.",
  path: "/en/about",
});

export default function EnAboutPage() {
  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-20">
          <Container className="relative z-10">
            <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
              About Us
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4a4a4a] max-w-xl">
              A story of craftsmanship, tradition, and modern style in the heart of Vilnius.
            </p>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading 
                title="Our Story" 
                subtitle="Since 2018" 
                align="left"
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Picasso Barbershop was founded with a simple mission: to bring traditional barbershop craftsmanship to modern Vilnius while creating a space where style meets community.
                </p>
                <p>
                  What started as a single location in the Old Town has grown into three premium branches across the city, each maintaining the same commitment to quality, attention to detail, and personalized service.
                </p>
                <p>
                  We believe that a great haircut is more than just a service—it's an experience. Our masters combine classic techniques with contemporary styling to deliver looks that enhance your natural features and fit your lifestyle.
                </p>
              </div>
            </div>
            <div className="bg-secondary/30 rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">✓</span>
                  <div>
                    <strong className="block">Quality First</strong>
                    <span className="text-sm text-muted-foreground">Premium products, precision techniques</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">✓</span>
                  <div>
                    <strong className="block">Personalized Service</strong>
                    <span className="text-sm text-muted-foreground">Every client is unique</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">✓</span>
                  <div>
                    <strong className="block">Welcoming Atmosphere</strong>
                    <span className="text-sm text-muted-foreground">A space for community</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">✓</span>
                  <div>
                    <strong className="block">Continuous Learning</strong>
                    <span className="text-sm text-muted-foreground">Always evolving our craft</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-secondary/10">
        <Container>
          <SectionHeading 
            title="Meet The Team" 
            subtitle="Our expert barbers" 
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {mockSpecialists.map((specialist, idx) => (
              <SpecialistCard 
                key={idx}
                name={specialist.name}
                title={specialist.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium tracking-tight mb-4">
              Visit Us Today
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Experience the Picasso Barbershop difference at any of our three Vilnius locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en/branches"
                className="inline-flex h-12 items-center justify-center rounded-full bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                View Locations
              </Link>
              <Link
                href="/en/services"
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/20 bg-transparent px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Our Services
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
