import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AdminModulePlaceholder } from "@/components/admin/AdminModulePlaceholder";
import { getAdminSection } from "@/config/admin-navigation";

export function generateStaticParams() {
  return [
    { section: "gallery" },
    { section: "promotions" },
    { section: "blog" },
    { section: "testimonials" },
    { section: "leads" },
    { section: "settings" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const adminSection = getAdminSection(section);

  return {
    title: adminSection?.label ?? "Admin",
  };
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const adminSection = getAdminSection(section);

  if (!adminSection) {
    notFound();
  }

  return (
    <AdminModulePlaceholder
      title={adminSection.label}
      description={adminSection.description}
    />
  );
}
