import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "default" | "slim" | "padded" | "none";
}

export function Section({
  children,
  className,
  variant = "default",
  ...props
}: SectionProps) {
  const paddingStyles = {
    default: "py-16 md:py-24",
    slim: "py-8 md:py-12",
    padded: "py-24 md:py-32",
    none: "",
  };

  return (
    <section className={cn(paddingStyles[variant], className)} {...props}>
      {children}
    </section>
  );
}
