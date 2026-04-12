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

interface HomepageTeamSectionProps {
  branches: HomepageTeamBranchPreview[];
  title: string;
  subtitle: string;
  description: string;
  eyebrowLabel: string;
  selectedBranchLabel: string;
  specialistCountLabel: string;
  previewNote: string;
  visitBranchLabel: string;
  tabListLabel: string;
}

export function HomepageTeamSection({
  branches,
  title,
  subtitle,
  description,
  eyebrowLabel,
  selectedBranchLabel,
  specialistCountLabel,
  previewNote,
  visitBranchLabel,
  tabListLabel,
}: HomepageTeamSectionProps) {
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
          className="mb-8 flex gap-3 overflow-x-auto pb-2"
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
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
                  isSelected
                    ? "border-primary/30 bg-primary text-primary-foreground"
                    : "border-border/70 bg-card text-foreground hover:border-primary/35 hover:text-primary",
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
          className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f8f4ee_0%,#ffffff_100%)] p-6 shadow-sm shadow-black/5 md:p-8"
        >
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {selectedBranchLabel}
              </span>
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h3 className="text-3xl font-medium tracking-tight md:text-[2.5rem]">
                  {selectedBranch.name}
                </h3>
                <span className="rounded-full border border-border/70 bg-background/85 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {specialistCountLabel.replace(
                    "{count}",
                    String(selectedBranch.totalSpecialists),
                  )}
                </span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {selectedBranch.specialists.map((specialist, index) => (
                <div
                  key={specialist.id}
                  className={cn(index === 2 && "hidden xl:block")}
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
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-border/50 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                {previewNote}
              </p>
              <SecondaryButton
                href={selectedBranch.href}
                analyticsEvent="branch_visit_intent"
                analyticsParams={{
                  branch_slug: getSlugFromHref(selectedBranch.href),
                  cta_label: visitBranchLabel,
                  placement: "homepage_team_preview",
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
