import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BlogCard } from "@/components/shared/BlogCard";
import { blogPosts, formatBlogDate } from "@/data/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog - Picasso Barbershop",
  description:
    "Read the latest articles on grooming tips, style guides, and salon news from Picasso Barbershop in Vilnius.",
  path: "/en/blog",
});

export default function EnBlogPage() {
  const allPosts = blogPosts;

  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-20">
          <Container className="relative z-10">
            <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
              Editorial
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4a4a4a] max-w-xl">
              Style guides, grooming tips, and insights from our team of experts.
            </p>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <BlogCard 
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={formatBlogDate(post.publishedAt)}
                readingTime={post.readingTime}
                category={post.category}
                imageUrl={post.coverImageSrc}
                href={`/en/blog/${post.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-secondary/10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading 
              title="Want to write for us?" 
              subtitle="Collaboration" 
              align="center"
            />
            <p className="text-muted-foreground mt-4 mb-8">
              We're always looking for guest contributors who share our passion for style and grooming.
            </p>
            <Link
              href="/en/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in Touch
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
