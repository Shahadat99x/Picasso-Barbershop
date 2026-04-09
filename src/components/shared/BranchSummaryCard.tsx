import React from "react";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

interface BranchSummaryCardProps {
  name: string;
  address: string;
  phone: string;
  hoursSummary: string;
  mapUrl?: string;
  branchHref: string;
  bookingHref: string;
  eyebrow?: string;
  branchLabel?: string;
  bookingLabel?: string;
  mapAriaLabel?: string;
}

export function BranchSummaryCard({
  name,
  address,
  phone,
  hoursSummary,
  mapUrl,
  branchHref,
  bookingHref,
  eyebrow = "Branch",
  branchLabel = "View branch",
  bookingLabel = "Call branch",
  mapAriaLabel,
}: BranchSummaryCardProps) {
  return (
    <article className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {eyebrow}
          </span>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">{name}</h3>
        </div>
        {mapUrl ? (
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex rounded-full border border-border/60 bg-background p-3 text-primary transition-colors hover:bg-secondary/20"
            aria-label={mapAriaLabel || `Open map for ${name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <div className="mt-6 space-y-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{address}</span>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <a href={`tel:${phone.replace(/\s+/g, "")}`} className="focus-ring rounded-sm hover:text-foreground">
            {phone}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{hoursSummary}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SecondaryButton href={branchHref} className="w-full flex-1">
          {branchLabel}
        </SecondaryButton>
        <PrimaryButton href={bookingHref} className="w-full flex-1">
          {bookingLabel}
        </PrimaryButton>
      </div>
    </article>
  );
}
