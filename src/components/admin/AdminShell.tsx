import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

interface AdminShellProps {
  email: string;
  children: React.ReactNode;
}

export function AdminShell({ email, children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f1ea_0%,#eef2f7_45%,#f8fafc_100%)] text-slate-950">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[18rem_minmax(0,1fr)]">
        <AdminSidebar />
        <div className="min-w-0">
          <AdminTopBar email={email} />
          <main className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
