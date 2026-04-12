import React from "react";
import Link from "next/link";

import type { ArticleBodyBlock } from "@/lib/public-data";
import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  blocks: ArticleBodyBlock[];
  className?: string;
  highlightLead?: boolean;
}

function renderInlineContent(text: string, keyPrefix: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index));
    }

    if (match[2]) {
      parts.push(
        <strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-foreground">
          {match[2]}
        </strong>,
      );
    } else if (match[3] && match[4]) {
      const href = match[4].trim();
      const label = match[3].trim();
      const isInternal = href.startsWith("/");
      const linkClassName =
        "font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:text-foreground";

      parts.push(
        isInternal ? (
          <Link key={`${keyPrefix}-link-${match.index}`} href={href} className={linkClassName}>
            {label}
          </Link>
        ) : (
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={linkClassName}
          >
            {label}
          </a>
        ),
      );
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length > 0 ? parts : text;
}

export function ArticleBody({ blocks, className, highlightLead = false }: ArticleBodyProps) {
  const leadParagraphId = highlightLead
    ? blocks.find((block) => block.type === "paragraph")?.id
    : null;

  return (
    <div className={cn("space-y-8 text-base leading-8 text-foreground/90", className)}>
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={block.id}
                className={cn(
                  "text-[1.02rem] leading-[1.95] text-muted-foreground md:text-[1.08rem]",
                  highlightLead &&
                    block.id === leadParagraphId &&
                    "text-[1.12rem] leading-[1.9] text-foreground md:text-[1.22rem]",
                )}
              >
                {renderInlineContent(block.text, block.id)}
              </p>
            );
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={block.id}
                  className="scroll-mt-28 pt-6 text-[2rem] font-medium tracking-tight text-foreground md:text-[2.35rem]"
                >
                  {renderInlineContent(block.text, block.id)}
                </h2>
              );
            }

            return (
              <h3 key={block.id} className="scroll-mt-28 pt-2 text-[1.5rem] font-medium tracking-tight text-foreground md:text-[1.7rem]">
                {renderInlineContent(block.text, block.id)}
              </h3>
            );
          case "list":
            if (block.style === "ordered") {
              return (
                <ol
                  key={block.id}
                  className="list-decimal space-y-3.5 pl-6 text-[1.02rem] leading-[1.9] text-muted-foreground marker:font-medium marker:text-primary"
                >
                  {block.items.map((item, index) => (
                    <li key={`${block.id}-${index}`}>{renderInlineContent(item, `${block.id}-${index}`)}</li>
                  ))}
                </ol>
              );
            }

            return (
              <ul
                key={block.id}
                className="list-disc space-y-3.5 pl-6 text-[1.02rem] leading-[1.9] text-muted-foreground marker:text-primary"
              >
                {block.items.map((item, index) => (
                  <li key={`${block.id}-${index}`}>{renderInlineContent(item, `${block.id}-${index}`)}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={block.id}
                className="rounded-[1.9rem] border border-[#7d5d3b]/25 bg-[linear-gradient(180deg,#171311_0%,#120f0e_100%)] px-6 py-7 text-[#f5efe7] shadow-[0_24px_70px_rgba(12,10,8,0.22)]"
              >
                <p className="text-xl leading-8 text-[#f5efe7]">{renderInlineContent(block.text, block.id)}</p>
                {block.attribution ? (
                  <footer className="mt-4 text-sm text-[#c8bbaf]">
                    {renderInlineContent(block.attribution, `${block.id}-attribution`)}
                  </footer>
                ) : null}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
