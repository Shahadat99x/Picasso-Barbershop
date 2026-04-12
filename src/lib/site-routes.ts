import { Locale, defaultLocale } from "@/i18n/locales";

export type PublicRouteKey =
  | "home"
  | "services"
  | "branches"
  | "specialists"
  | "gallery"
  | "about"
  | "blog"
  | "contact"
  | "privacyPolicy"
  | "terms"
  | "cookiePolicy";

const publicRouteSegments: Record<PublicRouteKey, Record<Locale, string>> = {
  home: { lt: "", en: "" },
  services: { lt: "paslaugos", en: "services" },
  branches: { lt: "filialai", en: "branches" },
  specialists: { lt: "specialistai", en: "specialists" },
  gallery: { lt: "galerija", en: "gallery" },
  about: { lt: "apie-mus", en: "about" },
  blog: { lt: "blogas", en: "blog" },
  contact: { lt: "kontaktai", en: "contact" },
  privacyPolicy: { lt: "privatumo-politika", en: "privacy-policy" },
  terms: { lt: "taisykles", en: "terms" },
  cookiePolicy: { lt: "slapuku-politika", en: "cookie-policy" },
};

function normalizePath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized !== "/" && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }

  return normalized;
}

function buildPath(locale: Locale, segments: string[]) {
  const filteredSegments = segments.filter(Boolean);

  if (locale === defaultLocale) {
    return filteredSegments.length > 0 ? `/${filteredSegments.join("/")}` : "/";
  }

  return filteredSegments.length > 0
    ? `/en/${filteredSegments.join("/")}`
    : "/en";
}

export function getLocalizedRoute(routeKey: PublicRouteKey, locale: Locale = defaultLocale) {
  const segment = publicRouteSegments[routeKey][locale];
  return buildPath(locale, segment ? [segment] : []);
}

export function getLocalizedDetailRoute(
  routeKey: Extract<PublicRouteKey, "services" | "branches" | "specialists" | "blog">,
  slug: string,
  locale: Locale = defaultLocale,
) {
  const basePath = getLocalizedRoute(routeKey, locale);
  return basePath === "/" ? `/${slug}` : `${basePath}/${slug}`;
}

export function getBookingPath(locale: Locale = defaultLocale) {
  return `${getLocalizedRoute("contact", locale)}#rezervacija`;
}

export function getRouteKeyFromPath(path: string): PublicRouteKey | null {
  const normalizedPath = normalizePath(path);
  const pathWithoutLocale = normalizedPath === "/en"
    ? "/"
    : normalizedPath.startsWith("/en/")
      ? normalizedPath.slice(3)
      : normalizedPath;
  const [firstSegment = ""] = pathWithoutLocale.replace(/^\//, "").split("/");

  if (!firstSegment) {
    return "home";
  }

  return (
    Object.entries(publicRouteSegments).find(([, segments]) =>
      segments.lt === firstSegment || segments.en === firstSegment,
    )?.[0] as PublicRouteKey | undefined
  ) ?? null;
}

export function localizePath(path: string, targetLocale: Locale) {
  const normalizedPath = normalizePath(path);
  const currentPathWithoutLocale = normalizedPath === "/en"
    ? "/"
    : normalizedPath.startsWith("/en/")
      ? normalizedPath.slice(3)
      : normalizedPath;

  if (currentPathWithoutLocale === "/") {
    return targetLocale === defaultLocale ? "/" : "/en";
  }

  const segments = currentPathWithoutLocale.replace(/^\//, "").split("/");
  const [firstSegment, ...restSegments] = segments;
  const matchedRoute = Object.entries(publicRouteSegments).find(([, routeSegments]) =>
    routeSegments.lt === firstSegment || routeSegments.en === firstSegment,
  );

  const targetFirstSegment = matchedRoute
    ? matchedRoute[1][targetLocale]
    : firstSegment;

  return buildPath(targetLocale, [targetFirstSegment, ...restSegments]);
}
