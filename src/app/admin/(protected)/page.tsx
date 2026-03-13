import Link from "next/link";
import { ArrowRight, Database, ShieldCheck } from "lucide-react";

import { AdminMetricCard } from "@/components/admin/AdminMetricCard";
import { adminContentNavigation } from "@/config/admin-navigation";
import { getAdminDashboardMetrics } from "@/lib/admin/dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { envConfigured, metrics, moduleCount } = await getAdminDashboardMetrics();

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-black/5">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Dashboard
            </span>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-slate-950">
              Admin foundation is ready for module-by-module buildout.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              This dashboard keeps Phase 4a intentionally lean: secure login, protected
              routing, reusable shell, and direct visibility into whether the Supabase
              content layer is available for real counts.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-3 text-slate-950">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">Single-role model</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Access is limited to authenticated users whose email is present in
              `SUPABASE_SUPERADMIN_EMAILS`.
            </p>
            <div className="mt-6 flex items-center gap-3 text-slate-950">
              <Database className="h-5 w-5 text-sky-600" />
              <span className="font-medium">
                {envConfigured ? "Live Supabase counts enabled" : "Using safe placeholders"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminMetricCard
            key={metric.href}
            label={metric.label}
            description={metric.description}
            count={metric.count}
            href={metric.href}
            isLive={metric.isLive}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-black/5">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Upcoming modules
          </span>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {adminContentNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-colors hover:bg-slate-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-slate-950">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-[#111827] p-6 text-white shadow-sm shadow-black/10">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            Readiness
          </span>
          <p className="mt-4 text-4xl font-medium tracking-tight">{moduleCount}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            sidebar modules are scaffolded so Phase 4b can focus directly on CRUD
            interfaces instead of rebuilding shell-level concerns.
          </p>
        </div>
      </section>
    </div>
  );
}
