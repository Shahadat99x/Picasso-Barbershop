export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Branches", href: "/#branches" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/#blog" },
];

export const footerNavGroups = {
  explore: [
    { label: "Services", href: "/#services" },
    { label: "Branches", href: "/#branches" },
    { label: "Gallery", href: "/#gallery" },
    { label: "About Us", href: "/#about" },
    { label: "Blog", href: "/#blog" },
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
  description: "A premium salon experience based in Vilnius.",
  contactEmail: "hello@picassobarbershop.lt",
  contactPhone: "+370 600 00000",
  bookingUrl: "#book", // To be replaced with actual booking link in Phase 3b
};
