import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/admin", "Admin", "Onemovie admin panel.", false);

export default function AdminPage() {
  return <AdminDashboard />;
}
