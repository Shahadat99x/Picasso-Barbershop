"use client";

import { useActionState } from "react";

import { signInAdminAction } from "@/app/admin/actions";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const initialAdminAuthState = {
  error: null,
};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAdminAction,
    initialAdminAuthState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          placeholder="owner@example.com"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground">Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          placeholder="Enter your password"
        />
      </label>

      {state.error ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      ) : null}

      <PrimaryButton type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in to admin"}
      </PrimaryButton>
    </form>
  );
}
