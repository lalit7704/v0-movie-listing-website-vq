import type { Metadata } from "next";
import { AccountDashboard } from "@/components/account-dashboard";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/account", "My Account", "Manage your Onemovie wishlist, history, requests, and notifications.", false);

export default function AccountPage() {
  return <AccountDashboard />;
}
