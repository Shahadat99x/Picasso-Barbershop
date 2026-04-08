import { Section } from "@/components/layout/Section";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BranchCard } from "@/components/shared/BranchCard";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getActiveBranches, transformBranchForCard } from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Filialai",
  description:
    "Atraskite Picasso Barbershop filialus Vilniuje ir issirinkite lokacija pagal patoguma, atmosfera bei kasdienio marsruto ritma.",
  path: getLocalizedRoute("branches", "lt"),
  locale: "lt",
});

export default async function BranchesIndexPage() {
  const branches = await getActiveBranches();
  const branchCards = branches.map((branch) => transformBranchForCard(branch, "lt"));

  return (
    <main>
      <PublicPageIntro
        eyebrow="Vilniaus lokacijos"
        title="Pasirinkite filiala taip, kaip rinktumes jusu ritmui."
        description="Kiekvienas filialas islaiko ta pati paslaugu standarta, taciau skirtingai tinka pagal miesto dali, dienos tempa ir jums patogiausia sustojima."
        stats={[
          { label: "Filialai", value: String(branchCards.length) },
          { label: "Miestas", value: "Vilnius" },
          { label: "Apsilankymas", value: "Tiesiogiai" },
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
                  detailLabel="Ziureti filiala"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-border/60 bg-card p-8 text-center text-muted-foreground shadow-sm shadow-black/5">
              Siuo metu atnaujiname filialu informacija. Jei reikia pagalbos renkantis,
              susisiekite su mumis telefonu.
            </div>
          )}
        </div>
      </Section>

      <FinalCtaSection locale="lt" />
    </main>
  );
}
