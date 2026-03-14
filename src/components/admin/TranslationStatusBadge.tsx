"use client";

import { Badge } from "@/components/ui/badge";
import { TranslationStatus } from "@/i18n/get-content";

interface TranslationStatusBadgeProps {
  status: TranslationStatus;
  showLabel?: boolean;
}

const statusConfig: Record<TranslationStatus, { label: string; variant: "default" | "secondary" | "outline"; className: string }> = {
  complete: {
    label: "Translated",
    variant: "default",
    className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  },
  "lt-only": {
    label: "LT only",
    variant: "secondary",
    className: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  },
  empty: {
    label: "Missing",
    variant: "outline",
    className: "bg-slate-100 text-slate-600 hover:bg-slate-100",
  },
};

export function TranslationStatusBadge({ status, showLabel = true }: TranslationStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={config.className}>
      {showLabel ? config.label : status === "lt-only" ? "⚠" : status === "complete" ? "✓" : "✗"}
    </Badge>
  );
}

/**
 * Helper to calculate translation status from bilingual fields
 */
export function calculateTranslationStatus(ltValue: unknown, enValue: unknown): TranslationStatus {
  if (ltValue && enValue) return "complete";
  if (ltValue) return "lt-only";
  return "empty";
}
