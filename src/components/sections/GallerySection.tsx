import React from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { GalleryMosaic } from "@/components/shared/GalleryMosaic";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { featuredGalleryItems } from "@/data/gallery";

export function GallerySection() {
  return (
    <Section id="gallery" className="bg-background">
      <Container>
        <SectionHeading
          title="Inside The Salon"
          subtitle="Gallery"
          align="center"
        />

        <GalleryMosaic items={featuredGalleryItems} className="mt-12" />

        <div className="mt-10 text-center">
          <Link href="/galerija">
            <SecondaryButton>Explore the full gallery</SecondaryButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
