import React from "react";
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
  title?: string;
  subtitle?: string;
}

export function ServiceFaqSection({
  faqs,
  title = "Common Questions",
  subtitle = "FAQ",
}: ServiceFaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <Section className="bg-secondary/10">
      <Container>
        <SectionHeading 
          title={title}
          subtitle={subtitle}
          align="left"
        />
        <div className="max-w-3xl border-t border-border/50">
          {faqs.map((faq, index) => {
            return (
              <details
                key={`${faq.question}-${index}`}
                className="group border-b border-border/50"
                open={index === 0}
              >
                <summary
                  className="focus-ring flex w-full cursor-pointer list-none items-center justify-between rounded-xl py-6 text-left"
                >
                  <span className="pr-8 text-lg font-medium transition-colors group-hover:text-primary motion-reduce:transition-none">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180 group-open:text-primary motion-reduce:transform-none motion-reduce:transition-none",
                    )}
                  />
                </summary>
                <p className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
