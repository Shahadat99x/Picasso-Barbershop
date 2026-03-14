"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Locale, localeLabels, getLocaleFromPath, isLocale } from "@/i18n/locales";

type LanguageSwitcherProps = React.HTMLAttributes<HTMLDivElement>;

export function LanguageSwitcher({ className, ...props }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const currentLocale = getLocaleFromPath(pathname);
  
  const switchLocale = (newLocale: Locale) => {
    // Build the new path
    let newPath: string;
    
    if (newLocale === "lt") {
      // Switching to LT: remove /en prefix if present
      if (pathname.startsWith("/en")) {
        newPath = pathname.replace(/^\/en/, "") || "/";
      } else {
        newPath = pathname;
      }
    } else {
      // Switching to EN: add /en prefix if not present
      if (pathname.startsWith("/en")) {
        newPath = pathname;
      } else {
        newPath = `/en${pathname}`;
      }
    }
    
    router.push(newPath);
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
