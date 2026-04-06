import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { redirectAuthenticatedAdmin } from "@/lib/admin/auth";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage() {
  await redirectAuthenticatedAdmin();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(234,224,212,0.45),rgba(249,248,246,1))] py-10 md:py-16">
      <Container className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="grid w-full max-w-5xl gap-8 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-xl shadow-black/5 lg:grid-cols-[minmax(0,1fr)_28rem]">
          <section className="relative hidden overflow-hidden bg-primary px-10 py-12 text-primary-foreground lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_40%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
                  Super Admin
                </span>
                <h1 className="mt-6 max-w-sm text-4xl font-medium tracking-tight">
                  Admin access for the salon content system.
                </h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-primary-foreground/75">
                  Log in to manage website content, business information, and customer inquiries.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="mx-auto flex max-w-md flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Admin Login
              </span>
              <h1 className="mt-4 text-3xl font-medium tracking-tight">
                Sign in to continue
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Please sign in with your administrator email and password.
              </p>

              <div className="mt-8">
                <AdminLoginForm />
              </div>

              <div className="mt-8 border-t border-border/50 pt-5 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground">
                  Return to public site
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
