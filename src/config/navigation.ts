export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Services", href: "/paslaugos" },
  { label: "Branches", href: "/filialai" },
  { label: "Gallery", href: "/galerija" },
  { label: "About", href: "/apie-mus" },
  { label: "Contact", href: "/kontaktai" },
];

export const footerNavGroups = {
  explore: [
    { label: "Services", href: "/paslaugos" },
    { label: "Branches", href: "/filialai" },
    { label: "Gallery", href: "/galerija" },
    { label: "About Us", href: "/apie-mus" },
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
  description: "A premium salon experience based in Vilnius.",
  contactEmail: "hello@picassobarbershop.lt",
  contactPhone: "+370 600 00000",
  bookingUrl: "/kontaktai#rezervacija",
};
