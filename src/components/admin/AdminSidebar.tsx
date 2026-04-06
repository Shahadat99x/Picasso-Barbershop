"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  Building2,
  GalleryVerticalEnd,
  LayoutDashboard,
  MessageSquareQuote,
  Scissors,
  Settings,
  Sparkles,
  Users,
  UserSquare2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { adminNavigation } from "@/config/admin-navigation";

const iconMap: Record<string, LucideIcon> = {
  "/admin": LayoutDashboard,
  "/admin/branches": Building2,
  "/admin/services": Scissors,
  "/admin/specialists": UserSquare2,
  "/admin/gallery": GalleryVerticalEnd,
  "/admin/promotions": Sparkles,
  "/admin/blog": BookText,
  "/admin/testimonials": MessageSquareQuote,
  "/admin/leads": Users,
  "/admin/settings": Settings,
} as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-white/10 bg-[#111827] text-white lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="hidden border-b border-white/10 px-6 py-6 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Wrench className="h-5 w-5 text-[#f5d7a1]" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
                Picasso
              </div>
              <div className="text-lg font-medium tracking-tight">Admin Console</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Manage website content, business information, and customer inquiries.
          </p>
        </div>

        <nav className="overflow-x-auto px-2 py-2 sm:px-4 sm:py-3 lg:flex-1 lg:overflow-visible lg:px-3 lg:py-4">
          <ul className="flex gap-1 sm:gap-2 lg:flex-col">
            {adminNavigation.map((item) => {
              const Icon = iconMap[item.href];
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

              return (
                <li key={item.href} className="min-w-fit lg:min-w-0">
                  <Link
                    href={item.href}
                    className={[
                      "group flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-colors sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3",
                      isActive
                        ? "bg-white text-[#0f172a] shadow-sm"
                        : "text-white/72 hover:bg-white/6 hover:text-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-7 w-7 items-center justify-center rounded-lg border transition-colors sm:h-9 sm:w-9 sm:rounded-xl",
                        isActive
                          ? "border-slate-200 bg-slate-100"
                          : "border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10",
                      ].join(" ")}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                    <span className="whitespace-nowrap text-xs font-medium sm:text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
