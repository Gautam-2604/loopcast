"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function TestimonialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all") // all, video, text, image

  // Mock data
  const testimonials = [
    {
      id: 1,
      type: "video",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@techcorp.com",
        avatar: "/avatars/sarah.jpg",
        company: "TechCorp Inc."
      },
      content: "This product has completely transformed how we handle customer testimonials...",
      rating: 5,
      formName: "Product Feedback Form",
      submittedAt: "2024-10-28T14:30:00Z",
      isPublished: true,
      videoUrl: "https://example.com/video1.mp4",
      duration: "2:34"
    },
    {
      id: 2,
      type: "text",
      customer: {
        name: "Michael Chen",
        email: "mike@startup.io",
        avatar: "/avatars/mike.jpg",
        company: "Startup.io"
      },
      content: "Outstanding customer service and product quality. The team went above and beyond to ensure our success. Highly recommend to anyone looking for reliable solutions.",
      rating: 5,
      formName: "Customer Experience Survey",
      submittedAt: "2024-10-27T09:15:00Z",
      isPublished: true
    },
    {
      id: 3,
      type: "image",
      customer: {
        name: "Emily Rodriguez",
        email: "emily@design.co",
        avatar: "/avatars/emily.jpg",
        company: "Design Co."
      },
      content: "Love the user interface and overall experience. Clean, intuitive, and powerful.",
      rating: 4,
      formName: "Product Feedback Form",
      submittedAt: "2024-10-26T16:45:00Z",
      isPublished: false,
      imageUrl: "https://example.com/testimonial-image.jpg"
    },
    {
      id: 4,
      type: "video",
      customer: {
        name: "David Kim",
        email: "david@agency.com",
        avatar: "/avatars/david.jpg",
        company: "Marketing Agency Pro"
      },
      content: "Game-changer for our client testimonial collection process. Seamless integration and great results.",
      rating: 5,
      formName: "Service Review Form",
      submittedAt: "2024-10-25T11:20:00Z",
      isPublished: true,
      videoUrl: "https://example.com/video2.mp4",
      duration: "1:47"
    },
    {
      id: 5,
      type: "text",
      customer: {
        name: "Lisa Thompson",
        email: "lisa@ecom.shop",
        avatar: "/avatars/lisa.jpg",
        company: "E-commerce Shop"
      },
      content: "Excellent tool for collecting authentic customer feedback. The analytics dashboard is particularly useful.",
      rating: 4,
      formName: "Customer Experience Survey",
      submittedAt: "2024-10-24T13:10:00Z",
      isPublished: true
    }
  ]

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.formName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === "all" || testimonial.type === filterType
    
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      case 'image':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const togglePublish = (id: number) => {
    console.log(`Toggle publish for testimonial ${id}`)
    // TODO: Implement publish toggle
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all collected testimonials
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/embeds">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Create Embed
            </Link>
          </Button>
          <Button className="bg-foreground hover:bg-foreground/90 text-background" asChild>
            <Link href="/dashboard/forms">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Collect More
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 border-border/50 focus:border-primary/50"
          />
        </div>
        
        <div className="flex space-x-2">
          {[
            { value: "all", label: "All" },
            { value: "video", label: "Video" },
            { value: "text", label: "Text" },
            { value: "image", label: "Image" }
          ].map((filter) => (
            <Button
              key={filter.value}
              variant={filterType === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Total</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{testimonials.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Published</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{testimonials.filter(t => t.isPublished).length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Avg Rating</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">
                {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Video</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{testimonials.filter(t => t.type === 'video').length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.customer.avatar} alt={testimonial.customer.name} />
                    <AvatarFallback>{testimonial.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{testimonial.customer.name}</CardTitle>
                    <CardDescription className="text-sm">{testimonial.customer.company}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {getTypeIcon(testimonial.type)}
                    <span className="ml-1 capitalize">{testimonial.type}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Content Preview */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {testimonial.content}
              </p>
              
              {/* Meta Info */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p>From: {testimonial.formName}</p>
                <p>Submitted: {formatDate(testimonial.submittedAt)}</p>
                {testimonial.type === 'video' && testimonial.duration && (
                  <p>Duration: {testimonial.duration}</p>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/testimonials/${testimonial.id}`}>
                    <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant={testimonial.isPublished ? "default" : "outline"}
                  onClick={() => togglePublish(testimonial.id)}
                  className="flex-1"
                >
                  {testimonial.isPublished ? (
                    <>
                      <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Published
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Draft
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold">
            {searchQuery || filterType !== "all" ? "No testimonials found" : "No testimonials yet"}
          </h3>
          <p className="text-muted-foreground">
            {searchQuery || filterType !== "all" 
              ? "Try adjusting your search or filters" 
              : "Create a form to start collecting testimonials"}
          </p>
          {!searchQuery && filterType === "all" && (
            <Button className="mt-4" asChild>
              <Link href="/dashboard/forms">Create Your First Form</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
