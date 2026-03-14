import { Locale, defaultLocale } from "./locales";

/**
 * Type for bilingual content fields
 */
export type BilingualField<T> = {
  lt: T;
  en: T;
};

/**
 * Get the appropriate content based on locale
 * Falls back to LT if the requested locale's content is not available
 */
export function getLocalizedContent<T>(
  field: BilingualField<T> | undefined | null,
  locale: Locale
): T {
  if (!field) {
    return undefined as T;
  }
  
  // If locale is default (LT), return LT content
  if (locale === defaultLocale) {
    return field.lt;
  }
  
  // For EN, try EN content first, fallback to LT
  if (field.en) {
    return field.en;
  }
  
  return field.lt;
}

/**
 * Get content with explicit fallback
 */
export function getBilingualField<T>(
  lt: T,
  en: T,
  locale: Locale,
  fallbackToLt = true
): T {
  if (locale === defaultLocale) {
    return lt;
  }
  
  if (en) {
    return en;
  }
  
  return fallbackToLt ? lt : en;
}

/**
 * Check if bilingual content exists
 */
export function hasLocalizedContent(
  field: BilingualField<unknown> | undefined | null
): boolean {
  return !!(field && (field.lt || field.en));
}

/**
 * Type for database row with bilingual fields
 */
export type BilingualColumns<T> = {
  [K in keyof T]: T[K] extends BilingualField<infer U> ? BilingualField<U> : T[K];
};

/**
 * Get a bilingual value from a database row, returning the appropriate locale value
 */
export function getFieldValue<T>(
  row: Record<string, unknown>,
  ltKey: string,
  enKey: string,
  locale: Locale
): T {
  const ltValue = row[ltKey] as T | undefined;
  const enValue = row[enKey] as T | undefined;
  
  if (locale === defaultLocale) {
    return ltValue ?? enValue ?? (undefined as T);
  }
  
  // For EN, try EN first, then fallback to LT
  return enValue ?? ltValue ?? (undefined as T);
}
