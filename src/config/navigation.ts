import { Locale, defaultLocale } from "@/i18n/locales";
import type { PublicRouteKey } from "@/lib/site-routes";
import { navDictionary, footerDictionary } from "@/i18n/dictionaries/ui";
import { getLocalizedRoute } from "@/lib/site-routes";

export interface NavItem {
  label: string;
  href: string;
  routeKey?: PublicRouteKey;
}

export interface FooterNavItem {
  label: string;
  href: string;
}

/**
 * Get navigation items for a specific locale
 */
export function getMainNav(locale: Locale = defaultLocale): NavItem[] {
  const t = navDictionary[locale];
  return [
    { label: t.services, href: getLocalizedRoute("services", locale), routeKey: "services" },
    { label: t.branches, href: getLocalizedRoute("branches", locale), routeKey: "branches" },
    { label: t.gallery, href: getLocalizedRoute("gallery", locale), routeKey: "gallery" },
    { label: t.about, href: getLocalizedRoute("about", locale), routeKey: "about" },
    { label: t.blog, href: getLocalizedRoute("blog", locale), routeKey: "blog" },
    { label: t.contact, href: getLocalizedRoute("contact", locale), routeKey: "contact" },
  ];
}

/**
 * Get footer navigation for a specific locale
 */
export function getFooterNav(locale: Locale = defaultLocale) {
  const t = footerDictionary[locale];
  return {
    explore: [
      { label: t.services, href: getLocalizedRoute("services", locale) },
      { label: t.branches, href: getLocalizedRoute("branches", locale) },
      { label: t.gallery, href: getLocalizedRoute("gallery", locale) },
      { label: t.about, href: getLocalizedRoute("about", locale) },
      { label: t.blog, href: getLocalizedRoute("blog", locale) },
      { label: t.contact, href: getLocalizedRoute("contact", locale) },
    ],
    legal: [
      { label: t.privacyPolicy, href: getLocalizedRoute("privacyPolicy", locale) },
      { label: t.termsOfService, href: getLocalizedRoute("terms", locale) },
      { label: t.cookiePolicy, href: getLocalizedRoute("cookiePolicy", locale) },
    ],
    social: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" },
    ],
  };
}

/**
 * Legacy nav for backward compatibility during transition
 * @deprecated Use getMainNav instead
 */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/paslaugos" },
  { label: "Branches", href: "/filialai" },
  { label: "Gallery", href: "/galerija" },
  { label: "About", href: "/apie-mus" },
  { label: "Blog", href: "/blogas" },
  { label: "Contact", href: "/kontaktai" },
];

/**
 * Legacy footer nav for backward compatibility
 * @deprecated Use getFooterNav instead
 */
export const footerNavGroups = {
  explore: [
    { label: "Services", href: "/paslaugos" },
    { label: "Branches", href: "/filialai" },
    { label: "Gallery", href: "/galerija" },
    { label: "About Us", href: "/apie-mus" },
    { label: "Blog", href: "/blogas" },
    { label: "Contact", href: "/kontaktai" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privatumo-politika" },
    { label: "Terms of Service", href: "/taisykles" },
    { label: "Cookie Policy", href: "/slapuku-politika" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
};

export const siteConfig = {
  name: "Picasso Barbershop",
  description:
    "Premium grooming, haircut, beard, and salon experiences across Picasso Barbershop branches in Vilnius and Kaunas.",
  contactEmail: "hello@picassobarbershop.lt",
  contactPhone: "+370 600 00000",
  bookingUrl: "/kontaktai",
  siteUrl: "https://picassobarbershop.lt",
  defaultOgImage: "/mock/gallery/lounge.svg",
  defaultAddress: "Vilniaus g. 22, Vilnius, Lithuania",
  priceRange: "$$",
  sameAs: ["https://instagram.com", "https://facebook.com"],
};
