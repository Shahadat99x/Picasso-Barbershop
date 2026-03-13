import { requireAuthenticatedAdminUser } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthenticatedAdminUser();

  return children;
}
