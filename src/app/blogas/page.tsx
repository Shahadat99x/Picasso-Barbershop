import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, MapPin, Scissors } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BlogCard } from "@/components/shared/BlogCard";
import { FeaturedArticleCard } from "@/components/shared/FeaturedArticleCard";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { PageHero } from "@/components/shared/PageHero";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  blogCategories,
  blogPosts,
  featuredBlogPost,
  formatBlogDate,
} from "@/data/blog";
import { siteConfig } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Blogas",
  description:
    "Read editorial articles from Picasso Barbershop covering grooming advice, branch guides, and premium salon rituals in Vilnius.",
};

const categoryIcons = [
  <BookOpenText key="book" className="h-5 w-5" />,
  <Scissors key="scissors" className="h-5 w-5" />,
  <MapPin key="map" className="h-5 w-5" />,
];

export default function BlogIndexPage() {
  const remainingPosts = blogPosts.filter((post) => post.slug !== featuredBlogPost.slug);

  return (
    <main>
      <PageHero
        eyebrow="Blog"
        title="Editorial reading built around grooming decisions, salon rituals, and Vilnius branch guidance."
        description="Phase 3b introduces a CMS-ready blog structure with premium reading layouts, related content hooks, and stronger internal pathways toward services, branches, and booking."
        stats={[
          { value: String(blogPosts.length), label: "mock editorial articles" },
          { value: String(blogCategories.length), label: "lightweight categories" },
          { value: "100%", label: "server-rendered article routes" },
        ]}
        actions={
          <>
            <Link href={`/blogas/${featuredBlogPost.slug}`}>
              <PrimaryButton className="w-full sm:w-auto">Read featured article</PrimaryButton>
            </Link>
            <Link href="/paslaugos">
              <SecondaryButton className="w-full sm:w-auto">Explore services</SecondaryButton>
            </Link>
          </>
        }
        aside={
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Editorial direction
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Articles are structured for future CMS mapping with categories, tags, cover
              visuals, reading time, related services, and related branches already baked
              into the local model.
            </p>
          </div>
        }
      />

      <Section className="bg-background">
        <Container>
          <FeaturedArticleCard
            title={featuredBlogPost.title}
            excerpt={featuredBlogPost.excerpt}
            category={featuredBlogPost.category}
            date={formatBlogDate(featuredBlogPost.publishedAt)}
            readingTime={featuredBlogPost.readingTime}
            imageUrl={featuredBlogPost.coverImageSrc}
            imageAlt={featuredBlogPost.coverImageAlt}
            href={`/blogas/${featuredBlogPost.slug}`}
          />
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <SectionHeading
            title="Simple categories, kept lightweight"
            subtitle="Browse by topic"
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {blogCategories.map((item, index) => (
              <FeatureCard
                key={item.category}
                eyebrow={`${item.count} article${item.count > 1 ? "s" : ""}`}
                title={item.category}
                description="Editorial groupings stay intentionally simple for now so the page remains clean and mobile-friendly."
                icon={categoryIcons[index % categoryIcons.length]}
                footer={
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Tag and filter expansion can come later</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                }
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-background">
        <Container>
          <SectionHeading
            title="Latest articles"
            subtitle="All posts"
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={formatBlogDate(post.publishedAt)}
                readingTime={post.readingTime}
                imageUrl={post.coverImageSrc}
                category={post.category}
                href={`/blogas/${post.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-background pt-0">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Internal flow
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Read, compare services, then choose the branch that fits your routine.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  The blog should support discovery, not distract from conversion. Each
                  article template already has room for related services, branch guidance,
                  and booking follow-through.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/filialai">
                  <SecondaryButton className="w-full">Compare branches</SecondaryButton>
                </Link>
                <Link href={siteConfig.bookingUrl}>
                  <PrimaryButton className="w-full">Book now</PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </main>
  );
}
