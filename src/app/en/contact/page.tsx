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
import { getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Contact",
  description:
    "Find Picasso Barbershop branch contacts, opening hours, and directions so you can call, email, or visit the location that suits you best.",
  path: getLocalizedRoute("contact", "en"),
  locale: "en",
});

function getMapUrl(address: string, mapUrl: string | null) {
  return mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default async function EnContactPage() {
  const [settings, branches] = await Promise.all([
    getSiteSettingsWithDefaults(),
    getActiveBranches(),
  ]);
  const highlights = [
    {
      eyebrow: "Walk in",
      title: "Walk-ins & Branches",
      description:
        "Drop by the salon directly - we welcome walk-ins without an appointment. Find your branch below.",
      href: getLocalizedRoute("branches", "en"),
      linkLabel: "Our branches",
      icon: <CalendarClock className="h-5 w-5" />,
    },
    {
      eyebrow: "Phone",
      title: "Call for help",
      description:
        "If you need help choosing a branch or service, a direct call is still the fastest practical option.",
      href: `tel:${settings.default_phone.replace(/\s+/g, "")}`,
      linkLabel: settings.default_phone,
      icon: <Phone className="h-5 w-5" />,
    },
    {
      eyebrow: "Email",
      title: "Direct contact",
      description:
        "For more detailed questions or a broader enquiry, write to the main salon inbox directly.",
      href: `mailto:${settings.default_email}`,
      linkLabel: settings.default_email,
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <main>
      <PublicPageIntro
        eyebrow="Contact"
        title="Choose a branch or reach out directly when you need guidance."
        description="You will find the key contacts, branch opening hours, and directions here, making it easy to call, email, or stop by in person."
        stats={[
          { label: "Branches", value: String(branches.length) },
          { label: "Main phone", value: settings.default_phone },
          { label: "Main email", value: settings.default_email },
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
            title="All branches in one place"
            subtitle="Quick access"
            description="Review locations, opening hours, and contact details, then choose whether to view the branch, call directly, or open the map."
            align="left"
            className="max-w-3xl"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <BranchSummaryCard
                key={branch.id}
                name={getLocalizedContent(branch, "name", "en")}
                address={getLocalizedContent(branch, "address", "en")}
                phone={branch.phone}
                hoursSummary={getPrimaryOpeningHours(branch, "en")}
                mapUrl={getMapUrl(getLocalizedContent(branch, "address", "en"), branch.map_url)}
                branchHref={getLocalizedDetailRoute("branches", getLocalizedSlug(branch, "en"), "en")}
                bookingHref={`tel:${branch.phone.replace(/\s+/g, "")}`}
                eyebrow="Branch"
                branchLabel="View branch"
                bookingLabel="Call branch"
                mapAriaLabel={`Open map for ${getLocalizedContent(branch, "name", "en")}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="booking" className="border-t border-border/50 bg-background pt-0">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
            <div className="min-w-0 w-full rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
              <SectionHeading
                title="Leave us a message"
                subtitle="Support"
                description="If writing is more convenient than calling, you can see where the enquiry form will appear below. For now, the fastest reply comes by phone or email."
                align="left"
                className="max-w-3xl"
              />

              <form className="mt-8 grid min-w-0 gap-5 md:grid-cols-2">
                <label className="min-w-0">
                  <span className="mb-2 block text-sm font-medium text-foreground">Name</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="Your name"
                  />
                </label>
                <label className="min-w-0">
                  <span className="mb-2 block text-sm font-medium text-foreground">Phone</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="+370 6XX XXXXX"
                  />
                </label>
                <label className="min-w-0">
                  <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="name@example.com"
                  />
                </label>
                <label className="min-w-0 md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-foreground">Message</span>
                  <textarea
                    rows={5}
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
                    placeholder="How can we help?"
                  />
                </label>

                <div className="min-w-0 md:col-span-2">
                  <PrimaryButton
                    className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-sm leading-6 sm:text-base"
                    disabled
                  >
                    Temporarily unavailable
                  </PrimaryButton>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    For now, the quickest way to reach us is by phone or direct email using
                    the details above.
                  </p>
                </div>
              </form>
            </div>

            <div className="min-w-0 space-y-6">
              <div className="min-w-0 rounded-[2rem] border border-border/60 bg-[#171311] p-6 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  Fastest route
                </span>
                <h2 className="mt-4 text-2xl font-medium tracking-tight">
                  Call or visit us directly.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#c7b9ac]">
                  If you already know what you need, the shared phone line and visiting us are the fastest actions.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={`tel:${settings.default_phone.replace(/\s+/g, "")}`}>
                    <PrimaryButton className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]">
                      Call now
                    </PrimaryButton>
                  </a>
                  <Link href={getLocalizedRoute("branches", "en")}>
                    <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                      All branches
                    </SecondaryButton>
                  </Link>
                </div>
              </div>

              <div className="min-w-0 rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Social channels
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
