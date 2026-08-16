import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  // return updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
