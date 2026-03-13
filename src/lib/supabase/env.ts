function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function hasSupabaseUrl() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function hasSupabaseAnonKey() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function hasSupabaseServiceRoleKey() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function hasSupabasePublicEnv() {
  return hasSupabaseUrl() && hasSupabaseAnonKey();
}

export function hasSupabaseAdminEnv() {
  return hasSupabasePublicEnv() && hasSupabaseServiceRoleKey();
}

export function getSupabaseUrl() {
  return requireEnv("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabaseAnonKey() {
  return requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function getSupabaseServiceRoleKey() {
  return requireEnv("SUPABASE_SERVICE_ROLE_KEY");
}
