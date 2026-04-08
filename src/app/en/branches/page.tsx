import { Section } from "@/components/layout/Section";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BranchCard } from "@/components/shared/BranchCard";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getActiveBranches, transformBranchForCard } from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Branches",
  description:
    "Compare Picasso Barbershop branches in Vilnius and choose the location that best suits your routine, area, and preferred atmosphere.",
  path: getLocalizedRoute("branches", "en"),
  locale: "en",
});

export default async function EnBranchesPage() {
  const branches = await getActiveBranches();
  const branchCards = branches.map((branch) => transformBranchForCard(branch, "en"));

  return (
    <main>
      <PublicPageIntro
        eyebrow="Vilnius locations"
        title="Choose the branch that fits your rhythm best."
        description="Each branch keeps the same service standard while offering a different neighborhood feel, pace, and point of convenience across the city."
        stats={[
          { label: "Branches", value: String(branchCards.length) },
          { label: "City", value: "Vilnius" },
          { label: "Visits", value: "Direct" },
        ]}
      />

      <Section className="bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          {branchCards.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {branchCards.map((branch) => (
                <BranchCard
                  key={branch.href}
                  name={branch.name}
                  address={branch.address}
                  hours={branch.hours}
                  imageUrl={branch.imageUrl}
                  href={branch.href}
                  detailLabel="View branch"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              Branch details are being refreshed at the moment. Call us if you would like
              help choosing the right location.
            </div>
          )}
        </div>
      </Section>

      <FinalCtaSection locale="en" />
    </main>
  );
}
