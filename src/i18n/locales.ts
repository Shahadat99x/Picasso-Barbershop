export const defaultLocale = "lt" as const;
export const locales = ["lt", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  lt: "Lietuvių",
  en: "English",
};

export const localeLabels: Record<Locale, string> = {
  lt: "LT",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  
  if (isLocale(firstSegment)) {
    return firstSegment;
  }
  
  return defaultLocale;
}

export function getPathWithLocale(path: string, locale: Locale): string {
  // If it's the default locale (lt), we can optionally keep it clean
  // For now, we'll always include the locale prefix for clarity
  if (locale === defaultLocale) {
    // For LT, we keep the path as is (no /lt prefix) for cleaner URLs
    // This maintains backward compatibility with existing LT routes
    return path;
  }
  
  // For EN, add the /en prefix
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === defaultLocale ? "en" : defaultLocale;
}
