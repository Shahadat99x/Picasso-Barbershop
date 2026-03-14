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
 * Check if content is fully translated (both LT and EN have values)
 */
export function isFullyTranslated(
  field: BilingualField<unknown> | undefined | null
): boolean {
  if (!field) return false;
  return !!(field.lt && field.en);
}

/**
 * Check if only LT content exists
 */
export function hasOnlyLtContent(
  field: BilingualField<unknown> | undefined | null
): boolean {
  if (!field) return false;
  return !!field.lt && !field.en;
}

/**
 * Get translation completeness status
 */
export type TranslationStatus = "complete" | "lt-only" | "empty";

export function getTranslationStatus(
  field: BilingualField<unknown> | undefined | null
): TranslationStatus {
  if (!field) return "empty";
  if (field.lt && field.en) return "complete";
  if (field.lt) return "lt-only";
  return "empty";
}

/**
 * Get a bilingual value from separate LT/EN columns (database pattern)
 * Falls back to LT if EN is missing/empty
 */
export function getBilingualValue<T>(
  ltValue: T | null | undefined,
  enValue: T | null | undefined,
  locale: Locale,
  fallbackToLt = true
): T | null {
  // For LT, always return LT value
  if (locale === defaultLocale) {
    return ltValue ?? null;
  }
  
  // For EN, try EN first, then fallback to LT
  if (enValue) {
    return enValue;
  }
  
  if (fallbackToLt && ltValue) {
    return ltValue;
  }
  
  return enValue ?? null;
}

/**
 * Calculate translation status from separate LT/EN columns
 */
export function calculateTranslationStatus(
  ltValue: unknown,
  enValue: unknown
): TranslationStatus {
  if (ltValue && enValue) return "complete";
  if (ltValue) return "lt-only";
  return "empty";
}

/**
 * Get title with fallback - handles both object and column patterns
 */
export function getTitle<T>(
  obj: { title_lt?: T; title_en?: T } | { title?: T } | null | undefined,
  locale: Locale,
  fallbackToLt = true
): T | null {
  if (!obj) return null;
  
  // Check for bilingual pattern (title_lt / title_en)
  if ("title_lt" in obj) {
    return getBilingualValue(obj.title_lt, obj.title_en, locale, fallbackToLt);
  }
  
  // Check for simple pattern (title)
  if ("title" in obj && obj.title) {
    return obj.title;
  }
  
  return null;
}

/**
 * Get description with fallback - handles both object and column patterns
 */
export function getDescription<T>(
  obj: { description_lt?: T; description_en?: T } | { description?: T } | null | undefined,
  locale: Locale,
  fallbackToLt = true
): T | null {
  if (!obj) return null;
  
  // Check for bilingual pattern (description_lt / description_en)
  if ("description_lt" in obj) {
    return getBilingualValue(obj.description_lt, obj.description_en, locale, fallbackToLt);
  }
  
  // Check for simple pattern (description)
  if ("description" in obj && obj.description) {
    return obj.description;
  }
  
  return null;
}

/**
 * Get slug with fallback - prefers matching locale slug
 */
export function getSlug(
  obj: { slug_lt?: string; slug_en?: string } | null | undefined,
  locale: Locale
): string | null {
  if (!obj) return null;
  
  if (locale === defaultLocale) {
    return obj.slug_lt ?? null;
  }
  
  return obj.slug_en ?? obj.slug_lt ?? null;
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

/**
 * Check if a database row has complete translations for given keys
 */
export function isRowFullyTranslated(
  row: Record<string, unknown>,
  ltKeys: string[],
  enKeys: string[]
): boolean {
  if (ltKeys.length !== enKeys.length) return false;
  
  for (let i = 0; i < ltKeys.length; i++) {
    const ltValue = row[ltKeys[i]];
    const enValue = row[enKeys[i]];
    if (!ltValue || !enValue) return false;
  }
  
  return true;
}

/**
 * Get list of missing EN fields for a database row
 */
export function getMissingEnFields(
  row: Record<string, unknown>,
  ltKeys: string[],
  enKeys: string[]
): string[] {
  const missing: string[] = [];
  
  for (let i = 0; i < ltKeys.length; i++) {
    const ltValue = row[ltKeys[i]];
    const enValue = row[enKeys[i]];
    
    if (ltValue && !enValue) {
      missing.push(ltKeys[i]);
    }
  }
  
  return missing;
}

/**
 * Safe string getter with fallback
 * Returns empty string instead of undefined for display purposes
 */
export function getDisplayContent(
  field: BilingualField<string> | undefined | null,
  locale: Locale
): string {
  const content = getLocalizedContent(field, locale);
  return content ?? "";
}

/**
 * Check if content should show fallback indicator
 * Returns true when EN is requested but only LT is available
 */
export function shouldShowFallback(
  field: BilingualField<unknown> | undefined | null,
  locale: Locale
): boolean {
  if (locale === defaultLocale) return false;
  return hasOnlyLtContent(field);
}
