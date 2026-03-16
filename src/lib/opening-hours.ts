import { defaultLocale, type Locale } from "@/i18n/locales";

export const openingHoursDayOrder = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type OpeningHoursDayKey = (typeof openingHoursDayOrder)[number];

const openingHoursDayLabels: Record<OpeningHoursDayKey, Record<Locale, string>> = {
  monday: { lt: "Pirmadienis", en: "Monday" },
  tuesday: { lt: "Antradienis", en: "Tuesday" },
  wednesday: { lt: "Treciadienis", en: "Wednesday" },
  thursday: { lt: "Ketvirtadienis", en: "Thursday" },
  friday: { lt: "Penktadienis", en: "Friday" },
  saturday: { lt: "Sestadienis", en: "Saturday" },
  sunday: { lt: "Sekmadienis", en: "Sunday" },
};

const openingHoursDayAliases: Record<string, OpeningHoursDayKey> = {
  monday: "monday",
  pirmadienis: "monday",
  mon: "monday",
  tuesday: "tuesday",
  antradienis: "tuesday",
  tue: "tuesday",
  tues: "tuesday",
  wednesday: "wednesday",
  treciadienis: "wednesday",
  wed: "wednesday",
  thursday: "thursday",
  ketvirtadienis: "thursday",
  thu: "thursday",
  thur: "thursday",
  thurs: "thursday",
  friday: "friday",
  penktadienis: "friday",
  fri: "friday",
  saturday: "saturday",
  sestadienis: "saturday",
  sat: "saturday",
  sunday: "sunday",
  sekmadienis: "sunday",
  sun: "sunday",
};

export function normalizeOpeningHoursDayKey(day: string | null | undefined) {
  if (!day) {
    return null;
  }

  return openingHoursDayAliases[day.trim().toLowerCase()] ?? null;
}

export function getOpeningHoursDayLabel(
  day: string | null | undefined,
  locale: Locale = defaultLocale,
) {
  const dayKey = normalizeOpeningHoursDayKey(day);

  if (!dayKey) {
    return day ?? "";
  }

  return openingHoursDayLabels[dayKey][locale];
}
