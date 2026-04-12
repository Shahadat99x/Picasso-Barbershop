import { CheckCircle2, MapPin, Scissors, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { TeamPreviewCard } from "@/components/shared/TeamPreviewCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getActiveBranches,
  getActiveSpecialists,
  getLocalizedContent,
  transformSpecialistForCard,
} from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Apie mus",
  description:
    "Susipazinkite su Picasso Barbershop istorija, komanda ir principais, kurie kuria ramu, uztikrinta premium aptarnavima Vilniuje ir Kaune.",
  path: getLocalizedRoute("about", "lt"),
  locale: "lt",
});

const valueIcons = [
  <Scissors key="cut" className="h-5 w-5" />,
  <ShieldCheck key="shield" className="h-5 w-5" />,
  <MapPin key="map" className="h-5 w-5" />,
  <CheckCircle2 key="check" className="h-5 w-5" />,
];

const valuePillars = [
  {
    title: "Aiskios konsultacijos",
    description:
      "Vizitas prasideda nuo supratimo, ko reikia klientui ir kaip rezultatas turetu atrodyti po keliu savaiciu.",
  },
  {
    title: "Premium be triuksmo",
    description:
      "Aplinka pakelta i aukstesni lygi, taciau pati patirtis islieka paprasta, rami ir uztikrinta.",
  },
  {
    title: "Nuoseklumas tarp filialu",
    description:
      "Skirtingos lokacijos, taciau tas pats kokybes standartas, aptarnavimo ritmas ir paslaugu logika.",
  },
  {
    title: "Griztama del pasitikejimo",
    description:
      "Tikslas yra ne vienas geras vizitas, o patirtis, prie kurios lengva noreti grizti.",
  },
];

export default async function AboutPage() {
  const [specialists, branches] = await Promise.all([
    getActiveSpecialists(3),
    getActiveBranches(),
  ]);
  const branchMap = new Map(
    branches.map((branch) => [branch.id, getLocalizedContent(branch, "name", "lt")]),
  );
  const specialistCards = specialists.map((specialist) =>
    transformSpecialistForCard(
      specialist,
      "lt",
      branchMap.get(specialist.branch_id || ""),
    ),
  );

  return (
    <main>
      <PublicPageIntro
        eyebrow="Apie zenkla"
        title="Prekinis zenklas, pastatytas ant ramaus darbo, nuoseklumo ir pasitikejimo."
        description="Picasso Barbershop istorija prasideda nuo amato, pagarbos laikui ir nuoseklaus darbo, prie kurio klientai nori grizti vel ir vel."
        stats={[
          { label: "Filialai miestuose", value: String(branches.length) },
          { label: "Komandos veidai", value: String(specialists.length) },
          { label: "Pagrindas", value: "Pasitikejimas" },
        ]}
      />

      <Section className="bg-background">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
              <SectionHeading
                title="Amatas, atmosfera ir nuoseklumas po vienu vardu"
                subtitle="Musu istorija"
                description="Picasso Barbershop kuriamas aplink minti, kad premium prieziura turi buti rami, tiksliai atlikta ir lengvai pasitikima tiek pirmo, tiek pakartotinio vizito metu."
                align="left"
              />
              <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                <p>
                  Kiekvienas filialas islaiko ta pati kokybes standarta, taciau prisitaiko prie
                  savo miesto ritmo. Tai reiskia ne tik stiliaus ar interjero krypti, bet ir
                  aisku paslaugu pateikima, konsultacijos eiga ir aptarnavimo nuosekluma.
                </p>
                <p>
                  Mums svarbu, kad klientas jaustusi uztikrintai nuo pirmo zvilgsnio iki
                  paskutines detales prie veidrodzio. Del to daug demesio skiriame ne tik
                  rezultatui, bet ir tam, kaip visa patirtis jauciasi vizito metu.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-[#171311] p-8 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                Kaip dirbame
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-tight">
                Paslaugos statomos aplink zmones, ne aplink kieki.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Konsultacija visada yra dalis rezultato, ne formalumas.",
                  "Kiekviena lokacija turi ta pati kokybes, aptarnavimo ir pateikimo standarta.",
                  "Svarbiausias tikslas yra rezultatas, kuris atrodo uztikrintai ir po vizito.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-[#d9cfc5]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <PrimaryButton
                  href={getLocalizedRoute("services", "lt")}
                  className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]"
                >
                  Ziureti paslaugas
                </PrimaryButton>
                <SecondaryButton
                  href={getLocalizedRoute("branches", "lt")}
                  className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]"
                >
                  Ziureti filialus
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
        <Container>
          <SectionHeading
            title="Kodel klientai renkasi mus"
            subtitle="Vertes"
            description="Pagrindiniai principai, kurie formuoja tiek paslaugu kokybe, tiek pasitikejima, kuri klientai jaucia kiekvieno apsilankymo metu."
            align="left"
            className="max-w-3xl"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valuePillars.map((pillar, index) => (
              <FeatureCard
                key={pillar.title}
                eyebrow="Pasitikejimas"
                title={pillar.title}
                description={pillar.description}
                icon={valueIcons[index]}
              />
            ))}
          </div>
        </Container>
      </Section>

      {specialists.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Komandos perziura"
              subtitle="Zmones uz kedes"
              description="Trumpa pazintis su meistrais, kuriu darbas remiasi tikslumu, ramiu bendravimu ir nuosekliu rezultatu."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {specialistCards.map((specialist) => (
                <TeamPreviewCard
                  key={specialist.id}
                  name={specialist.name}
                  role={specialist.title}
                  imageUrl={specialist.imageUrl}
                  branch={specialist.branchLabel}
                  experience={specialist.experienceLabel}
                  specialties={specialist.specialties}
                  summary={specialist.summary}
                  eyebrowLabel="Komanda"
                  href={specialist.href}
                  ctaLabel="Ziureti profili"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="bg-background pt-0">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Toliau
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Prekinis zenklas svarbus tiek, kiek jis palaikomas realia kokybe.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                  Jei norite pereiti nuo istorijos prie praktinio pasirinkimo, palyginkite
                  paslaugas, filialus arba iskart susisiekite del vizito.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <PrimaryButton href={getLocalizedRoute("contact", "lt")} className="w-full">
                  Susisiekti
                </PrimaryButton>
                <SecondaryButton href={getLocalizedRoute("services", "lt")} className="w-full">
                  Ziureti paslaugas
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection locale="lt" />
    </main>
  );
}
