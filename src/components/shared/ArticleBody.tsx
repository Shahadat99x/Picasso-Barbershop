import React from "react";

import type { BlogBodyBlock } from "@/data/blog";

interface ArticleBodyProps {
  blocks: BlogBodyBlock[];
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="space-y-6 text-base leading-8 text-foreground/90">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id} className="text-lg leading-8 text-muted-foreground">
                {block.text}
              </p>
            );
          case "heading":
            if (block.level === 2) {
              return (
                <h2 key={block.id} className="pt-4 text-3xl font-medium tracking-tight">
                  {block.text}
                </h2>
              );
            }

            return (
              <h3 key={block.id} className="pt-2 text-2xl font-medium tracking-tight">
                {block.text}
              </h3>
            );
          case "list":
            if (block.style === "ordered") {
              return (
                <ol
                  key={block.id}
                  className="list-decimal space-y-3 pl-6 text-lg leading-8 text-muted-foreground"
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
                className="list-disc space-y-3 pl-6 text-lg leading-8 text-muted-foreground"
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
                className="rounded-[1.75rem] border border-border/60 bg-secondary/15 px-6 py-7"
              >
                <p className="text-xl leading-8 text-foreground">{block.text}</p>
                {block.attribution ? (
                  <footer className="mt-4 text-sm text-muted-foreground">
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
