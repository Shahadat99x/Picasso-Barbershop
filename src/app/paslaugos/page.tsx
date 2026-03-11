import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { serviceCategories, getServicesByCategory } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our premium selection of barbering services, from classic haircuts to traditional hot towel shaves.",
};

export default function ServicesIndexPage() {
  return (
    <main>
      {/* Intro Header */}
      <Section className="bg-secondary/10 border-b border-border/50 pb-16 md:pb-24 pt-24 md:pt-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We offer a curated selection of premium grooming services designed for the modern gentleman. Every appointment is tailored to your unique style and crafted with meticulous attention to detail.
            </p>
          </div>
        </Container>
      </Section>

      {/* Categories Loop */}
      <div className="bg-background">
        {serviceCategories.map((category, index) => {
          const categoryServices = getServicesByCategory(category.id);
          
          if (categoryServices.length === 0) return null;

          return (
            <Section 
              key={category.id} 
              id={category.id}
              className={index % 2 !== 0 ? "bg-secondary/10" : "bg-background"}
            >
              <Container>
                <div className="mb-12 md:mb-16">
                  <SectionHeading 
                    title={category.title} 
                    subtitle="Category" 
                    align="left"
                  />
                  <p className="text-muted-foreground max-w-2xl mt-4 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      title={service.title}
                      description={service.shortDescription}
                      price={service.price}
                      duration={service.duration}
                      href={`/paslaugos/${service.slug}`}
                    />
                  ))}
                </div>
              </Container>
            </Section>
          );
        })}
      </div>

      {/* Global Booking CTA */}
      <FinalCtaSection />
    </main>
  );
}
