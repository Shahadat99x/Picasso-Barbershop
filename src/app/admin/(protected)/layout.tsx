import { AdminShell } from "@/components/admin/AdminShell";
import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Dashboard",
};

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireAuthenticatedAdminUser();

  return <AdminShell email={user.email ?? "superadmin"}>{children}</AdminShell>;
}
