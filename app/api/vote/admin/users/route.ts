import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  VoteError,
  hashPassword,
  isOwnerPhone,
  must,
  parseBody,
  passwordSchema,
  phoneSchema,
  requireVoteSession,
  voteFailure,
} from "@/lib/vote/auth";
import type { VoteManager } from "@/lib/vote/types";

/** Managers can run polls; only the owner (VOTE_OWNER_PHONE) can add or remove them. */
export async function GET() {
  const session = await requireVoteSession("owner");
  if (session instanceof NextResponse) return session;

  try {
    const rows = must(
      await session.db
        .from("vote_users")
        .select("id, name, phone, last_login_at")
        .eq("role", "manager")
        .order("created_at", { ascending: true })
    );
    const managers: VoteManager[] = rows.map(
      (row: { id: string; name: string; phone: string; last_login_at: string | null }) => ({
        id: row.id,
        name: row.name,
        phone: row.phone,
        lastLoginAt: row.last_login_at,
      })
    );
    return NextResponse.json({ success: true, managers }, { headers: { "Cache-Control": "no-store" } });
  } catch (caught) {
    return voteFailure(caught);
  }
}

const addSchema = z.object({
  phone: phoneSchema,
  name: z.string().trim().max(60, "नाम बहुत लंबा है").default(""),
  password: z.union([z.literal(""), passwordSchema]).default(""),
});

/** Makes a number a manager: creates the account, or promotes an existing voter. */
export async function POST(request: NextRequest) {
  const session = await requireVoteSession("owner");
  if (session instanceof NextResponse) return session;

  try {
    const { phone, name, password } = await parseBody(request, addSchema);
    if (isOwnerPhone(phone)) throw new VoteError("यह मुख्य एडमिन का नंबर है");
    if (name && name.length < 2) throw new VoteError("नाम बहुत छोटा है");

    const { db } = session;
    const existing = must(await db.from("vote_users").select("id").eq("phone", phone).maybeSingle());

    if (existing) {
      // An existing voter keeps their password unless the owner sets a new one.
      must(
        await db
          .from("vote_users")
          .update({
            role: "manager",
            ...(name ? { name } : {}),
            ...(password ? { password_hash: await hashPassword(password), failed_logins: 0, locked_until: null } : {}),
          })
          .eq("id", existing.id)
      );
      return NextResponse.json({ success: true, created: false });
    }

    if (!name) throw new VoteError("इस नंबर का अभी कोई अकाउंट नहीं है, इसलिए नाम डालें");
    if (!password) throw new VoteError("इस नंबर का अभी कोई अकाउंट नहीं है, इसलिए पासवर्ड रखें");
    must(
      await db
        .from("vote_users")
        .insert({ phone, name, password_hash: await hashPassword(password), role: "manager" })
    );
    return NextResponse.json({ success: true, created: true });
  } catch (caught) {
    return voteFailure(caught);
  }
}

/** Takes manager rights away; the account stays as a normal voter. */
export async function DELETE(request: NextRequest) {
  const session = await requireVoteSession("owner");
  if (session instanceof NextResponse) return session;

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id || !z.string().uuid().safeParse(id).success) throw new VoteError("यूज़र की पहचान नहीं मिली");
    must(await session.db.from("vote_users").update({ role: "voter" }).eq("id", id).eq("role", "manager"));
    return NextResponse.json({ success: true });
  } catch (caught) {
    return voteFailure(caught);
  }
}
