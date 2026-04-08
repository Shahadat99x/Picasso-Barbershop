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
  title: "Galerija",
  description:
    "Perziurekite Picasso Barbershop galerija ir susipazinkite su darbu braizu, salono atmosfera bei rezultatais is skirtingu filialu.",
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
        title="Tikri darbai, tikra atmosfera ir rezultatai, kuriuos norisi issaugoti."
        description="Galerijoje matysite kruopsciai atrinktus kirpimus, detales ir salono akimirkas, padedancias pajausti Picasso Barbershop braiza dar pries apsilankant."
        stats={[
          { value: String(mosaicItems.length), label: "atrinkti kadrai" },
          { value: String(branches.length), label: "filialai" },
          { value: String(services.length), label: "paslaugu kryptys" },
        ]}
        actions={
          <>
            <Link href={getLocalizedRoute("contact", "lt")}>
              <PrimaryButton className="w-full sm:w-auto">Susisiekti</PrimaryButton>
            </Link>
            <Link href={getLocalizedRoute("branches", "lt")}>
              <SecondaryButton className="w-full sm:w-auto">Ziureti filialus</SecondaryButton>
            </Link>
          </>
        }
      />

      <Section className="bg-background">
        <Container>
          <SectionHeading
            title="Naujausi darbai"
            subtitle="Stilius ir atmosfera"
            description="Zvilgsnis i kirpimus, formas, teksturas ir erdve, kurioje svarbios tiek detales, tiek bendra nuotaika."
            align="left"
          />
          {mosaicItems.length > 0 ? (
            <GalleryMosaic items={mosaicItems} className="mt-12" />
          ) : (
            <div className="mt-12 rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              Netrukus pasidalinsime naujais darbais. Tuo metu kvieciame perziureti
              filialus arba paslaugas.
            </div>
          )}
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Kur toliau?"
            subtitle="Tolimesnis pasirinkimas"
            description="Jei galerijoje jau radote artima braiza, pereikite prie filialo arba paslaugos, kuri geriausiai atitinka jusu poreiki."
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
