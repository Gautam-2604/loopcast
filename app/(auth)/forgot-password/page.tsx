"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setIsEmailSent(true)
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="w-full max-w-md">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-small-black/[0.08] dark:bg-grid-small-white/[0.08]" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-green-400/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl animate-pulse delay-1000" />
        
        <Card className="relative bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
          <CardHeader className="space-y-4 pb-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-3xl font-bold">Check Your Email</CardTitle>
              <CardDescription className="text-base mt-2">
                We've sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <button 
                  onClick={() => {
                    setIsEmailSent(false)
                    setError("")
                  }}
                  className="font-medium text-foreground hover:underline transition-all duration-200"
                >
                  try again
                </button>
              </p>
              
              <div className="pt-4 border-t border-border/30">
                <Link 
                  href="/login"
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-small-black/[0.08] dark:bg-grid-small-white/[0.08]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-purple-400/10 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl animate-pulse delay-1000" />
      
      <Card className="relative bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
        <CardHeader className="space-y-4 pb-8">
          <div className="text-center">
            <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
            <CardDescription className="text-base mt-2">
              Enter your email and we'll send you a reset link
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 text-base border-2 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-medium bg-foreground hover:bg-foreground/90 text-background transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Sending reset link...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
          
          {/* Back to Login */}
          <div className="text-center pt-4 border-t border-border/30">
            <Link 
              href="/login"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
