import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { blogPosts, formatBlogDate } from "@/data/blog";
import { ArticleBody } from "@/components/shared/ArticleBody";
import { BlogCard } from "@/components/shared/BlogCard";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return createPageMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: "/en/blog",
    });
  }
  
  return createPageMetadata({
    title: `${post.title} - Picasso Barbershop`,
    description: post.excerpt,
    path: `/en/blog/${post.slug}`,
    image: post.coverImageSrc,
  });
}

export default async function EnBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[30vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-16">
          <Container className="relative z-10">
            <Link
              href="/en/blog"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center"
            >
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
                {post.category}
              </span>
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
              {post.title}
            </h1>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background pt-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <ArticleBody blocks={post.body} />
          </div>
        </Container>
      </Section>

      {relatedPosts.length > 0 && (
        <Section className="bg-secondary/10">
          <Container>
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard 
                  key={relatedPost.id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={formatBlogDate(relatedPost.publishedAt)}
                  readingTime={relatedPost.readingTime}
                  category={relatedPost.category}
                  imageUrl={relatedPost.coverImageSrc}
                  href={`/en/blog/${relatedPost.slug}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
