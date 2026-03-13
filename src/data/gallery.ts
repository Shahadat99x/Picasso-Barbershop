import type { BranchData } from "@/data/branches";
import type { ServiceData } from "@/data/services";

export type GalleryCategoryId =
  | "signature-cuts"
  | "beard-design"
  | "salon-interiors"
  | "ritual-details";

export type GalleryLayout = "hero" | "portrait" | "landscape" | "square";

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  branchId: BranchData["id"];
  serviceSlug?: ServiceData["slug"];
  categoryId: GalleryCategoryId;
  tags: string[];
  layout: GalleryLayout;
  isFeatured: boolean;
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: "signature-cuts",
    label: "Signature Cuts",
    description:
      "Precision finishes, clean silhouettes, and quietly confident styling.",
  },
  {
    id: "beard-design",
    label: "Beard Design",
    description:
      "Sharp contours, softened texture, and grooming rituals captured up close.",
  },
  {
    id: "salon-interiors",
    label: "Salon Interiors",
    description:
      "Material details and atmosphere across our three Vilnius locations.",
  },
  {
    id: "ritual-details",
    label: "Ritual Details",
    description:
      "The small moments that make each appointment feel considered and premium.",
  },
];

export const mockGalleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Old Town lounge calm",
    description:
      "Warm stone hues, sculpted lighting, and a quieter flagship arrival moment.",
    imageSrc: "/mock/gallery/lounge.svg",
    alt: "Stylized lounge seating and mirrors in the Old Town flagship salon.",
    branchId: "loc-1",
    categoryId: "salon-interiors",
    tags: ["flagship", "interior", "welcome"],
    layout: "hero",
    isFeatured: true,
  },
  {
    id: "gal-2",
    title: "Chair-side precision",
    description:
      "Clean chair geometry and a tailored setup for detailed service work.",
    imageSrc: "/mock/gallery/chair.svg",
    alt: "Premium barber chair area with styled mirrors and warm lighting.",
    branchId: "loc-3",
    serviceSlug: "classic-haircut",
    categoryId: "signature-cuts",
    tags: ["chair", "precision", "cut"],
    layout: "portrait",
    isFeatured: true,
  },
  {
    id: "gal-3",
    title: "Tool ritual",
    description:
      "Combs, steel, and finishing products laid out before a service begins.",
    imageSrc: "/mock/gallery/detail.svg",
    alt: "Abstracted close-up of grooming tools, towel, and styling products.",
    branchId: "loc-2",
    categoryId: "ritual-details",
    tags: ["tools", "details", "premium"],
    layout: "square",
    isFeatured: true,
  },
  {
    id: "gal-4",
    title: "Color and texture study",
    description:
      "A softer editorial frame focusing on tone, shape, and controlled movement.",
    imageSrc: "/mock/gallery/color.svg",
    alt: "Editorial-style abstract portrait emphasizing hair tone and texture.",
    branchId: "loc-2",
    serviceSlug: "classic-haircut",
    categoryId: "signature-cuts",
    tags: ["texture", "editorial", "finish"],
    layout: "portrait",
    isFeatured: true,
  },
  {
    id: "gal-5",
    title: "Beard contour finish",
    description:
      "Straight-edge precision and warm towel softness captured in a single frame.",
    imageSrc: "/mock/gallery/beard.svg",
    alt: "Abstract beard grooming close-up with razor contour and soft towel tones.",
    branchId: "loc-1",
    serviceSlug: "beard-trim",
    categoryId: "beard-design",
    tags: ["beard", "contour", "ritual"],
    layout: "landscape",
    isFeatured: true,
  },
  {
    id: "gal-6",
    title: "Hot towel pause",
    description:
      "A calm visual cue for the slower, more restorative moments in the chair.",
    imageSrc: "/mock/gallery/ritual.svg",
    alt: "Warm towel and ceramic basin composition representing a grooming ritual.",
    branchId: "loc-3",
    serviceSlug: "hot-towel-shave",
    categoryId: "ritual-details",
    tags: ["hot towel", "relaxation", "ceremony"],
    layout: "square",
    isFeatured: false,
  },
  {
    id: "gal-7",
    title: "Užupis window light",
    description:
      "Natural light, artistic calm, and the branch's more relaxed visual mood.",
    imageSrc: "/mock/gallery/lounge.svg",
    alt: "Soft window-lit salon corner inspired by the Užupis branch interior.",
    branchId: "loc-2",
    categoryId: "salon-interiors",
    tags: ["uzupis", "light", "interior"],
    layout: "landscape",
    isFeatured: false,
  },
  {
    id: "gal-8",
    title: "Full experience finish",
    description:
      "A composed final frame after haircut, beard care, and styling are complete.",
    imageSrc: "/mock/gallery/color.svg",
    alt: "Stylized finished grooming look representing the full experience package.",
    branchId: "loc-3",
    serviceSlug: "the-full-experience",
    categoryId: "signature-cuts",
    tags: ["package", "finish", "style"],
    layout: "portrait",
    isFeatured: false,
  },
];

export const featuredGalleryItems = mockGalleryItems.filter(
  (item) => item.isFeatured,
);

export function getGalleryItemsByCategory(categoryId: GalleryCategoryId) {
  return mockGalleryItems.filter((item) => item.categoryId === categoryId);
}
