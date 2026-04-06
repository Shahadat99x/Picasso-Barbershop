import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AdminMetricCard } from "@/components/admin/AdminMetricCard";
import { adminContentNavigation } from "@/config/admin-navigation";
import { getAdminDashboardMetrics } from "@/lib/admin/dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { metrics } = await getAdminDashboardMetrics();

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-black/5">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Content Overview
          </span>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-slate-950">
            Website summary
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Manage website content, business information, and customer inquiries. Quick access to
            branches, services, blog, gallery, testimonials, and settings.
          </p>
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

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-black/5">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Quick Actions
        </span>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </div>
  );
}
