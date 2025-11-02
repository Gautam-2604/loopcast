"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "next/navigation"

interface TestimonialData {
  id: string
  name: string
  role: string
  company: string
  message: string
  videoUrl?: string
  imageUrl?: string
  rating: number
}

export default function EmbedDemoPage() {
  const params = useParams()
  const testimonialId = params.id as string
  
  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  // Mock testimonial data
  useEffect(() => {
    const fetchTestimonial = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockTestimonial: TestimonialData = {
        id: testimonialId,
        name: "Sarah Mitchell",
        role: "Product Manager",
        company: "TechCorp Inc.",
        message: "LoopCast has completely revolutionized how we collect and showcase customer testimonials. The video recording feature is seamless, and our conversion rates have increased by 40% since implementing it.",
        videoUrl: "/videos/testimonial-sample.mp4",
        imageUrl: "/images/testimonial-thumb.jpg",
        rating: 5
      }
      
      setTestimonial(mockTestimonial)
      setIsLoading(false)
    }
    
    fetchTestimonial()
  }, [testimonialId])

  const embedCode = `<iframe 
  src="https://loopcast.com/embed/${testimonialId}" 
  width="100%" 
  height="400" 
  frameborder="0" 
  allowfullscreen>
</iframe>`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  if (isLoading || !testimonial) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading demo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/logos/loopcast.png" alt="LoopCast" />
                <AvatarFallback className="text-sm font-bold">L</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold text-foreground">LoopCast Embed Demo</h1>
                <p className="text-xs text-muted-foreground">See how testimonials look embedded in your website</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('/', '_blank')}
              className="border-2 border-border/50"
            >
              Try LoopCast Free
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mock Landing Page */}
        <div className="space-y-8">
          {/* Demo Notice */}
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🎬 Live Embed Demo
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              See Your Testimonials in Action
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This demo shows how a LoopCast embedded testimonial appears on a real website. 
              The player below is fully interactive and SEO-friendly.
            </p>
          </div>

          {/* Mock Website Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Mock Hero Section */}
              <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">
                      Transform Your Business with AcmeApp
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      Join thousands of companies using our platform to streamline their workflow 
                      and increase productivity by up to 300%.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button className="bg-foreground hover:bg-foreground/90 text-background">
                        Start Free Trial
                      </Button>
                      <Button variant="outline" className="border-2 border-border/50">
                        Watch Demo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Embedded Testimonial */}
              <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      What Our Customers Say
                    </h3>
                    <p className="text-muted-foreground">
                      Real testimonials from real customers
                    </p>
                  </div>

                  {/* Embedded Testimonial Player */}
                  <div className="bg-muted/10 rounded-lg border-2 border-dashed border-border/30 p-1">
                    <Card className="bg-background/80 backdrop-blur-sm border border-border/50">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Video Player */}
                          {testimonial.videoUrl && (
                            <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden border border-border/50">
                              <video
                                className="w-full h-full object-cover"
                                controls
                                poster={testimonial.imageUrl}
                                preload="metadata"
                              >
                                <source src={testimonial.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}

                          {/* Testimonial Content */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            
                            <blockquote className="text-muted-foreground italic leading-relaxed">
                              "{testimonial.message}"
                            </blockquote>
                            
                            <div className="flex items-center space-x-3 pt-2">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`} />
                                <AvatarFallback className="text-sm font-semibold">
                                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {testimonial.role} at {testimonial.company}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Powered by LoopCast */}
                          <div className="pt-3 border-t border-border/50">
                            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                              <span>Powered by</span>
                              <Avatar className="h-3 w-3">
                                <AvatarImage src="/logos/loopcast.png" alt="LoopCast" />
                                <AvatarFallback className="text-xs">L</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">LoopCast</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Embed Code */}
              <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h3 className="font-semibold text-foreground">Embed Code</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Copy this code and paste it anywhere on your website:
                    </p>
                    
                    <div className="relative">
                      <pre className="bg-muted/20 border border-border/50 rounded-md p-3 text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                        {embedCode}
                      </pre>
                      <Button
                        size="sm"
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 px-2 py-1 h-auto text-xs"
                      >
                        {copied ? (
                          <>
                            <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Embed Features</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Responsive Design</p>
                        <p className="text-xs text-muted-foreground">Works perfectly on desktop, tablet, and mobile</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">SEO Optimized</p>
                        <p className="text-xs text-muted-foreground">Search engines can index your testimonials</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Fast Loading</p>
                        <p className="text-xs text-muted-foreground">Optimized for speed and performance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Custom Styling</p>
                        <p className="text-xs text-muted-foreground">Matches your website's design automatically</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 shadow-2xl">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Ready to get started?</h3>
                    <p className="text-sm text-muted-foreground">
                      Create your own testimonial collection in minutes
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-foreground hover:bg-foreground/90 text-background"
                      onClick={() => window.open('/', '_blank')}
                    >
                      Start Free Trial
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-2 border-border/50 text-xs"
                      onClick={() => window.open('/t/' + testimonialId, '_blank')}
                    >
                      View Full Testimonial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Integration Examples */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Works with Your Tech Stack
                </h3>
                <p className="text-muted-foreground">
                  LoopCast testimonials work seamlessly with any website or platform
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/10 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.099 2.21-.099zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.783-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-foreground text-sm">React / Next.js</h4>
                  <p className="text-xs text-muted-foreground">Perfect for modern React apps</p>
                </div>

                <div className="text-center p-4 bg-muted/10 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.94 2.06c-1.37 0-2.75.52-3.79 1.56L4.53 17.24c-.26.26-.45.58-.55.94L2.06 21.94c-.1.42.18.78.6.68l3.76-1.92c.36-.1.68-.29.94-.55L20.98 5.53c2.08-2.08 2.08-5.44 0-7.52C19.94 2.58 18.56 2.06 21.94 2.06z"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-foreground text-sm">WordPress</h4>
                  <p className="text-xs text-muted-foreground">Easy integration with any WP site</p>
                </div>

                <div className="text-center p-4 bg-muted/10 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.5 8.5v7l-7-4.5v-7l7 4.5zm9 0v7l-7 4.5v-7l7-4.5z"/>
                    </svg>
                  </div>
                  <h4 className="font-medium text-foreground text-sm">Shopify</h4>
                  <p className="text-xs text-muted-foreground">Boost e-commerce conversions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
