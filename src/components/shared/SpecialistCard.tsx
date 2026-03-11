/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";

interface SpecialistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  title: string;
  imageUrl?: string;
}

export function SpecialistCard({
  name,
  title,
  imageUrl,
  className,
  ...props
}: SpecialistCardProps) {
  return (
    <div className={cn("group flex flex-col items-center text-center", className)} {...props}>
      <div className="relative mb-6 aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl bg-muted border border-border/50 transition-all group-hover:shadow-md">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/20 text-muted-foreground/30">
            Portrait
          </div>
        )}
      </div>
      <h3 className="mb-1 text-xl font-medium tracking-tight text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}
