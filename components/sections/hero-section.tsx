import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-linear-to-br from-background via-background/80 to-background" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-7xl lg:text-8xl">
            Collect & Embed{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Testimonials
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-foreground/20 via-foreground/40 to-foreground/20 rounded-full" />
            </span>
            {" "}— Instantly.
          </h1>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <p className="mx-auto mt-8 max-w-3xl text-xl text-muted-foreground md:text-2xl leading-relaxed">
            Build trust with your audience by collecting authentic customer testimonials 
            and embedding them seamlessly on your website. No coding required.
          </p>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-medium bg-foreground text-background hover:bg-foreground/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200" 
              asChild
            >
              <Link href="/signup">
                Try Free
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-lg font-medium border-2 hover:bg-muted/50 hover:scale-105 transition-all duration-200" 
              asChild
            >
              <Link href="/demo/sample">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Demo
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Interactive Testimonial Flow - Innovative Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
          <div className="mx-auto mt-20 max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border-2 border-border/20 bg-linear-to-br from-background to-muted/30 p-12 shadow-2xl">
              {/* Background grid pattern */}
              <div className="absolute inset-0 bg-grid-small-black/[0.08] dark:bg-grid-small-white/[0.08]" />
              
              {/* Glowing orbs for ambiance */}
              <div className="absolute top-8 right-8 h-24 w-24 rounded-full bg-blue-400/20 blur-xl animate-pulse" />
              <div className="absolute bottom-8 left-8 h-32 w-32 rounded-full bg-purple-400/15 blur-2xl animate-pulse delay-1000" />
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4 bg-linear-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
                    Watch Real Testimonials Flow
                  </h3>
                  <p className="text-muted-foreground text-lg">See how your customers' voices come to life instantly</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Testimonial Card 1 - Animated entry */}
                  <div className="animate-float-delay-0 group">
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:bg-card/70">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            S
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">Sarah Chen</h4>
                          <p className="text-sm text-muted-foreground">CEO, TechStart</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-yellow-400 animate-pulse" style={{animationDelay: `${i * 100}ms`}} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">
                        "LoopCast transformed our customer feedback process. Our conversion rate jumped 40% in just 2 weeks!"
                      </p>
                      <div className="mt-4 text-xs text-muted-foreground">2 minutes ago</div>
                    </div>
                  </div>

                  {/* Testimonial Card 2 */}
                  <div className="animate-float-delay-1 group">
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:bg-card/70">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-linear-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            M
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background animate-pulse delay-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">Mike Rodriguez</h4>
                          <p className="text-sm text-muted-foreground">Founder, GrowthCo</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-yellow-400 animate-pulse" style={{animationDelay: `${i * 150}ms`}} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">
                        "The embed widgets are stunning and match our brand perfectly. Setup was incredibly easy!"
                      </p>
                      <div className="mt-4 text-xs text-muted-foreground">5 minutes ago</div>
                    </div>
                  </div>

                  {/* Testimonial Card 3 */}
                  <div className="animate-float-delay-2 group">
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:bg-card/70">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            A
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background animate-pulse delay-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">Alex Kim</h4>
                          <p className="text-sm text-muted-foreground">Marketing Dir, InnovateCorp</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-yellow-400 animate-pulse" style={{animationDelay: `${i * 200}ms`}} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">
                        "From zero to social proof hero in under 10 minutes. This is the future of testimonials!"
                      </p>
                      <div className="mt-4 text-xs text-muted-foreground">8 minutes ago</div>
                    </div>
                  </div>
                </div>

                {/* Stats bar at bottom */}
                <div className="mt-12 flex justify-center">
                  <div className="bg-foreground/5 backdrop-blur-sm rounded-full px-8 py-4 border border-border/30">
                    <div className="flex items-center space-x-8 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-2xl text-foreground">127</div>
                        <div className="text-muted-foreground">New Reviews Today</div>
                      </div>
                      <div className="w-px h-8 bg-border/50" />
                      <div className="text-center">
                        <div className="font-bold text-2xl text-foreground">4.9</div>
                        <div className="text-muted-foreground">Average Rating</div>
                      </div>
                      <div className="w-px h-8 bg-border/50" />
                      <div className="text-center">
                        <div className="font-bold text-2xl text-foreground">99%</div>
                        <div className="text-muted-foreground">Customer Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-foreground/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-foreground/5 blur-3xl animate-pulse delay-1000" />
    </section>
  )
}
