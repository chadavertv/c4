import { env } from './env';

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return env.adminAllowlist.includes(email.toLowerCase());
}
