"use server";

import { redirect } from "next/navigation";

import {
  clearAdminSessionCookies,
  isSuperadminEmail,
  persistAdminSession,
} from "@/lib/admin/auth";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AdminAuthActionState {
  error: string | null;
}

function getReadableAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }

  if (normalized.includes("email not confirmed")) {
    return "This Supabase user exists, but the email is not confirmed yet.";
  }

  return message;
}

export async function signInAdminAction(
  _prevState: AdminAuthActionState,
  formData: FormData,
): Promise<AdminAuthActionState> {
  if (!hasSupabasePublicEnv()) {
    return {
      error:
        "Supabase environment variables are missing. Configure auth before using the admin area.",
    };
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return {
      error: "Email and password are required.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (!normalizedEmail || !normalizedPassword) {
    return {
      error: "Email and password are required.",
    };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password: normalizedPassword,
  });

  if (error || !data.session || !data.user) {
    return {
      error: error
        ? getReadableAuthError(error.message)
        : "Unable to sign in with those credentials.",
    };
  }

  if (!isSuperadminEmail(data.user.email)) {
    return {
      error: `This account signed in as ${data.user.email ?? "an unknown email"}, but that email is not included in SUPABASE_SUPERADMIN_EMAILS.`,
    };
  }

  await persistAdminSession(data.session);

  redirect("/admin");
}

export async function signOutAdminAction() {
  await clearAdminSessionCookies();
  redirect("/admin/login");
}
