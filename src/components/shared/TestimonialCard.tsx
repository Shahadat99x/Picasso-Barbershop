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
        "rounded-2xl bg-secondary/30 p-8 shadow-sm transition-all text-center flex flex-col items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="flex gap-1 mb-6 text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-4 w-4 fill-current", i >= rating && "text-muted-foreground/30 fill-transparent")}
          />
        ))}
      </div>
      <p className="text-lg italic leading-relaxed text-foreground mb-8">&quot;{content}&quot;</p>
      <div>
        <div className="font-medium text-foreground">{author}</div>
        {role && <div className="text-sm text-muted-foreground mt-1">{role}</div>}
      </div>
    </div>
  );
}
