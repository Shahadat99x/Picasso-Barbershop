/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function GallerySection() {
  return (
    <Section className="bg-background">
      <Container>
        <SectionHeading 
          title="Inside The Salon" 
          subtitle="Gallery" 
          align="center"
        />
        
        {/* CSS Grid masonry-style layout for gallery placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {/* Large Item */}
          <div className="col-span-2 row-span-2 relative aspect-square bg-muted rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/30 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-medium">
              Interior View (Placeholder)
            </div>
          </div>
          
          {/* Smaller Items */}
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/30 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-medium text-sm text-center px-4">
              Barber Chair
            </div>
          </div>
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/30 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-medium text-sm text-center px-4">
              Tools detail
            </div>
          </div>
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/30 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-medium text-sm text-center px-4">
              Haircut Action
            </div>
          </div>
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-secondary/30 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-medium text-sm text-center px-4">
              Products
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
