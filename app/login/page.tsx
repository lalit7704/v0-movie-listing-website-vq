import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginContent } from "@/components/login-content";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/login", "Login", "Log in to sync your wishlist, watch history, and movie requests.", false);

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
