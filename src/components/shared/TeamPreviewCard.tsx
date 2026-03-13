import React from "react";

interface TeamPreviewCardProps {
  name: string;
  role: string;
  branch: string;
  experience: string;
  specialties: string[];
  summary: string;
}

export function TeamPreviewCard({
  name,
  role,
  branch,
  experience,
  specialties,
  summary,
}: TeamPreviewCardProps) {
  return (
    <article className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {branch}
          </span>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{role}</p>
        </div>
        <div className="rounded-full border border-border/60 bg-secondary/20 px-4 py-2 text-sm font-medium">
          {experience}
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {specialty}
          </span>
        ))}
      </div>
    </article>
  );
}
