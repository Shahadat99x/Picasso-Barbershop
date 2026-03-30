import type { Database } from "@/lib/supabase/types";
import { generateSlug } from "@/lib/utils/slug";

type SpecialistInsert = Database["public"]["Tables"]["specialists"]["Insert"];
type SpecialistUpdate = Database["public"]["Tables"]["specialists"]["Update"];

function toTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function toNullableString(value: unknown) {
  const normalized = toTrimmedString(value);
  return normalized || null;
}

function toBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function toInteger(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value);
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number.parseInt(value, 10);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function toNullableNonNegativeInteger(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = toInteger(value, Number.NaN);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function normalizeSpecialistInput(
  input: SpecialistInsert | SpecialistUpdate,
): SpecialistInsert | SpecialistUpdate {
  const full_name = toTrimmedString(input.full_name);
  const slugSource = toTrimmedString(input.slug) || full_name;
  const slug = generateSlug(slugSource);

  return {
    ...input,
    full_name,
    slug,
    role_lt: toTrimmedString(input.role_lt),
    role_en: toNullableString(input.role_en),
    bio_lt: toNullableString(input.bio_lt),
    bio_en: toNullableString(input.bio_en),
    photo_url: toNullableString(input.photo_url),
    years_experience: toNullableNonNegativeInteger(input.years_experience),
    specialties_lt: toStringArray(input.specialties_lt),
    specialties_en: toStringArray(input.specialties_en),
    branch_id: toNullableString(input.branch_id),
    is_active: toBoolean(input.is_active, true),
    is_featured: toBoolean(input.is_featured, false),
    sort_order: toInteger(input.sort_order, 0),
  };
}

export function validateSpecialistInput(input: SpecialistInsert | SpecialistUpdate) {
  if (!toTrimmedString(input.full_name)) {
    return "Full name is required.";
  }

  if (!toTrimmedString(input.role_lt)) {
    return "Lithuanian role/title is required.";
  }

  if (!toTrimmedString(input.slug)) {
    return "Slug is required.";
  }

  if (input.years_experience !== null && input.years_experience !== undefined) {
    const years = toNullableNonNegativeInteger(input.years_experience);

    if (years === null) {
      return "Experience must be a non-negative whole number.";
    }
  }

  return null;
}
