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
  `आपका Onemovie वोटिंग OTP है: <code>${code}</code>\n\nयह 10 मिनट तक मान्य है। इसे किसी के साथ शेयर न करें।`;

const shareNumberKeyboard = {
  keyboard: [[{ text: "📱 अपना फ़ोन नंबर शेयर करें", request_contact: true }]],
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
    throw new VoteError("Telegram OTP अभी सर्वर पर सेट नहीं है। साइट के मालिक से संपर्क करें।", 503);
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
    if (wait > 0) throw new VoteError(`नया OTP माँगने से पहले ${wait} सेकंड रुकें`, 429);
  }
  if (recent.length >= MAX_PER_PHONE_PER_HOUR) {
    throw new VoteError("इस नंबर पर बहुत ज़्यादा OTP माँगे गए। एक घंटे बाद कोशिश करें।", 429);
  }

  const fromIp = await db
    .from("vote_otp_challenges")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", hourAgo);
  must(fromIp);
  if ((fromIp.count ?? 0) >= MAX_PER_IP_PER_HOUR) {
    throw new VoteError("आपके नेटवर्क से बहुत ज़्यादा OTP माँगे गए। थोड़ी देर बाद कोशिश करें।", 429);
  }

  let telegramLink: string | null = null;
  if (botReady) {
    try {
      telegramLink = await getVoteBotLink();
    } catch (caught) {
      console.error("[vote] Voting bot is not reachable", caught);
      throw new VoteError("Telegram OTP अभी काम नहीं कर रहा। थोड़ी देर बाद कोशिश करें।", 503);
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
      "<b>Onemovie वोटिंग</b> में आपका स्वागत है।\n\nनीचे दिए बटन से अपना फ़ोन नंबर शेयर करें। अगर यह वही नंबर है जो आपने वेबसाइट पर डाला है, तो आपका OTP यहीं आ जाएगा।",
      shareNumberKeyboard
    );
    return;
  }

  // A forwarded or picked contact belongs to someone else; only the button shares your own.
  if (!message.from || contact.user_id !== message.from.id) {
    await sendVoteBotMessage(chatId, "कृपया नीचे दिए बटन से <b>अपना ही</b> नंबर शेयर करें।", shareNumberKeyboard);
    return;
  }

  const phone = normalizePhone(contact.phone_number);
  if (!phone) {
    await sendVoteBotMessage(chatId, "वोटिंग के लिए सिर्फ़ भारतीय (+91) मोबाइल नंबर चलते हैं।", { remove_keyboard: true });
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
      `${maskPhone(phone)} के लिए कोई OTP अनुरोध नहीं मिला।\n\nवेबसाइट पर यही नंबर डालकर <b>Telegram पर OTP पाएँ</b> दबाएँ, फिर यहाँ दोबारा अपना नंबर शेयर करें।`,
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
  if (!row || row.consumed_at) throw new VoteError("यह OTP अब मान्य नहीं है। नया OTP माँगें।");
  if (new Date(row.expires_at) <= new Date()) throw new VoteError("OTP की समय सीमा खत्म हो गई। नया OTP माँगें।");
  if (!row.code_hash) {
    throw new VoteError("पहले Telegram खोलकर बॉट को अपना नंबर शेयर करें। वह आपको OTP भेजेगा।");
  }
  if (row.attempts >= MAX_ATTEMPTS) throw new VoteError("बहुत बार गलत कोड डाला गया। नया OTP माँगें।", 429);

  const matches = timingSafeEqual(Buffer.from(row.code_hash, "hex"), Buffer.from(codeHash(row.id, code), "hex"));
  if (!matches) {
    must(await db.from("vote_otp_challenges").update({ attempts: row.attempts + 1 }).eq("id", row.id));
    const left = MAX_ATTEMPTS - row.attempts - 1;
    throw new VoteError(left > 0 ? `गलत OTP। ${left} ${left === 1 ? "कोशिश" : "कोशिशें"} बाकी हैं।` : "गलत OTP। नया OTP माँगें।");
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
  if (!used.length) throw new VoteError("यह OTP अब मान्य नहीं है। नया OTP माँगें।");

  return {
    id: row.id,
    phone: row.phone,
    purpose: row.purpose,
    payload: row.payload,
    telegramChatId: row.telegram_chat_id ?? null,
  };
}
