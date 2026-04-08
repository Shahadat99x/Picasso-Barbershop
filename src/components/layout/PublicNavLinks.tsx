"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { getRouteKeyFromPath } from "@/lib/site-routes";
import type { Locale } from "@/i18n/locales";

interface PublicNavLinksProps {
  items: NavItem[];
  locale: Locale;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function PublicNavLinks({
  items,
  locale,
  variant = "desktop",
  onNavigate,
}: PublicNavLinksProps) {
  const pathname = usePathname();
  const activeRouteKey = pathname ? getRouteKeyFromPath(pathname) : null;
  const activeLabel = locale === "en" ? "Current" : "Aktyvu";

  return (
    <>
      {items.map((item) => {
        const isActive =
          item.routeKey != null
            ? activeRouteKey === item.routeKey
            : pathname === item.href || pathname?.startsWith(`${item.href}/`);

        if (variant === "mobile") {
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-medium tracking-tight transition-colors",
                isActive
                  ? "border-primary/25 bg-secondary/30 text-foreground shadow-sm shadow-black/5"
                  : "border-border/60 bg-background/70 text-foreground hover:border-primary/20 hover:text-primary",
              )}
            >
              <span>{item.label}</span>
              {isActive ? (
                <span className="rounded-full border border-primary/20 bg-background px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  {activeLabel}
                </span>
              ) : null}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative rounded-full px-3 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-secondary/55 text-foreground shadow-sm shadow-black/5"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            {item.label}
            <span
              className={cn(
                "absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent transition-opacity",
                isActive ? "opacity-100" : "opacity-0",
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </>
  );
}
