import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { z } from "zod";
import { ADMIN_FLAG, getAdminSession, isOwnerEmail } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const PAGE_SIZE = 1000;

/** Walks every auth user; fine for a site with a few thousand accounts. */
async function findUsers(client: SupabaseClient, match: (user: User) => boolean) {
  const found: User[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: PAGE_SIZE });
    if (error) throw error;
    found.push(...data.users.filter(match));
    if (data.users.length < PAGE_SIZE) return found;
  }
}

/** The service-role client when the caller is the owner, otherwise the error response. */
async function requireOwner(): Promise<SupabaseClient | NextResponse> {
  const session = await getAdminSession();
  if (session?.role !== "owner") {
    return NextResponse.json({ success: false, error: "Only the owner can manage users" }, { status: 403 });
  }
  return (
    createAdminClient() ??
    NextResponse.json(
      { success: false, error: "SUPABASE_SERVICE_ROLE_KEY is not set on the server" },
      { status: 503 }
    )
  );
}

function failure(error: unknown) {
  return NextResponse.json(
    { success: false, error: error instanceof Error ? error.message : "Request failed" },
    { status: 500 }
  );
}

export async function GET() {
  const client = await requireOwner();
  if (client instanceof NextResponse) return client;

  try {
    const admins = await findUsers(client, (user) => user.app_metadata?.[ADMIN_FLAG] === true);
    return NextResponse.json({
      success: true,
      users: admins.map((user) => ({
        id: user.id,
        email: user.email,
        lastSignInAt: user.last_sign_in_at ?? null,
      })),
    });
  } catch (caught) {
    return failure(caught);
  }
}

const addSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().default(""),
});

export async function POST(request: NextRequest) {
  const client = await requireOwner();
  if (client instanceof NextResponse) return client;

  const parsed = addSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { email, password } = parsed.data;
  if (isOwnerEmail(email)) {
    return NextResponse.json({ success: false, error: "That is the owner account" }, { status: 400 });
  }

  try {
    const [existing] = await findUsers(client, (user) => user.email?.toLowerCase() === email);

    if (existing) {
      // Existing accounts keep their own password or Google login.
      const { error: updateError } = await client.auth.admin.updateUserById(existing.id, {
        app_metadata: { ...existing.app_metadata, [ADMIN_FLAG]: true },
      });
      if (updateError) throw updateError;
      return NextResponse.json({ success: true, created: false });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "No account exists for this email yet. Set a password (6+ characters) to create one." },
        { status: 400 }
      );
    }

    const { error: createError } = await client.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { [ADMIN_FLAG]: true },
    });
    if (createError) throw createError;
    return NextResponse.json({ success: true, created: true });
  } catch (caught) {
    return failure(caught);
  }
}

export async function DELETE(request: NextRequest) {
  const client = await requireOwner();
  if (client instanceof NextResponse) return client;

  const userId = request.nextUrl.searchParams.get("id");
  if (!userId) {
    return NextResponse.json({ success: false, error: "Missing user id" }, { status: 400 });
  }

  try {
    // Only revokes admin access; the account itself is left alone.
    const { error: updateError } = await client.auth.admin.updateUserById(userId, {
      app_metadata: { [ADMIN_FLAG]: false },
    });
    if (updateError) throw updateError;
    return NextResponse.json({ success: true });
  } catch (caught) {
    return failure(caught);
  }
}
