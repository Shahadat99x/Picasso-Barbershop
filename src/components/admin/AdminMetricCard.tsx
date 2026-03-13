import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AdminMetricCardProps {
  label: string;
  description: string;
  count: number | null;
  href: string;
  isLive: boolean;
}

export function AdminMetricCard({
  label,
  description,
  count,
  href,
  isLive,
}: AdminMetricCardProps) {
  return (
    <Link
      href={href}
      className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-black/5 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-4 text-4xl font-medium tracking-tight text-slate-950">
            {count ?? "—"}
          </p>
        </div>
        <span
          className={[
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
            isLive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700",
          ].join(" ")}
        >
          {isLive ? "Live" : "Placeholder"}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-950">
        Open module
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
