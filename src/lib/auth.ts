import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Simple single-password admin login. When moving to Supabase you can swap
// this for Supabase Auth without touching the admin UI.
const COOKIE = "fd_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

function token() {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return createHmac("sha256", secret).update("fd-events-admin-session").digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(value && safeEqual(value, token()));
}

export async function signIn(password: string) {
  if (!adminConfigured() || !safeEqual(password, process.env.ADMIN_PASSWORD!)) return false;
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
}
