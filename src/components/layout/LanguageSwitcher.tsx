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
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <button
        onClick={() => switchLocale("lt")}
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          currentLocale === "lt" 
            ? "text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to Lithuanian"
      >
        {localeLabels.lt}
      </button>
      <span className="text-muted-foreground/30">|</span>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          currentLocale === "en" 
            ? "text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        {localeLabels.en}
      </button>
    </div>
  );
}
