import React from "react";

import type { ArticleBodyBlock } from "@/lib/public-data";

interface ArticleBodyProps {
  blocks: ArticleBodyBlock[];
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="space-y-8 text-base leading-8 text-foreground/90">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id} className="text-[1.02rem] leading-8 text-muted-foreground md:text-[1.08rem]">
                {block.text}
              </p>
            );
          case "heading":
            if (block.level === 2) {
              return (
                <h2 key={block.id} className="pt-6 text-3xl font-medium tracking-tight text-foreground md:text-[2.15rem]">
                  {block.text}
                </h2>
              );
            }

            return (
              <h3 key={block.id} className="pt-3 text-2xl font-medium tracking-tight text-foreground">
                {block.text}
              </h3>
            );
          case "list":
            if (block.style === "ordered") {
              return (
                <ol
                  key={block.id}
                  className="list-decimal space-y-3 pl-6 text-[1.02rem] leading-8 text-muted-foreground marker:text-primary"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              );
            }

            return (
              <ul
                key={block.id}
                className="list-disc space-y-3 pl-6 text-[1.02rem] leading-8 text-muted-foreground marker:text-primary"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={block.id}
                className="rounded-[1.9rem] border border-[#7d5d3b]/25 bg-[linear-gradient(180deg,#171311_0%,#120f0e_100%)] px-6 py-7 text-[#f5efe7]"
              >
                <p className="text-xl leading-8 text-[#f5efe7]">{block.text}</p>
                {block.attribution ? (
                  <footer className="mt-4 text-sm text-[#c8bbaf]">
                    {block.attribution}
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
