import React from "react";
import { Container } from "./Container";
import { PrimaryButton } from "../ui/PrimaryButton";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PublicNavLinks } from "./PublicNavLinks";
import { getMainNav } from "@/config/navigation";
import { navDictionary } from "@/i18n/dictionaries/ui";
import { getLocalizedRoute } from "@/lib/site-routes";
import Link from "next/link";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface SiteHeaderProps {
  locale?: "lt" | "en";
  businessName?: string;
  bookingUrl?: string;
  logoUrl?: string | null;
}

export function SiteHeader({
  locale = "lt",
  businessName,
  bookingUrl,
  logoUrl,
}: SiteHeaderProps) {
  const nav = getMainNav(locale);
  const t = navDictionary[locale];
  const displayName = businessName || "Picasso Barbershop";
  const bookUrl = bookingUrl || "/kontaktai";
  const homeHref = getLocalizedRoute("home", locale);

  return (
    <header className="site-header sticky top-0 z-40 w-full px-2 pt-3 sm:px-3 sm:pt-4">
      <Container className="px-0 md:px-0 lg:px-0">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-3 rounded-[1.85rem] border border-[#e5d7c8]/80 bg-[rgba(249,246,240,0.82)] px-4 py-3 shadow-[0_10px_30px_rgba(46,33,20,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-[rgba(249,246,240,0.72)] sm:px-5 lg:min-h-[5.25rem] lg:px-6">
          <Link
            href={homeHref}
            className="flex min-w-0 items-center gap-3 rounded-full pr-2 text-foreground transition-colors hover:text-primary"
          >
            {logoUrl ? (
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#ddd0c0]/80 bg-white/80 shadow-[0_6px_16px_rgba(67,49,29,0.08)]">
                <OptimizedImage
                  src={logoUrl}
                  alt={displayName}
                  fill
                  sizes="44px"
                  className="object-contain p-1.5"
                />
              </div>
            ) : null}
            <div className="min-w-0">
              <span className="block truncate text-[1.05rem] font-semibold tracking-[0.04em] text-foreground sm:text-[1.125rem] lg:text-[1.2rem]">
                {displayName}
              </span>
            </div>
          </Link>

          <nav
            className="hidden min-[840px]:flex items-center rounded-full border border-[#e4d8ca]/90 bg-white/58 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
            aria-label={locale === "en" ? "Primary navigation" : "Pagrindine navigacija"}
          >
            <PublicNavLinks items={nav} locale={locale} />
          </nav>

          <div className="hidden min-[840px]:flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />
            <Link href={bookUrl}>
              <PrimaryButton className="h-11 rounded-full border border-[#1f1712]/5 bg-primary px-5 text-sm font-semibold shadow-[0_10px_24px_rgba(32,24,18,0.16)] hover:bg-primary/92 lg:px-6">
                {t.book}
              </PrimaryButton>
            </Link>
          </div>

          <MobileNav
            locale={locale}
            businessName={displayName}
            bookingHref={bookUrl}
            logoUrl={logoUrl}
          />
        </div>
      </Container>
    </header>
  );
}
