import type { Locale } from "@/i18n/locales";

export type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "contact_submit_success"
  | "map_open"
  | "phone_click"
  | "branch_visit_intent"
  | "service_explore_intent";

type AnalyticsPrimitive = string | number | boolean;

export type AnalyticsEventParams = Record<
  string,
  AnalyticsPrimitive | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isAnalyticsPrimitive(value: unknown): value is AnalyticsPrimitive {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "lt";
}

export function getPageTypeFromPath(pathname: string) {
  const normalizedPath = pathname.replace(/[?#].*$/, "");
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "home";
  }

  const isEnglish = segments[0] === "en";
  const topLevelSegment = isEnglish ? segments[1] : segments[0];
  const depth = isEnglish ? segments.length - 1 : segments.length;

  switch (topLevelSegment) {
    case "services":
    case "paslaugos":
      return depth > 1 ? "service_detail" : "services_index";
    case "branches":
    case "filialai":
      return depth > 1 ? "branch_detail" : "branches_index";
    case "contact":
    case "kontaktai":
      return "contact";
    case "about":
    case "apie-mus":
      return "about";
    case "gallery":
    case "galerija":
      return "gallery";
    case "blog":
    case "blogas":
      return depth > 1 ? "blog_detail" : "blog_index";
    default:
      return depth > 1 ? "detail" : topLevelSegment;
  }
}

export function getSlugFromHref(href: string) {
  const normalizedHref = href.replace(/[?#].*$/, "").replace(/\/+$/, "");
  const segments = normalizedHref.split("/").filter(Boolean);
  return segments[segments.length - 1];
}

export function isPhoneHref(href: string) {
  return href.startsWith("tel:");
}

function sanitizeParams(params: AnalyticsEventParams) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        (!(typeof value === "string") || value.trim().length > 0) &&
        isAnalyticsPrimitive(value),
    ),
  );
}

function getDefaultPageContext() {
  if (typeof window === "undefined") {
    return {};
  }

  const pagePath = getCurrentPath();

  return {
    locale: getLocaleFromPath(window.location.pathname),
    page_path: pagePath,
    page_type: getPageTypeFromPath(window.location.pathname),
  };
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, sanitizeParams({
    ...getDefaultPageContext(),
    ...params,
  }));
}

export function trackPageView(pagePath = getCurrentPath()) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", sanitizeParams({
    page_path: pagePath,
    page_location: window.location.href,
    locale: getLocaleFromPath(window.location.pathname),
    page_type: getPageTypeFromPath(window.location.pathname),
  }));
}
