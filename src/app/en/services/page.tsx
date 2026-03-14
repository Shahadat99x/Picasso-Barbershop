import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { mockServices, serviceCategories, ServiceData } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services - Picasso Barbershop",
  description:
    "Explore our premium grooming services: haircuts, beard styling, hot towel shaves, and more. Three locations in Vilnius.",
  path: "/en/services",
});

export default function EnServicesPage() {
  const featuredServices = mockServices.slice(0, 6);
  const allServices = mockServices;

  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-20">
          <Container className="relative z-10">
            <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4a4a4a] max-w-xl">
              Premium grooming, haircuts, beard styling, and traditional barbershop experiences. 
              Three Vilnius locations to serve you.
            </p>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background">
        <Container>
          <SectionHeading 
            title="Featured Services" 
            subtitle="Our most popular treatments" 
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service: ServiceData) => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                price={service.price}
                duration={service.duration}
                href={`/en/services/${service.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-secondary/10">
        <Container>
          <SectionHeading 
            title="All Services" 
            subtitle="Complete service menu" 
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service: ServiceData) => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                price={service.price}
                duration={service.duration}
                href={`/en/services/${service.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-primary text-primary-foreground py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium tracking-tight mb-4">
              Not sure what you need?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Our masters will help you choose the perfect service for your style. 
              Visit any of our three branches for a free consultation.
            </p>
            <Link
              href="/en/branches"
              className="inline-flex h-12 items-center justify-center rounded-full bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View Our Locations
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
