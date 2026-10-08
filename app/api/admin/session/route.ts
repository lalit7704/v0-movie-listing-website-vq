import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { isGitHubConfigured } from "@/lib/github";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Not allowed" }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    email: session.email,
    role: session.role,
    githubReady: isGitHubConfigured(),
    usersReady: Boolean(createAdminClient()),
  });
}
