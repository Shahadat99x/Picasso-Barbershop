import Link from "next/link";
import { CalendarClock, Mail, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { BranchSummaryCard } from "@/components/shared/BranchSummaryCard";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getActiveBranches,
  getLocalizedContent,
  getLocalizedSlug,
  getPrimaryOpeningHours,
  getSiteSettingsWithDefaults,
} from "@/lib/public-data";
import { getBookingPath, getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Kontaktai",
  description:
    "Raskite filialu kontaktus, darbo laika ir bendra Picasso Barbershop informacija is admin valdomu nustatymu.",
  path: getLocalizedRoute("contact", "lt"),
  locale: "lt",
});

function getMapUrl(address: string, mapUrl: string | null) {
  return mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default async function ContactPage() {
  const [settings, branches] = await Promise.all([
    getSiteSettingsWithDefaults(),
    getActiveBranches(),
  ]);
  const highlights = [
    {
      eyebrow: "Rezervacija",
      title: "Greitas rezervacijos kelias",
      description:
        "Naudokite bendra rezervacijos marsruta arba pasirinkite konkretu filiala zemiau ir pereikite tiesiai i jo kelia.",
      href: getBookingPath("lt"),
      linkLabel: "Rezervuoti",
      icon: <CalendarClock className="h-5 w-5" />,
    },
    {
      eyebrow: "Telefonas",
      title: "Skambutis del pagalbos",
      description:
        "Jei reikia pagalbos renkantis filiala ar paslauga, skambutis islieka greiciausias praktinis variantas.",
      href: `tel:${settings.default_phone.replace(/\s+/g, "")}`,
      linkLabel: settings.default_phone,
      icon: <Phone className="h-5 w-5" />,
    },
    {
      eyebrow: "El. pastas",
      title: "Tiesioginis susisiekimas",
      description:
        "Detalesniems klausimams ar platesnei uzklausai galite rasyti i bendra salono pasto dezute.",
      href: `mailto:${settings.default_email}`,
      linkLabel: settings.default_email,
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <main>
      <PublicPageIntro
        eyebrow="Kontaktai"
        title="Pasirinkite filiala arba susisiekite tiesiogiai, jei reikia pagalbos."
        description="Kontaktinis puslapis naudoja realius filialu ir nustatymu duomenis: telefonus, el. pasta, darbo laika, rezervacijos nuorodas ir zemelapiu kryptis."
        stats={[
          { label: "Aktyvus filialai", value: String(branches.length) },
          { label: "Bendras telefonas", value: settings.default_phone },
          { label: "Bendras el. pastas", value: settings.default_email },
        ]}
      />

      <Section className="border-b border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {highlights.map((highlight) => (
              <FeatureCard
                key={highlight.title}
                eyebrow={highlight.eyebrow}
                title={highlight.title}
                description={highlight.description}
                icon={highlight.icon}
                footer={
                  <a href={highlight.href} className="text-sm font-medium text-primary hover:underline">
                    {highlight.linkLabel}
                  </a>
                }
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-background">
        <Container>
          <SectionHeading
            title="Visi filialai vienoje vietoje"
            subtitle="Greita perziura"
            description="Perziurekite lokacijas, darbo laika ir pagrindinius kontaktus, tada pasirinkite tiesiogini kelia i filialo puslapi arba rezervacija."
            align="left"
            className="max-w-3xl"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {branches.map((branch) => (
              <BranchSummaryCard
                key={branch.id}
                name={getLocalizedContent(branch, "name", "lt")}
                address={getLocalizedContent(branch, "address", "lt")}
                phone={branch.phone}
                hoursSummary={getPrimaryOpeningHours(branch, "lt")}
                mapUrl={getMapUrl(getLocalizedContent(branch, "address", "lt"), branch.map_url)}
                branchHref={getLocalizedDetailRoute("branches", getLocalizedSlug(branch, "lt"), "lt")}
                bookingHref={branch.booking_url || `tel:${branch.phone.replace(/\s+/g, "")}`}
                eyebrow="Filialas"
                branchLabel="Ziureti filiala"
                bookingLabel={branch.booking_url ? "Rezervuoti" : "Skambinti"}
                mapAriaLabel={`Atidaryti zemelapi ${getLocalizedContent(branch, "name", "lt")}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="rezervacija" className="border-t border-border/50 bg-background pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
              <SectionHeading
                title="Uzklausos forma kaip atsarginis kelias"
                subtitle="Pagalba"
                description="Pilnas uzklausos backend gali buti pleciamas velesniame etape, taciau si forma jau parodo aisku pagalbos marsruta ir saugu fallback scenariju."
                align="left"
                className="max-w-3xl"
              />

              <form className="mt-8 grid gap-5 md:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-medium text-foreground">Vardas</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="Jusu vardas"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-foreground">Telefonas</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="+370 6XX XXXXX"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-foreground">El. pastas</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="vardas@example.com"
                  />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-foreground">Zinute</span>
                  <textarea
                    rows={5}
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="Kuo galime padeti?"
                  />
                </label>

                <div className="md:col-span-2">
                  <PrimaryButton className="w-full" disabled>
                    Siuntimo backend bus prijungtas atskirai
                  </PrimaryButton>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Kol kas naudokite auksciau esancias filialu korteles arba rasykite tiesiogiai
                    el. pastu.
                  </p>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-border/60 bg-[#171311] p-6 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  Greiciausias kelias
                </span>
                <h2 className="mt-4 text-2xl font-medium tracking-tight">
                  Skambinkite arba pereikite tiesiai i rezervacija.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#c7b9ac]">
                  Jei zinote, ko ieskote, bendras telefono numeris ir rezervacijos nuoroda lieka
                  greiciausi veiksmai.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={`tel:${settings.default_phone.replace(/\s+/g, "")}`}>
                    <PrimaryButton className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]">
                      Skambinti
                    </PrimaryButton>
                  </a>
                  <Link href={getBookingPath("lt")}>
                    <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                      Rezervuoti
                    </SecondaryButton>
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Socialiniai tinklai
                </span>
                <div className="mt-5 flex flex-wrap gap-3">
                  {settings.social_instagram ? (
                    <a
                      href={settings.social_instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/20"
                    >
                      Instagram
                    </a>
                  ) : null}
                  {settings.social_facebook ? (
                    <a
                      href={settings.social_facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/20"
                    >
                      Facebook
                    </a>
                  ) : null}
                  {settings.social_tiktok ? (
                    <a
                      href={settings.social_tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/20"
                    >
                      TikTok
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
