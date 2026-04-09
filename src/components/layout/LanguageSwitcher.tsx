"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Locale, localeLabels, getLocaleFromPath } from "@/i18n/locales";
import { localizePath } from "@/lib/site-routes";

type LanguageSwitcherProps = React.HTMLAttributes<HTMLDivElement>;

interface ExtendedLanguageSwitcherProps extends LanguageSwitcherProps {
  onSwitch?: () => void;
}

function getAlternatePathFromMetadata() {
  if (typeof document === "undefined") {
    return null;
  }

  const alternatePath = document
    .querySelector('meta[name="alternate-path"]')
    ?.getAttribute("content")
    ?.trim();

  if (alternatePath) {
    return alternatePath;
  }

  const alternateUrl = document
    .querySelector('meta[name="alternate-url"]')
    ?.getAttribute("content")
    ?.trim();

  if (!alternateUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(alternateUrl);
    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return alternateUrl;
  }
}

export function LanguageSwitcher({
  className,
  onSwitch,
  ...props
}: ExtendedLanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const currentLocale = getLocaleFromPath(pathname);
  
  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      return;
    }

    onSwitch?.();

    const alternatePath = getAlternatePathFromMetadata();
    const nextPath = alternatePath || localizePath(pathname, newLocale);

    router.push(nextPath);
  };
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-[#e3d6c8]/85 bg-white/64 p-1 shadow-[0_8px_18px_rgba(52,38,24,0.07)]",
        className,
      )}
      role="group"
      aria-label={currentLocale === "en" ? "Language switcher" : "Kalbos perjungimas"}
      {...props}
    >
      <button
        type="button"
        onClick={() => switchLocale("lt")}
        lang="lt"
        className={cn(
          "rounded-full px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
          currentLocale === "lt"
            ? "bg-[#f1e6d8] text-foreground shadow-[0_6px_14px_rgba(61,45,29,0.09)]"
            : "text-muted-foreground hover:bg-white/72 hover:text-foreground"
        )}
        aria-pressed={currentLocale === "lt"}
        aria-label="Switch to Lithuanian"
      >
        {localeLabels.lt}
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        lang="en"
        className={cn(
          "rounded-full px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
          currentLocale === "en"
            ? "bg-[#f1e6d8] text-foreground shadow-[0_6px_14px_rgba(61,45,29,0.09)]"
            : "text-muted-foreground hover:bg-white/72 hover:text-foreground"
        )}
        aria-pressed={currentLocale === "en"}
        aria-label="Switch to English"
      >
        {localeLabels.en}
      </button>
    </div>
  );
}
