import type { BranchData } from "@/data/branches";
import type { ServiceData } from "@/data/services";

export type BlogBodyBlock =
  | {
      id: string;
      type: "paragraph";
      text: string;
    }
  | {
      id: string;
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      id: string;
      type: "list";
      style: "bullet" | "ordered";
      items: string[];
    }
  | {
      id: string;
      type: "quote";
      text: string;
      attribution?: string;
    };

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImageSrc: string;
  coverImageAlt: string;
  publishedAt: string;
  readingTime: string;
  authorName: string;
  isFeatured: boolean;
  relatedBranchId?: BranchData["id"];
  relatedServiceSlug?: ServiceData["slug"];
  body: BlogBodyBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "How to choose a haircut that still looks sharp two weeks later",
    slug: "how-to-choose-a-haircut-that-lasts",
    excerpt:
      "A premium cut should age well, not just look good on the day. Here is how consultation, texture, and maintenance work together.",
    category: "Advice",
    tags: ["Haircut", "Consultation", "Maintenance"],
    coverImageSrc: "/mock/blog/haircut-guide.svg",
    coverImageAlt:
      "Editorial placeholder cover for a haircut consultation and maintenance article.",
    publishedAt: "2026-03-08",
    readingTime: "5 min read",
    authorName: "Picasso Editorial Team",
    isFeatured: true,
    relatedServiceSlug: "classic-haircut",
    relatedBranchId: "loc-1",
    body: [
      {
        id: "p1-1",
        type: "paragraph",
        text: "The strongest haircut decisions are rarely about trends alone. They come from understanding how your hair grows, how much styling effort you actually want each morning, and how clean the shape should still feel after two or three weeks.",
      },
      {
        id: "p1-2",
        type: "heading",
        level: 2,
        text: "Start with growth pattern, not inspiration photos",
      },
      {
        id: "p1-3",
        type: "paragraph",
        text: "Reference imagery helps, but it cannot replace a proper consultation. Cowlicks, density, and natural movement all affect whether a look will stay polished between appointments. That is why the first minutes in the chair matter so much.",
      },
      {
        id: "p1-4",
        type: "list",
        style: "bullet",
        items: [
          "Ask for a shape that works with your natural parting.",
          "Choose texture only if you are willing to style for it.",
          "Keep the neckline and side profile realistic for your maintenance rhythm.",
        ],
      },
      {
        id: "p1-5",
        type: "heading",
        level: 2,
        text: "A good cut should soften as it grows out",
      },
      {
        id: "p1-6",
        type: "paragraph",
        text: "Premium barbering is not just precision on day one. It is also control over how the shape opens up later. Softer internal layering, better blending, and a balanced weight line are what keep the result intentional even after the freshest edges settle.",
      },
      {
        id: "p1-7",
        type: "quote",
        text: "The best haircut is the one that still feels right when real life gets in the way of perfect styling.",
        attribution: "Picasso Editorial Team",
      },
    ],
  },
  {
    id: "post-2",
    title: "Beard refinement without harsh lines: a better approach to definition",
    slug: "beard-refinement-without-harsh-lines",
    excerpt:
      "Sharp does not need to mean severe. A more premium beard finish balances contour, softness, and skin comfort.",
    category: "Grooming",
    tags: ["Beard", "Shaping", "Skin Care"],
    coverImageSrc: "/mock/blog/beard-refinement.svg",
    coverImageAlt:
      "Editorial placeholder cover for a beard shaping and skin comfort article.",
    publishedAt: "2026-02-26",
    readingTime: "4 min read",
    authorName: "Picasso Editorial Team",
    isFeatured: false,
    relatedServiceSlug: "beard-trim",
    relatedBranchId: "loc-3",
    body: [
      {
        id: "p2-1",
        type: "paragraph",
        text: "A refined beard does not rely on exaggerated lines. In most cases, the best result is achieved by keeping structure where it matters while letting the finish stay softer near the cheek and jaw transition.",
      },
      {
        id: "p2-2",
        type: "heading",
        level: 2,
        text: "Definition should follow your face, not fight it",
      },
      {
        id: "p2-3",
        type: "paragraph",
        text: "Overly hard cheek lines can make growth look untidy faster. A more measured contour respects your natural density and keeps the beard easier to maintain between appointments.",
      },
      {
        id: "p2-4",
        type: "list",
        style: "bullet",
        items: [
          "Keep the neckline clean but not overly high.",
          "Blend sideburns so the haircut and beard belong together.",
          "Finish with oil or balm to reduce dryness and roughness.",
        ],
      },
      {
        id: "p2-5",
        type: "paragraph",
        text: "When the shaping is balanced properly, the beard stays intentional from more angles and feels better on the skin as it grows.",
      },
    ],
  },
  {
    id: "post-3",
    title: "Old Town, Užupis, or City Center: which branch suits your routine best?",
    slug: "which-branch-suits-your-routine-best",
    excerpt:
      "All three branches share the same quality standard, but each one fits a slightly different rhythm and atmosphere.",
    category: "Local Guide",
    tags: ["Vilnius", "Branches", "Experience"],
    coverImageSrc: "/mock/blog/branch-guide.svg",
    coverImageAlt:
      "Editorial placeholder cover comparing premium salon branches across Vilnius.",
    publishedAt: "2026-02-12",
    readingTime: "6 min read",
    authorName: "Picasso Editorial Team",
    isFeatured: false,
    relatedBranchId: "loc-2",
    body: [
      {
        id: "p3-1",
        type: "paragraph",
        text: "Choosing a branch is not only about distance. It is also about how you like to move through your day, what kind of atmosphere helps you switch off, and whether your appointment needs to feel efficient or restorative.",
      },
      {
        id: "p3-2",
        type: "heading",
        level: 2,
        text: "Old Town for a slower flagship feel",
      },
      {
        id: "p3-3",
        type: "paragraph",
        text: "If you want the most editorial setting and a little more ceremony around the visit, Old Town is the strongest fit.",
      },
      {
        id: "p3-4",
        type: "heading",
        level: 2,
        text: "Užupis for a softer pace",
      },
      {
        id: "p3-5",
        type: "paragraph",
        text: "The Užupis branch suits clients who want premium service in a calmer, slightly more relaxed setting. It is especially strong for weekend visits and slower resets.",
      },
      {
        id: "p3-6",
        type: "heading",
        level: 2,
        text: "City Center for efficiency without compromise",
      },
      {
        id: "p3-7",
        type: "paragraph",
        text: "If schedule matters most, City Center offers the easiest fit for pre-work, lunch break, or end-of-day appointments while keeping the finish standards intact.",
      },
    ],
  },
  {
    id: "post-4",
    title: "Why the hot towel shave still matters in a fast routine",
    slug: "why-the-hot-towel-shave-still-matters",
    excerpt:
      "A slower grooming ritual still has a place in a modern schedule, especially when skin comfort and finish quality are priorities.",
    category: "Ritual",
    tags: ["Shave", "Ritual", "Relaxation"],
    coverImageSrc: "/mock/blog/hot-towel-shave.svg",
    coverImageAlt:
      "Editorial placeholder cover for a traditional hot towel shave article.",
    publishedAt: "2026-01-29",
    readingTime: "4 min read",
    authorName: "Picasso Editorial Team",
    isFeatured: false,
    relatedServiceSlug: "hot-towel-shave",
    relatedBranchId: "loc-1",
    body: [
      {
        id: "p4-1",
        type: "paragraph",
        text: "The hot towel shave remains relevant because it solves two things at once: it improves the quality of the result and it changes the pace of the appointment. In a week built around quick decisions, that slower rhythm often becomes part of the value.",
      },
      {
        id: "p4-2",
        type: "heading",
        level: 2,
        text: "Preparation changes the finish",
      },
      {
        id: "p4-3",
        type: "paragraph",
        text: "Heat, hydration, and better glide reduce drag on the skin. The shave feels closer, but also calmer, because the preparation has already done much of the work.",
      },
      {
        id: "p4-4",
        type: "list",
        style: "bullet",
        items: [
          "Softens facial hair before the blade touches the skin.",
          "Improves comfort for clients who shave less often.",
          "Turns a maintenance appointment into a more premium reset.",
        ],
      },
      {
        id: "p4-5",
        type: "paragraph",
        text: "It is one of the clearest examples of how premium service is felt as much through rhythm as through technique.",
      },
    ],
  },
];

export const featuredBlogPost = blogPosts.find((post) => post.isFeatured) ?? blogPosts[0];

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
).map((category) => ({
  category,
  count: blogPosts.filter((post) => post.category === category).length,
}));

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3) {
  const currentPost = getBlogPostBySlug(currentSlug);

  if (!currentPost) {
    return [];
  }

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aScore =
        Number(a.category === currentPost.category) +
        Number(a.relatedBranchId === currentPost.relatedBranchId) +
        Number(a.relatedServiceSlug === currentPost.relatedServiceSlug);
      const bScore =
        Number(b.category === currentPost.category) +
        Number(b.relatedBranchId === currentPost.relatedBranchId) +
        Number(b.relatedServiceSlug === currentPost.relatedServiceSlug);

      return bScore - aScore;
    })
    .slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
