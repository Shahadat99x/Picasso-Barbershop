import React from "react";
import { cn } from "@/lib/utils";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface BranchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  address: string;
  hours: string;
  imageUrl?: string;
  href?: string;
  detailLabel?: string;
}

export function BranchCard({
  name,
  address,
  hours,
  imageUrl,
  href,
  detailLabel = "View branch",
  className,
  ...props
}: BranchCardProps) {
  const CardContent = (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-border/60 bg-card shadow-sm shadow-black/5 transition-all",
        href && "hover:border-primary/50 cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <OptimizedImage
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(210,175,136,0.22),transparent_48%),linear-gradient(180deg,rgba(30,25,22,0.16),rgba(30,25,22,0.04))] transition-colors duration-500 group-hover:bg-[radial-gradient(circle_at_top,rgba(210,175,136,0.3),transparent_52%),linear-gradient(180deg,rgba(30,25,22,0.1),rgba(30,25,22,0.02))]" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-secondary/30 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Vilnius
          </span>
          {href ? (
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary/80 transition-colors group-hover:text-primary">
              {detailLabel}
            </span>
          ) : null}
        </div>

        <h3 className="mb-4 text-[1.7rem] font-medium tracking-tight transition-colors group-hover:text-primary">
          {name}
        </h3>
        
        <div className="mb-5 mt-auto space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{hours}</span>
          </div>
        </div>

        {href && (
          <div className="mt-auto border-t border-border/50 pt-4 text-right">
            <span className="pointer-events-none text-sm font-medium text-primary/80 transition-colors group-hover:text-primary">
              {detailLabel} {"->"}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{CardContent}</Link>;
  }

  return CardContent;
}
