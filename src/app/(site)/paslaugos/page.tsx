import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getPublishedServices,
  transformServiceForCard,
} from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Paslaugos",
  description:
    "Atraskite realiu laiku valdomas Picasso Barbershop paslaugas, kainas ir trukmes visuose Vilniaus filialuose.",
  path: getLocalizedRoute("services", "lt"),
  locale: "lt",
});

export default async function ServicesIndexPage() {
  const services = await getPublishedServices();
  const groupedServices = services.reduce<Record<string, ReturnType<typeof transformServiceForCard>[]>>(
    (accumulator, service) => {
      const category = service.category || "Kitos paslaugos";
      const transformed = transformServiceForCard(service, "lt");
      const current = accumulator[category] || [];
      accumulator[category] = [...current, transformed];
      return accumulator;
    },
    {},
  );
  const categoryEntries = Object.entries(groupedServices);

  return (
    <main>
      <PublicPageIntro
        eyebrow="Paslaugu kolekcija"
        title="Paslaugos, sudeliotos aiskiai ir uztikrintai."
        description="Rinkitės is realiai administruojamo Picasso Barbershop paslaugu katalogo, kuriame svarbiausios kainos, trukmes ir aiškus kelias i rezervacija."
        stats={[
          { label: "Publikuota paslaugu", value: String(services.length) },
          { label: "Kategorijos", value: String(categoryEntries.length) },
          { label: "Miestas", value: "Vilnius" },
        ]}
      />

      <div className="bg-background">
        {categoryEntries.map(([category, categoryServices], index) => (
          <Section
            key={category}
            className={index % 2 === 0 ? "bg-background" : "bg-[linear-gradient(180deg,#f6f0e9_0%,#fbf8f4_100%)]"}
          >
            <Container>
              <div className="rounded-[2rem] border border-border/60 bg-card/95 p-6 shadow-sm shadow-black/5 md:p-8 lg:p-10">
                <SectionHeading
                  title={category}
                  subtitle="Kategorija"
                  description={`Sioje grupeje rasite ${categoryServices.length} administruojamas paslaugas, kurias galima perziureti ir pasirinkti pagal trukme, kaina bei jusu norima rezultata.`}
                  align="left"
                  className="max-w-3xl"
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <ServiceCard
                      key={service.href}
                      title={service.title}
                      description={service.description}
                      price={service.price}
                      duration={service.duration}
                      href={service.href}
                      startingLabel="Nuo"
                      detailLabel="Placiau"
                    />
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        ))}

        {services.length === 0 ? (
          <Section className="bg-background">
            <Container>
              <div className="rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
                Paslaugu dar nepublikuota. Turinis pasirodys cia, kai jis bus aktyvuotas
                admin sistemoje.
              </div>
            </Container>
          </Section>
        ) : null}
      </div>

      <FinalCtaSection locale="lt" />
    </main>
  );
}
