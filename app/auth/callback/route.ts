import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  // Supabase functionality removed.
  // This route is no longer used for authentication callbacks.
  // Redirecting to a safe page.
  return NextResponse.redirect(new URL("/login?error=disabled", requestUrl.origin));
}
