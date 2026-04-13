"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { HomepageTeamBranchPreview } from "@/lib/public-data";
import { getSlugFromHref } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface TeamPreviewSectionProps {
  branches: HomepageTeamBranchPreview[];
  title: string;
  subtitle: string;
  description?: string;
  eyebrowLabel: string;
  specialistCountLabel: string;
  visitBranchLabel: string;
  tabListLabel: string;
}

export function TeamPreviewSection({
  branches,
  title,
  subtitle,
  description,
  eyebrowLabel,
  specialistCountLabel,
  visitBranchLabel,
  tabListLabel,
}: TeamPreviewSectionProps) {
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id ?? "");

  if (branches.length === 0) {
    return null;
  }

  const selectedBranch =
    branches.find((branch) => branch.id === selectedBranchId) ?? branches[0];

  return (
    <Section className="bg-background" variant="padded">
      <Container>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
          align="left"
          className="max-w-3xl"
        />

        <div
          role="tablist"
          aria-label={tabListLabel}
          className="mb-8 flex gap-2 overflow-x-auto pb-2 md:justify-center md:overflow-visible"
        >
          {branches.map((branch) => {
            const isSelected = branch.id === selectedBranch.id;

            return (
              <button
                key={branch.id}
                id={`team-tab-${branch.id}`}
                type="button"
                role="tab"
                aria-controls={`team-panel-${branch.id}`}
                aria-selected={isSelected}
                onClick={() => setSelectedBranchId(branch.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
                  isSelected
                    ? "border-primary/25 bg-primary text-primary-foreground"
                    : "border-border/70 bg-card text-muted-foreground hover:border-primary/30 hover:text-primary",
                )}
              >
                {branch.name}
              </button>
            );
          })}
        </div>

        <div
          id={`team-panel-${selectedBranch.id}`}
          role="tabpanel"
          aria-labelledby={`team-tab-${selectedBranch.id}`}
          className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f8f4ee_0%,#ffffff_100%)] p-5 shadow-sm shadow-black/5 md:p-8"
        >
          <div className="flex flex-col gap-6">
            <div className="border-b border-border/50 pb-5">
              <div>
                <h3 className="text-2xl font-medium tracking-tight md:text-[2.35rem]">
                  {selectedBranch.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {specialistCountLabel.replace(
                    "{count}",
                    String(selectedBranch.totalSpecialists),
                  )}
                </p>
              </div>
            </div>

            <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
              {selectedBranch.specialists.map((specialist) => (
                <div
                  key={specialist.id}
                  className="min-w-[78vw] max-w-[20rem] snap-start md:min-w-0 md:max-w-none"
                >
                  <SpecialistCard
                    variant="editorial"
                    name={specialist.name}
                    title={specialist.title}
                    summary={specialist.summary}
                    specialties={specialist.specialties}
                    branchLabel={specialist.branchLabel}
                    experienceLabel={specialist.experienceLabel}
                    imageUrl={specialist.imageUrl}
                    eyebrowLabel={eyebrowLabel}
                    href={specialist.href}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-start border-t border-border/50 pt-5 md:justify-end">
              <SecondaryButton
                href={selectedBranch.href}
                analyticsEvent="branch_visit_intent"
                analyticsParams={{
                  branch_slug: getSlugFromHref(selectedBranch.href),
                  cta_label: visitBranchLabel,
                  placement: "team_preview",
                }}
                className="w-full md:w-auto"
              >
                {visitBranchLabel}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
