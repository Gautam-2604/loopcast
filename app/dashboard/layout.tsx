import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard - LoopCast",
  description: "Manage your testimonials, forms, and embeds",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}
