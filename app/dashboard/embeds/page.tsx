"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function EmbedsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newEmbedName, setNewEmbedName] = useState("")
  const [selectedEmbedType, setSelectedEmbedType] = useState("widget")

  // Mock data
  const embeds = [
    {
      id: 1,
      name: "Homepage Testimonials",
      type: "widget",
      description: "Rotating testimonials for the main landing page",
      testimonialsCount: 12,
      views: 2847,
      clicks: 156,
      conversionRate: 5.5,
      status: "active",
      created: "2024-10-25",
      lastUpdated: "2024-10-28",
      embedCode: '<script src="https://embed.loopcast.com/widget/abc123.js"></script>',
      customization: {
        theme: "light",
        layout: "carousel",
        showRating: true,
        showAvatar: true
      }
    },
    {
      id: 2,
      name: "Product Page Reviews",
      type: "wall",
      description: "Full testimonials wall for product showcases",
      testimonialsCount: 28,
      views: 1923,
      clicks: 89,
      conversionRate: 4.6,
      status: "active",
      created: "2024-10-20",
      lastUpdated: "2024-10-27",
      embedCode: '<iframe src="https://embed.loopcast.com/wall/def456" width="100%" height="600"></iframe>',
      customization: {
        theme: "dark",
        layout: "masonry",
        showRating: true,
        showAvatar: false
      }
    },
    {
      id: 3,
      name: "Email Signature",
      type: "badge",
      description: "Trust badge for email signatures",
      testimonialsCount: 5,
      views: 892,
      clicks: 34,
      conversionRate: 3.8,
      status: "active",
      created: "2024-10-18",
      lastUpdated: "2024-10-24",
      embedCode: '<img src="https://embed.loopcast.com/badge/ghi789.png" alt="Customer Reviews" />',
      customization: {
        theme: "minimal",
        layout: "compact",
        showRating: true,
        showAvatar: false
      }
    },
    {
      id: 4,
      name: "Popup Testimonials",
      type: "popup",
      description: "Exit-intent popup with social proof",
      testimonialsCount: 8,
      views: 456,
      clicks: 23,
      conversionRate: 5.0,
      status: "paused",
      created: "2024-10-15",
      lastUpdated: "2024-10-22",
      embedCode: '<script src="https://embed.loopcast.com/popup/jkl012.js"></script>',
      customization: {
        theme: "gradient",
        layout: "modal",
        showRating: true,
        showAvatar: true
      }
    }
  ]

  const filteredEmbeds = embeds.filter(embed =>
    embed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    embed.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    embed.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateEmbed = () => {
    console.log("Creating embed:", { name: newEmbedName, type: selectedEmbedType })
    setNewEmbedName("")
    setSelectedEmbedType("widget")
    setIsCreateModalOpen(false)
    // TODO: Implement embed creation
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // TODO: Show toast notification
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'widget':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      case 'wall':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      case 'badge':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      case 'popup':
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 5.5M17 4l1.5 1.5M3 9v10a2 2 0 002 2h14a2 2 0 002-2V9M3 9l2-2h14l2 2M3 9h18" />
          </svg>
        )
      default:
        return (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'paused': return 'outline'
      case 'draft': return 'secondary'
      default: return 'secondary'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Embeds</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage testimonial embeds for your website
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground hover:bg-foreground/90 text-background">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Embed
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <DialogHeader>
              <DialogTitle>Create New Embed</DialogTitle>
              <DialogDescription>
                Choose an embed type and give it a name
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="embedName">Embed Name</Label>
                <Input
                  id="embedName"
                  placeholder="e.g., Homepage Testimonials"
                  value={newEmbedName}
                  onChange={(e) => setNewEmbedName(e.target.value)}
                  className="border-2 border-border/50 focus:border-primary/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Embed Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "widget", label: "Widget", desc: "Rotating testimonials" },
                    { value: "wall", label: "Wall", desc: "Full testimonials grid" },
                    { value: "badge", label: "Badge", desc: "Trust badge" },
                    { value: "popup", label: "Popup", desc: "Modal overlay" }
                  ].map((type) => (
                    <Button
                      key={type.value}
                      variant={selectedEmbedType === type.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedEmbedType(type.value)}
                      className="h-auto p-3 flex flex-col items-start"
                    >
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.desc}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEmbed} disabled={!newEmbedName.trim()}>
                  Create Embed
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            placeholder="Search embeds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Total Embeds</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{embeds.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Total Views</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">
                {embeds.reduce((acc, embed) => acc + embed.views, 0).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Total Clicks</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">
                {embeds.reduce((acc, embed) => acc + embed.clicks, 0)}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">Avg CTR</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">
                {(embeds.reduce((acc, embed) => acc + embed.conversionRate, 0) / embeds.length).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Embeds Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmbeds.map((embed) => (
          <Card key={embed.id} className="bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(embed.type)}
                    <CardTitle className="text-lg line-clamp-1">{embed.name}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">{embed.description}</CardDescription>
                </div>
                <Badge variant={getStatusColor(embed.status)} className="ml-2">
                  {embed.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Views</p>
                  <p className="font-semibold text-lg">{embed.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Clicks</p>
                  <p className="font-semibold text-lg">{embed.clicks}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Testimonials</p>
                  <p className="font-medium">{embed.testimonialsCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CTR</p>
                  <p className="font-medium">{embed.conversionRate}%</p>
                </div>
              </div>
              
              {/* Embed Code Preview */}
              <div className="bg-muted/50 rounded p-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground truncate">
                    {embed.embedCode.substring(0, 40)}...
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopyCode(embed.embedCode)}
                    className="h-6 w-6 p-0"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/embeds/${embed.id}`}>
                    <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/embeds/${embed.id}/preview`}>
                    <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </Link>
                </Button>
              </div>
              
              {/* Meta */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Created: {formatDate(embed.created)}</p>
                <p>Updated: {formatDate(embed.lastUpdated)}</p>
                <p className="capitalize">Theme: {embed.customization.theme} • Layout: {embed.customization.layout}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmbeds.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold">
            {searchQuery ? "No embeds found" : "No embeds yet"}
          </h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? "Try adjusting your search query" 
              : "Create your first embed to showcase testimonials on your website"}
          </p>
          {!searchQuery && (
            <Button className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
              Create Your First Embed
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
