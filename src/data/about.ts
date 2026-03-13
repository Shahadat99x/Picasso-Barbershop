import type { BranchData } from "@/data/branches";

export interface AboutStat {
  value: string;
  label: string;
}

export interface StoryChapter {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}

export interface ValuePillar {
  id: string;
  title: string;
  description: string;
}

export interface TeamPreviewItem {
  id: string;
  name: string;
  role: string;
  branchId: BranchData["id"];
  experience: string;
  specialties: string[];
  summary: string;
}

export const aboutStats: AboutStat[] = [
  { value: "3", label: "Vilnius branches" },
  { value: "2018", label: "Brand journey began" },
  { value: "5*", label: "Service-first mindset" },
];

export const storyChapters: StoryChapter[] = [
  {
    id: "story-1",
    eyebrow: "Our story",
    title: "Craft, atmosphere, and consistency under one name.",
    body:
      "Picasso Barbershop was shaped around a simple idea: premium grooming should feel calm, sharply executed, and easy to trust. Every branch is designed to carry the same standard of service while still reflecting its own part of Vilnius.",
  },
  {
    id: "story-2",
    eyebrow: "How we work",
    title: "Appointments built around people, not volume.",
    body:
      "We focus on clean consultations, precise execution, and a measured pace in the chair. That means more attention to fit, texture, and finish, whether the visit is for a quick maintenance cut or a full grooming reset.",
  },
];

export const valuePillars: ValuePillar[] = [
  {
    id: "value-1",
    title: "Tailored consultations",
    description:
      "Each appointment starts from face shape, growth pattern, routine, and how polished or relaxed you want the result to feel.",
  },
  {
    id: "value-2",
    title: "Premium but unfussy",
    description:
      "The atmosphere is elevated, but the experience stays clear, warm, and free of unnecessary complexity.",
  },
  {
    id: "value-3",
    title: "Consistent across branches",
    description:
      "Different neighborhoods, same quality bar. Service details, hospitality, and finish standards carry across all three locations.",
  },
  {
    id: "value-4",
    title: "Built for repeat trust",
    description:
      "The goal is not just one good appointment. It is predictable quality that makes booking again the obvious choice.",
  },
];

export const teamPreview: TeamPreviewItem[] = [
  {
    id: "team-1",
    name: "Lukas Petrauskas",
    role: "Lead Barber",
    branchId: "loc-1",
    experience: "10 years",
    specialties: ["Classic cuts", "Finishing detail", "Consultation work"],
    summary:
      "Known for refined shape work and calm, structured consultations that translate well into long-term upkeep.",
  },
  {
    id: "team-2",
    name: "Domas Vaitkus",
    role: "Senior Barber",
    branchId: "loc-2",
    experience: "8 years",
    specialties: ["Texture", "Soft fades", "Editorial styling"],
    summary:
      "Balances polished silhouettes with a more natural finish, especially for clients who want modern texture without harsh lines.",
  },
  {
    id: "team-3",
    name: "Andrius Milius",
    role: "Grooming Specialist",
    branchId: "loc-3",
    experience: "7 years",
    specialties: ["Beard design", "Hot towel ritual", "Express refinement"],
    summary:
      "Focuses on beard contour, sharper edges, and efficient premium appointments for clients moving through the city center.",
  },
];

export const aboutQuote = {
  quote:
    "We wanted each location to feel intentional, not interchangeable. The standard stays the same, but the mood belongs to its neighborhood.",
  attribution: "Picasso Barbershop team",
};
