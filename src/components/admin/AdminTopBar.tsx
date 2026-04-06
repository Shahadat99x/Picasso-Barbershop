import { signOutAdminAction } from "@/app/admin/actions";

interface AdminTopBarProps {
  email: string;
}

export function AdminTopBar({ email }: AdminTopBarProps) {
  return (
    <header className="border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 sm:py-4 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Admin
          </span>
          <h1 className="mt-1 truncate text-xl font-medium tracking-tight text-slate-950 sm:mt-2 sm:text-2xl">
            Content management
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
            <span className="hidden sm:inline">Signed in as </span>
            <span className="font-medium text-slate-950 truncate">{email}</span>
          </div>
          <form action={signOutAdminAction}>
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-300 px-3 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:h-11 sm:rounded-2xl sm:px-5 sm:text-sm"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
