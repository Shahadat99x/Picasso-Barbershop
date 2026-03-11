/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface BranchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  address: string;
  hours: string;
  imageUrl?: string;
  href?: string;
}

export function BranchCard({
  name,
  address,
  hours,
  imageUrl,
  href,
  className,
  ...props
}: BranchCardProps) {
  const CardContent = (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl bg-card shadow-sm border border-border/50 hover:shadow-md transition-all flex flex-col h-full",
        href && "hover:border-primary/50 cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="aspect-[4/3] w-full bg-muted overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 bg-secondary/30 transition-colors duration-500 group-hover:bg-transparent">
            Image Placeholder
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="mb-4 text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">{name}</h3>
        
        <div className="space-y-3 mt-auto text-sm text-muted-foreground mb-4">
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
          <div className="mt-auto pt-4 border-t border-border/50 text-right">
            <span className="text-sm font-medium text-primary hover:underline underline-offset-4 pointer-events-none">
              View Details →
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
