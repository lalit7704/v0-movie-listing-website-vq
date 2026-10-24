import { randomInt, randomUUID, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { VoteError, must, sha256 } from "@/lib/vote/auth";
import { maskPhone, normalizePhone } from "@/lib/vote/phone";
import {
  TelegramError,
  ensureVoteBotWebhook,
  getVoteBotLink,
  isVoteBotReady,
  sendVoteBotMessage,
} from "@/lib/vote/telegram";

const OTP_TTL_MS = 10 * 60_000;
export const RESEND_AFTER_SECONDS = 30;
const MAX_PER_PHONE_PER_HOUR = 10;
const MAX_PER_IP_PER_HOUR = 20;
const MAX_ATTEMPTS = 5;

export type OtpPurpose = "signup" | "login";

/**
 * telegram: the code went straight to the voter's known Telegram chat.
 * link: the voter must open the bot and share their number; the bot then sends the code.
 * dev: no bot token outside production, so the code is shown on screen.
 */
export type OtpDelivery = "telegram" | "link" | "dev";

export interface OtpChallenge {
  id: string;
  phone: string;
  purpose: OtpPurpose;
  payload: Record<string, string>;
  telegramChatId: number | null;
}

function newCode() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function codeHash(challengeId: string, code: string) {
  return sha256(`vote-otp:${challengeId}:${code}`);
}

const otpMessage = (code: string) =>
  `Your Onemovie voting OTP is <code>${code}</code>\n\nIt is valid for 10 minutes. Do not share it with anyone.`;

const shareNumberKeyboard = {
  keyboard: [[{ text: "📱 Share my phone number", request_contact: true }]],
  resize_keyboard: true,
  one_time_keyboard: true,
};

/**
 * Rate limits and stores a new challenge. A login with a known Telegram chat gets its code at once;
 * otherwise the bot sends it after the voter shares this number. The payload comes back from verifyOtp().
 */
export async function issueOtp(
  db: SupabaseClient,
  {
    phone,
    purpose,
    payload,
    ipHash,
    origin,
    telegramChatId = null,
  }: {
    phone: string;
    purpose: OtpPurpose;
    payload: Record<string, string>;
    ipHash: string;
    origin: string;
    telegramChatId?: number | null;
  }
) {
  const botReady = isVoteBotReady();
  if (!botReady && process.env.NODE_ENV === "production") {
    throw new VoteError("Telegram OTP is not set up on the server yet. Ask the site owner.", 503);
  }

  const hourAgo = new Date(Date.now() - 3_600_000).toISOString();
  const recent = must(
    await db
      .from("vote_otp_challenges")
      .select("created_at")
      .eq("phone", phone)
      .gte("created_at", hourAgo)
      .order("created_at", { ascending: false })
  );
  if (recent.length) {
    const wait = Math.ceil((new Date(recent[0].created_at).getTime() + RESEND_AFTER_SECONDS * 1000 - Date.now()) / 1000);
    if (wait > 0) throw new VoteError(`Please wait ${wait} seconds before asking for a new OTP`, 429);
  }
  if (recent.length >= MAX_PER_PHONE_PER_HOUR) {
    throw new VoteError("Too many OTPs for this number. Please try again after an hour.", 429);
  }

  const fromIp = await db
    .from("vote_otp_challenges")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", hourAgo);
  must(fromIp);
  if ((fromIp.count ?? 0) >= MAX_PER_IP_PER_HOUR) {
    throw new VoteError("Too many OTP requests from your network. Please try again later.", 429);
  }

  let telegramLink: string | null = null;
  if (botReady) {
    try {
      telegramLink = await getVoteBotLink();
    } catch (caught) {
      console.error("[vote] Voting bot is not reachable", caught);
      throw new VoteError("Telegram OTP is not working right now. Please try again later.", 503);
    }
    await ensureVoteBotWebhook(origin);
  }

  const id = randomUUID();
  // A code exists up front only when it can be delivered now: on screen in dev, or to a known chat.
  const directChat = botReady ? telegramChatId : null;
  const code = !botReady || directChat ? newCode() : null;
  must(
    await db.from("vote_otp_challenges").insert({
      id,
      phone,
      purpose,
      payload,
      ip_hash: ipHash,
      code_hash: code ? codeHash(id, code) : null,
      telegram_chat_id: directChat,
      expires_at: new Date(Date.now() + OTP_TTL_MS).toISOString(),
    })
  );

  let delivery: OtpDelivery = botReady ? "link" : "dev";
  if (directChat && code) {
    try {
      await sendVoteBotMessage(directChat, otpMessage(code));
      delivery = "telegram";
    } catch (caught) {
      if (!(caught instanceof TelegramError)) throw caught;
      // Blocked bot or deleted chat: fall back to sharing the number again.
      console.warn("[vote] Direct Telegram OTP failed", caught.message);
      must(await db.from("vote_otp_challenges").update({ code_hash: null, telegram_chat_id: null }).eq("id", id));
    }
  }
  if (delivery === "dev") console.info(`[vote] No voting bot token. OTP for ${phone}: ${code}`);

  // Rows older than a day no longer matter for anything, including the hourly limits.
  await db
    .from("vote_otp_challenges")
    .delete()
    .lt("created_at", new Date(Date.now() - 86_400_000).toISOString());

  return { challengeId: id, delivery, telegramLink, devCode: delivery === "dev" ? (code ?? undefined) : undefined };
}

/** What the signup and login routes answer once a challenge exists. */
export function otpSentResponse(phone: string, otp: Awaited<ReturnType<typeof issueOtp>>) {
  return NextResponse.json({
    success: true,
    challengeId: otp.challengeId,
    sentTo: maskPhone(phone),
    resendAfter: RESEND_AFTER_SECONDS,
    delivery: otp.delivery,
    telegramLink: otp.telegramLink,
    ...(otp.devCode ? { devCode: otp.devCode } : {}),
  });
}

interface TelegramMessage {
  chat: { id: number; type: string };
  from?: { id: number };
  contact?: { phone_number: string; user_id?: number };
}

/**
 * Handles a private message to the voting bot. Sharing a contact proves the Telegram account owns
 * that number, so the bot sends the code for the newest pending challenge of that number.
 */
export async function handleVoteBotMessage(db: SupabaseClient, message: TelegramMessage) {
  const chatId = message.chat.id;
  const { contact } = message;

  if (!contact) {
    await sendVoteBotMessage(
      chatId,
      "Welcome to <b>Onemovie voting</b>.\n\nTap the button below to share your phone number. If it matches the number you entered on the website, I will send your OTP here.",
      shareNumberKeyboard
    );
    return;
  }

  // A forwarded or picked contact belongs to someone else; only the button shares your own.
  if (!message.from || contact.user_id !== message.from.id) {
    await sendVoteBotMessage(chatId, "Please share <b>your own</b> number with the button below.", shareNumberKeyboard);
    return;
  }

  const phone = normalizePhone(contact.phone_number);
  if (!phone) {
    await sendVoteBotMessage(chatId, "Only Indian (+91) mobile numbers can be used for voting.", { remove_keyboard: true });
    return;
  }

  const challenge = must(
    await db
      .from("vote_otp_challenges")
      .select("id")
      .eq("phone", phone)
      .is("consumed_at", null)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
  );
  if (!challenge) {
    await sendVoteBotMessage(
      chatId,
      `No OTP request found for ${maskPhone(phone)}.\n\nOn the website, enter this same number and press <b>Get OTP on Telegram</b>, then share your number here again.`,
      { remove_keyboard: true }
    );
    return;
  }

  const code = newCode();
  must(
    await db
      .from("vote_otp_challenges")
      .update({ code_hash: codeHash(challenge.id, code), telegram_chat_id: chatId, attempts: 0 })
      .eq("id", challenge.id)
  );
  await sendVoteBotMessage(chatId, otpMessage(code), { remove_keyboard: true });
}

/** Checks the code and marks the challenge used, so each code logs in at most once. */
export async function verifyOtp(db: SupabaseClient, challengeId: string, code: string): Promise<OtpChallenge> {
  const row = must(
    await db
      .from("vote_otp_challenges")
      .select("id, phone, purpose, payload, code_hash, telegram_chat_id, attempts, expires_at, consumed_at")
      .eq("id", challengeId)
      .maybeSingle()
  );
  if (!row || row.consumed_at) throw new VoteError("This OTP is no longer valid. Ask for a new one.");
  if (new Date(row.expires_at) <= new Date()) throw new VoteError("OTP expired. Ask for a new one.");
  if (!row.code_hash) {
    throw new VoteError("Open Telegram and share your number with the bot first. It will send your OTP.");
  }
  if (row.attempts >= MAX_ATTEMPTS) throw new VoteError("Too many wrong tries. Ask for a new OTP.", 429);

  const matches = timingSafeEqual(Buffer.from(row.code_hash, "hex"), Buffer.from(codeHash(row.id, code), "hex"));
  if (!matches) {
    must(await db.from("vote_otp_challenges").update({ attempts: row.attempts + 1 }).eq("id", row.id));
    const left = MAX_ATTEMPTS - row.attempts - 1;
    throw new VoteError(left > 0 ? `Wrong OTP. ${left} ${left === 1 ? "try" : "tries"} left.` : "Wrong OTP. Ask for a new one.");
  }

  // Filtering on consumed_at means two requests racing with the same code cannot both win.
  // The payload (a signup's password hash) is not needed after this, so it is cleared.
  const used = must(
    await db
      .from("vote_otp_challenges")
      .update({ consumed_at: new Date().toISOString(), payload: {} })
      .eq("id", row.id)
      .is("consumed_at", null)
      .select("id")
  );
  if (!used.length) throw new VoteError("This OTP is no longer valid. Ask for a new one.");

  return {
    id: row.id,
    phone: row.phone,
    purpose: row.purpose,
    payload: row.payload,
    telegramChatId: row.telegram_chat_id ?? null,
  };
}
