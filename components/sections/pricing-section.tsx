import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Start free, upgrade when you need more. No hidden fees, no surprises.
        </p>
      </div>
      
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 w-full px-4">
        {/* Free Plan */}
        <Card className="relative p-6 bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-card/70">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold">Free</CardTitle>
            <CardDescription className="text-base mt-1">Perfect for getting started</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">$0</span>
              <span className="text-base text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Up to 10 testimonials
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basic embed widgets
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Email collection forms
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Community support
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="w-full h-10 text-base font-medium" variant="outline" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Pro Plan */}
        <Card className="relative p-6 bg-card/70 backdrop-blur-sm border-2 border-primary/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-card/80 ring-1 ring-primary/20">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-linear-to-r from-primary to-primary/80 px-4 py-1 text-xs font-bold text-primary-foreground shadow-md">
              Most Popular
            </span>
          </div>
          <CardHeader className="text-center pb-6 pt-3">
            <CardTitle className="text-2xl font-bold">Pro</CardTitle>
            <CardDescription className="text-base mt-1">For growing businesses</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">$29</span>
              <span className="text-base text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited testimonials
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Advanced embed widgets
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom branding
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Analytics & insights
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Priority support
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="w-full h-10 text-base font-medium" asChild>
              <Link href="/signup?plan=pro">Start Pro Trial</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
