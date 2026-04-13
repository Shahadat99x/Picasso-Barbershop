import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { TransformedSpecialist } from "@/lib/public-data";

interface BranchTeamSectionProps {
  specialists: TransformedSpecialist[];
  title: string;
  subtitle: string;
  description: string;
  eyebrowLabel: string;
  ctaLabel: string;
  ctaHref: string;
  analyticsPlacement: string;
  branchSlug: string;
}

export function BranchTeamSection({
  specialists,
  title,
  subtitle,
  description,
  eyebrowLabel,
  ctaLabel,
  ctaHref,
  analyticsPlacement,
  branchSlug,
}: BranchTeamSectionProps) {
  if (specialists.length === 0) {
    return null;
  }

  return (
    <Section className="bg-background pt-0">
      <Container>
        <div className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f8f4ee_0%,#ffffff_100%)] p-6 shadow-sm shadow-black/5 md:p-8">
          <SectionHeading
            title={title}
            subtitle={subtitle}
            description={description}
            align="left"
            className="mb-8 max-w-3xl md:mb-10"
          />

          <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
            {specialists.map((specialist) => (
              <div
                key={specialist.id}
                className="min-w-[78vw] max-w-[20rem] snap-start md:min-w-0 md:max-w-none"
              >
                <SpecialistCard
                  variant="branch"
                  name={specialist.name}
                  title={specialist.title}
                  summary={specialist.summary}
                  specialties={specialist.specialties}
                  experienceLabel={specialist.experienceLabel}
                  imageUrl={specialist.imageUrl}
                  eyebrowLabel={eyebrowLabel}
                  href={specialist.href}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-start border-t border-border/50 pt-5 md:justify-end">
            <PrimaryButton
              href={ctaHref}
              analyticsEvent="cta_click"
              analyticsParams={{
                branch_slug: branchSlug,
                cta_label: ctaLabel,
                placement: analyticsPlacement,
              }}
              className="w-full md:w-auto"
            >
              {ctaLabel}
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
