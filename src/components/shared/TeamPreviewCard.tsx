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
    <article className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/95 p-6 shadow-sm shadow-black/5">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-70" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {branch}
          </span>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">{name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{role}</p>
        </div>
        <div className="rounded-full border border-primary/15 bg-[linear-gradient(180deg,rgba(210,175,136,0.12),rgba(210,175,136,0.04))] px-4 py-2 text-sm font-medium text-foreground">
          {experience}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-muted-foreground">{summary}</p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {specialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            {specialty}
          </span>
        ))}
      </div>
    </article>
  );
}
