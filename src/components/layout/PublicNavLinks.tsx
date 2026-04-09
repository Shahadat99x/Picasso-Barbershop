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
  const activeLabel = locale === "en" ? "Current" : "Aktyvus";

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
                "focus-ring flex items-center justify-between rounded-[1.4rem] border px-4 py-4 text-base font-medium tracking-tight transition-all motion-reduce:transition-none",
                isActive
                  ? "border-[#decfbc] bg-[rgba(244,234,220,0.88)] text-foreground shadow-[0_10px_22px_rgba(61,45,29,0.08)]"
                  : "border-[#e6d9cc]/85 bg-white/58 text-foreground/88 hover:border-[#d8c8b5] hover:bg-white/74 hover:text-foreground focus-visible:border-[#d8c8b5] focus-visible:bg-white/74 focus-visible:text-foreground",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border transition-colors",
                    isActive
                      ? "border-primary/15 bg-primary"
                      : "border-[#d7cabd] bg-transparent",
                  )}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </span>
              {isActive ? (
                <span className="rounded-full border border-primary/12 bg-white/82 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-sm shadow-black/5">
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
              "focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all motion-reduce:transition-none",
              isActive
                ? "bg-[#f2e7d9] text-foreground shadow-[0_8px_18px_rgba(61,45,29,0.09)]"
                : "text-foreground/72 hover:bg-white/55 hover:text-foreground focus-visible:bg-white/55 focus-visible:text-foreground",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                isActive ? "bg-primary" : "bg-[#d5c8bc]",
              )}
              aria-hidden="true"
            />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
