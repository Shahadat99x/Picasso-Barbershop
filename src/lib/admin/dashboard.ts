import "server-only";

import { adminContentNavigation } from "@/config/admin-navigation";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type TableName = keyof Database["public"]["Tables"];

interface DashboardMetricDefinition {
  label: string;
  table: TableName;
  href: string;
  description: string;
}

export interface AdminDashboardMetric extends DashboardMetricDefinition {
  count: number | null;
  isLive: boolean;
}

const dashboardMetrics: DashboardMetricDefinition[] = [
  {
    label: "Branches",
    table: "branches",
    href: "/admin/branches",
    description: "Location pages and local contact data.",
  },
  {
    label: "Services",
    table: "services",
    href: "/admin/services",
    description: "Service pages and category structure.",
  },
  {
    label: "Specialists",
    table: "specialists",
    href: "/admin/specialists",
    description: "Team members and branch assignments.",
  },
  {
    label: "Gallery",
    table: "gallery_items",
    href: "/admin/gallery",
    description: "Gallery assets and visual categorization.",
  },
  {
    label: "Promotions",
    table: "promotions",
    href: "/admin/promotions",
    description: "Campaigns and seasonal offers.",
  },
  {
    label: "Blog",
    table: "blog_posts",
    href: "/admin/blog",
    description: "Editorial articles and publishing state.",
  },
  {
    label: "Testimonials",
    table: "testimonials",
    href: "/admin/testimonials",
    description: "Client proof and featured reviews.",
  },
  {
    label: "Leads",
    table: "leads",
    href: "/admin/leads",
    description: "Contact submissions and sales follow-up.",
  },
];

export async function getAdminDashboardMetrics(): Promise<{
  envConfigured: boolean;
  metrics: AdminDashboardMetric[];
  moduleCount: number;
}> {
  if (!hasSupabaseAdminEnv()) {
    return {
      envConfigured: false,
      moduleCount: adminContentNavigation.length,
      metrics: dashboardMetrics.map((metric) => ({
        ...metric,
        count: null,
        isLive: false,
      })),
    };
  }

  const supabase = createSupabaseAdminClient();
  const counts = await Promise.all(
    dashboardMetrics.map(async (metric) => ({
      ...metric,
      count: await (async () => {
        const { count, error } = await supabase
          .from(metric.table)
          .select("*", { count: "exact", head: true });

        if (error) {
          return null;
        }

        return count ?? 0;
      })(),
    })),
  );

  return {
    envConfigured: true,
    moduleCount: adminContentNavigation.length,
    metrics: counts.map((metric) => ({
      ...metric,
      isLive: metric.count !== null,
    })),
  };
}
