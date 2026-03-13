import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin, Scissors } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BlogCard } from "@/components/shared/BlogCard";
import { ArticleBody } from "@/components/shared/ArticleBody";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getBranchById } from "@/data/branches";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/data/blog";
import { getServiceBySlug } from "@/data/services";
import { siteConfig } from "@/config/navigation";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedBranch = post.relatedBranchId
    ? getBranchById(post.relatedBranchId)
    : undefined;
  const relatedService = post.relatedServiceSlug
    ? getServiceBySlug(post.relatedServiceSlug)
    : undefined;
  const relatedPosts = getRelatedBlogPosts(post.slug);

  return (
    <main>
      <Section className="border-b border-border/50 bg-secondary/10 pb-14 pt-24 md:pb-20 md:pt-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blogas"
              className="mb-8 inline-block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              ← Back to all articles
            </Link>

            <span className="inline-flex rounded-full border border-border/60 bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {post.category}
            </span>
            <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formatBlogDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {post.readingTime}
              </span>
              <span>{post.authorName}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-background pb-8">
        <Container>
          <div className="mx-auto overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm shadow-black/5">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted md:aspect-[16/8]">
              <Image
                src={post.coverImageSrc}
                alt={post.coverImageAlt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-background pt-0">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <article className="max-w-3xl">
              <ArticleBody blocks={post.body} />
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28">
              {relatedService ? (
                <FeatureCard
                  eyebrow="Related service"
                  title={relatedService.title}
                  description={relatedService.shortDescription}
                  icon={<Scissors className="h-5 w-5" />}
                  footer={
                    <Link
                      href={`/paslaugos/${relatedService.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Explore service
                    </Link>
                  }
                />
              ) : null}

              {relatedBranch ? (
                <FeatureCard
                  eyebrow="Related branch"
                  title={relatedBranch.name}
                  description={relatedBranch.intro}
                  icon={<MapPin className="h-5 w-5" />}
                  footer={
                    <Link
                      href={`/filialai/${relatedBranch.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Explore branch
                    </Link>
                  }
                />
              ) : null}
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-secondary/10">
        <Container>
          <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Next step
                </span>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                  Turn reading into a clear booking path.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  If this article helped you narrow down a service or location, continue into
                  the practical pages and book from there.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                {relatedService ? (
                  <Link href={`/paslaugos/${relatedService.slug}`}>
                    <SecondaryButton className="w-full">View service</SecondaryButton>
                  </Link>
                ) : null}
                <Link href={siteConfig.bookingUrl}>
                  <PrimaryButton className="w-full">Book now</PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {relatedPosts.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <div className="mb-10 max-w-2xl">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Related articles
              </span>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                Continue reading
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={formatBlogDate(relatedPost.publishedAt)}
                  readingTime={relatedPost.readingTime}
                  imageUrl={relatedPost.coverImageSrc}
                  category={relatedPost.category}
                  href={`/blogas/${relatedPost.slug}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
