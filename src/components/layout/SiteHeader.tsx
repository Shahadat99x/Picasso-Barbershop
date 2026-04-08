import React from "react";
import Image from "next/image";
import { Container } from "./Container";
import { PrimaryButton } from "../ui/PrimaryButton";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PublicNavLinks } from "./PublicNavLinks";
import { getMainNav } from "@/config/navigation";
import { navDictionary } from "@/i18n/dictionaries/ui";
import { getLocalizedRoute } from "@/lib/site-routes";
import Link from "next/link";

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
    <header className="site-header sticky top-0 z-40 w-full border-b border-white/8 bg-background/72 shadow-[0_8px_28px_rgba(17,17,17,0.06)] backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href={homeHref}
            className="flex items-center gap-3 text-2xl font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            {logoUrl ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/60 bg-background">
                <Image
                  src={logoUrl}
                  alt={displayName}
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
            ) : null}
            <span>{displayName}</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden min-[840px]:flex items-center gap-2 lg:gap-3" aria-label={locale === "en" ? "Primary navigation" : "Pagrindine navigacija"}>
          <PublicNavLinks items={nav} locale={locale} />
        </nav>

        <div className="hidden min-[840px]:flex items-center gap-4 lg:gap-6">
          <LanguageSwitcher />
          <Link href={bookUrl}>
            <PrimaryButton className="h-10 px-5 text-sm lg:px-6">{t.book}</PrimaryButton>
          </Link>
        </div>

        {/* Mobile Nav */}
        <MobileNav
          locale={locale}
          businessName={displayName}
          bookingHref={bookUrl}
          logoUrl={logoUrl}
        />
      </Container>
    </header>
  );
}
