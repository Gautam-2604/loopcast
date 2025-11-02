"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "next/navigation"

interface TestimonialData {
  id: string
  title: string
  name: string
  email: string
  role: string
  company: string
  message: string
  videoUrl?: string
  imageUrl?: string
  transcript?: string
  summary?: string
  organization: {
    name: string
    logo: string
  }
  publishedAt: string
  tags: string[]
}

export default function TestimonialViewerPage() {
  const params = useParams()
  const testimonialId = params.id as string
  
  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [embedModalOpen, setEmbedModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock testimonial data (in real app, fetch from API)
  useEffect(() => {
    const fetchTestimonial = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockTestimonial: TestimonialData = {
        id: testimonialId,
        title: "LoopCast transformed our customer feedback process",
        name: "Sarah Mitchell",
        email: "sarah@techcorp.com",
        role: "Product Manager",
        company: "TechCorp Inc.",
        message: "LoopCast has completely revolutionized how we collect and showcase customer testimonials. The video recording feature is seamless, and our conversion rates have increased by 40% since implementing it on our landing page.",
        videoUrl: "/videos/testimonial-sample.mp4",
        transcript: "Hi, I'm Sarah Mitchell, Product Manager at TechCorp Inc. I wanted to share our experience with LoopCast. Before using LoopCast, collecting customer testimonials was a real challenge. We had to coordinate schedules, set up calls, and often the quality wasn't great. LoopCast has completely revolutionized how we collect and showcase customer testimonials. The video recording feature is seamless - customers can record their testimonials directly in their browser without any technical hassles. The quality is fantastic, and our conversion rates have increased by 40% since implementing it on our landing page. What I love most is how easy it is to embed these testimonials anywhere on our website. The analytics also help us understand which testimonials resonate most with our audience. I'd highly recommend LoopCast to any team looking to leverage social proof effectively.",
        summary: "Sarah from TechCorp shares how LoopCast improved their testimonial collection process, leading to seamless video recording and 40% increased conversion rates.",
        organization: {
          name: "LoopCast",
          logo: "/logos/loopcast.png"
        },
        publishedAt: "2024-01-15T10:30:00Z",
        tags: ["Product Management", "B2B SaaS", "Customer Success"]
      }
      
      setTestimonial(mockTestimonial)
      setIsLoading(false)
    }
    
    fetchTestimonial()
  }, [testimonialId])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://loopcast.com/t/${testimonialId}`
  const embedCode = `<iframe src="https://loopcast.com/embed/${testimonialId}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(`Check out this testimonial: "${testimonial?.title}"`)
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading testimonial...</p>
        </div>
      </div>
    )
  }

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Testimonial Not Found</h2>
              <p className="text-muted-foreground">The testimonial you're looking for doesn't exist or has been removed.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      {/* SEO Meta Tags would be handled by Next.js metadata API in real app */}
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={testimonial.organization.logo} alt={testimonial.organization.name} />
              <AvatarFallback className="text-sm font-bold">{testimonial.organization.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">Powered by {testimonial.organization.name}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Video and Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Video */}
            {testimonial.videoUrl && (
              <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <video
                    className="w-full aspect-video object-cover"
                    controls
                    poster={testimonial.imageUrl}
                    preload="metadata"
                  >
                    <source src={testimonial.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </CardContent>
              </Card>
            )}

            {/* Testimonial Content */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
              <CardContent className="p-8 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground leading-tight">
                    {testimonial.title}
                  </h1>
                  {testimonial.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {testimonial.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Customer Info */}
                <div className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg border border-border/50">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`} />
                    <AvatarFallback className="text-lg font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && (
                        <span> at <span className="font-medium">{testimonial.company}</span></span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Published on {new Date(testimonial.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-foreground">Message</h2>
                  <blockquote className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-primary/30 pl-4">
                    "{testimonial.message}"
                  </blockquote>
                </div>

                {/* Summary */}
                {testimonial.summary && (
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-foreground">Summary</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {testimonial.summary}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transcript */}
            {testimonial.transcript && (
              <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
                <CardContent className="p-8 space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Full Transcript</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                    <p>{testimonial.transcript}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Buttons */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Share this testimonial</h3>
                
                <div className="space-y-3">
                  {/* Direct Link */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Share Link</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm bg-background/50 border border-border/50 rounded-md text-muted-foreground"
                      />
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(shareUrl)}
                        className="px-3"
                      >
                        {copied ? (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Social Share */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Social Media</label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareOnSocial('twitter')}
                        className="flex-1 border-2 border-border/50"
                      >
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Tweet
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareOnSocial('linkedin')}
                        className="flex-1 border-2 border-border/50"
                      >
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Embed Code */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Embed this testimonial</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Embed Code</label>
                    <div className="relative">
                      <textarea
                        value={embedCode}
                        readOnly
                        className="w-full h-20 px-3 py-2 text-xs bg-background/50 border border-border/50 rounded-md text-muted-foreground font-mono resize-none"
                      />
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(embedCode)}
                        className="absolute top-2 right-2 px-2 py-1 h-auto text-xs"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Copy and paste this code into your website to embed this testimonial.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">About this testimonial</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID</span>
                    <span className="font-mono text-xs">{testimonial.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published</span>
                    <span>{new Date(testimonial.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span>{testimonial.videoUrl ? "Video" : "Text"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/50">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <span>Create your own testimonial collection with</span>
            <Avatar className="h-4 w-4">
              <AvatarImage src="/logos/loopcast.png" alt="LoopCast" />
              <AvatarFallback className="text-xs">L</AvatarFallback>
            </Avatar>
            <a href="/" className="font-medium hover:text-foreground transition-colors">
              LoopCast
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
