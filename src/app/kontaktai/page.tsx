import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BranchSummaryCard } from "@/components/shared/BranchSummaryCard";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { PageHero } from "@/components/shared/PageHero";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  contactFormFields,
  contactHighlights,
  getMapSearchUrl,
} from "@/data/contact";
import { mockBranches } from "@/data/branches";
import { siteConfig } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Kontaktai",
  description:
    "Find contact details, opening hours, branch access, and booking guidance for Picasso Barbershop in Vilnius.",
};

const highlightIcons = [
  <CalendarClock key="calendar" className="h-5 w-5" />,
  <Phone key="phone" className="h-5 w-5" />,
  <Mail key="mail" className="h-5 w-5" />,
];

function getPrimaryHours(hours: { day: string; time: string }[]) {
  const first = hours[0];
  return first ? `${first.day}: ${first.time}` : "Hours available on branch profile";
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Choose the branch that suits you best, or reach out directly for help."
        description="The contact page is designed as the conversion fallback for the whole site: quick calls, clear branch access, opening hours, and a lightweight enquiry shell until the full backend lead flow is connected."
        stats={[
          { value: "3", label: "Vilnius branches" },
          { value: "7 days", label: "Užupis branch availability" },
          { value: "< 1 min", label: "to find a direct phone route" },
        ]}
        actions={
          <>
            <Link href="#rezervacija">
              <PrimaryButton className="w-full sm:w-auto">Booking options</PrimaryButton>
            </Link>
            <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}>
              <SecondaryButton className="w-full sm:w-auto">Call master line</SecondaryButton>
            </a>
          </>
        }
        aside={
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Master contact
              </span>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`} className="block hover:text-foreground">
                  {siteConfig.contactPhone}
                </a>
                <a href={`mailto:${siteConfig.contactEmail}`} className="block hover:text-foreground">
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>
            <p className="border-t border-border/50 pt-5 text-sm leading-relaxed text-muted-foreground">
              For the fastest response, call the branch directly or use the branch cards below
              to choose the most convenient location.
            </p>
          </div>
        }
      />

      <Section className="border-b border-border/50 bg-background">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {contactHighlights.map((highlight, index) => (
              <FeatureCard
                key={highlight.id}
                title={highlight.title}
                description={highlight.description}
                icon={highlightIcons[index]}
                footer={
                  <a
                    href={highlight.href}
                    className="text-sm font-medium text-primary hover:underline"
                  >
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
            title="All branches at a glance"
            subtitle="Quick access"
            align="left"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {mockBranches.map((branch) => (
              <BranchSummaryCard
                key={branch.id}
                name={branch.name}
                address={branch.address}
                phone={branch.phone}
                hoursSummary={getPrimaryHours(branch.hours)}
                mapUrl={getMapSearchUrl(branch.address)}
                branchHref={`/filialai/${branch.slug}`}
                bookingHref={`tel:${branch.phone.replace(/\s+/g, "")}`}
                bookingLabel="Call to book"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="rezervacija" className="border-t border-border/50 bg-secondary/10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="rounded-[2rem] border border-border/60 bg-card p-7 shadow-sm shadow-black/5 md:p-8">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Contact form shell
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight">
                  A clean enquiry flow is ready for backend wiring.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  This UI shell keeps the future contact lead flow visible in the layout
                  without connecting Supabase in this phase.
                </p>
              </div>

              <form className="mt-8 grid gap-5 md:grid-cols-2">
                {contactFormFields.map((field) => (
                  <label
                    key={field.id}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <span className="mb-2 block text-sm font-medium text-foreground">
                      {field.label}
                    </span>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={5}
                        placeholder={field.placeholder}
                        className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                    )}
                  </label>
                ))}

                <div className="md:col-span-2">
                  <PrimaryButton className="w-full" disabled>
                    Submission wiring in a later phase
                  </PrimaryButton>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Until then, use the branch cards above or email the salon directly.
                  </p>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Fastest booking route
                </span>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Choose a branch card above and call directly, or use the central contact
                  line if you want help deciding where to go first.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}>
                    <PrimaryButton className="w-full">Call master line</PrimaryButton>
                  </a>
                  <Link href="/filialai">
                    <SecondaryButton className="w-full">Compare branches</SecondaryButton>
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Visit us
                </span>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {mockBranches.map((branch) => (
                    <li key={branch.id} className="border-b border-border/50 pb-4 last:border-b-0 last:pb-0">
                      <div className="font-medium text-foreground">{branch.name}</div>
                      <div>{branch.address}</div>
                      <a
                        href={getMapSearchUrl(branch.address)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        <MapPin className="h-4 w-4" />
                        Open map placeholder
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
