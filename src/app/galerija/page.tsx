import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  MapPin,
  Scissors,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { GalleryMosaic } from "@/components/shared/GalleryMosaic";
import { PageHero } from "@/components/shared/PageHero";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  galleryCategories,
  mockGalleryItems,
} from "@/data/gallery";
import { getBranchById, mockBranches } from "@/data/branches";
import { getServiceBySlug } from "@/data/services";
import { siteConfig } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Galerija",
  description:
    "Explore the visual world of Picasso Barbershop through signature cuts, beard work, and premium salon details across Vilnius.",
};

const categoryIcons = {
  "signature-cuts": <Scissors className="h-5 w-5" />,
  "beard-design": <Sparkles className="h-5 w-5" />,
  "salon-interiors": <MapPin className="h-5 w-5" />,
  "ritual-details": <Camera className="h-5 w-5" />,
} as const;

const galleryServices = Array.from(
  new Set(mockGalleryItems.flatMap((item) => (item.serviceSlug ? [item.serviceSlug] : []))),
)
  .map((slug) => getServiceBySlug(slug))
  .filter((service) => Boolean(service));

const branchFrames = mockBranches.map((branch) => ({
  branch,
  count: mockGalleryItems.filter((item) => item.branchId === branch.id).length,
}));

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="A visual edit of our work, spaces, and the quieter details in between."
        description="This gallery is built from local mock content, but the structure already mirrors the way we plan to connect real imagery to branches, services, and future editorial tags."
        stats={[
          { value: String(mockGalleryItems.length), label: "curated mock frames" },
          { value: String(mockBranches.length), label: "Vilnius branches represented" },
          { value: String(galleryServices.length), label: "service links already mapped" },
        ]}
        actions={
          <>
            <Link href={siteConfig.bookingUrl}>
              <PrimaryButton className="w-full sm:w-auto">Book an appointment</PrimaryButton>
            </Link>
            <Link href="/filialai">
              <SecondaryButton className="w-full sm:w-auto">View branches</SecondaryButton>
            </Link>
          </>
        }
        aside={
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              What this page shows
            </span>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>Signature cuts and final styling moments</li>
              <li>Beard detail and premium grooming rituals</li>
              <li>Interiors and atmosphere across all three branches</li>
            </ul>
          </div>
        }
      />

      <Section className="bg-background">
        <Container>
          <SectionHeading
            title="Featured frames"
            subtitle="Image-first layout"
            align="left"
          />
          <GalleryMosaic items={mockGalleryItems} className="mt-12" />
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Organized for future branch and service filtering"
            subtitle="Content structure"
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {galleryCategories.map((category) => {
              const relatedItems = mockGalleryItems.filter(
                (item) => item.categoryId === category.id,
              );

              return (
                <FeatureCard
                  key={category.id}
                  eyebrow={`${relatedItems.length} frames`}
                  title={category.label}
                  description={category.description}
                  icon={categoryIcons[category.id]}
                  footer={
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Mapped to branches and service context</span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  }
                />
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-background">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <SectionHeading
                title="Captured across Vilnius"
                subtitle="Branch relation preview"
                align="left"
              />
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                Each gallery item already carries branch metadata, making it straightforward
                to surface branch-specific visual stories later without reworking the page
                model.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {branchFrames.map(({ branch, count }) => (
                <FeatureCard
                  key={branch.id}
                  eyebrow={`${count} gallery items`}
                  title={branch.name}
                  description={branch.intro}
                  icon={<MapPin className="h-5 w-5" />}
                  footer={
                    <Link
                      href={`/filialai/${branch.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Explore this branch
                    </Link>
                  }
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-background pt-0">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Service relation preview
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Like a result? Move from inspiration to booking in one step.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  The mock gallery items already point to relevant services. When the real
                  CMS layer lands, the visual selection can drive users directly toward the
                  right appointment type.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {galleryServices.map((service) => {
                  if (!service) return null;

                  const branch = mockGalleryItems.find(
                    (item) => item.serviceSlug === service.slug,
                  );
                  const relatedBranch = branch ? getBranchById(branch.branchId) : undefined;

                  return (
                    <Link
                      key={service.id}
                      href={`/paslaugos/${service.slug}`}
                      className="rounded-full border border-border/60 bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary/20"
                    >
                      {service.title}
                      {relatedBranch ? ` · ${relatedBranch.name}` : ""}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </main>
  );
}
