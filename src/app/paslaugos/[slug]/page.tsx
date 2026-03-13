import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/navigation";
import { createPageMetadata } from "@/lib/metadata";

import { mockServices, getServiceBySlug } from "@/data/services";
import {
  formatBlogDate,
  getBlogPostsByRelatedServiceSlug,
} from "@/data/blog";
import { ServiceFaqSection } from "@/components/sections/ServiceFaqSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BlogCard } from "@/components/shared/BlogCard";
import { StructuredData } from "@/components/shared/StructuredData";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/schema";

// Next.js static params generation for mock data
export function generateStaticParams() {
  return mockServices.map((service) => ({
    slug: service.slug,
  }));
}

// Dynamic metadata generation
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/paslaugos/${service.slug}`,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const relatedArticles = getBlogPostsByRelatedServiceSlug(service.slug);
  const structuredData = [
    createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/paslaugos" },
      { name: service.title, path: `/paslaugos/${service.slug}` },
    ]),
    ...(service.faqs.length > 0 ? [createFaqSchema(service.faqs)] : []),
  ];

  return (
    <main>
      <StructuredData data={structuredData} />
      {/* Service Hero */}
      <Section className="bg-secondary/10 border-b border-border/50 pb-16 md:pb-24 pt-24 md:pt-32">
        <Container>
          <div className="max-w-4xl">
            <Link href="/paslaugos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 inline-block">
              ← Back to all services
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              {service.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-border/50">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Starting from</span>
                <span className="text-2xl font-semibold">{service.price}</span>
              </div>
              
              <div className="h-10 w-px bg-border/50 hidden sm:block" />
              
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Duration</span>
                <div className="flex items-center text-foreground font-medium text-lg">
                  <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                  {service.duration}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={siteConfig.bookingUrl}>
                <PrimaryButton className="w-full sm:w-auto px-8 text-base h-12">
                  Book This Service
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Service Details & Highlights */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Main Description */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-medium mb-6 tracking-tight">About The Service</h2>
              <div className="prose prose-neutral max-w-none text-muted-foreground">
                <p className="leading-relaxed text-lg mb-6">
                  {service.fullDescription}
                </p>
                {/* Visual placeholder for the service specifically */}
                <div className="aspect-video bg-muted rounded-xl w-full flex items-center justify-center mt-10 text-muted-foreground border border-border/50">
                  Service Specific Image Placeholder
                </div>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-secondary/10 rounded-2xl p-8 border border-border/50 sticky top-32">
                <h3 className="text-xl font-medium mb-6">What to expect</h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10 pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-4">
                    Available at all Vilnius locations. Subject to specialist availability.
                  </p>
                  <Link href="/filialai">
                    <SecondaryButton className="w-full">
                      View Locations
                    </SecondaryButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Shared Visual Context */}
      <GallerySection />

      {/* Service Specific FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <ServiceFaqSection faqs={service.faqs} />
      )}

      {relatedArticles.length > 0 && (
        <Section className="bg-background">
          <Container>
            <div className="mb-10 max-w-2xl">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Editorial
              </span>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                Read before you book
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <BlogCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={formatBlogDate(article.publishedAt)}
                  readingTime={article.readingTime}
                  imageUrl={article.coverImageSrc}
                  category={article.category}
                  href={`/blogas/${article.slug}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Global Booking CTA */}
      <FinalCtaSection />
    </main>
  );
}
