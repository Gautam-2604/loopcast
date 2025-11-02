import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LoopCast - Authentication",
  description: "Sign in to your LoopCast account to manage your testimonials.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      
      {/* Auth content */}
      <main className="flex-1 flex items-center justify-center p-4 pt-25">
        {children}
      </main>
    </div>
  );
}
