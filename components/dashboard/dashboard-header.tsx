"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  const pathname = usePathname()

  // Get current tab based on pathname
  const getCurrentTab = () => {
    if (pathname === "/dashboard") return "overview"
    if (pathname.startsWith("/dashboard/forms")) return "forms"
    if (pathname.startsWith("/dashboard/testimonials")) return "testimonials"
    if (pathname.startsWith("/dashboard/embeds")) return "embeds"
    if (pathname.startsWith("/dashboard/settings")) return "settings"
    return "overview"
  }

  return (
    <div className="space-y-20">
      {/* Page Title & Description */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight"></h1>
          <p className="text-muted-foreground mt-1">
            
          </p>
        </div>
        
      </div>

      {/* Navigation Tabs */}
      <Tabs value={getCurrentTab()} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
          <TabsTrigger value="overview" asChild>
            <Link href="/dashboard">Overview</Link>
          </TabsTrigger>
          <TabsTrigger value="forms" asChild>
            <Link href="/dashboard/forms">Forms</Link>
          </TabsTrigger>
          <TabsTrigger value="testimonials" asChild>
            <Link href="/dashboard/testimonials">Testimonials</Link>
          </TabsTrigger>
          <TabsTrigger value="embeds" asChild>
            <Link href="/dashboard/embeds">Embeds</Link>
          </TabsTrigger>
          <TabsTrigger value="settings" asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
