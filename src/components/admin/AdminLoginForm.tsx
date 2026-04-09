"use client";

import { useActionState } from "react";

import { signInAdminAction } from "@/app/admin/actions";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div>
        <Label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-foreground">
          Email
        </Label>
        <Input
          id="admin-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          aria-invalid={state.error ? "true" : undefined}
          aria-describedby={state.error ? "admin-login-error" : undefined}
          className="h-12 rounded-2xl border-border/60 bg-background px-4 py-3 text-sm md:text-base"
          placeholder="owner@example.com"
        />
      </div>

      <div>
        <Label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-foreground">
          Password
        </Label>
        <Input
          id="admin-password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? "true" : undefined}
          aria-describedby={state.error ? "admin-login-error" : undefined}
          className="h-12 rounded-2xl border-border/60 bg-background px-4 py-3 text-sm md:text-base"
          placeholder="Enter your password"
        />
      </div>

      {state.error ? (
        <div
          id="admin-login-error"
          className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      <PrimaryButton type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in to admin"}
      </PrimaryButton>
    </form>
  );
}
