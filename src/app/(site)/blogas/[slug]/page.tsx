import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin, Scissors } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicDetailHero } from "@/components/public/page/public-detail-hero";
import { ArticleBody } from "@/components/shared/ArticleBody";
import { BlogCard } from "@/components/shared/BlogCard";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { StructuredData } from "@/components/shared/StructuredData";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  getBlogCoverAltText,
  getBlogPostBody,
  getBlogPostBySlug,
  getBranchById,
  getLocalizedContent,
  getLocalizedSlug,
  getPublishedBlogPosts,
  getServiceById,
  transformBlogPostForCard,
} from "@/lib/public-data";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { createArticleSchema, createBreadcrumbSchema } from "@/lib/schema";
import { getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getReadingTime(body: ReturnType<typeof getBlogPostBody>) {
  return Math.max(
    1,
    Math.ceil(
      body
        .map((block) => (block.type === "list" ? block.items.join(" ") : block.text))
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length / 180,
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return createLocalizedPageMetadata({
      title: "Straipsnis nerastas",
      description: "Nepavyko rasti pasirinkto straipsnio.",
      path: getLocalizedRoute("blog", "lt"),
      locale: "lt",
      noIndex: true,
    });
  }

  const resolvedSlug = getLocalizedSlug(post, "lt");
  const alternateSlug = getLocalizedSlug(post, "en");

  return createLocalizedPageMetadata({
    title: getLocalizedContent(post, "title", "lt"),
    description: getLocalizedContent(post, "excerpt", "lt"),
    path: getLocalizedDetailRoute("blog", resolvedSlug, "lt"),
    alternatePath: getLocalizedDetailRoute("blog", alternateSlug, "en"),
    locale: "lt",
    image: post.cover_image_url || undefined,
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [relatedService, relatedBranch, allPosts] = await Promise.all([
    post.related_service_id ? getServiceById(post.related_service_id) : Promise.resolve(null),
    post.related_branch_id ? getBranchById(post.related_branch_id) : Promise.resolve(null),
    getPublishedBlogPosts(4),
  ]);

  const relatedPosts = allPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3)
    .map((item) => transformBlogPostForCard(item, "lt"));
  const body = getBlogPostBody(post, "lt");
  const resolvedSlug = getLocalizedSlug(post, "lt");
  const title = getLocalizedContent(post, "title", "lt");
  const excerpt = getLocalizedContent(post, "excerpt", "lt");
  const publishedDate = new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.published_at || new Date().toISOString()));
  const readingTime = getReadingTime(body);
  const structuredData = [
    createBreadcrumbSchema([
      { name: "Pradzia", path: "/" },
      { name: "Blogas", path: getLocalizedRoute("blog", "lt") },
      {
        name: title,
        path: getLocalizedDetailRoute("blog", resolvedSlug, "lt"),
      },
    ]),
    createArticleSchema({
      title,
      description: excerpt,
      path: getLocalizedDetailRoute("blog", resolvedSlug, "lt"),
      image: post.cover_image_url || "/images/hero/picasso-team-hero.jpg",
      publishedAt: post.published_at || new Date().toISOString(),
      authorName: post.author_name,
      category: post.category,
    }),
  ];

  return (
    <main>
      <StructuredData data={structuredData} />

      <PublicDetailHero
        backHref={getLocalizedRoute("blog", "lt")}
        backLabel="< Atgal i bloga"
        eyebrow="Tinklarastis"
        title={title}
        description={excerpt}
        meta={[
          { label: "Kategorija", value: post.category },
          { label: "Publikuota", value: publishedDate },
          { label: "Skaitymas", value: `${readingTime} min` },
        ]}
        actions={
          <>
            <PrimaryButton href={getLocalizedRoute("contact", "lt")} className="h-12 w-full px-8 text-base sm:w-auto">
              Susisiekti
            </PrimaryButton>
            {relatedService ? (
              <SecondaryButton
                href={getLocalizedDetailRoute(
                  "services",
                  getLocalizedSlug(relatedService, "lt"),
                  "lt",
                )}
                className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto"
              >
                Ziureti paslauga
              </SecondaryButton>
            ) : (
              <SecondaryButton
                href={getLocalizedRoute("services", "lt")}
                className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto"
              >
                Ziureti paslaugas
              </SecondaryButton>
            )}
          </>
        }
        visual={
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.55rem] bg-[#1a1a1a]">
            {post.cover_image_url ? (
              <OptimizedImage
                src={post.cover_image_url}
                alt={getBlogCoverAltText(post, "lt")}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 38vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#201c19] px-6 text-center text-sm leading-7 text-[#c7b9ac]">
                Virselio vaizdas cia atsiras netrukus.
              </div>
            )}
          </div>
        }
      />

      <Section className="bg-background">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <article className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
              <div className="mb-8 border-b border-border/50 pb-6">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Skaitymui
                </span>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {publishedDate}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {readingTime} min skaitymo
                  </span>
                  <span>{post.author_name}</span>
                </div>
              </div>
              <ArticleBody blocks={body} />
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28">
              {relatedService ? (
                <FeatureCard
                  eyebrow="Susijusi paslauga"
                  title={getLocalizedContent(relatedService, "title", "lt")}
                  description={getLocalizedContent(relatedService, "short_description", "lt")}
                  icon={<Scissors className="h-5 w-5" />}
                  footer={
                    <Link
                      href={getLocalizedDetailRoute(
                        "services",
                        getLocalizedSlug(relatedService, "lt"),
                        "lt",
                      )}
                      className="focus-ring rounded-sm text-sm font-medium text-primary hover:underline"
                    >
                      Ziureti paslauga
                    </Link>
                  }
                />
              ) : null}

              {relatedBranch ? (
                <FeatureCard
                  eyebrow="Susijes filialas"
                  title={getLocalizedContent(relatedBranch, "name", "lt")}
                  description={getLocalizedContent(relatedBranch, "short_description", "lt")}
                  icon={<MapPin className="h-5 w-5" />}
                  footer={
                    <Link
                      href={getLocalizedDetailRoute(
                        "branches",
                        getLocalizedSlug(relatedBranch, "lt"),
                        "lt",
                      )}
                      className="focus-ring rounded-sm text-sm font-medium text-primary hover:underline"
                    >
                      Ziureti filiala
                    </Link>
                  }
                />
              ) : null}

              <div className="rounded-[1.9rem] border border-border/60 bg-[#171311] p-6 text-[#f5efe7] shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#d1af89]">
                  Kitas zingsnis
                </span>
                <h2 className="mt-4 text-2xl font-medium tracking-tight">
                  Pereikite nuo skaitymo prie aiskaus veiksmo.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#c7b9ac]">
                  Jei straipsnis padejo aiskiau apsispresti, toliau galite ramiai pereiti prie
                  paslaugos, filialo arba tiesioginio kontakto.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <PrimaryButton
                    href={getLocalizedRoute("contact", "lt")}
                    className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]"
                  >
                    Susisiekti
                  </PrimaryButton>
                  <SecondaryButton
                    href={getLocalizedRoute("branches", "lt")}
                    className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]"
                  >
                    Ziureti filialus
                  </SecondaryButton>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {relatedPosts.length > 0 ? (
        <Section className="border-y border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
          <Container>
            <SectionHeading
              title="Teskite skaityma"
              subtitle="Susije straipsniai"
              description="Papildomi straipsniai tiems, kurie nori giliau pazvelgti i tema ir ramiau apsispresti pries vizita."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={relatedPost.date}
                  readingTime={relatedPost.readingTime}
                  category={relatedPost.category}
                  imageUrl={relatedPost.imageUrl}
                  href={relatedPost.href}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCtaSection locale="lt" />
    </main>
  );
}
