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
    "Compare active Picasso Barbershop branches, their contact details, opening hours, and booking routes across Vilnius.",
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
        description="Every active branch reads from live CMS content and presents a clearer route into location details, atmosphere, and booking."
        stats={[
          { label: "Active branches", value: String(branchCards.length) },
          { label: "City", value: "Vilnius" },
          { label: "Booking", value: "Direct" },
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
              No active branches are published yet. This page will populate once branch
              content is enabled in the admin.
            </div>
          )}
        </div>
      </Section>

      <FinalCtaSection locale="en" />
    </main>
  );
}
