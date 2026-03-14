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

export function createSupabaseServerClient() {
  return createClient<Database>(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    serverOptions,
  );
}

export function createSupabaseAdminClient() {
  return createClient<any>(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    serverOptions,
  );
}
