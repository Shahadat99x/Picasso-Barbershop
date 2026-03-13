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

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session || !data.user) {
    return {
      error: "Unable to sign in with those credentials.",
    };
  }

  if (!isSuperadminEmail(data.user.email)) {
    return {
      error:
        "This account is authenticated but is not allowed to access the admin area.",
    };
  }

  await persistAdminSession(data.session);

  redirect("/admin");
}

export async function signOutAdminAction() {
  await clearAdminSessionCookies();
  redirect("/admin/login");
}
