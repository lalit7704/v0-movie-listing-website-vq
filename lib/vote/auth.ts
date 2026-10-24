import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizePhone } from "@/lib/vote/phone";
import type { VoteRole, VoteUser } from "@/lib/vote/types";

/**
 * Voting accounts live in their own tables (supabase/migrations/202610240001_voting.sql) and use
 * their own cookie, so they never touch the site's Supabase auth or the /admin panel.
 */
export const VOTE_COOKIE = "onemovie_vote_session";
const SESSION_DAYS = 30;

/** Thrown inside the vote routes; voteFailure() turns it into a JSON error with this status. */
export class VoteError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

export function voteFailure(error: unknown) {
  if (error instanceof VoteError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  console.error("[vote]", error);
  return NextResponse.json({ success: false, error: "Something went wrong, please try again" }, { status: 500 });
}

interface DbError {
  code?: string;
  message: string;
}

/** The data type of a Supabase result when it has no error. */
type DbData<R> = Extract<R, { error: null }> extends { data: infer T } ? T : never;

/** Unwraps a Supabase result, turning its error into a VoteError. */
export function must<R extends { data: unknown; error: DbError | null }>(result: R): DbData<R> {
  const { error } = result;
  if (!error) return result.data as DbData<R>;
  if (error.code === "42P01" || error.code === "PGRST205") {
    throw new VoteError(
      "Voting tables are missing. Run supabase/migrations/202610240001_voting.sql in the Supabase SQL editor.",
      503
    );
  }
  throw new VoteError(error.message, 500);
}

/** The request's JSON body checked against the schema; the first problem becomes a 400. */
export async function parseBody<T extends z.ZodTypeAny>(request: NextRequest, schema: T): Promise<z.infer<T>> {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) throw new VoteError(parsed.error.issues[0].message);
  return parsed.data;
}

export const phoneSchema = z.string().transform((value, context) => {
  const phone = normalizePhone(value);
  if (!phone) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid 10 digit mobile number" });
    return z.NEVER;
  }
  return phone;
});

export const nameSchema = z.string().trim().min(2, "Enter your name").max(60, "Name is too long");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(72, "Password is too long");

export function getVoteDb() {
  const db = createAdminClient();
  if (!db) throw new VoteError("SUPABASE_SERVICE_ROLE_KEY is not set on the server", 503);
  return db;
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

/** Hashed client IP, used only to rate limit OTP requests. */
export function clientIpHash(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return sha256(`vote-ip:${ip}`);
}

function scryptKey(password: string, salt: Buffer, length: number) {
  return new Promise<Buffer>((resolve, reject) =>
    scrypt(password.normalize("NFKC"), salt, length, (error, key) => (error ? reject(error) : resolve(key)))
  );
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await scryptKey(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, key] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !key) return false;
  const expected = Buffer.from(key, "base64");
  const actual = await scryptKey(password, Buffer.from(salt, "base64"), expected.length);
  return timingSafeEqual(actual, expected);
}

function getOwnerPhones() {
  return (process.env.VOTE_OWNER_PHONE || "")
    .split(",")
    .map((phone) => normalizePhone(phone))
    .filter(Boolean);
}

export function isOwnerPhone(phone: string) {
  return getOwnerPhones().includes(phone);
}

interface VoteUserRow {
  id: string;
  phone: string;
  name: string;
  role: string;
}

/** Owner comes from VOTE_OWNER_PHONE; managers are the users the owner promoted. */
export function toVoteUser(row: VoteUserRow): VoteUser {
  const role: VoteRole = isOwnerPhone(row.phone) ? "owner" : row.role === "manager" ? "manager" : "voter";
  return { id: row.id, name: row.name, phone: row.phone, role };
}

export async function startSession(db: SupabaseClient, userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  must(
    await db
      .from("vote_sessions")
      .insert({ token_hash: sha256(token), user_id: userId, expires_at: expiresAt.toISOString() })
  );
  // Sessions of this user that already ran out are of no use any more.
  await db.from("vote_sessions").delete().eq("user_id", userId).lt("expires_at", new Date().toISOString());
  return { token, expiresAt };
}

export function setSessionCookie(response: NextResponse, token: string, expires: Date) {
  response.cookies.set(VOTE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(VOTE_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export interface VoteSession {
  db: SupabaseClient;
  tokenHash: string;
  user: VoteUser;
}

export async function getVoteSession(): Promise<VoteSession | null> {
  const token = (await cookies()).get(VOTE_COOKIE)?.value;
  if (!token) return null;

  const db = getVoteDb();
  const tokenHash = sha256(token);
  const row = must(
    await db
      .from("vote_sessions")
      .select("expires_at, user:vote_users(id, phone, name, role)")
      .eq("token_hash", tokenHash)
      .maybeSingle()
      .overrideTypes<{ expires_at: string; user: VoteUserRow | null } | null, { merge: false }>()
  );
  if (!row?.user || new Date(row.expires_at) <= new Date()) return null;
  return { db, tokenHash, user: toVoteUser(row.user) };
}

const accessErrors = {
  voter: "Please login first",
  manager: "Only voting managers can do this",
  owner: "Only the owner can manage the team",
};

/** The session when the caller has at least this access, otherwise the error response. */
export async function requireVoteSession(access: "voter" | "manager" | "owner"): Promise<VoteSession | NextResponse> {
  let session: VoteSession | null;
  try {
    session = await getVoteSession();
  } catch (caught) {
    return voteFailure(caught);
  }
  if (!session) {
    return NextResponse.json({ success: false, error: accessErrors.voter }, { status: 401 });
  }

  const { role } = session.user;
  const allowed = access === "voter" || role === "owner" || (access === "manager" && role === "manager");
  if (!allowed) {
    return NextResponse.json({ success: false, error: accessErrors[access] }, { status: 403 });
  }
  return session;
}
