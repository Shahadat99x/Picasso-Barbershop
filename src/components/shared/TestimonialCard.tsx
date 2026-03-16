import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  author: string;
  role?: string;
  content: string;
  rating?: number;
}

export function TestimonialCard({
  author,
  role,
  content,
  rating = 5,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[1.85rem] border border-[#d7c5b4]/50 bg-[linear-gradient(180deg,#fbf8f4_0%,#f3ede6_100%)] p-8 text-left shadow-sm shadow-black/5 transition-all",
        className
      )}
      {...props}
    >
      <div className="mb-6 flex gap-1 text-[#b38855]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-4 w-4 fill-current", i >= rating && "text-muted-foreground/30 fill-transparent")}
          />
        ))}
      </div>
      <p className="mb-8 text-lg italic leading-8 text-foreground">&quot;{content}&quot;</p>
      <div className="mt-auto border-t border-[#dbcbbb]/60 pt-5">
        <div className="font-medium text-foreground">{author}</div>
        {role && <div className="mt-1 text-sm text-muted-foreground">{role}</div>}
      </div>
    </div>
  );
}
