import { Section } from "@/components/layout/Section";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BranchCard } from "@/components/shared/BranchCard";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getActiveBranches,
  getBranchCityCount,
  transformBranchForCard,
} from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Filialai",
  description:
    "Atraskite Picasso Barbershop filialus Vilniuje ir Kaune ir issirinkite lokacija pagal miesta, patoguma ir kasdienio marsruto ritma.",
  path: getLocalizedRoute("branches", "lt"),
  locale: "lt",
});

export default async function BranchesIndexPage() {
  const branches = await getActiveBranches();
  const branchCards = branches.map((branch) => transformBranchForCard(branch, "lt"));
  const cityCount = getBranchCityCount(branches);

  return (
    <main>
      <PublicPageIntro
        eyebrow="Vilnius ir Kaunas"
        title="Pasirinkite filiala pagal miesta, marsruta ir vizito ritma."
        description="Kiekvienas filialas islaiko ta pati paslaugu standarta, taciau skirtingai prisitaiko prie miesto, rajono patogumo ir jums artimiausio kasdienio sustojimo."
        stats={[
          { label: "Filialai", value: String(branchCards.length) },
          { label: "Miestai", value: String(cityCount) },
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
                  cityLabel={branch.cityLabel}
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
