"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = React.HTMLAttributes<HTMLDivElement>;

export function LanguageSwitcher({ className, ...props }: LanguageSwitcherProps) {
  const [lang, setLang] = useState<"LT" | "EN">("LT");

  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <button
        onClick={() => setLang("LT")}
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          lang === "LT" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        LT
      </button>
      <span className="text-muted-foreground/30">|</span>
      <button
        onClick={() => setLang("EN")}
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          lang === "EN" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
