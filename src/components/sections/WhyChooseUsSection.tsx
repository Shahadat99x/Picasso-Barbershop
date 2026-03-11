import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function WhyChooseUsSection() {
  const features = [
    {
      title: "Master Barbers",
      description: "Our specialists carry years of experience in both classic straight razor techniques and modern styling trends.",
    },
    {
      title: "Premium Atmosphere",
      description: "Relax in our minimally designed, upscale environments equipped with premium artisanal products.",
    },
    {
      title: "Attention to Detail",
      description: "We don't rush. Every appointment is allocated adequate time to ensure a flawless execution.",
    },
  ];

  return (
    <Section className="bg-secondary/10 relative overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          <div className="md:w-1/3">
            <SectionHeading 
              title="The Picasso Difference" 
              subtitle="Why Choose Us" 
              align="left"
            />
            <p className="text-muted-foreground leading-relaxed">
              We focus on elevating the standard barbershop experience. From the moment you walk in, the environment, the service, and the result are tailored to perfection.
            </p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {features.map((feature, idx) => (
              <div key={idx} className="relative">
                <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-primary font-bold text-lg">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
