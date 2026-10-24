import { createHash, timingSafeEqual } from "node:crypto";

/**
 * The voting bot is its own bot (VOTE_TELEGRAM_BOT_TOKEN) with its own webhook at /api/vote/telegram,
 * so it never interferes with the download bot in lib/telegram-webhook.ts.
 */
export class TelegramError extends Error {}

function getVoteBotToken() {
  return process.env.VOTE_TELEGRAM_BOT_TOKEN?.trim() || "";
}

export function isVoteBotReady() {
  return Boolean(getVoteBotToken());
}

function getVoteBotSecret() {
  const token = getVoteBotToken();
  return token ? createHash("sha256").update(`onemovie-vote-webhook:${token}`).digest("hex") : "";
}

/** Telegram sends the secret with every update, so only Telegram can call the webhook. */
export function isValidVoteBotSecret(receivedSecret: string | null) {
  const expectedSecret = getVoteBotSecret();
  if (!receivedSecret || !expectedSecret) return false;

  const received = Buffer.from(receivedSecret);
  const expected = Buffer.from(expectedSecret);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function callVoteBot<T = unknown>(method: string, body: Record<string, unknown> = {}): Promise<T> {
  const token = getVoteBotToken();
  if (!token) throw new TelegramError("VOTE_TELEGRAM_BOT_TOKEN is not configured");

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const result = (await response.json().catch(() => null)) as { ok: boolean; result?: T; description?: string } | null;

  if (!response.ok || !result?.ok) {
    throw new TelegramError(result?.description || `Telegram ${method} failed (${response.status})`);
  }
  return result.result as T;
}

export function sendVoteBotMessage(chatId: number, html: string, replyMarkup?: Record<string, unknown>) {
  return callVoteBot("sendMessage", {
    chat_id: chatId,
    text: html,
    parse_mode: "HTML",
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
}

let botLink: Promise<string> | null = null;

/** t.me link that opens the bot and presses Start. getMe is asked once per server instance. */
export function getVoteBotLink() {
  if (!botLink) {
    botLink = callVoteBot<{ username: string }>("getMe").then((bot) => `https://t.me/${bot.username}?start=vote`);
    botLink.catch(() => {
      botLink = null;
    });
  }
  return botLink;
}

let webhookCheck: Promise<void> | null = null;

/**
 * Points the bot at /api/vote/telegram on the site that is serving this request, once per server
 * instance. Only production does this, so local runs and preview deployments never steal the webhook.
 */
export function ensureVoteBotWebhook(origin: string) {
  if (process.env.VERCEL_ENV !== "production") return Promise.resolve();

  if (!webhookCheck) {
    webhookCheck = (async () => {
      const url = `${origin}/api/vote/telegram`;
      const info = await callVoteBot<{ url: string }>("getWebhookInfo");
      if (info.url === url) return;
      await callVoteBot("setWebhook", { url, secret_token: getVoteBotSecret(), allowed_updates: ["message"] });
    })().catch((error: unknown) => {
      webhookCheck = null;
      console.error("[vote] Could not set the voting bot webhook", error);
    });
  }
  return webhookCheck;
}
