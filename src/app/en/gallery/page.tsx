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
  const mosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "en", index),
  );

  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="Real work, real atmosphere, and finishes worth a closer look."
        description="This gallery brings together selected cuts, details, and in-salon moments so you can feel the Picasso Barbershop style before you visit."
        stats={[
          { value: String(mosaicItems.length), label: "selected frames" },
          { value: String(branches.length), label: "branches" },
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
          <SectionHeading
            title="Latest work"
            subtitle="Style and atmosphere"
            description="A closer look at finishes, texture, and the kind of calm in-salon detail that shapes the overall experience."
            align="left"
          />
          {mosaicItems.length > 0 ? (
            <GalleryMosaic items={mosaicItems} className="mt-12" />
          ) : (
            <div className="mt-12 rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              New work will be added here soon. In the meantime, explore our branches or
              services to find the right fit for your next visit.
            </div>
          )}
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Where next?"
            subtitle="Continue exploring"
            description="If the gallery already feels close to the result you want, move on to the branch or service that suits you best."
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
