import { Locale, defaultLocale, getPathWithLocale } from "@/i18n/locales";
import { navDictionary, footerDictionary } from "@/i18n/dictionaries/ui";

export interface NavItem {
  label: string;
  href: string;
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
    { label: t.services, href: locale === defaultLocale ? "/paslaugos" : "/en/services" },
    { label: t.branches, href: locale === defaultLocale ? "/filialai" : "/en/branches" },
    { label: t.gallery, href: locale === defaultLocale ? "/galerija" : "/en/gallery" },
    { label: t.about, href: locale === defaultLocale ? "/apie-mus" : "/en/about" },
    { label: t.blog, href: locale === defaultLocale ? "/blogas" : "/en/blog" },
    { label: t.contact, href: locale === defaultLocale ? "/kontaktai" : "/en/contact" },
  ];
}

/**
 * Get footer navigation for a specific locale
 */
export function getFooterNav(locale: Locale = defaultLocale) {
  const t = footerDictionary[locale];
  return {
    explore: [
      { label: t.services, href: locale === defaultLocale ? "/paslaugos" : "/en/services" },
      { label: t.branches, href: locale === defaultLocale ? "/filialai" : "/en/branches" },
      { label: t.gallery, href: locale === defaultLocale ? "/galerija" : "/en/gallery" },
      { label: t.about, href: locale === defaultLocale ? "/apie-mus" : "/en/about" },
      { label: t.blog, href: locale === defaultLocale ? "/blogas" : "/en/blog" },
      { label: t.contact, href: locale === defaultLocale ? "/kontaktai" : "/en/contact" },
    ],
    legal: [
      { label: t.privacyPolicy, href: "/privacy-policy" },
      { label: t.termsOfService, href: "/terms" },
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
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
};

export const siteConfig = {
  name: "Picasso Barbershop",
  description:
    "Premium grooming, haircut, beard, and salon experiences across three Vilnius branches.",
  contactEmail: "hello@picassobarbershop.lt",
  contactPhone: "+370 600 00000",
  bookingUrl: "/kontaktai#rezervacija",
  siteUrl: "https://picassobarbershop.lt",
  defaultOgImage: "/mock/gallery/lounge.svg",
  defaultAddress: "Vilniaus g. 22, Vilnius, Lithuania",
  priceRange: "$$",
  sameAs: ["https://instagram.com", "https://facebook.com"],
};
