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
  const galleryCards = galleryItems.map((item) => transformGalleryItemForMosaic(item, "lt"));

  return (
    <main>
      <PageHero
        eyebrow="Galerija"
        title="Tikri darbai, tikra atmosfera ir rezultatai, kuriuos norisi issaugoti."
        description="Kirpimai, detales ir salono akimirkos, atskleidziancios Picasso Barbershop braiza is arciau."
        stats={[
          { value: String(galleryCards.length), label: "atrinkti kadrai" },
          { value: String(branches.length), label: "filialai" },
          { value: String(services.length), label: "paslaugu kryptys" },
        ]}
        actions={
          <>
            <PrimaryButton href={getLocalizedRoute("contact", "lt")} className="w-full sm:w-auto">
              Susisiekti
            </PrimaryButton>
            <SecondaryButton href={getLocalizedRoute("branches", "lt")} className="w-full sm:w-auto">
              Ziureti filialus
            </SecondaryButton>
          </>
        }
      />

      <Section className="bg-background">
        <Container>
          <SectionHeading
            title="Galerijos perziura"
            subtitle="Darbai ir atmosfera"
            description="Kirpimai, teksturos ir salono nuotaika vienoje ramioje, lengvai narstomoje perziuroje."
            align="left"
          />
          {galleryCards.length > 0 ? (
            <GalleryBrowseGrid items={galleryCards} className="mt-12" />
          ) : (
            <div className="mt-12 rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              Netrukus pasidalinsime naujais darbais. Kol kas kvieciame rinktis
              filiala arba paslauga.
            </div>
          )}
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Kur toliau?"
            subtitle="Tolimesnis pasirinkimas"
            description="Rinkites filiala arba paslauga pagal savo kita vizita."
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
