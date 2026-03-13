import "server-only";

import type { Session, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const ADMIN_ACCESS_COOKIE = "pb_admin_access_token";
export const ADMIN_REFRESH_COOKIE = "pb_admin_refresh_token";

export interface AdminSessionResult {
  user: User | null;
  session: Session | null;
  reason?: "missing_env" | "missing_cookie" | "invalid_session";
}

function getSuperadminEmails() {
  return (process.env.SUPABASE_SUPERADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isSuperadminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  return getSuperadminEmails().includes(email.toLowerCase());
}

export async function clearAdminSessionCookies() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_ACCESS_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  cookieStore.set(ADMIN_REFRESH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function persistAdminSession(session: Session) {
  const cookieStore = await cookies();
  const accessMaxAge = session.expires_in ?? 60 * 60;

  cookieStore.set(ADMIN_ACCESS_COOKIE, session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: accessMaxAge,
  });

  cookieStore.set(ADMIN_REFRESH_COOKIE, session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getAdminSession(): Promise<AdminSessionResult> {
  if (!hasSupabasePublicEnv()) {
    return {
      user: null,
      session: null,
      reason: "missing_env",
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;
  const refreshToken = cookieStore.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!accessToken && !refreshToken) {
    return {
      user: null,
      session: null,
      reason: "missing_cookie",
    };
  }

  const supabase = createSupabaseServerClient();

  if (accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (!error && data.user) {
      return {
        user: data.user,
        session: null,
      };
    }
  }

  if (refreshToken) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (!error && data.session && data.user) {
      await persistAdminSession(data.session);

      return {
        user: data.user,
        session: data.session,
      };
    }
  }

  await clearAdminSessionCookies();

  return {
    user: null,
    session: null,
    reason: "invalid_session",
  };
}

export async function getAuthenticatedAdminUser() {
  const { user } = await getAdminSession();

  if (!user || !isSuperadminEmail(user.email)) {
    await clearAdminSessionCookies();
    return null;
  }

  return user;
}

export async function requireAuthenticatedAdminUser() {
  const user = await getAuthenticatedAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export async function redirectAuthenticatedAdmin() {
  const user = await getAuthenticatedAdminUser();

  if (user) {
    redirect("/admin");
  }
}
