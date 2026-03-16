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
  title: "Galerija",
  description:
    "Perziurekite realia admin valdoma Picasso Barbershop galerija su matomais darbais is skirtingu paslaugu ir filialu.",
  path: getLocalizedRoute("gallery", "lt"),
  locale: "lt",
});

export default async function GalleryPage() {
  const [galleryItems, branches, services] = await Promise.all([
    getVisibleGalleryItems(),
    getActiveBranches(3),
    getPublishedServices(3),
  ]);
  const mosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "lt", index),
  );

  return (
    <main>
      <PageHero
        eyebrow="Galerija"
        title="Realiu darbu ir erdviu perziura, valdoma tiesiai is admin sistemos."
        description="Galerijos vaizdai dabar naudoja admin ikeltus paveikslus, matomumo logika ir LT/EN alternatyvas ten, kur jos uzpildytos."
        stats={[
          { value: String(mosaicItems.length), label: "matomi kadrai" },
          { value: String(branches.length), label: "aktyvus filialai" },
          { value: String(services.length), label: "paslaugu kryptys" },
        ]}
        actions={
          <>
            <Link href={getBookingPath("lt")}>
              <PrimaryButton className="w-full sm:w-auto">Rezervuoti vizita</PrimaryButton>
            </Link>
            <Link href={getLocalizedRoute("branches", "lt")}>
              <SecondaryButton className="w-full sm:w-auto">Ziureti filialus</SecondaryButton>
            </Link>
          </>
        }
      />

      <Section className="bg-background">
        <Container>
          <SectionHeading title="Naujausi darbai" subtitle="Vaizdai" align="left" />
          {mosaicItems.length > 0 ? (
            <GalleryMosaic items={mosaicItems} className="mt-12" />
          ) : (
            <div className="mt-12 rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              Galerija dar tuscia. Ikelus matomus paveikslus admin sistemoje, jie
              pasirodys cia automatiskai.
            </div>
          )}
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Kur toliau?"
            subtitle="Greitos kryptys"
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <FeatureCard
                key={branch.id}
                eyebrow="Filialas"
                title={branch.name_lt}
                description={branch.short_description_lt}
                icon={<MapPin className="h-5 w-5" />}
                footer={
                  <Link
                    href={`${getLocalizedRoute("branches", "lt")}/${branch.slug_lt}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Ziureti filiala
                  </Link>
                }
              />
            ))}
            {services.map((service) => (
              <FeatureCard
                key={service.id}
                eyebrow="Paslauga"
                title={service.title_lt}
                description={service.short_description_lt}
                icon={<Scissors className="h-5 w-5" />}
                footer={
                  <Link
                    href={`${getLocalizedRoute("services", "lt")}/${service.slug_lt}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Ziureti paslauga
                  </Link>
                }
              />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCtaSection locale="lt" />
    </main>
  );
}
