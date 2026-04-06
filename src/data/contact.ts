import { siteConfig } from "@/config/navigation";

export interface ContactHighlight {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface ContactFormField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "textarea";
}

export const contactHighlights: ContactHighlight[] = [
  {
    id: "contact-1",
    title: "Browse branches natively",
    description:
      "If you already know the service or branch you want, review the options and find the best branch for your visit.",
    href: "/filialai",
    linkLabel: "View branches",
  },
  {
    id: "contact-2",
    title: "Call for fast guidance",
    description:
      "Need help picking a branch or fitting around your schedule? A quick call is still the fastest path.",
    href: `tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`,
    linkLabel: "Call the salon",
  },
  {
    id: "contact-3",
    title: "Send a detailed enquiry",
    description:
      "For group bookings, first visits, or questions about a service, use the enquiry form shell below as a content placeholder for the future lead flow.",
    href: `mailto:${siteConfig.contactEmail}`,
    linkLabel: "Email us",
  },
];

export const contactFormFields: ContactFormField[] = [
  {
    id: "name",
    label: "Full name",
    placeholder: "Your name",
    type: "text",
  },
  {
    id: "phone",
    label: "Phone",
    placeholder: "+370 6XX XXXXX",
    type: "tel",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "name@example.com",
    type: "email",
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Tell us what you need help with.",
    type: "textarea",
  },
];

export function getMapSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
