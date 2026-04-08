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
        "inline-flex items-center rounded-full border border-border/60 bg-background/88 p-1 shadow-sm shadow-black/5",
        className,
      )}
      role="group"
      aria-label={currentLocale === "en" ? "Language switcher" : "Kalbos perjungimas"}
      {...props}
    >
      <button
        type="button"
        onClick={() => switchLocale("lt")}
        className={cn(
          "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
          currentLocale === "lt"
            ? "bg-secondary text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={currentLocale === "lt"}
        aria-label="Switch to Lithuanian"
      >
        {localeLabels.lt}
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
          currentLocale === "en"
            ? "bg-secondary text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={currentLocale === "en"}
        aria-label="Switch to English"
      >
        {localeLabels.en}
      </button>
    </div>
  );
}
