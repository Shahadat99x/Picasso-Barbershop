import React from "react";
import { Container } from "./Container";
import { PrimaryButton } from "../ui/PrimaryButton";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Brand/Logo Placeholder */}
          <span className="text-2xl font-bold tracking-tight">Picasso</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#" className="transition-colors hover:text-foreground">Services</a>
          <a href="#" className="transition-colors hover:text-foreground">Branches</a>
          <a href="#" className="transition-colors hover:text-foreground">Gallery</a>
          <a href="#" className="transition-colors hover:text-foreground">About</a>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <PrimaryButton className="h-10 px-6 text-sm">Book</PrimaryButton>
        </div>

        {/* Mobile Nav */}
        <MobileNav />
      </Container>
    </header>
  );
}
