import Link from "next/link";
import { MapPin, Scissors } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { GalleryBrowseGrid } from "@/components/shared/GalleryBrowseGrid";
import { PageHero } from "@/components/shared/PageHero";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getActiveBranches,
  getPublishedServices,
  getVisibleGalleryItems,
  transformGalleryItemForMosaic,
} from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Gallery",
  description:
    "Browse the Picasso Barbershop gallery to get a feel for our work, in-salon atmosphere, and results across different branches.",
  path: getLocalizedRoute("gallery", "en"),
  locale: "en",
});

export default async function EnGalleryPage() {
  const [galleryItems, branches, services] = await Promise.all([
    getVisibleGalleryItems(),
    getActiveBranches(3),
    getPublishedServices(3),
  ]);
  const galleryCards = galleryItems.map((item) => transformGalleryItemForMosaic(item, "en"));

  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="Real work, real atmosphere, and finishes worth a closer look."
        description="Cuts, details, and in-salon moments that bring the Picasso Barbershop style into sharper focus."
        stats={[
          { value: String(galleryCards.length), label: "selected frames" },
          { value: String(branches.length), label: "branches" },
          { value: String(services.length), label: "service directions" },
        ]}
        actions={
          <>
            <PrimaryButton href={getLocalizedRoute("contact", "en")} className="w-full sm:w-auto">
              Contact us
            </PrimaryButton>
            <SecondaryButton href={getLocalizedRoute("branches", "en")} className="w-full sm:w-auto">
              View branches
            </SecondaryButton>
          </>
        }
      />

      <Section className="bg-background">
        <Container>
          <SectionHeading
            title="Gallery browse"
            subtitle="Work and atmosphere"
            description="Cuts, texture, and the mood of the salon in a calmer, easier-to-browse layout."
            align="left"
          />
          {galleryCards.length > 0 ? (
            <GalleryBrowseGrid items={galleryCards} className="mt-12" />
          ) : (
            <div className="mt-12 rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              New work will be added here soon. For now, choose the branch or
              service that fits your next visit.
            </div>
          )}
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Where next?"
            subtitle="Continue exploring"
            description="Choose the branch or service that suits your next visit."
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <FeatureCard
                key={branch.id}
                eyebrow="Branch"
                title={branch.name_en || branch.name_lt}
                description={branch.short_description_en || branch.short_description_lt}
                icon={<MapPin className="h-5 w-5" />}
                footer={
                  <Link
                    href={`${getLocalizedRoute("branches", "en")}/${branch.slug_en || branch.slug_lt}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View branch
                  </Link>
                }
              />
            ))}
            {services.map((service) => (
              <FeatureCard
                key={service.id}
                eyebrow="Service"
                title={service.title_en || service.title_lt}
                description={service.short_description_en || service.short_description_lt}
                icon={<Scissors className="h-5 w-5" />}
                footer={
                  <Link
                    href={`${getLocalizedRoute("services", "en")}/${service.slug_en || service.slug_lt}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View service
                  </Link>
                }
              />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCtaSection locale="en" />
    </main>
  );
}
