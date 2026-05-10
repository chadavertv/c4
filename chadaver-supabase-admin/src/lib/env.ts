const required = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const env = {
  supabaseUrl: required(import.meta.env.VITE_SUPABASE_URL, 'VITE_SUPABASE_URL'),
  supabasePublishableKey: required(
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    'VITE_SUPABASE_PUBLISHABLE_KEY',
  ),
  adminAllowlist: (import.meta.env.VITE_ADMIN_ALLOWLIST ?? 'chadavertv@gmail.com')
    .split(',')
    .map((value: string) => value.trim().toLowerCase())
    .filter(Boolean),
};
