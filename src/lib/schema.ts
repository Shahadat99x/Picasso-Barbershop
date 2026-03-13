import { siteConfig } from "@/config/navigation";
import { getCanonicalUrl } from "@/lib/metadata";

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    image: getCanonicalUrl(siteConfig.defaultOgImage),
    telephone: siteConfig.contactPhone,
    email: siteConfig.contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vilniaus g. 22",
      addressLocality: "Vilnius",
      addressCountry: "LT",
    },
    priceRange: siteConfig.priceRange,
    areaServed: "Vilnius",
    sameAs: siteConfig.sameAs,
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  authorName: string;
  category: string;
}

export function createArticleSchema({
  title,
  description,
  path,
  image,
  publishedAt,
  authorName,
  category,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [getCanonicalUrl(image)],
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: getCanonicalUrl(siteConfig.defaultOgImage),
      },
    },
    mainEntityOfPage: getCanonicalUrl(path),
    articleSection: category,
  };
}

export function createFaqSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
