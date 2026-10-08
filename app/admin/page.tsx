import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/admin", "Admin", "Onemovie admin panel.", false);

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminDashboard />
    </Suspense>
  );
}
