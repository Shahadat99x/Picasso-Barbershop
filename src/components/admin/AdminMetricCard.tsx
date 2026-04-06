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
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm shadow-black/5 transition-transform hover:-translate-y-0.5 sm:rounded-[1.75rem] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
          <p className="mt-2 text-2xl font-medium tracking-tight text-slate-950 sm:mt-4 sm:text-4xl">
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
      <p className="mt-3 hidden text-sm leading-relaxed text-slate-600 sm:block sm:mt-4">{description}</p>
      <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-950 sm:mt-6 sm:text-sm">
        Open module
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
