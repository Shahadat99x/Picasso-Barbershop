import { createClient } from "@supabase/supabase-js";

import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

const serverOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

const uncachedFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    cache: "no-store",
  });

const adminServerOptions = {
  ...serverOptions,
  global: {
    fetch: uncachedFetch,
  },
};

export function createSupabaseServerClient() {
  return createClient<Database>(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    serverOptions,
  );
}

export function createSupabaseAdminClient() {
  // Public pages and admin actions share this server-only client until typed admin access is tightened.
  // Bypass the Next data cache here so CMS-backed public pages do not serve stale paths or content.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient<any>(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    adminServerOptions,
  );
}
