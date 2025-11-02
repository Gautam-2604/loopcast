"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollY)
      
      // Only update if we've scrolled enough to prevent jitter
      if (scrollDifference > 10) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past initial threshold - hide navbar
          setVisible(false)
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setVisible(true)
        }
        setLastScrollY(currentScrollY)
      }
      
      // Background blur effect
      setScrolled(currentScrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl mx-auto px-4 transition-all duration-200 ease-out",
      visible ? "top-4" : "-top-20"
    )}>
      <header className={cn(
        "flex items-center justify-between h-16 px-6 rounded-2xl border transition-all duration-200",
        scrolled 
          ? "bg-background/80 backdrop-blur-md shadow-lg border-border/50" 
          : "bg-background/60 backdrop-blur-sm border-border/20"
      )}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-foreground transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 h-8 w-8 rounded-lg bg-foreground/20 blur-sm transition-transform group-hover:scale-125" />
            </div>
            <span className="font-bold text-xl tracking-tight">LoopCast</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { href: "/features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
            { href: "/demo", label: "Demo" }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80 rounded-lg hover:bg-muted/50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button 
            size="sm" 
            className="bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl transition-all duration-200" 
            asChild
          >
            <Link href="/signup">Try Free</Link>
          </Button>
        </div>
      </header>
    </div>
  )
}
