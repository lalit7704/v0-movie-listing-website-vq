import { NextResponse, type NextRequest } from "next/server";
// import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  // Supabase session management is removed.
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    // No longer matching any routes for session management.
  ],
};
