import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface SpecialistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  title: string;
  summary: string;
  specialties?: string[];
  branchLabel?: string;
  experienceLabel?: string;
  imageUrl?: string;
  eyebrowLabel?: string;
  href?: string;
  variant?: "compact" | "editorial" | "branch";
}

export function SpecialistCard({
  name,
  title,
  summary,
  specialties = [],
  branchLabel,
  experienceLabel,
  imageUrl,
  eyebrowLabel,
  href,
  variant = "compact",
  className,
  ...props
}: SpecialistCardProps) {
  const isEditorial = variant === "editorial";
  const isBranch = variant === "branch";
  const visibleSpecialties = specialties
    .filter(Boolean)
    .slice(0, isBranch ? 1 : 2);
  const fallbackInitial = name.trim().charAt(0).toUpperCase() || "P";
  const card = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card/95 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10",
        href && "cursor-pointer",
        isEditorial && "bg-[linear-gradient(180deg,rgba(249,246,241,0.98)_0%,rgba(255,255,255,0.98)_100%)]",
        isBranch && "bg-[linear-gradient(180deg,#f9f5ef_0%,#ffffff_100%)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[linear-gradient(180deg,rgba(33,27,24,0.08),rgba(33,27,24,0.2))]",
          isEditorial
            ? "aspect-[4/4.7]"
            : isBranch
              ? "aspect-[4/4.65]"
              : "aspect-[4/5]",
        )}
      >
        {imageUrl ? (
          <OptimizedImage
            src={imageUrl}
            alt={name}
            fill
            sizes={
              isEditorial
                ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                : isBranch
                  ? "(max-width: 768px) 78vw, (max-width: 1280px) 50vw, 33vw"
                  : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,rgba(210,175,136,0.22),rgba(28,24,22,0.08))] text-6xl font-medium tracking-tight text-foreground/35">
            {fallbackInitial}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181311]/82 via-[#181311]/28 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {eyebrowLabel ? (
            <span className="rounded-full border border-white/18 bg-black/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/88 backdrop-blur-sm">
              {eyebrowLabel}
            </span>
          ) : null}
        </div>
        {experienceLabel ? (
          <div className="absolute right-4 top-4 rounded-full border border-white/18 bg-white/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/92 backdrop-blur-sm">
            {experienceLabel}
          </div>
        ) : null}
        <div className="absolute inset-x-4 bottom-4">
          <h3 className="text-[1.5rem] font-medium tracking-tight text-white md:text-[1.72rem]">
            {name}
          </h3>
          <p className="mt-1 text-sm leading-6 text-white/78">{title}</p>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-5",
          isEditorial ? "gap-4 p-6" : isBranch ? "gap-3.5 p-5" : "gap-4",
        )}
      >
        {branchLabel ? (
          <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            <span>{branchLabel}</span>
          </div>
        ) : null}

        <p
          className={cn(
            "text-sm leading-7 text-muted-foreground",
            isBranch ? "line-clamp-2 leading-6" : "line-clamp-3",
          )}
        >
          {summary}
        </p>

        {visibleSpecialties.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {visibleSpecialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                {specialty}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );

  if (!href) {
    return card;
  }

  return (
    <Link
      href={href}
      className="block h-full rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-4"
    >
      {card}
    </Link>
  );
}
