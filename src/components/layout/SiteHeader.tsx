import React from "react";
import Image from "next/image";
import { Container } from "./Container";
import { PrimaryButton } from "../ui/PrimaryButton";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
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
  const bookUrl = bookingUrl || "/kontaktai#rezervacija";
  const homeHref = getLocalizedRoute("home", locale);
  
  return (
    <header className="site-header sticky top-0 z-40 w-full border-b border-white/8 bg-background/72 shadow-[0_8px_28px_rgba(17,17,17,0.06)] backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
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
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <Link href={bookUrl}>
            <PrimaryButton className="h-10 px-6 text-sm">{t.book}</PrimaryButton>
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
