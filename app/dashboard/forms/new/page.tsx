"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    allowedTypes: {
      text: true,
      image: false,
      video: false
    }
  })
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [generatedId] = useState("abc123") // Mock generated ID
  const [shareUrl] = useState(`https://forms.loopcast.com/f/${generatedId}`)
  const [embedCode] = useState(`<iframe src="https://embed.loopcast.com/form/${generatedId}" width="100%" height="600" frameborder="0"></iframe>`)
  
  const [isCreating, setIsCreating] = useState(false)

  const handleInputTypeToggle = (type: keyof typeof formData.allowedTypes) => {
    setFormData({
      ...formData,
      allowedTypes: {
        ...formData.allowedTypes,
        [type]: !formData.allowedTypes[type]
      }
    })
  }

  const handleUseTemplate = () => {
    setFormData({
      name: "Customer Testimonial Form",
      description: "Share your experience with our product or service. Your feedback helps us improve and helps others make informed decisions.",
      allowedTypes: {
        text: true,
        image: true,
        video: true
      }
    })
  }

  const handleCreateForm = async () => {
    if (!formData.name.trim()) return
    
    setIsCreating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log("Creating form:", formData)
    // TODO: Implement actual form creation
    
    setIsCreating(false)
    router.push(`/dashboard/forms/${generatedId}`)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // TODO: Show toast notification
  }

  const getSelectedTypesCount = () => {
    return Object.values(formData.allowedTypes).filter(Boolean).length
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'image':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'video':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Form</h1>
          <p className="text-muted-foreground mt-1">
            Define what data you'll collect from your customers
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/forms">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Forms
            </Link>
          </Button>
          
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={!formData.name.trim()}>
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-card/50 backdrop-blur-sm border-2 border-border/50">
              <DialogHeader>
                <DialogTitle>Form Preview</DialogTitle>
                <DialogDescription>
                  This is how your form will appear to customers
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-background rounded-lg border-2 border-border/50 p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{formData.name || "Form Name"}</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {formData.description || "Form description will appear here"}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label>Your Name *</Label>
                        <Input placeholder="Enter your full name" disabled />
                      </div>
                      <div>
                        <Label>Email Address *</Label>
                        <Input placeholder="Enter your email" disabled />
                      </div>
                      <div>
                        <Label>Company (Optional)</Label>
                        <Input placeholder="Your company name" disabled />
                      </div>
                      
                      {formData.allowedTypes.text && (
                        <div>
                          <Label>Your Testimonial *</Label>
                          <div className="min-h-24 w-full rounded border-2 border-border/50 bg-muted/20 p-3 text-sm text-muted-foreground">
                            Share your experience...
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label>Upload Media (Optional)</Label>
                        <div className="flex flex-wrap gap-2">
                          {formData.allowedTypes.image && (
                            <Badge variant="outline" className="text-xs">
                              <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Photos
                            </Badge>
                          )}
                          {formData.allowedTypes.video && (
                            <Badge variant="outline" className="text-xs">
                              <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Videos
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full" disabled>
                      Submit Testimonial
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Give your form a name and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="formName">Form Name *</Label>
                <Input
                  id="formName"
                  placeholder="e.g., Customer Testimonial Form"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-2 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="formDescription">Description</Label>
                <div className="min-h-20 w-full">
                  <Input
                    id="formDescription"
                    placeholder="Tell customers what kind of feedback you're looking for..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="border-2 border-border/50 focus:border-primary/50 min-h-20"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This will appear at the top of your form to guide customers
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Input Types */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Allowed Input Types
                <Badge variant="secondary" className="text-xs">
                  {getSelectedTypesCount()} selected
                </Badge>
              </CardTitle>
              <CardDescription>
                Choose what types of content customers can submit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { 
                    key: 'text', 
                    label: 'Text Testimonials', 
                    desc: 'Written reviews and feedback',
                    required: true
                  },
                  { 
                    key: 'image', 
                    label: 'Image Uploads', 
                    desc: 'Photos, screenshots, certificates'
                  },
                  { 
                    key: 'video', 
                    label: 'Video Testimonials', 
                    desc: 'Recorded video messages'
                  }
                ].map((type) => (
                  <div
                    key={type.key}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      formData.allowedTypes[type.key as keyof typeof formData.allowedTypes]
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-border/50 hover:border-border'
                    } ${type.required ? 'opacity-75' : ''}`}
                    onClick={() => !type.required && handleInputTypeToggle(type.key as keyof typeof formData.allowedTypes)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 ${
                        formData.allowedTypes[type.key as keyof typeof formData.allowedTypes]
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}>
                        {getTypeIcon(type.key)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{type.label}</h4>
                          {type.required ? (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          ) : (
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              formData.allowedTypes[type.key as keyof typeof formData.allowedTypes]
                                ? 'bg-primary border-primary'
                                : 'border-muted-foreground'
                            }`}>
                              {formData.allowedTypes[type.key as keyof typeof formData.allowedTypes] && (
                                <svg className="w-full h-full text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{type.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Template Button */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div>
                    <h4 className="font-medium text-sm">Classic Testimonial Template</h4>
                    <p className="text-xs text-muted-foreground">
                      Pre-configured form with optimal settings for collecting testimonials
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleUseTemplate}>
                    <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Share & Embed */}
        <div className="space-y-6">
          {/* Form Summary */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Form Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.name || "Not set"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Input types:</span>
                  <span className="font-medium">{getSelectedTypesCount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary" className="text-xs">Draft</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <Button 
                  className="w-full bg-foreground hover:bg-foreground/90 text-background" 
                  onClick={handleCreateForm}
                  disabled={!formData.name.trim() || isCreating}
                >
                  {isCreating ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Form
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Auto-generated Share Link */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Share Link</CardTitle>
              <CardDescription>
                Auto-generated link for your form
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Form URL</Label>
                <div className="flex space-x-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="font-mono text-xs border-2 border-border/50"
                  />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(shareUrl)}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">QR Code</Label>
                <div className="w-full h-32 bg-muted/20 border-2 border-border/50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <svg className="mx-auto h-8 w-8 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">QR code will be generated</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Embed Snippet */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Embed Code</CardTitle>
              <CardDescription>
                Add this form to your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Embed Snippet</Label>
                <div className="bg-muted/50 rounded p-3 text-xs font-mono">
                  <code className="text-wrap break-all">
                    {embedCode}
                  </code>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => copyToClipboard(embedCode)}
                >
                  <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Embed Code
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Responsive design</p>
                <p>• Matches your brand</p>
                <p>• No coding required</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
