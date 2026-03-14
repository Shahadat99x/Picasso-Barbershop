import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { GalleryMosaic } from "@/components/shared/GalleryMosaic";
import { mockGalleryItems } from "@/data/gallery";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery - Picasso Barbershop",
  description:
    "Browse our gallery of premium haircuts, beard styling, and grooming work. See the quality of our craftsmanship.",
  path: "/en/gallery",
});

export default function EnGalleryPage() {
  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-20">
          <Container className="relative z-10">
            <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
              Gallery
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4a4a4a] max-w-xl">
              Explore our work. Each style is crafted to complement your unique features and personal aesthetic.
            </p>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background">
        <Container>
          <GalleryMosaic items={mockGalleryItems} />
        </Container>
      </Section>

      <Section className="bg-secondary/10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading 
              title="Like What You See?" 
              subtitle="Book your appointment" 
              align="center"
            />
            <p className="text-muted-foreground mt-4">
              Ready for a transformation? Book your appointment at any of our three Vilnius locations.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
