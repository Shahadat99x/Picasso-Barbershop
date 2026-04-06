import Link from "next/link";
import { MapPin, Scissors } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { GalleryMosaic } from "@/components/shared/GalleryMosaic";
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
import { getBookingPath, getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Gallery",
  description:
    "Browse the real CMS-driven Picasso Barbershop gallery with public images managed from the admin.",
  path: getLocalizedRoute("gallery", "en"),
  locale: "en",
});

export default async function EnGalleryPage() {
  const [galleryItems, branches, services] = await Promise.all([
    getVisibleGalleryItems(),
    getActiveBranches(3),
    getPublishedServices(3),
  ]);
  const mosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "en", index),
  );

  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="A live gallery of work and interiors managed directly from the admin."
        description="Public gallery images now use admin uploads, visibility rules, and English fallback content wherever translations are still incomplete."
        stats={[
          { value: String(mosaicItems.length), label: "visible frames" },
          { value: String(branches.length), label: "active branches" },
          { value: String(services.length), label: "service directions" },
        ]}
        actions={
          <>
            <Link href={getLocalizedRoute("contact", "en")}>
              <PrimaryButton className="w-full sm:w-auto">Contact us</PrimaryButton>
            </Link>
            <Link href={getLocalizedRoute("branches", "en")}>
              <SecondaryButton className="w-full sm:w-auto">View branches</SecondaryButton>
            </Link>
          </>
        }
      />

      <Section className="bg-background">
        <Container>
          <SectionHeading title="Latest work" subtitle="Images" align="left" />
          {mosaicItems.length > 0 ? (
            <GalleryMosaic items={mosaicItems} className="mt-12" />
          ) : (
            <div className="mt-12 rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              The gallery is empty for now. Visible images will appear here as soon as they
              are uploaded and published in the admin.
            </div>
          )}
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading title="Where next?" subtitle="Quick routes" align="left" />
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
