export interface AdminNavItem {
  label: string;
  href: string;
  section?: string;
  description: string;
}

export const adminNavigation: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    description: "Overview, environment status, and content totals.",
  },
  {
    label: "Branches",
    href: "/admin/branches",
    section: "branches",
    description: "Manage branch pages, contact details, and hours.",
  },
  {
    label: "Services",
    href: "/admin/services",
    section: "services",
    description: "Control service content, metadata, and availability.",
  },
  {
    label: "Specialists",
    href: "/admin/specialists",
    section: "specialists",
    description: "Maintain team profiles and branch assignments.",
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    section: "gallery",
    description: "Organize gallery items and future media relations.",
  },
  {
    label: "Promotions",
    href: "/admin/promotions",
    section: "promotions",
    description: "Prepare campaigns, banners, and booking prompts.",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    section: "blog",
    description: "Publish editorial articles and SEO-ready content.",
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    section: "testimonials",
    description: "Moderate and feature client social proof.",
  },
  {
    label: "Leads",
    href: "/admin/leads",
    section: "leads",
    description: "Review contact enquiries and booking follow-ups.",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    section: "settings",
    description: "Update global business and SEO defaults.",
  },
];

export const adminContentNavigation = adminNavigation.filter(
  (item) => item.section,
);

export function getAdminSection(section: string) {
  return adminContentNavigation.find((item) => item.section === section) ?? null;
}
