import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServiceFaqSection } from "@/components/sections/ServiceFaqSection";
import { mockServices, ServiceData } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return mockServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = mockServices.find((s) => s.slug === slug);
  
  if (!service) {
    return createPageMetadata({
      title: "Service Not Found",
      description: "The requested service could not be found.",
      path: "/en/services",
    });
  }
  
  return createPageMetadata({
    title: `${service.title} - Picasso Barbershop`,
    description: service.shortDescription,
    path: `/en/services/${service.slug}`,
  });
}

export default async function EnServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = mockServices.find((s) => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[30vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-16">
          <Container className="relative z-10">
            <Link
              href="/en/services"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center"
            >
              ← Back to Services
            </Link>
            <span className="text-sm font-medium text-primary block mb-2">
              {service.categoryId}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {service.shortDescription}
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <span className="text-3xl font-bold text-[#1a1a1a]">{service.price}</span>
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium">Duration:</span> {service.duration}
              </div>
            </div>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background pt-12">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">About this service</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {service.benefits && service.benefits.length > 0 && (
            <div className="mt-12 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">What's included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/en/contact#rezervacija"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book this service
            </Link>
          </div>
        </Container>
      </Section>

      {service.faqs && service.faqs.length > 0 && (
        <ServiceFaqSection faqs={service.faqs} />
      )}

      <Section className="bg-secondary/10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Have questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our team is happy to help you choose the right service for you.
            </p>
            <Link
              href="/en/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Contact us
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
