import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

interface BranchSummaryCardProps {
  name: string;
  address: string;
  phone: string;
  hoursSummary: string;
  mapUrl: string;
  branchHref: string;
  bookingHref: string;
  bookingLabel?: string;
}

export function BranchSummaryCard({
  name,
  address,
  phone,
  hoursSummary,
  mapUrl,
  branchHref,
  bookingHref,
  bookingLabel = "Book here",
}: BranchSummaryCardProps) {
  const isDirectLink =
    bookingHref.startsWith("tel:") || bookingHref.startsWith("mailto:");

  return (
    <article className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Branch
          </span>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">{name}</h3>
        </div>
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-border/60 bg-background p-3 text-primary transition-colors hover:bg-secondary/20"
          aria-label={`Open map for ${name}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 space-y-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{address}</span>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
            {phone}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{hoursSummary}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={branchHref} className="flex-1">
          <SecondaryButton className="w-full">View branch</SecondaryButton>
        </Link>
        {isDirectLink ? (
          <a href={bookingHref} className="flex-1">
            <PrimaryButton className="w-full">{bookingLabel}</PrimaryButton>
          </a>
        ) : (
          <Link href={bookingHref} className="flex-1">
            <PrimaryButton className="w-full">{bookingLabel}</PrimaryButton>
          </Link>
        )}
      </div>
    </article>
  );
}
