"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function SubmissionStatusPage() {
  const params = useParams()
  const submissionId = params.id as string
  
  const [submission, setSubmission] = useState({
    id: submissionId,
    customer: {
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      role: "Marketing Manager",
      company: "TechCorp Inc.",
      avatar: "/avatars/sarah.jpg"
    },
    content: {
      message: "This product has completely transformed how we handle customer testimonials. The interface is intuitive, the features are comprehensive, and the support team is incredibly responsive. We've seen a 40% increase in testimonial collection since switching to LoopCast.",
      attachments: [
        {
          type: "video",
          url: "https://r2.loopcast.com/uploads/abc123/video-1698765432.webm",
          filename: "testimonial-video.webm",
          size: 15.2,
          duration: "2:34"
        },
        {
          type: "image",
          url: "https://r2.loopcast.com/uploads/abc123/screenshot.png",
          filename: "dashboard-screenshot.png",
          size: 2.8
        }
      ]
    },
    processing: {
      status: "processing", // uploaded, processing, completed, failed
      progress: 75,
      steps: {
        upload: { status: "completed" as "completed" | "processing" | "pending", timestamp: "2024-11-02T10:30:00Z" },
        transcription: { status: "processing" as "completed" | "processing" | "pending", progress: 85, timestamp: "2024-11-02T10:32:00Z" },
        sentiment: { status: "pending" as "completed" | "processing" | "pending", timestamp: null as string | null },
        highlights: { status: "pending" as "completed" | "processing" | "pending", timestamp: null as string | null }
      }
    },
    analysis: {
      transcript: {
        text: "Hi, I'm Sarah from TechCorp, and I wanted to share my experience with LoopCast. This product has completely transformed how we handle customer testimonials. The interface is really intuitive, all the features are comprehensive, and I have to say the support team is incredibly responsive. We've actually seen about a 40% increase in testimonial collection since we switched to LoopCast. It's been fantastic for our marketing efforts.",
        confidence: 0.94,
        language: "en",
        speakers: 1
      },
      sentiment: {
        overall: 0.85, // -1 to 1
        aspects: {
          product: 0.9,
          support: 0.95,
          usability: 0.8,
          value: 0.85
        },
        emotions: {
          joy: 0.7,
          trust: 0.9,
          satisfaction: 0.85
        }
      },
      highlights: [
        {
          text: "completely transformed how we handle customer testimonials",
          timestamp: "00:15",
          confidence: 0.92,
          type: "impact"
        },
        {
          text: "40% increase in testimonial collection",
          timestamp: "01:45",
          confidence: 0.98,
          type: "metric"
        },
        {
          text: "support team is incredibly responsive",
          timestamp: "01:20",
          confidence: 0.89,
          type: "praise"
        }
      ]
    },
    metadata: {
      formName: "Customer Testimonial Form",
      submittedAt: "2024-11-02T10:30:00Z",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      source: "form"
    },
    status: {
      isPublished: false,
      publishedAt: null as string | null,
      moderationStatus: "pending" // pending, approved, rejected
    }
  })

  const [isGeneratingHighlights, setIsGeneratingHighlights] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  // Simulate real-time progress updates
  useEffect(() => {
    if (submission.processing.status === "processing") {
      const interval = setInterval(() => {
        setSubmission(prev => {
          const newProgress = Math.min(prev.processing.progress + Math.random() * 5, 100)
          const newStatus = newProgress >= 100 ? "completed" : "processing"
          
          return {
            ...prev,
            processing: {
              ...prev.processing,
              progress: newProgress,
              status: newStatus,
              steps: {
                ...prev.processing.steps,
                transcription: {
                  ...prev.processing.steps.transcription,
                  status: newProgress >= 90 ? "completed" : "processing",
                  progress: Math.min(newProgress + 10, 100)
                },
                sentiment: {
                  ...prev.processing.steps.sentiment,
                  status: newProgress >= 90 ? "processing" : "pending"
                }
              }
            }
          }
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [submission.processing.status])

  const handleGenerateHighlights = async () => {
    setIsGeneratingHighlights(true)
    
    // Simulate worker job
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setSubmission(prev => ({
      ...prev,
      processing: {
        ...prev.processing,
        steps: {
          ...prev.processing.steps,
          highlights: {
            status: "completed" as "completed" | "processing" | "pending",
            timestamp: new Date().toISOString()
          }
        }
      }
    }))
    
    setIsGeneratingHighlights(false)
  }

  const handlePublishToggle = async () => {
    setIsPublishing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmission(prev => ({
      ...prev,
      status: {
        ...prev.status,
        isPublished: !prev.status.isPublished,
        publishedAt: !prev.status.isPublished ? new Date().toISOString() : null
      }
    }))
    
    setIsPublishing(false)
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case "processing":
        return (
          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
          </div>
        )
    }
  }

  const getSentimentColor = (value: number) => {
    if (value >= 0.7) return "text-green-500"
    if (value >= 0.3) return "text-yellow-500"
    return "text-red-500"
  }

  const getSentimentLabel = (value: number) => {
    if (value >= 0.7) return "Positive"
    if (value >= 0.3) return "Neutral"
    if (value >= -0.3) return "Slightly Negative"
    return "Negative"
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submission Details</h1>
          <p className="text-muted-foreground mt-1">
            Monitor processing pipeline and manage publication
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/testimonials">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Testimonials
            </Link>
          </Button>
          
          <Button
            onClick={handlePublishToggle}
            disabled={isPublishing || submission.processing.status !== "completed"}
            className={submission.status.isPublished ? "bg-green-600 hover:bg-green-700" : "bg-foreground hover:bg-foreground/90"}
          >
            {isPublishing ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {submission.status.isPublished ? "Unpublishing..." : "Publishing..."}
              </>
            ) : (
              <>
                {submission.status.isPublished ? (
                  <>
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                    Unpublish
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Publish
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Processing Status */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Processing Pipeline</CardTitle>
                <Badge variant={submission.processing.status === "completed" ? "default" : "secondary"}>
                  {submission.processing.status}
                </Badge>
              </div>
              <CardDescription>
                Track the progress of file processing and analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(submission.processing.progress)}%</span>
                </div>
                <Progress value={submission.processing.progress} className="h-2" />
              </div>

              {/* Processing Steps */}
              <div className="space-y-4">
                {[
                  { key: "upload", label: "File Upload", desc: "Files uploaded to secure storage" },
                  { key: "transcription", label: "Speech-to-Text", desc: "Converting audio to text transcript" },
                  { key: "sentiment", label: "Sentiment Analysis", desc: "Analyzing emotional tone and feedback" },
                  { key: "highlights", label: "Key Highlights", desc: "Extracting important quotes and metrics" }
                ].map((step) => {
                  const stepData = submission.processing.steps[step.key as keyof typeof submission.processing.steps]
                  return (
                    <div key={step.key} className="flex items-center space-x-4">
                      {getStepIcon(stepData.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{step.label}</h4>
                          {stepData.status === "processing" && "progress" in stepData && (
                            <span className="text-xs text-muted-foreground">
                              {Math.round(stepData.progress)}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{step.desc}</p>
                        {stepData.timestamp && (
                          <p className="text-xs text-muted-foreground">
                            {stepData.status === "completed" ? "Completed" : "Started"}: {formatTimestamp(stepData.timestamp)}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-powered insights from the testimonial content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transcript" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                </TabsList>

                {/* Transcript Tab */}
                <TabsContent value="transcript" className="space-y-4">
                  <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Speech Transcript</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {Math.round(submission.analysis.transcript.confidence * 100)}% confidence
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {submission.analysis.transcript.language.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {submission.analysis.transcript.text}
                    </p>
                  </div>
                </TabsContent>

                {/* Sentiment Tab */}
                <TabsContent value="sentiment" className="space-y-4">
                  <div className="space-y-4">
                    {/* Overall Sentiment */}
                    <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Overall Sentiment</h4>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getSentimentColor(submission.analysis.sentiment.overall).replace('text-', 'bg-')}`} />
                          <span className={`text-sm font-medium ${getSentimentColor(submission.analysis.sentiment.overall)}`}>
                            {getSentimentLabel(submission.analysis.sentiment.overall)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sentiment Score</span>
                          <span>{(submission.analysis.sentiment.overall * 100).toFixed(0)}%</span>
                        </div>
                        <Progress 
                          value={(submission.analysis.sentiment.overall + 1) * 50} 
                          className="h-2"
                        />
                      </div>
                    </div>

                    {/* Aspect Analysis */}
                    <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
                      <h4 className="font-medium mb-3">Aspect Analysis</h4>
                      <div className="space-y-3">
                        {Object.entries(submission.analysis.sentiment.aspects).map(([aspect, score]) => (
                          <div key={aspect} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{aspect}</span>
                              <span className={getSentimentColor(score)}>
                                {(score * 100).toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={(score + 1) * 50} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Emotions */}
                    <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
                      <h4 className="font-medium mb-3">Detected Emotions</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(submission.analysis.sentiment.emotions).map(([emotion, intensity]) => (
                          <Badge key={emotion} variant="outline" className="text-xs">
                            <span className="capitalize">{emotion}</span>
                            <span className="ml-1">{(intensity * 100).toFixed(0)}%</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Highlights Tab */}
                <TabsContent value="highlights" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Key Highlights</h4>
                    <Button
                      onClick={handleGenerateHighlights}
                      disabled={isGeneratingHighlights || submission.processing.steps.highlights.status === "completed"}
                      size="sm"
                      variant="outline"
                    >
                      {isGeneratingHighlights ? (
                        <>
                          <svg className="mr-2 h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Generate Highlights
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {submission.analysis.highlights.map((highlight, index) => (
                      <div key={index} className="bg-muted/20 rounded-lg p-3 border border-border/50">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {highlight.type}
                          </Badge>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{highlight.timestamp}</span>
                            <span>•</span>
                            <span>{Math.round(highlight.confidence * 100)}% confidence</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium">"{highlight.text}"</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={submission.customer.avatar} alt={submission.customer.name} />
                  <AvatarFallback>{submission.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{submission.customer.name}</h4>
                  <p className="text-sm text-muted-foreground">{submission.customer.role}</p>
                  <p className="text-sm text-muted-foreground">{submission.customer.company}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{submission.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span>{formatTimestamp(submission.metadata.submittedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Form:</span>
                  <span className="truncate">{submission.metadata.formName}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Uploaded Media</CardTitle>
              <CardDescription>
                Files attached to this testimonial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {submission.content.attachments.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded border border-border/50">
                  <div className={`w-10 h-10 rounded flex items-center justify-center ${
                    file.type === 'video' ? 'bg-purple-100 dark:bg-purple-900/20' : 'bg-blue-100 dark:bg-blue-900/20'
                  }`}>
                    {file.type === 'video' ? (
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.filename}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{file.size} MB</span>
                      {file.duration && (
                        <>
                          <span>•</span>
                          <span>{file.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Publication Status */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Publication Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={submission.status.isPublished ? "default" : "secondary"}>
                    {submission.status.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
                {submission.status.publishedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Published:</span>
                    <span>{formatTimestamp(submission.status.publishedAt)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Moderation:</span>
                  <Badge variant="outline" className="capitalize">
                    {submission.status.moderationStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
