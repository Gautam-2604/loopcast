"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newFormName, setNewFormName] = useState("")

  // Mock data
  const forms = [
    {
      id: 1,
      name: "Product Feedback Form",
      description: "Collect feedback about our latest product release",
      responses: 24,
      status: "active",
      created: "2024-10-25",
      lastResponse: "2 hours ago",
      shareUrl: "https://forms.loopcast.com/abc123"
    },
    {
      id: 2,
      name: "Customer Experience Survey",
      description: "General customer satisfaction survey",
      responses: 18,
      status: "active",
      created: "2024-10-20",
      lastResponse: "1 day ago",
      shareUrl: "https://forms.loopcast.com/def456"
    },
    {
      id: 3,
      name: "Service Review Form",
      description: "Post-service testimonial collection",
      responses: 12,
      status: "draft",
      created: "2024-10-15",
      lastResponse: "Never",
      shareUrl: "https://forms.loopcast.com/ghi789"
    },
    {
      id: 4,
      name: "Event Feedback",
      description: "Feedback from our recent webinar",
      responses: 8,
      status: "paused",
      created: "2024-10-10",
      lastResponse: "3 days ago",
      shareUrl: "https://forms.loopcast.com/jkl012"
    },
  ]

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateForm = () => {
    console.log("Creating form:", newFormName)
    setNewFormName("")
    setIsCreateModalOpen(false)
    // TODO: Implement form creation
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // TODO: Show toast notification
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'draft': return 'secondary'
      case 'paused': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your testimonial collection forms
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground hover:bg-foreground/90 text-background">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Form
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
              <DialogDescription>
                Give your testimonial form a name to get started
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="formName">Form Name</Label>
                <Input
                  id="formName"
                  placeholder="e.g., Product Feedback Form"
                  value={newFormName}
                  onChange={(e) => setNewFormName(e.target.value)}
                  className="border-2 border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateForm} disabled={!newFormName.trim()}>
                  Create Form
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
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredForms.map((form) => (
          <Card key={form.id} className="bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg line-clamp-1">{form.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{form.description}</CardDescription>
                </div>
                <Badge variant={getStatusColor(form.status)} className="ml-2">
                  {form.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Responses</p>
                  <p className="font-semibold text-lg">{form.responses}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Response</p>
                  <p className="font-medium">{form.lastResponse}</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/forms/${form.id}`}>
                    <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/dashboard/forms/${form.id}/responses`}>
                    <svg className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleCopyUrl(form.shareUrl)}
                  className="px-3"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </Button>
              </div>
              
              {/* Share URL */}
              <div className="text-xs text-muted-foreground">
                <p className="truncate">Share: {form.shareUrl}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredForms.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold">No forms found</h3>
          <p className="text-muted-foreground">Try adjusting your search query</p>
        </div>
      )}
    </div>
  )
}
