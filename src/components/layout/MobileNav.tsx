"use client";

import React, { useEffect, useId, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PublicNavLinks } from "./PublicNavLinks";
import { getMainNav } from "@/config/navigation";
import { navDictionary } from "@/i18n/dictionaries/ui";
import { getLocalizedRoute } from "@/lib/site-routes";
import Link from "next/link";
import { createPortal } from "react-dom";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

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
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

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

  const portalTarget = isMounted ? document.body : null;

  const overlay = portalTarget
    ? createPortal(
        <div
          className={cn(
            "fixed inset-0 z-[120] min-[840px]:hidden",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
          aria-hidden={!isOpen}
        >
          <div
            className={cn(
              "absolute inset-0 bg-[rgba(23,18,14,0.34)] backdrop-blur-sm transition-opacity duration-300 ease-out",
              isOpen ? "opacity-100" : "opacity-0",
            )}
            onClick={closeMenu}
          />

          <div className="absolute inset-y-0 right-0 flex w-full justify-end pl-8 pt-3 sm:pl-10 sm:pt-4">
            <section
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "en" ? "Mobile menu" : "Mobilus meniu"}
              className={cn(
                "flex h-[calc(100%-0.75rem)] w-full max-w-sm flex-col overflow-hidden rounded-[2rem] border border-[#e2d6c7]/80 bg-[rgba(249,246,240,0.95)] shadow-[0_20px_60px_rgba(28,21,15,0.18)] transition-transform duration-300 ease-out sm:h-[calc(100%-1rem)] sm:max-w-[25.5rem]",
                "pt-[calc(env(safe-area-inset-top)+0.85rem)]",
                isOpen ? "translate-x-0" : "translate-x-full",
              )}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#e2d6c8]/75 px-6 pb-5">
                <Link
                  href={homeHref}
                  onClick={closeMenu}
                  className="flex min-w-0 items-center gap-3 text-left"
                >
                  {logoUrl ? (
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#ddd0c0]/80 bg-white/82 shadow-[0_6px_16px_rgba(67,49,29,0.08)]">
                      <OptimizedImage
                        src={logoUrl}
                        alt={businessName}
                        fill
                        sizes="44px"
                        className="object-contain p-1.5"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {locale === "en" ? "Navigation" : "Navigacija"}
                    </span>
                    <span className="block truncate text-lg font-medium tracking-tight text-foreground">
                      {businessName}
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e1d5c7]/80 bg-white/72 text-muted-foreground transition-all hover:bg-white hover:text-foreground"
                  aria-label={locale === "en" ? "Close menu" : "Uzdaryti meniu"}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-6">
                <div className="mb-4">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {locale === "en" ? "Explore" : "Naršyti"}
                  </span>
                </div>

                <nav className="flex flex-col gap-2.5" aria-label={locale === "en" ? "Primary navigation" : "Pagrindine navigacija"}>
                  <PublicNavLinks items={nav} locale={locale} variant="mobile" onNavigate={closeMenu} />
                </nav>

                <div className="mt-auto pt-8">
                  <div className="rounded-[1.8rem] border border-[#e2d5c6]/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(244,235,223,0.94))] p-5 shadow-[0_12px_28px_rgba(59,42,25,0.08)]">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          {locale === "en" ? "Language" : "Kalba"}
                        </span>
                        <p className="mt-1 text-sm text-foreground/72">
                          {locale === "en" ? "Choose your browsing language." : "Pasirinkite naršymo kalbą."}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <LanguageSwitcher className="justify-end" onSwitch={closeMenu} />
                      </div>
                    </div>
                    <Link href={bookingHref} onClick={closeMenu}>
                      <PrimaryButton className="h-12 w-full rounded-full border border-[#1f1712]/5 bg-primary text-base font-semibold shadow-[0_12px_26px_rgba(32,24,18,0.15)] hover:bg-primary/92">
                        {t.book}
                      </PrimaryButton>
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
      <div className="min-[840px]:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls={dialogId}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e3d7ca]/75 bg-white/62 text-foreground transition-all hover:bg-white/80 hover:text-primary"
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
