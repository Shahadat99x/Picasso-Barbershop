import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SpecialistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  title: string;
  imageUrl?: string;
  eyebrowLabel?: string;
}

export function SpecialistCard({
  name,
  title,
  imageUrl,
  eyebrowLabel,
  className,
  ...props
}: SpecialistCardProps) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-[1.85rem] border border-border/60 bg-card p-4 text-center shadow-sm shadow-black/5 transition-all hover:shadow-md",
        className,
      )}
      {...props}
    >
      <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-[1.45rem] border border-border/50 bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/20 text-muted-foreground/30">
            Portrait
          </div>
        )}
      </div>
      {eyebrowLabel ? (
        <span className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrowLabel}
        </span>
      ) : null}
      <h3 className="mb-1 text-xl font-medium tracking-tight text-foreground">{name}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{title}</p>
    </div>
  );
}
