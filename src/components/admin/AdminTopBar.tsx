import { signOutAdminAction } from "@/app/admin/actions";

interface AdminTopBarProps {
  email: string;
}

export function AdminTopBar({ email }: AdminTopBarProps) {
  return (
    <header className="border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Super Admin
          </span>
          <h1 className="mt-2 text-2xl font-medium tracking-tight text-slate-950">
            Content operations
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Admin routes are protected server-side and scoped to a single allowlisted
            superadmin while CRUD modules are added phase by phase.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Signed in as <span className="font-medium text-slate-950">{email}</span>
          </div>
          <form action={signOutAdminAction}>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
