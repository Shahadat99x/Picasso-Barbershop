import React from "react";
import { SpecialistCard } from "@/components/shared/SpecialistCard";

interface TeamPreviewCardProps {
  name: string;
  role: string;
  imageUrl?: string;
  branch?: string;
  experience?: string;
  specialties: string[];
  summary: string;
  eyebrowLabel?: string;
}

export function TeamPreviewCard({
  name,
  role,
  imageUrl,
  branch,
  experience,
  specialties,
  summary,
  eyebrowLabel,
}: TeamPreviewCardProps) {
  return (
    <SpecialistCard
      variant="editorial"
      name={name}
      title={role}
      imageUrl={imageUrl}
      branchLabel={branch}
      experienceLabel={experience}
      specialties={specialties}
      summary={summary}
      eyebrowLabel={eyebrowLabel}
    />
  );
}
