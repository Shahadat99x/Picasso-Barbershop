import { CalendarClock, Mail, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicContactForm } from "@/components/public/forms/PublicContactForm";
import { PublicPageIntro } from "@/components/public/page/public-page-intro";
import { TrackedLink } from "@/components/analytics/TrackedLink";
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
import { getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Kontaktai",
  description:
    "Raskite Picasso Barbershop filialu kontaktus, darbo laika ir kryptis, kad galetumete greitai susisiekti arba atvykti i jums patogiausia vieta.",
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
      eyebrow: "Apsilankymas",
      title: "Gyva eilė ir filialai",
      description:
        "Atvykite tiesiai į saloną - priimame be išankstinės rezervacijos. Susiraskite artimiausią filialą žemiau.",
      href: getLocalizedRoute("branches", "lt"),
      linkLabel: "Mūsų filialai",
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
        description="Cia rasite visus pagrindinius kontaktus, filialu darbo laika ir kryptis, kad butu lengva paskambinti, parasyti ar uzsukti gyvai."
        stats={[
          { label: "Filialai", value: String(branches.length) },
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
                  <TrackedLink
                    href={highlight.href}
                    analyticsEvent={
                      highlight.href.startsWith("tel:")
                        ? "phone_click"
                        : highlight.href.includes("/filialai")
                          ? "branch_visit_intent"
                          : "cta_click"
                    }
                    analyticsParams={{
                      cta_label: highlight.linkLabel,
                      placement: "contact_highlight",
                    }}
                    className="focus-ring rounded-sm text-sm font-medium text-primary hover:underline"
                  >
                    {highlight.linkLabel}
                  </TrackedLink>
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
            description="Perziurekite lokacijas, darbo laika ir pagrindinius kontaktus, tada pasirinkite, ar norite perziureti filiala, paskambinti ar atsidaryti zemelapi."
            align="left"
            className="max-w-3xl"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <BranchSummaryCard
                key={branch.id}
                name={getLocalizedContent(branch, "name", "lt")}
                address={getLocalizedContent(branch, "address", "lt")}
                phone={branch.phone}
                hoursSummary={getPrimaryOpeningHours(branch, "lt")}
                mapUrl={getMapUrl(getLocalizedContent(branch, "address", "lt"), branch.map_url)}
                branchHref={getLocalizedDetailRoute("branches", getLocalizedSlug(branch, "lt"), "lt")}
                bookingHref={`tel:${branch.phone.replace(/\s+/g, "")}`}
                eyebrow={branch.city}
                branchLabel="Ziureti filiala"
                bookingLabel="Skambinti filialui"
                mapAriaLabel={`Atidaryti zemelapi ${getLocalizedContent(branch, "name", "lt")}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="rezervacija" className="border-t border-border/50 bg-background pt-0">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
            <div className="min-w-0 w-full rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
              <SectionHeading
                title="Parasykite mums zinute"
                subtitle="Pagalba"
                description="Jei jums patogiau rasyti nei skambinti, zemiau matysite uzklausos formos vieta. Greiciausiai atsakome telefonu arba el. pastu."
                align="left"
                className="max-w-3xl"
              />
              <PublicContactForm
                locale="lt"
                sourcePage={getLocalizedRoute("contact", "lt")}
                branches={branches.map((branch) => ({
                  id: branch.id,
                  name: getLocalizedContent(branch, "name", "lt"),
                }))}
              />
            </div>

            <div className="min-w-0 space-y-6">
              <div className="min-w-0 rounded-[2rem] border border-border/60 bg-[#171311] p-6 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  Greiciausias kelias
                </span>
                <h2 className="mt-4 text-2xl font-medium tracking-tight">
                  Skambinkite arba atvykite gyvai.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#c7b9ac]">
                  Jei zinote, ko ieskote, bendras telefono numeris ir apsilankymas salone lieka
                  greiciausi veiksmai.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <PrimaryButton
                    href={`tel:${settings.default_phone.replace(/\s+/g, "")}`}
                    analyticsEvent="phone_click"
                    analyticsParams={{
                      cta_label: "Skambinti",
                      placement: "contact_sidebar",
                    }}
                    className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]"
                  >
                    Skambinti
                  </PrimaryButton>
                  <SecondaryButton
                    href={getLocalizedRoute("branches", "lt")}
                    analyticsEvent="branch_visit_intent"
                    analyticsParams={{
                      cta_label: "Visi filialai",
                      placement: "contact_sidebar",
                    }}
                    className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]"
                  >
                    Visi filialai
                  </SecondaryButton>
                </div>
              </div>

              <div className="min-w-0 rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Socialiniai tinklai
                </span>
                <div className="mt-5 flex flex-wrap gap-3">
                  {settings.social_instagram ? (
                    <a
                      href={settings.social_instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/20"
                    >
                      Instagram
                    </a>
                  ) : null}
                  {settings.social_facebook ? (
                    <a
                      href={settings.social_facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/20"
                    >
                      Facebook
                    </a>
                  ) : null}
                  {settings.social_tiktok ? (
                    <a
                      href={settings.social_tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/20"
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
