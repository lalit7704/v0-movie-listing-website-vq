import type { User } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type AdminRole = "owner" | "editor";

/** app_metadata flag the owner sets on users allowed into /admin. Only the service role can write it. */
export const ADMIN_FLAG = "onemovie_admin";

export interface AdminSession {
  user: User;
  email: string;
  role: AdminRole;
}

function getOwnerEmails() {
  return (process.env.ADMIN_OWNER_EMAIL || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isOwnerEmail(email: string) {
  return getOwnerEmails().includes(email.trim().toLowerCase());
}

export function getAdminRole(user: User): AdminRole | null {
  // An unconfirmed address proves nothing about who owns it.
  if (!user.email || !user.email_confirmed_at) return null;
  if (isOwnerEmail(user.email)) return "owner";
  if (user.app_metadata?.[ADMIN_FLAG] === true) return "editor";
  return null;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  // getUser() asks Supabase for the current record, so removed admins lose access immediately.
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) return null;

  const role = getAdminRole(data.user);
  return role ? { user: data.user, email: data.user.email, role } : null;
}

/** Signed-in admin, or the legacy x-admin-token header for scripts. */
export async function isAdminRequest(request: NextRequest) {
  const adminToken = process.env.ADMIN_UPLOAD_TOKEN;
  if (adminToken && request.headers.get("x-admin-token") === adminToken) return true;
  return Boolean(await getAdminSession());
}
