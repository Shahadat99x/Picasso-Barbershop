import Link from "next/link";
import { ArrowRight, Construction } from "lucide-react";

interface AdminModulePlaceholderProps {
  title: string;
  description: string;
}

export function AdminModulePlaceholder({
  title,
  description,
}: AdminModulePlaceholderProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-black/5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <Construction className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Module scaffold
            </span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-slate-950">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm shadow-black/10">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
          Next phase
        </span>
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          This route exists so the admin shell and navigation can stay production-minded
          before individual CRUD flows are built in Phase 4b and beyond.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#f5d7a1]"
        >
          Return to dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
