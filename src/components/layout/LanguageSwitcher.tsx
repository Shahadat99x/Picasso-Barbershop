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

export function LanguageSwitcher({
  className,
  onSwitch,
  ...props
}: ExtendedLanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const currentLocale = getLocaleFromPath(pathname);
  
  const switchLocale = (newLocale: Locale) => {
    onSwitch?.();
    router.push(localizePath(pathname, newLocale));
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
