import React from "react";
import { Container } from "./Container";
import { PrimaryButton } from "../ui/PrimaryButton";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { mainNav, siteConfig } from "@/config/navigation";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Brand/Logo Placeholder */}
          <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity">
            {siteConfig.name.split(" ")[0]}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <Link href={siteConfig.bookingUrl}>
            <PrimaryButton className="h-10 px-6 text-sm">Book</PrimaryButton>
          </Link>
        </div>

        {/* Mobile Nav */}
        <MobileNav />
      </Container>
    </header>
  );
}
