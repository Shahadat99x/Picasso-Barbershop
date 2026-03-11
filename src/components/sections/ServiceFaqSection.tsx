"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqSectionProps {
  faqs: FaqItem[];
}

export function ServiceFaqSection({ faqs }: ServiceFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <Section className="bg-secondary/10">
      <Container>
        <SectionHeading 
          title="Common Questions" 
          subtitle="FAQ" 
          align="left"
        />
        <div className="max-w-3xl border-t border-border/50">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-border/50">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                >
                  <span className="text-lg font-medium group-hover:text-primary transition-colors pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                      isOpen && "rotate-180 text-primary"
                    )} 
                  />
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
