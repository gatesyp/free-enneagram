import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "enneagram_admin";

export function hashToken(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function getAdminToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return hashToken(password);
}

export function isValidAdminToken(token: string | undefined): boolean {
  const expected = getAdminToken();
  if (!expected || !token) return false;

  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}