import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MapPin, Phone, Mail, Clock, Car, Bus, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/navigation";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { defaultLocale } from "@/i18n/locales";

import { mockBranches, getBranchBySlug } from "@/data/branches";
import { getServiceBySlug, ServiceData } from "@/data/services";
import {
  formatBlogDate,
  getBlogPostsByRelatedBranchId,
} from "@/data/blog";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { BlogCard } from "@/components/shared/BlogCard";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { StructuredData } from "@/components/shared/StructuredData";
import { createBreadcrumbSchema } from "@/lib/schema";

// Next.js static params generation for mock data
export function generateStaticParams() {
  return mockBranches.map((branch) => ({
    slug: branch.slug,
  }));
}

// Dynamic metadata generation
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const branch = getBranchBySlug(params.slug);
  
  if (!branch) {
    return {
      title: "Branch Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createLocalizedPageMetadata({
    title: branch.name,
    description: branch.intro,
    path: `/filialai/${branch.slug}`,
    locale: defaultLocale,
  });
}

export default function BranchDetailPage({ params }: { params: { slug: string } }) {
  const branch = getBranchBySlug(params.slug);

  if (!branch) {
    notFound();
  }

  // Hydrate the featured services from the slug references
  const featuredServices = branch.featuredServiceSlugs
    .map(slug => getServiceBySlug(slug))
    .filter(Boolean);
  const relatedArticles = getBlogPostsByRelatedBranchId(branch.id);

  return (
    <main>
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Branches", path: "/filialai" },
          { name: branch.name, path: `/filialai/${branch.slug}` },
        ])}
      />
      {/* Branch Hero */}
      <Section className="bg-secondary/10 border-b border-border/50 pb-16 md:pb-24 pt-24 md:pt-32">
        <Container>
          <div className="max-w-4xl">
            <Link href="/filialai" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 inline-block">
              ← View all locations
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              {branch.name}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              {branch.intro}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={siteConfig.bookingUrl}>
                <PrimaryButton className="w-full sm:w-auto px-8 text-base h-12">
                  Book at {branch.name}
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Information & Map Placeholder */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Contact Details Grid */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-medium mb-8">Contact & Hours</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-secondary/30 p-2 rounded-lg text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-medium text-foreground mb-1">Address</span>
                      <span className="text-muted-foreground leading-relaxed">{branch.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-secondary/30 p-2 rounded-lg text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-medium text-foreground mb-1">Phone</span>
                      <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">{branch.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-secondary/30 p-2 rounded-lg text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-medium text-foreground mb-1">Email</span>
                      <a href={`mailto:${branch.email}`} className="text-muted-foreground hover:text-primary transition-colors">{branch.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border/50">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-secondary/30 p-2 rounded-lg text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <span className="block font-medium text-foreground mb-4">Opening Hours</span>
                    <ul className="space-y-3">
                      {branch.hours.map((hour, idx) => (
                        <li key={idx} className="flex justify-between items-center text-muted-foreground border-b border-border/30 pb-3 last:border-0 last:pb-0">
                          <span>{hour.day}</span>
                          <span className="font-medium">{hour.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Column Right */}
            <div className="space-y-12">
              {/* Map Placeholder */}
              <div className="aspect-[4/3] md:aspect-video lg:aspect-square rounded-2xl bg-muted border border-border/50 flex flex-col items-center justify-center text-muted-foreground bg-secondary/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Vilnius&zoom=14&size=800x800&key=placeholder')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                <MapPin className="w-10 h-10 mb-4 opacity-50 relative z-10" />
                <span className="font-medium relative z-10">Interactive Map Placeholder</span>
                <span className="text-sm mt-2 max-w-[200px] text-center relative z-10">Google Maps Embed to be integrated in future phases</span>
              </div>

              {/* Transit Info */}
              <div className="bg-secondary/10 rounded-2xl p-8 border border-border/50">
                <h3 className="text-lg font-medium mb-6">Getting Here</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Car className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <p className="leading-relaxed text-sm">{branch.parkingInfo}</p>
                  </div>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Bus className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <p className="leading-relaxed text-sm">{branch.transportInfo}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* Trust Highlights */}
      <Section className="bg-secondary/10 border-y border-border/50">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branch.trustPoints.map((point, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-foreground tracking-tight">{point}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services available here snippet */}
      {featuredServices.length > 0 && (
        <Section className="bg-background">
          <Container>
            <SectionHeading 
              title="Available Here" 
              subtitle="Featured Services" 
              align="left"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {featuredServices.map((service: ServiceData | undefined) => {
                if (!service) return null;
                return (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.shortDescription}
                    price={service.price}
                    duration={service.duration}
                    href={`/paslaugos/${service.slug}`}
                  />
                );
              })}
            </div>
            
            <div className="mt-10 text-center md:text-left">
              <Link href="/paslaugos" className="text-primary font-medium hover:underline underline-offset-4">
                View entire service menu →
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {relatedArticles.length > 0 && (
        <Section className="border-t border-border/50 bg-background">
          <Container>
            <SectionHeading
              title="Editorial related to this branch"
              subtitle="Local reading"
              align="left"
            />
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
