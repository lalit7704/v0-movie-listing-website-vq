import type { NextRequest } from "next/server";
import { z } from "zod";
import {
  VoteError,
  clientIpHash,
  getVoteDb,
  hashPassword,
  must,
  nameSchema,
  parseBody,
  passwordSchema,
  phoneSchema,
  voteFailure,
} from "@/lib/vote/auth";
import { issueOtp, otpSentResponse } from "@/lib/vote/otp";

const signupSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

/** Step 1 of signup. The account is only created once the OTP is verified. */
export async function POST(request: NextRequest) {
  try {
    const { name, phone, password } = await parseBody(request, signupSchema);
    const db = getVoteDb();

    const existing = must(await db.from("vote_users").select("id").eq("phone", phone).maybeSingle());
    if (existing) throw new VoteError("This number is already registered. Please login.", 409);

    const otp = await issueOtp(db, {
      phone,
      purpose: "signup",
      payload: { name, passwordHash: await hashPassword(password) },
      ipHash: clientIpHash(request),
      origin: request.nextUrl.origin,
    });
    return otpSentResponse(phone, otp);
  } catch (caught) {
    return voteFailure(caught);
  }
}
