import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getActiveBranches,
  getBranchCityCount,
  getPublishedServices,
  transformServiceForCard,
} from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Services",
  description:
    "Browse Picasso Barbershop services, prices, and timings so you can choose the right appointment across our branches in Vilnius and Kaunas.",
  path: getLocalizedRoute("services", "en"),
  locale: "en",
});

export default async function EnServicesPage() {
  const [services, branches] = await Promise.all([
    getPublishedServices(),
    getActiveBranches(),
  ]);
  const groupedServices = services.reduce<Record<string, ReturnType<typeof transformServiceForCard>[]>>(
    (accumulator, service) => {
      const category = service.category || "Other services";
      const transformed = transformServiceForCard(service, "en");
      const current = accumulator[category] || [];
      accumulator[category] = [...current, transformed];
      return accumulator;
    },
    {},
  );
  const categoryEntries = Object.entries(groupedServices);
  const cityCount = getBranchCityCount(branches);

  return (
    <main>
      <PublicPageIntro
        eyebrow="Service collection"
        title="Services arranged with clarity and a premium feel."
        description="Browse services by result, timing, and branch fit, then use each detail page to see exactly where the service is available across the network."
        stats={[
          { label: "Service options", value: String(services.length) },
          { label: "Categories", value: String(categoryEntries.length) },
          { label: "Cities", value: String(cityCount) },
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
                  subtitle="Category"
                  description={`This group includes ${categoryServices.length} options, making it easier to compare price, timing, and fit before your visit.`}
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
                      startingLabel="From"
                      detailLabel="Details"
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
                The service list is being refreshed at the moment. Contact your preferred
                branch if you would like a quick recommendation.
              </div>
            </Container>
          </Section>
        ) : null}
      </div>

      <FinalCtaSection locale="en" />
    </main>
  );
}
