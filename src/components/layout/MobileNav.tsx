"use client";

import React, { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getMainNav } from "@/config/navigation";
import { navDictionary } from "@/i18n/dictionaries/ui";
import { getLocalizedRoute } from "@/lib/site-routes";
import Link from "next/link";
import { createPortal } from "react-dom";
import Image from "next/image";

interface MobileNavProps {
  locale: "lt" | "en";
  businessName: string;
  bookingHref: string;
  logoUrl?: string | null;
}

const mobileNavBodyAttribute = "data-mobile-nav-open";

export function MobileNav({
  locale,
  businessName,
  bookingHref,
  logoUrl,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();

  const nav = getMainNav(locale);
  const t = navDictionary[locale];
  const homeHref = getLocalizedRoute("home", locale);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((currentState) => !currentState);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const body = document.body;
    const html = document.documentElement;

    if (!isOpen) {
      body.removeAttribute(mobileNavBodyAttribute);
      body.style.removeProperty("overflow");
      html.style.removeProperty("overflow");
      return;
    }

    body.setAttribute(mobileNavBodyAttribute, "true");
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.removeAttribute(mobileNavBodyAttribute);
      body.style.removeProperty("overflow");
      html.style.removeProperty("overflow");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const portalTarget = typeof document === "undefined" ? null : document.body;

  const overlay = portalTarget
    ? createPortal(
        <div
          className={cn(
            "fixed inset-0 z-[120] md:hidden",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
          aria-hidden={!isOpen}
        >
          <div
            className={cn(
              "absolute inset-0 bg-background/92 backdrop-blur-md transition-opacity duration-300 ease-out",
              isOpen ? "opacity-100" : "opacity-0",
            )}
            onClick={closeMenu}
          />

          <div className="absolute inset-y-0 right-0 flex w-full justify-end pl-10">
            <section
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "en" ? "Mobile menu" : "Mobilus meniu"}
              className={cn(
                "flex h-full w-full max-w-sm flex-col border-l border-border/70 bg-card/98 shadow-2xl shadow-black/10 transition-transform duration-300 ease-out sm:max-w-[26rem]",
                "pt-[calc(env(safe-area-inset-top)+1rem)]",
                isOpen ? "translate-x-0" : "translate-x-full",
              )}
            >
              <div className="flex items-center justify-between gap-4 border-b border-border/60 px-6 pb-5">
                <Link
                  href={homeHref}
                  onClick={closeMenu}
                  className="flex min-w-0 items-center gap-3 text-left"
                >
                  {logoUrl ? (
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border/60 bg-background">
                      <Image
                        src={logoUrl}
                        alt={businessName}
                        fill
                        sizes="44px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {locale === "en" ? "Menu" : "Meniu"}
                    </span>
                    <span className="block truncate text-lg font-medium tracking-tight text-foreground">
                      {businessName}
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={locale === "en" ? "Close menu" : "Uzdaryti meniu"}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-6">
                <nav className="flex flex-col gap-2">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-base font-medium tracking-tight text-foreground transition-colors hover:border-primary/20 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto space-y-5 pt-8">
                  <div className="rounded-[1.75rem] border border-border/60 bg-secondary/20 p-5">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        {locale === "en" ? "Language" : "Kalba"}
                      </span>
                      <LanguageSwitcher className="justify-end" onSwitch={closeMenu} />
                    </div>
                    <Link href={bookingHref} onClick={closeMenu}>
                      <PrimaryButton className="h-12 w-full text-base">{t.book}</PrimaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>,
        portalTarget,
      )
    : null;

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls={dialogId}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-background/70 text-foreground transition-colors hover:border-border/60 hover:text-primary"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">
            {isOpen
              ? locale === "en"
                ? "Close menu"
                : "Uzdaryti meniu"
              : locale === "en"
                ? "Open menu"
                : "Atidaryti meniu"}
          </span>
        </button>
      </div>
      {overlay}
    </>
  );
}
