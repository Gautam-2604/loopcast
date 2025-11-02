"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "next/navigation"

export default function PublicFormPage() {
  const params = useParams()
  const formId = params.id as string
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    message: ""
  })
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null)
  const [mediaError, setMediaError] = useState("")
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])
  
  // Mock form configuration (in real app, fetch from API)
  const formConfig = {
    title: "Customer Testimonial Form",
    description: "Share your experience with our product or service. Your feedback helps us improve and helps others make informed decisions.",
    organization: {
      name: "Acme Corp",
      logo: "/logos/acme.png"
    },
    allowedTypes: {
      text: true,
      image: true,
      video: true
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const startRecording = async () => {
    setMediaError("")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      })
      
      mediaRecorderRef.current = mediaRecorder
      recordedChunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/webm'
        })
        setRecordedVideo(blob)
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      
    } catch (error) {
      console.error('Error starting recording:', error)
      setMediaError("Unable to access camera/microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const discardRecording = () => {
    setRecordedVideo(null)
    recordedChunksRef.current = []
  }

  const uploadToR2 = async (file: File | Blob, filename: string) => {
    // Mock R2 upload with signed URL
    console.log(`Uploading ${filename} to R2...`)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In real implementation:
    // 1. Get signed URL from your API
    // 2. Upload file to R2 using the signed URL
    // 3. Return the public URL
    
    return `https://r2.loopcast.com/uploads/${formId}/${filename}`
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const uploadPromises = []
      
      // Upload files
      for (const file of uploadedFiles) {
        uploadPromises.push(uploadToR2(file, file.name))
      }
      
      // Upload recorded video
      if (recordedVideo) {
        const videoFilename = `video-${Date.now()}.webm`
        uploadPromises.push(uploadToR2(recordedVideo, videoFilename))
      }
      
      const uploadedUrls = await Promise.all(uploadPromises)
      
      // Submit form data
      const submissionData = {
        ...formData,
        formId,
        attachments: uploadedUrls,
        submittedAt: new Date().toISOString()
      }
      
      console.log("Submitting testimonial:", submissionData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      
    } catch (error) {
      console.error("Submission failed:", error)
      // TODO: Show error message
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return (
        <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    } else if (file.type.startsWith('video/')) {
      return (
        <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
    return (
      <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Success Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Submitted Successfully!</h2>
              <p className="text-muted-foreground">
                Thank you for sharing your testimonial. Your feedback is valuable to us and helps others make informed decisions.
              </p>
            </div>
            
            {/* Organization Info */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={formConfig.organization.logo} alt={formConfig.organization.name} />
                  <AvatarFallback className="text-xs">{formConfig.organization.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  Powered by {formConfig.organization.name}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 py-25 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={formConfig.organization.logo} alt={formConfig.organization.name} />
              <AvatarFallback className="text-lg font-bold">{formConfig.organization.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{formConfig.title}</h1>
              <p className="text-sm text-muted-foreground">{formConfig.organization.name}</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {formConfig.description}
          </p>
        </div>

        {/* Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-2 border-border/50 focus:border-primary/50 bg-background/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-2 border-border/50 focus:border-primary/50 bg-background/50"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Marketing Manager"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="border-2 border-border/50 focus:border-primary/50 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="border-2 border-border/50 focus:border-primary/50 bg-background/50"
                  />
                </div>
              </div>

              {/* Testimonial Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Your Testimonial *</Label>
                <div className="relative">
                  <textarea
                    id="message"
                    placeholder="Share your experience with our product or service..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-32 w-full rounded-md border-2 border-border/50 focus:border-primary/50 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {formData.message.length}/500
                  </div>
                </div>
              </div>

              {/* Media Upload Section */}
              {(formConfig.allowedTypes.image || formConfig.allowedTypes.video) && (
                <div className="space-y-4">
                  <Label>Additional Media (Optional)</Label>
                  
                  {/* Upload Options */}
                  <div className="flex flex-wrap gap-2">
                    {formConfig.allowedTypes.image && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-border/50"
                      >
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Upload Photos
                      </Button>
                    )}
                    
                    {formConfig.allowedTypes.video && !recordedVideo && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={isRecording ? stopRecording : startRecording}
                        className="border-2 border-border/50"
                      >
                        {isRecording ? (
                          <>
                            <div className="mr-2 h-4 w-4 bg-red-500 rounded-full animate-pulse" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Record Video
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Media Error */}
                  {mediaError && (
                    <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {mediaError}
                    </div>
                  )}

                  {/* Video Recording Preview */}
                  {isRecording && (
                    <div className="space-y-2">
                      <video
                        ref={videoRef}
                        className="w-full max-w-sm rounded-lg border-2 border-border/50"
                        muted
                        playsInline
                      />
                    </div>
                  )}

                  {/* Recorded Video Preview */}
                  {recordedVideo && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Recorded Video</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={discardRecording}
                        >
                          Discard
                        </Button>
                      </div>
                      <video
                        src={URL.createObjectURL(recordedVideo)}
                        className="w-full max-w-sm rounded-lg border-2 border-border/50"
                        controls
                      />
                    </div>
                  )}

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Uploaded Files</span>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded border border-border/50">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file)}
                              <span className="text-sm truncate">{file.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {(file.size / 1024 / 1024).toFixed(1)} MB
                              </Badge>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background py-3 text-base font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Testimonial...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Testimonial
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <span>Powered by</span>
            <Avatar className="h-4 w-4">
              <AvatarImage src="/logos/loopcast.png" alt="LoopCast" />
              <AvatarFallback className="text-xs">L</AvatarFallback>
            </Avatar>
            <span className="font-medium">LoopCast</span>
          </div>
        </div>
      </div>
    </div>
  )
}
