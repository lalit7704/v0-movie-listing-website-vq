import { randomInt, randomUUID, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { VoteError, must, sha256 } from "@/lib/vote/auth";
import { maskPhone } from "@/lib/vote/phone";

const OTP_TTL_MS = 5 * 60_000;
export const RESEND_AFTER_SECONDS = 60;
const MAX_PER_PHONE_PER_HOUR = 5;
const MAX_PER_IP_PER_HOUR = 20;
const MAX_ATTEMPTS = 5;

export type OtpPurpose = "signup" | "login";

export interface OtpChallenge {
  id: string;
  phone: string;
  purpose: OtpPurpose;
  payload: Record<string, string>;
}

function codeHash(challengeId: string, code: string) {
  return sha256(`vote-otp:${challengeId}:${code}`);
}

const smsText = (code: string) =>
  `${code} is your Onemovie voting OTP. It is valid for 5 minutes. Do not share it with anyone.`;

/**
 * Sends the code with the provider named in VOTE_SMS_PROVIDER (fast2sms or twilio).
 * Outside production with no provider set, the code is only logged and handed back for testing.
 */
async function sendOtpSms(phone: string, code: string): Promise<{ devCode?: string }> {
  const provider = (process.env.VOTE_SMS_PROVIDER || "fast2sms").trim().toLowerCase();
  const fast2smsKey = process.env.FAST2SMS_API_KEY;
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_FROM;

  if (provider === "fast2sms" && fast2smsKey) {
    // Fast2SMS OTP route: Indian 10 digit numbers, message "Your OTP: <code>".
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: { authorization: fast2smsKey, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ route: "otp", variables_values: code, numbers: phone.replace(/^\+91/, "") }),
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.return !== true) {
      console.error("[vote] Fast2SMS failed", response.status, data);
      throw new VoteError("Could not send the OTP SMS. Please try again.", 502);
    }
    return {};
  }

  if (provider === "twilio" && twilioSid && twilioToken && twilioFrom) {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: phone,
        Body: smsText(code),
        // A Messaging Service SID starts with MG; anything else is a sender number.
        [twilioFrom.startsWith("MG") ? "MessagingServiceSid" : "From"]: twilioFrom,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[vote] Twilio failed", response.status, await response.text().catch(() => ""));
      throw new VoteError("Could not send the OTP SMS. Please try again.", 502);
    }
    return {};
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[vote] No SMS provider set up. OTP for ${phone}: ${code}`);
    return { devCode: code };
  }
  throw new VoteError("OTP SMS is not set up on the server yet. Ask the site owner.", 503);
}

/** Rate limits, stores and sends a new 6 digit code. The payload comes back from verifyOtp(). */
export async function issueOtp(
  db: SupabaseClient,
  { phone, purpose, payload, ipHash }: { phone: string; purpose: OtpPurpose; payload: Record<string, string>; ipHash: string }
) {
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

  const id = randomUUID();
  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  must(
    await db.from("vote_otp_challenges").insert({
      id,
      phone,
      purpose,
      payload,
      ip_hash: ipHash,
      code_hash: codeHash(id, code),
      expires_at: new Date(Date.now() + OTP_TTL_MS).toISOString(),
    })
  );

  let sent: { devCode?: string };
  try {
    sent = await sendOtpSms(phone, code);
  } catch (caught) {
    // A code that never reached the phone should not count against the limits.
    await db.from("vote_otp_challenges").delete().eq("id", id);
    throw caught;
  }

  // Codes older than a day no longer matter for anything, including the hourly limits.
  await db
    .from("vote_otp_challenges")
    .delete()
    .lt("created_at", new Date(Date.now() - 86_400_000).toISOString());

  return { challengeId: id, devCode: sent.devCode };
}

/** What the signup and login routes answer once a code is on its way. */
export function otpSentResponse(phone: string, { challengeId, devCode }: { challengeId: string; devCode?: string }) {
  return NextResponse.json({
    success: true,
    challengeId,
    sentTo: maskPhone(phone),
    resendAfter: RESEND_AFTER_SECONDS,
    ...(devCode ? { devCode } : {}),
  });
}

/** Checks the code and marks the challenge used, so each code logs in at most once. */
export async function verifyOtp(db: SupabaseClient, challengeId: string, code: string): Promise<OtpChallenge> {
  const row = must(
    await db
      .from("vote_otp_challenges")
      .select("id, phone, purpose, payload, code_hash, attempts, expires_at, consumed_at")
      .eq("id", challengeId)
      .maybeSingle()
  );
  if (!row || row.consumed_at) throw new VoteError("This OTP is no longer valid. Ask for a new one.");
  if (new Date(row.expires_at) <= new Date()) throw new VoteError("OTP expired. Ask for a new one.");
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

  return { id: row.id, phone: row.phone, purpose: row.purpose, payload: row.payload };
}
