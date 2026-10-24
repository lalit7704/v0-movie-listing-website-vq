import { NextResponse, type NextRequest } from "next/server";
import { getVoteDb } from "@/lib/vote/auth";
import { handleVoteBotMessage } from "@/lib/vote/otp";
import { isValidVoteBotSecret } from "@/lib/vote/telegram";

/** Webhook of the voting bot (set automatically by ensureVoteBotWebhook). */
export async function POST(request: NextRequest) {
  if (!isValidVoteBotSecret(request.headers.get("x-telegram-bot-api-secret-token"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await request.json().catch(() => null);
  const message = update?.message;
  if (message?.chat?.type === "private") {
    try {
      await handleVoteBotMessage(getVoteDb(), message);
    } catch (caught) {
      console.error("[vote] Telegram update failed", caught);
    }
  }

  // Always 200, otherwise Telegram keeps sending the same update again.
  return NextResponse.json({ ok: true });
}
