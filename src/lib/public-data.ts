import { defaultLocale, type Locale } from "@/i18n/locales";
import { siteConfig } from "@/config/navigation";
import { unstable_cache } from "next/cache";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { getOpeningHoursDayLabel } from "@/lib/opening-hours";
import {
  PUBLIC_CACHE_REVALIDATE_SECONDS,
  PUBLIC_CACHE_TAGS,
} from "@/lib/public-cache";
import {
  getLocalizedDetailRoute,
  getLocalizedRoute,
} from "@/lib/site-routes";

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type BranchRow = Database["public"]["Tables"]["branches"]["Row"];
type SpecialistRow = Database["public"]["Tables"]["specialists"]["Row"];
type GalleryRow = Database["public"]["Tables"]["gallery_items"]["Row"];
type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
type PromotionRow = Database["public"]["Tables"]["promotions"]["Row"];
type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];

export type PublicService = ServiceRow;
export type PublicBranch = BranchRow;
export type PublicSpecialist = SpecialistRow;
export type PublicGalleryItem = GalleryRow;
export type PublicTestimonial = TestimonialRow;
export type PublicBlogPost = BlogPostRow;
export type PublicPromotion = PromotionRow;
export type PublicSiteSettings = SiteSettingsRow;

export interface PublicOpeningHour {
  day: string;
  time: string;
}

export interface PublicFaqItem {
  question: string;
  answer: string;
}

export type ArticleBodyBlock =
  | {
      id: string;
      type: "paragraph";
      text: string;
    }
  | {
      id: string;
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      id: string;
      type: "list";
      style: "bullet" | "ordered";
      items: string[];
    }
  | {
      id: string;
      type: "quote";
      text: string;
      attribution?: string;
    };

export type GalleryLayout = "hero" | "portrait" | "landscape" | "square";

export interface GalleryMosaicItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  tags: string[];
  layout: GalleryLayout;
}

export interface SiteSettingsWithDefaults {
  business_name: string;
  default_phone: string;
  default_email: string;
  logo_url: string | null;
  favicon_url: string | null;
  analytics_ga4_id: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  social_tiktok: string | null;
  footer_text_lt: string | null;
  footer_text_en: string | null;
  default_meta_title_lt: string;
  default_meta_title_en: string;
  default_meta_description_lt: string;
  default_meta_description_en: string;
  theme_color: string | null;
}

export interface TransformedService {
  title: string;
  description: string;
  price: string;
  duration: string;
  href: string;
  imageUrl?: string;
}

export interface TransformedBranch {
  name: string;
  cityLabel: string;
  address: string;
  hours: string;
  imageUrl?: string;
  href: string;
}

export interface TransformedSpecialist {
  id: string;
  name: string;
  title: string;
  summary: string;
  specialties: string[];
  href: string;
  branchLabel?: string;
  experienceLabel?: string;
  imageUrl?: string;
}

export interface HomepageTeamBranchPreview {
  id: string;
  name: string;
  href: string;
  totalSpecialists: number;
  specialists: TransformedSpecialist[];
}

export interface TransformedTestimonial {
  author: string;
  content: string;
  rating: number;
}

export interface TransformedBlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  imageUrl?: string;
  imageAlt: string;
  href: string;
}

const galleryLayoutPattern: GalleryLayout[] = [
  "hero",
  "portrait",
  "square",
  "portrait",
  "landscape",
  "square",
];

const envGa4MeasurementId =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() ||
  process.env.GA4_MEASUREMENT_ID?.trim() ||
  null;

const defaultSettings: SiteSettingsWithDefaults = {
  business_name: siteConfig.name,
  default_phone: siteConfig.contactPhone,
  default_email: siteConfig.contactEmail,
  logo_url: null,
  favicon_url: null,
  analytics_ga4_id: envGa4MeasurementId,
  social_instagram: siteConfig.sameAs[0] ?? null,
  social_facebook: siteConfig.sameAs[1] ?? null,
  social_tiktok: null,
  footer_text_lt: null,
  footer_text_en: null,
  default_meta_title_lt: "Picasso Barbershop | Premium grozio salonas Vilniuje ir Kaune",
  default_meta_title_en: "Picasso Barbershop | Premium salon in Vilnius and Kaunas",
  default_meta_description_lt:
    "Premium grozio, kirpimo ir barzdos paslaugos Picasso Barbershop filialuose Vilniuje ir Kaune.",
  default_meta_description_en:
    "Premium grooming, haircut, and barber services across Picasso Barbershop branches in Vilnius and Kaunas.",
  theme_color: "#171717",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasMeaningfulLocalizedValue(value: unknown) {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (isRecord(value)) {
    return Object.keys(value).length > 0;
  }

  return true;
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function normalizeCityValue(value: string | null | undefined) {
  return value?.trim().toLowerCase() || "";
}

function getCompactBranchNameFromValue(value: string, city?: string | null) {
  const normalizedValue = value.replace(/\s+/g, " ").trim();

  if (!normalizedValue) {
    return city?.trim() || "";
  }

  const withoutBrand = normalizedValue
    .replace(/^Picasso\s+Barbershop(?:\s*[-|,:]\s*|\s+)/i, "")
    .replace(/\s+(filialas|branch)$/i, "")
    .trim();

  return withoutBrand || city?.trim() || normalizedValue;
}

function splitParagraphs(value: string) {
  return value
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function parsePlainTextArticleBody(value: string, prefix = "article"): ArticleBodyBlock[] {
  const lines = value.replace(/\r/g, "").split("\n");
  const blocks: ArticleBodyBlock[] = [];
  let paragraphLines: string[] = [];
  let listStyle: "bullet" | "ordered" | null = null;
  let listItems: string[] = [];
  let quoteLines: string[] = [];
  let blockIndex = 0;

  const nextId = (type: ArticleBodyBlock["type"]) => `${prefix}-${type}-${blockIndex++}`;

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    blocks.push({
      id: nextId("paragraph"),
      type: "paragraph",
      text: paragraphLines.join(" ").trim(),
    });
    paragraphLines = [];
  };

  const flushList = () => {
    if (!listStyle || listItems.length === 0) {
      return;
    }

    blocks.push({
      id: nextId("list"),
      type: "list",
      style: listStyle,
      items: listItems,
    });
    listStyle = null;
    listItems = [];
  };

  const flushQuote = () => {
    if (quoteLines.length === 0) {
      return;
    }

    const normalizedQuoteLines = quoteLines.map((line) => line.trim()).filter(Boolean);

    if (normalizedQuoteLines.length === 0) {
      quoteLines = [];
      return;
    }

    const lastLine = normalizedQuoteLines[normalizedQuoteLines.length - 1];
    const attributionMatch = lastLine.match(/^[-–—]\s+(.+)$/);
    const attribution = attributionMatch?.[1]?.trim();
    const contentLines = attribution
      ? normalizedQuoteLines.slice(0, -1)
      : normalizedQuoteLines;
    const text = contentLines.join(" ").trim();

    if (text) {
      blocks.push({
        id: nextId("quote"),
        type: "quote",
        text,
        attribution,
      });
    }

    quoteLines = [];
  };

  const flushOpenBlock = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushOpenBlock();
      continue;
    }

    const headingLevel3 = trimmedLine.match(/^###\s+(.+)$/);
    if (headingLevel3) {
      flushOpenBlock();
      blocks.push({
        id: nextId("heading"),
        type: "heading",
        level: 3,
        text: headingLevel3[1].trim(),
      });
      continue;
    }

    const headingLevel2 = trimmedLine.match(/^##\s+(.+)$/);
    if (headingLevel2) {
      flushOpenBlock();
      blocks.push({
        id: nextId("heading"),
        type: "heading",
        level: 2,
        text: headingLevel2[1].trim(),
      });
      continue;
    }

    const orderedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
    const bulletMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
    if (orderedMatch || bulletMatch) {
      flushParagraph();
      flushQuote();
      const resolvedStyle = orderedMatch ? "ordered" : "bullet";

      if (listStyle && listStyle !== resolvedStyle) {
        flushList();
      }

      listStyle = resolvedStyle;
      listItems.push((orderedMatch?.[1] || bulletMatch?.[1] || "").trim());
      continue;
    }

    const quoteMatch = trimmedLine.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      quoteLines.push(quoteMatch[1].trim());
      continue;
    }

    flushList();
    flushQuote();
    paragraphLines.push(trimmedLine);
  }

  flushOpenBlock();

  return blocks.length > 0
    ? blocks
    : splitParagraphs(value).map((paragraph, index) => ({
        id: `${prefix}-paragraph-${index}`,
        type: "paragraph" as const,
        text: paragraph,
      }));
}

function normalizeSocialUrl(
  value: string | null | undefined,
  platform: "instagram" | "facebook" | "tiktok",
) {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("@")) {
    switch (platform) {
      case "instagram":
        return `https://www.instagram.com/${trimmedValue.slice(1)}`;
      case "facebook":
        return `https://www.facebook.com/${trimmedValue.slice(1)}`;
      case "tiktok":
        return `https://www.tiktok.com/${trimmedValue}`;
      default:
        return trimmedValue;
    }
  }

  return `https://${trimmedValue.replace(/^\/+/, "")}`;
}

function getAdminClient() {
  if (!hasSupabaseAdminEnv()) {
    return null;
  }

  return createSupabaseAdminClient();
}

function logPublicDataError(scope: string, error: unknown) {
  const message = error instanceof Error
    ? error.message
    : isRecord(error) && typeof error.message === "string"
      ? error.message
      : "";

  if (message.includes("Dynamic server usage")) {
    return;
  }

  console.error(`Failed to fetch public data for ${scope}:`, error);
}

async function runPublicQuery<T>(
  scope: string,
  fallback: T,
  query: (
    client: ReturnType<typeof createSupabaseAdminClient>,
  ) => Promise<{ data: T | null; error: unknown }>,
) {
  const client = getAdminClient();

  if (!client) {
    return fallback;
  }

  try {
    const { data, error } = await query(client);

    if (error) {
      logPublicDataError(scope, error);
      return fallback;
    }

    return (data ?? fallback) as T;
  } catch (error) {
    logPublicDataError(scope, error);
    return fallback;
  }
}

function createPublicDataCache<Args extends unknown[], T>(
  key: string,
  tags: string[],
  query: (...args: Args) => Promise<T>,
) : (...args: Args) => Promise<T> {
  return unstable_cache(query, [key], {
    revalidate: PUBLIC_CACHE_REVALIDATE_SECONDS,
    tags,
  }) as (...args: Args) => Promise<T>;
}

function getLocalizedFieldValue<T>(
  item: Record<string, unknown>,
  field: string,
  locale: Locale = defaultLocale,
) {
  const preferredKey = `${field}_${locale}`;
  const fallbackKey = `${field}_${defaultLocale}`;
  const preferredValue = item[preferredKey] as T | null | undefined;
  const fallbackValue = item[fallbackKey] as T | null | undefined;

  if (locale !== defaultLocale && hasMeaningfulLocalizedValue(preferredValue)) {
    return preferredValue;
  }

  if (hasMeaningfulLocalizedValue(fallbackValue)) {
    return fallbackValue;
  }

  return preferredValue ?? fallbackValue ?? null;
}

export function getLocalizedContent(
  item: Record<string, unknown>,
  field: string,
  locale: Locale = defaultLocale,
) {
  const value = getLocalizedFieldValue<string>(item, field, locale);
  return typeof value === "string" ? value : "";
}

export function getLocalizedSlug(
  item: { slug_lt: string; slug_en: string | null },
  locale: Locale = defaultLocale,
) {
  if (locale === "en" && item.slug_en) {
    return item.slug_en;
  }

  return item.slug_lt;
}

export function formatPrice(
  price: number | null,
  currency = "EUR",
  locale: Locale = defaultLocale,
) {
  if (price === null) {
    return locale === "en" ? "Price on request" : "Kaina pagal uzklausa";
  }

  return new Intl.NumberFormat(locale === "en" ? "en-IE" : "lt-LT", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDuration(minutes: number | null, locale: Locale = defaultLocale) {
  if (!minutes) {
    return locale === "en" ? "By consultation" : "Pagal konsultacija";
  }

  return `${minutes} ${locale === "en" ? "min" : "min."}`;
}

export function formatPublishedDate(
  date: string | null,
  locale: Locale = defaultLocale,
) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat(locale === "en" ? "en-IE" : "lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function normalizeOpeningHours(value: unknown): PublicOpeningHour[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const day = typeof item.day === "string" ? item.day : "";
    const time = typeof item.time === "string"
      ? item.time
      : isNonEmptyString(item.open) && isNonEmptyString(item.close)
        ? `${item.open} - ${item.close}`
        : "";

    if (!day || !time) {
      return [];
    }

    return [{ day, time }];
  });
}

export function getLocalizedOpeningHours(
  value: unknown,
  locale: Locale = defaultLocale,
): PublicOpeningHour[] {
  return normalizeOpeningHours(value).map((item) => ({
    day: getOpeningHoursDayLabel(item.day, locale),
    time: item.time,
  }));
}

export function normalizeFaqs(value: unknown): PublicFaqItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    if (!isNonEmptyString(item.question) || !isNonEmptyString(item.answer)) {
      return [];
    }

    return [
      {
        question: item.question.trim(),
        answer: item.answer.trim(),
      },
    ];
  });
}

export function normalizeArticleBody(value: unknown): ArticleBodyBlock[] {
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.flatMap((item, index) => parsePlainTextArticleBody(item, `plain-${index}`));
  }

  if (Array.isArray(value)) {
    return value.reduce<ArticleBodyBlock[]>((blocks, item, index) => {
      if (!isRecord(item) || typeof item.type !== "string") {
        return blocks;
      }

      switch (item.type) {
        case "paragraph":
          return isNonEmptyString(item.text)
            ? [
                ...blocks,
                {
                  id: typeof item.id === "string" ? item.id : `paragraph-${index}`,
                  type: "paragraph",
                  text: item.text.trim(),
                },
              ]
            : blocks;
        case "heading":
          return isNonEmptyString(item.text)
            ? [
                ...blocks,
                {
                  id: typeof item.id === "string" ? item.id : `heading-${index}`,
                  type: "heading",
                  level: item.level === 3 ? 3 : 2,
                  text: item.text.trim(),
                },
              ]
            : blocks;
        case "list": {
          const items = toStringArray(item.items);

          if (items.length === 0) {
            return blocks;
          }

          return [
            ...blocks,
            {
              id: typeof item.id === "string" ? item.id : `list-${index}`,
              type: "list",
              style: item.style === "ordered" ? "ordered" : "bullet",
              items,
            },
          ];
        }
        case "quote":
          return isNonEmptyString(item.text)
            ? [
                ...blocks,
                {
                  id: typeof item.id === "string" ? item.id : `quote-${index}`,
                  type: "quote",
                  text: item.text.trim(),
                  attribution: isNonEmptyString(item.attribution)
                    ? item.attribution.trim()
                    : undefined,
                },
              ]
            : blocks;
        default:
          return blocks;
      }
    }, []);
  }

  if (typeof value === "string") {
    return parsePlainTextArticleBody(value);
  }

  return [];
}

function estimateReadingTime(blocks: ArticleBodyBlock[], locale: Locale = defaultLocale) {
  const wordCount = blocks.reduce((total, block) => {
    if (block.type === "list") {
      return total + block.items.join(" ").split(/\s+/).filter(Boolean).length;
    }

    return total + block.text.split(/\s+/).filter(Boolean).length;
  }, 0);
  const minutes = Math.max(1, Math.ceil(wordCount / 180));

  return locale === "en" ? `${minutes} min read` : `${minutes} min skaitymo`;
}

export function getServiceBenefits(
  service: PublicService,
  locale: Locale = defaultLocale,
) {
  const preferred = getLocalizedFieldValue<unknown>(service, "benefits", locale);
  return toStringArray(preferred);
}

export function getServiceFaqs(service: PublicService, locale: Locale = defaultLocale) {
  const preferred = getLocalizedFieldValue<unknown>(service, "faq", locale);
  return normalizeFaqs(preferred);
}

export function getBranchTrustPoints(
  branch: PublicBranch,
  locale: Locale = defaultLocale,
) {
  const preferred = getLocalizedFieldValue<unknown>(branch, "trust_points", locale);
  return toStringArray(preferred);
}

export function getSpecialistSpecialties(
  specialist: PublicSpecialist,
  locale: Locale = defaultLocale,
) {
  const preferred = getLocalizedFieldValue<unknown>(specialist, "specialties", locale);
  return toStringArray(preferred);
}

export function getSpecialistSummary(
  specialist: PublicSpecialist,
  locale: Locale = defaultLocale,
) {
  const bio = getLocalizedContent(specialist, "bio", locale).trim();

  if (bio) {
    return bio;
  }

  const specialties = getSpecialistSpecialties(specialist, locale).slice(0, 2);

  if (specialties.length > 0) {
    return locale === "en"
      ? `Focus areas: ${specialties.join(" • ")}.`
      : `Pagrindines sritys: ${specialties.join(" • ")}.`;
  }

  return locale === "en"
    ? "Calm, precise grooming delivered with a premium service standard."
    : "Rami, tiksli ir premium paslaugos standarta palaikanti specialisto praktika.";
}

export function getSpecialistExperienceLabel(
  specialist: PublicSpecialist,
  locale: Locale = defaultLocale,
) {
  if (!specialist.years_experience || specialist.years_experience <= 0) {
    return null;
  }

  if (locale === "en") {
    return specialist.years_experience === 1
      ? "1 year experience"
      : `${specialist.years_experience} years experience`;
  }

  return `${specialist.years_experience} m. patirties`;
}

export function getBlogPostBody(post: PublicBlogPost, locale: Locale = defaultLocale) {
  const preferred = getLocalizedFieldValue<unknown>(post, "body", locale);
  return normalizeArticleBody(preferred);
}

export function getBlogCoverAltText(
  post: PublicBlogPost,
  locale: Locale = defaultLocale,
) {
  return getLocalizedContent(post, "cover_alt_text", locale) || getLocalizedContent(post, "title", locale);
}

export function getGalleryAltText(
  item: PublicGalleryItem,
  locale: Locale = defaultLocale,
) {
  return getLocalizedContent(item, "alt_text", locale) || getLocalizedContent(item, "title", locale);
}

export function getPrimaryOpeningHours(
  branch: PublicBranch,
  locale: Locale = defaultLocale,
) {
  const openingHours = getLocalizedOpeningHours(branch.opening_hours_json, locale);
  const firstHours = openingHours[0];

  if (!firstHours) {
    return locale === "en" ? "Hours available on profile" : "Darbo laikas nurodytas profilyje";
  }

  return `${firstHours.day}: ${firstHours.time}`;
}

export function getPromotionCtaText(
  promotion: PublicPromotion,
  locale: Locale = defaultLocale,
) {
  const localizedCta = getLocalizedContent(promotion, "cta_text", locale);
  return localizedCta || (locale === "en" ? "Learn more" : "Sužinoti daugiau");
}

const getCachedSiteSettings = createPublicDataCache(
  "site-settings",
  [PUBLIC_CACHE_TAGS.siteSettings],
  async () =>
    runPublicQuery<PublicSiteSettings | null>(
    "site settings",
    null,
    async (client) =>
      client
        .from("site_settings")
        .select("*")
        .eq("settings_key", "default")
        .maybeSingle(),
    ),
);

export async function getSiteSettings() {
  return getCachedSiteSettings();
}

export async function getSiteSettingsWithDefaults(): Promise<SiteSettingsWithDefaults> {
  const settings = await getSiteSettings();

  if (!settings) {
    return defaultSettings;
  }

  return {
    business_name: settings.business_name || defaultSettings.business_name,
    default_phone: settings.default_phone || defaultSettings.default_phone,
    default_email: settings.default_email || defaultSettings.default_email,
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url,
    analytics_ga4_id: settings.analytics_ga4_id || defaultSettings.analytics_ga4_id,
    social_instagram:
      normalizeSocialUrl(settings.social_instagram, "instagram") ||
      defaultSettings.social_instagram,
    social_facebook:
      normalizeSocialUrl(settings.social_facebook, "facebook") ||
      defaultSettings.social_facebook,
    social_tiktok:
      normalizeSocialUrl(settings.social_tiktok, "tiktok") ||
      defaultSettings.social_tiktok,
    footer_text_lt: settings.footer_text_lt,
    footer_text_en: settings.footer_text_en,
    default_meta_title_lt:
      settings.default_meta_title_lt || defaultSettings.default_meta_title_lt,
    default_meta_title_en:
      settings.default_meta_title_en || defaultSettings.default_meta_title_en,
    default_meta_description_lt:
      settings.default_meta_description_lt || defaultSettings.default_meta_description_lt,
    default_meta_description_en:
      settings.default_meta_description_en || defaultSettings.default_meta_description_en,
    theme_color: settings.theme_color || defaultSettings.theme_color,
  };
}

const getCachedPublishedServices = createPublicDataCache(
  "published-services",
  [PUBLIC_CACHE_TAGS.services],
  async (limit?: number) =>
    runPublicQuery<PublicService[]>("services", [], async (client) => {
    let query = client
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    return query;
    }),
);

export async function getPublishedServices(limit?: number) {
  return getCachedPublishedServices(limit);
}

export async function getFeaturedServices(limit = 6) {
  return getPublishedServices(limit);
}

const getCachedServiceBySlug = createPublicDataCache(
  "service-by-slug",
  [PUBLIC_CACHE_TAGS.services],
  async (slug: string) =>
    runPublicQuery<PublicService | null>("service detail", null, async (client) =>
    client
      .from("services")
      .select("*")
      .eq("is_published", true)
      .or(`slug_lt.eq.${slug},slug_en.eq.${slug}`)
      .maybeSingle(),
    ),
);

export async function getServiceBySlug(slug: string) {
  return getCachedServiceBySlug(slug);
}

const getCachedServiceById = createPublicDataCache(
  "service-by-id",
  [PUBLIC_CACHE_TAGS.services],
  async (id: string) =>
    runPublicQuery<PublicService | null>("service by id", null, async (client) =>
    client
      .from("services")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .maybeSingle(),
    ),
);

export async function getServiceById(id: string) {
  return getCachedServiceById(id);
}

const getCachedActiveBranches = createPublicDataCache(
  "active-branches",
  [PUBLIC_CACHE_TAGS.branches],
  async (limit?: number) =>
    runPublicQuery<PublicBranch[]>("branches", [], async (client) => {
    let query = client
      .from("branches")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    return query;
    }),
);

export async function getActiveBranches(limit?: number) {
  return getCachedActiveBranches(limit);
}

const getCachedBranchBySlug = createPublicDataCache(
  "branch-by-slug",
  [PUBLIC_CACHE_TAGS.branches],
  async (slug: string) =>
    runPublicQuery<PublicBranch | null>("branch detail", null, async (client) =>
    client
      .from("branches")
      .select("*")
      .eq("is_active", true)
      .or(`slug_lt.eq.${slug},slug_en.eq.${slug}`)
      .maybeSingle(),
    ),
);

export async function getBranchBySlug(slug: string) {
  return getCachedBranchBySlug(slug);
}

const getCachedBranchById = createPublicDataCache(
  "branch-by-id",
  [PUBLIC_CACHE_TAGS.branches],
  async (id: string) =>
    runPublicQuery<PublicBranch | null>("branch by id", null, async (client) =>
    client
      .from("branches")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .maybeSingle(),
    ),
);

export async function getBranchById(id: string) {
  return getCachedBranchById(id);
}

const getCachedActiveSpecialists = createPublicDataCache(
  "active-specialists",
  [PUBLIC_CACHE_TAGS.specialists],
  async (limit?: number) =>
    runPublicQuery<PublicSpecialist[]>("specialists", [], async (client) => {
    let query = client
      .from("specialists")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    return query;
    }),
);

export async function getActiveSpecialists(limit?: number) {
  return getCachedActiveSpecialists(limit);
}

export async function getFeaturedSpecialists(limit = 4) {
  return getActiveSpecialists(limit);
}

const getCachedSpecialistBySlug = createPublicDataCache(
  "specialist-by-slug",
  [PUBLIC_CACHE_TAGS.specialists],
  async (slug: string) =>
    runPublicQuery<PublicSpecialist | null>("specialist detail", null, async (client) =>
    client
      .from("specialists")
      .select("*")
      .eq("is_active", true)
      .eq("slug", slug)
      .maybeSingle(),
    ),
);

export async function getSpecialistBySlug(slug: string) {
  return getCachedSpecialistBySlug(slug);
}

const getCachedVisibleGalleryItems = createPublicDataCache(
  "visible-gallery-items",
  [PUBLIC_CACHE_TAGS.gallery],
  async (limit?: number) =>
    runPublicQuery<PublicGalleryItem[]>("gallery items", [], async (client) => {
    let query = client
      .from("gallery_items")
      .select("*")
      .eq("is_visible", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    return query;
    }),
);

export async function getVisibleGalleryItems(limit?: number) {
  return getCachedVisibleGalleryItems(limit);
}

export async function getFeaturedGalleryItems(limit = 6) {
  return getVisibleGalleryItems(limit);
}

const getCachedVisibleTestimonials = createPublicDataCache(
  "visible-testimonials",
  [PUBLIC_CACHE_TAGS.testimonials],
  async (limit?: number) =>
    runPublicQuery<PublicTestimonial[]>("testimonials", [], async (client) => {
    let query = client
      .from("testimonials")
      .select("*")
      .eq("is_visible", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    return query;
    }),
);

export async function getVisibleTestimonials(limit?: number) {
  return getCachedVisibleTestimonials(limit);
}

const getCachedPublishedBlogPosts = createPublicDataCache(
  "published-blog-posts",
  [PUBLIC_CACHE_TAGS.blog],
  async (limit?: number) =>
    runPublicQuery<PublicBlogPost[]>("blog posts", [], async (client) => {
    let query = client
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .not("published_at", "is", null)
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false });

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    return query;
    }),
);

export async function getPublishedBlogPosts(limit?: number) {
  return getCachedPublishedBlogPosts(limit);
}

const getCachedBlogPostBySlug = createPublicDataCache(
  "blog-post-by-slug",
  [PUBLIC_CACHE_TAGS.blog],
  async (slug: string) =>
    runPublicQuery<PublicBlogPost | null>("blog detail", null, async (client) =>
    client
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .or(`slug_lt.eq.${slug},slug_en.eq.${slug}`)
      .maybeSingle(),
    ),
);

export async function getBlogPostBySlug(slug: string) {
  return getCachedBlogPostBySlug(slug);
}

const getCachedActivePromotions = createPublicDataCache(
  "active-promotions",
  [PUBLIC_CACHE_TAGS.promotions],
  async (limit?: number) => {
    const now = new Date();
    const promotions = await runPublicQuery<PublicPromotion[]>(
    "promotions",
    [],
    async (client) => {
      let query = client
        .from("promotions")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("sort_order", { ascending: true });

      if (typeof limit === "number") {
        query = query.limit(limit);
      }

      return query;
    },
    );

    return promotions.filter((promotion) => {
      const startsAt = promotion.starts_at ? new Date(promotion.starts_at) : null;
      const endsAt = promotion.ends_at ? new Date(promotion.ends_at) : null;

      if (startsAt && startsAt > now) {
        return false;
      }

      if (endsAt && endsAt < now) {
        return false;
      }

      return true;
    });
  },
);

export async function getActivePromotions(limit?: number) {
  return getCachedActivePromotions(limit);
}

const getCachedAvailableBranchesForService = createPublicDataCache(
  "available-branches-for-service",
  [PUBLIC_CACHE_TAGS.services, PUBLIC_CACHE_TAGS.branches],
  async (serviceId: string) => {
    const availability = await runPublicQuery<{ branch_id: string }[]>(
    "service availability",
    [],
    async (client) =>
      client
        .from("service_branch_availability")
        .select("branch_id")
        .eq("service_id", serviceId)
      .eq("is_available", true),
    );

    const branchIds = availability.map((item) => item.branch_id).filter(Boolean);

    if (branchIds.length === 0) {
      return [];
    }

    return runPublicQuery<PublicBranch[]>("service branches", [], async (client) =>
      client
        .from("branches")
        .select("*")
        .in("id", branchIds)
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
    );
  },
);

export async function getAvailableBranchesForService(serviceId: string) {
  return getCachedAvailableBranchesForService(serviceId);
}

const getCachedAvailableServicesForBranch = createPublicDataCache(
  "available-services-for-branch",
  [PUBLIC_CACHE_TAGS.services, PUBLIC_CACHE_TAGS.branches],
  async (branchId: string) => {
    const availability = await runPublicQuery<{ service_id: string }[]>(
    "branch availability",
    [],
    async (client) =>
      client
        .from("service_branch_availability")
        .select("service_id")
        .eq("branch_id", branchId)
      .eq("is_available", true),
    );

    const serviceIds = availability.map((item) => item.service_id).filter(Boolean);

    if (serviceIds.length === 0) {
      return [];
    }

    return runPublicQuery<PublicService[]>("branch services", [], async (client) =>
      client
        .from("services")
        .select("*")
        .in("id", serviceIds)
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
    );
  },
);

export async function getAvailableServicesForBranch(branchId: string) {
  return getCachedAvailableServicesForBranch(branchId);
}

const getCachedGalleryItemsForService = createPublicDataCache(
  "gallery-items-for-service",
  [PUBLIC_CACHE_TAGS.gallery, PUBLIC_CACHE_TAGS.services],
  async (serviceId: string, limit: number = 6) =>
    runPublicQuery<PublicGalleryItem[]>("service gallery", [], async (client) =>
    client
      .from("gallery_items")
      .select("*")
      .eq("service_id", serviceId)
      .eq("is_visible", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .limit(limit),
    ),
);

export async function getGalleryItemsForService(serviceId: string, limit = 6) {
  return getCachedGalleryItemsForService(serviceId, limit);
}

const getCachedGalleryItemsForBranch = createPublicDataCache(
  "gallery-items-for-branch",
  [PUBLIC_CACHE_TAGS.gallery, PUBLIC_CACHE_TAGS.branches],
  async (branchId: string, limit: number = 6) =>
    runPublicQuery<PublicGalleryItem[]>("branch gallery", [], async (client) =>
    client
      .from("gallery_items")
      .select("*")
      .eq("branch_id", branchId)
      .eq("is_visible", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .limit(limit),
    ),
);

export async function getGalleryItemsForBranch(branchId: string, limit = 6) {
  return getCachedGalleryItemsForBranch(branchId, limit);
}

const getCachedBlogPostsForService = createPublicDataCache(
  "blog-posts-for-service",
  [PUBLIC_CACHE_TAGS.blog, PUBLIC_CACHE_TAGS.services],
  async (serviceId: string, limit: number = 3) =>
    runPublicQuery<PublicBlogPost[]>("service blog posts", [], async (client) =>
    client
      .from("blog_posts")
      .select("*")
      .eq("related_service_id", serviceId)
      .eq("is_published", true)
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(limit),
    ),
);

export async function getBlogPostsForService(serviceId: string, limit = 3) {
  return getCachedBlogPostsForService(serviceId, limit);
}

const getCachedBlogPostsForBranch = createPublicDataCache(
  "blog-posts-for-branch",
  [PUBLIC_CACHE_TAGS.blog, PUBLIC_CACHE_TAGS.branches],
  async (branchId: string, limit: number = 3) =>
    runPublicQuery<PublicBlogPost[]>("branch blog posts", [], async (client) =>
    client
      .from("blog_posts")
      .select("*")
      .eq("related_branch_id", branchId)
      .eq("is_published", true)
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(limit),
    ),
);

export async function getBlogPostsForBranch(branchId: string, limit = 3) {
  return getCachedBlogPostsForBranch(branchId, limit);
}

export function transformServiceForCard(
  service: PublicService,
  locale: Locale = defaultLocale,
): TransformedService {
  return {
    title: getLocalizedContent(service, "title", locale),
    description: getLocalizedContent(service, "short_description", locale),
    price: formatPrice(service.starting_price, service.currency_code, locale),
    duration: formatDuration(service.duration_minutes, locale),
    href: getLocalizedDetailRoute("services", getLocalizedSlug(service, locale), locale),
    imageUrl: service.cover_image_url ?? undefined,
  };
}

export function transformBranchForCard(
  branch: PublicBranch,
  locale: Locale = defaultLocale,
): TransformedBranch {
  return {
    name: getLocalizedContent(branch, "name", locale),
    cityLabel: branch.city,
    address: getLocalizedContent(branch, "address", locale) || branch.city,
    hours: getPrimaryOpeningHours(branch, locale),
    imageUrl: branch.cover_image_url ?? branch.gallery_preview_image_url ?? undefined,
    href: getLocalizedDetailRoute("branches", getLocalizedSlug(branch, locale), locale),
  };
}

export function getBranchCityCount(branches: PublicBranch[]) {
  return new Set(
    branches.map((branch) => normalizeCityValue(branch.city)).filter(Boolean),
  ).size;
}

export function getCompactBranchName(
  branch: PublicBranch,
  locale: Locale = defaultLocale,
) {
  return getCompactBranchNameFromValue(
    getLocalizedContent(branch, "name", locale),
    branch.city,
  );
}

export function transformSpecialistForCard(
  specialist: PublicSpecialist,
  locale: Locale = defaultLocale,
  branchLabel?: string,
): TransformedSpecialist {
  return {
    id: specialist.id,
    name: specialist.full_name,
    title: getLocalizedContent(specialist, "role", locale),
    summary: getSpecialistSummary(specialist, locale),
    specialties: getSpecialistSpecialties(specialist, locale),
    href: getLocalizedDetailRoute("specialists", specialist.slug, locale),
    branchLabel: branchLabel?.trim() || undefined,
    experienceLabel: getSpecialistExperienceLabel(specialist, locale) || undefined,
    imageUrl: specialist.photo_url ?? undefined,
  };
}

export function buildHomepageTeamBranchPreviews(
  branches: PublicBranch[],
  specialists: PublicSpecialist[],
  locale: Locale = defaultLocale,
  maxSpecialistsPerBranch = 3,
) {
  return branches
    .map((branch) => {
      const branchSpecialists = specialists.filter(
        (specialist) => specialist.branch_id === branch.id,
      );

      if (branchSpecialists.length === 0) {
        return null;
      }

      const branchName = getCompactBranchName(branch, locale);

      return {
        id: branch.id,
        name: branchName,
        href: getLocalizedDetailRoute(
          "branches",
          getLocalizedSlug(branch, locale),
          locale,
        ),
        totalSpecialists: branchSpecialists.length,
        specialists: branchSpecialists
          .slice(0, maxSpecialistsPerBranch)
          .map((specialist) =>
            transformSpecialistForCard(specialist, locale, branchName),
          ),
      };
    })
    .filter(
      (preview): preview is HomepageTeamBranchPreview => preview !== null,
    );
}

export function transformTestimonialForCard(
  testimonial: PublicTestimonial,
  locale: Locale = defaultLocale,
): TransformedTestimonial {
  return {
    author: testimonial.customer_name,
    content: getLocalizedContent(testimonial, "quote", locale),
    rating: testimonial.rating ?? 5,
  };
}

export function transformBlogPostForCard(
  post: PublicBlogPost,
  locale: Locale = defaultLocale,
): TransformedBlogPost {
  const body = getBlogPostBody(post, locale);

  return {
    id: post.id,
    title: getLocalizedContent(post, "title", locale),
    excerpt: getLocalizedContent(post, "excerpt", locale),
    date: formatPublishedDate(post.published_at, locale),
    readingTime: estimateReadingTime(body, locale),
    category: post.category,
    imageUrl: post.cover_image_url ?? undefined,
    imageAlt: getBlogCoverAltText(post, locale),
    href: getLocalizedDetailRoute("blog", getLocalizedSlug(post, locale), locale),
  };
}

export function transformGalleryItemForMosaic(
  item: PublicGalleryItem,
  locale: Locale = defaultLocale,
  index = 0,
): GalleryMosaicItem {
  const title = getLocalizedContent(item, "title", locale);
  const description = getLocalizedContent(item, "description", locale);
  const tags = item.category ? [item.category] : [];

  return {
    id: item.id,
    title,
    description,
    imageSrc: item.image_url,
    alt: getGalleryAltText(item, locale),
    tags,
    layout: galleryLayoutPattern[index % galleryLayoutPattern.length],
  };
}

export function getHomepageGalleryPreviewItems(
  items: PublicGalleryItem[],
  locale: Locale = defaultLocale,
  limit = 3,
) {
  return items
    .slice(0, limit)
    .map((item, index) => transformGalleryItemForMosaic(item, locale, index));
}

export function getHomepageGalleryTitle(locale: Locale = defaultLocale) {
  return locale === "en" ? "Inside the salon" : "Salono akimirkos";
}

export function getHomepageGallerySubtitle(locale: Locale = defaultLocale) {
  return locale === "en" ? "Gallery" : "Galerija";
}

export function getFallbackMetaTitle(locale: Locale = defaultLocale) {
  return locale === "en"
    ? defaultSettings.default_meta_title_en
    : defaultSettings.default_meta_title_lt;
}

export function getFallbackMetaDescription(locale: Locale = defaultLocale) {
  return locale === "en"
    ? defaultSettings.default_meta_description_en
    : defaultSettings.default_meta_description_lt;
}

export function getSiteFooterCopy(
  settings: SiteSettingsWithDefaults,
  locale: Locale = defaultLocale,
) {
  return locale === "en"
    ? settings.footer_text_en || settings.default_meta_description_en
    : settings.footer_text_lt || settings.default_meta_description_lt;
}

export function getDefaultPageDescription(locale: Locale = defaultLocale) {
  return locale === "en"
    ? defaultSettings.default_meta_description_en
    : defaultSettings.default_meta_description_lt;
}

export function getLocalizedContactPath(locale: Locale = defaultLocale) {
  return getLocalizedRoute("contact", locale);
}
