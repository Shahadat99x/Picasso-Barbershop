import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MapPin, Scissors, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { PageHero } from "@/components/shared/PageHero";
import { TeamPreviewCard } from "@/components/shared/TeamPreviewCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  aboutQuote,
  aboutStats,
  storyChapters,
  teamPreview,
  valuePillars,
} from "@/data/about";
import { getBranchById } from "@/data/branches";
import { siteConfig } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Apie mus",
  description:
    "Learn the story behind Picasso Barbershop, the values that shape our service, and the specialists who maintain the standard across Vilnius.",
};

const valueIcons = [<Scissors key="cut" className="h-5 w-5" />, <ShieldCheck key="shield" className="h-5 w-5" />, <MapPin key="map" className="h-5 w-5" />, <CheckCircle2 key="check" className="h-5 w-5" />];

export default function AboutPage() {
  const resolvedTeam = teamPreview.map((member) => ({
    ...member,
    branchName: getBranchById(member.branchId)?.name ?? "Vilnius",
  }));

  return (
    <main>
      <PageHero
        eyebrow="About"
        title="A premium grooming brand built around calm precision and repeat trust."
        description="Picasso Barbershop is designed to feel editorial, reliable, and easy to return to. The mood is elevated, but the real value comes from consistency in the chair."
        stats={aboutStats}
        actions={
          <>
            <Link href="/paslaugos">
              <PrimaryButton className="w-full sm:w-auto">Explore services</PrimaryButton>
            </Link>
            <Link href="/filialai">
              <SecondaryButton className="w-full sm:w-auto">See our branches</SecondaryButton>
            </Link>
          </>
        }
        aside={
          <blockquote className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Team perspective
            </span>
            <p className="text-lg leading-relaxed text-foreground">{aboutQuote.quote}</p>
            <footer className="text-sm text-muted-foreground">{aboutQuote.attribution}</footer>
          </blockquote>
        }
      />

      <Section className="bg-background">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-sm shadow-black/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              <Image
                src="/mock/gallery/lounge.svg"
                alt="Stylized premium salon interior used as local mock editorial artwork."
                width={1200}
                height={1400}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="space-y-8">
              {storyChapters.map((chapter) => (
                <div key={chapter.id} className="rounded-[2rem] border border-border/60 bg-card p-7 shadow-sm shadow-black/5">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {chapter.eyebrow}
                  </span>
                  <h2 className="mt-4 text-3xl font-medium tracking-tight">{chapter.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {chapter.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Why clients choose us"
            subtitle="Values"
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valuePillars.map((pillar, index) => (
              <FeatureCard
                key={pillar.id}
                title={pillar.title}
                description={pillar.description}
                icon={valueIcons[index]}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-background">
        <Container>
          <SectionHeading
            title="A few of the specialists behind the standard"
            subtitle="Team preview"
            align="left"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {resolvedTeam.map((member) => (
              <TeamPreviewCard
                key={member.id}
                name={member.name}
                role={member.role}
                branch={member.branchName}
                experience={member.experience}
                specialties={member.specialties}
                summary={member.summary}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-primary py-20 text-primary-foreground md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/65">
                Next step
              </span>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
                Choose a service, find a branch, and book with confidence.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
                The brand story only matters if the service experience supports it. Use the
                public pages to pick the right appointment path for you.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/paslaugos">
                <PrimaryButton className="w-full bg-background text-foreground hover:bg-muted">
                  Browse services
                </PrimaryButton>
              </Link>
              <Link href={siteConfig.bookingUrl}>
                <SecondaryButton className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  Book now
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
