"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  // Profile settings
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    website: "https://acme.com",
    avatar: "/avatars/user.jpg"
  })

  // Organization settings
  const [organization, setOrganization] = useState({
    name: "Acme Corp",
    logo: "/logos/acme.png",
    primaryColor: "#000000",
    secondaryColor: "#6366f1",
    customDomain: "testimonials.acme.com",
    brandName: "Acme Testimonials"
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNewTestimonial: true,
    emailWeeklyReport: true,
    emailSystemUpdates: false,
    pushNewTestimonial: true,
    pushWeeklyReport: false
  })

  // API settings
  const [apiKey] = useState("ak_live_1234567890abcdef")
  const [webhookUrl, setWebhookUrl] = useState("")

  // Billing info
  const [billing] = useState({
    plan: "Pro",
    nextBilling: "2024-11-15",
    usage: {
      forms: 12,
      testimonials: 847,
      views: 15420
    },
    limits: {
      forms: 50,
      testimonials: 10000,
      views: 100000
    }
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile)
    // TODO: Implement profile save
  }

  const handleSaveOrganization = () => {
    console.log("Saving organization:", organization)
    // TODO: Implement organization save
  }

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications)
    // TODO: Implement notifications save
  }

  const handleGenerateNewApiKey = () => {
    console.log("Generating new API key")
    // TODO: Implement API key generation
  }

  const handleDeleteAccount = () => {
    console.log("Deleting account")
    setIsDeleteModalOpen(false)
    // TODO: Implement account deletion
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    // TODO: Show toast notification
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and organization preferences
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="text-xs">
            {billing.plan} Plan
          </Badge>
          <Button variant="outline" size="sm">
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API & Webhooks</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="border-2 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="border-2 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    className="border-2 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    className="border-2 border-border/50 focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Organization Branding</CardTitle>
              <CardDescription>
                Customize how your testimonials and forms appear to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                  <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    SVG, PNG recommended. Max 1MB
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={organization.name}
                    onChange={(e) => setOrganization({...organization, name: e.target.value})}
                    className="border-2 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    value={organization.brandName}
                    onChange={(e) => setOrganization({...organization, brandName: e.target.value})}
                    className="border-2 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={organization.primaryColor}
                      onChange={(e) => setOrganization({...organization, primaryColor: e.target.value})}
                      className="w-16 h-10 p-1 border-2 border-border/50"
                    />
                    <Input
                      value={organization.primaryColor}
                      onChange={(e) => setOrganization({...organization, primaryColor: e.target.value})}
                      className="flex-1 border-2 border-border/50 focus:border-primary/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={organization.secondaryColor}
                      onChange={(e) => setOrganization({...organization, secondaryColor: e.target.value})}
                      className="w-16 h-10 p-1 border-2 border-border/50"
                    />
                    <Input
                      value={organization.secondaryColor}
                      onChange={(e) => setOrganization({...organization, secondaryColor: e.target.value})}
                      className="flex-1 border-2 border-border/50 focus:border-primary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  value={organization.customDomain}
                  onChange={(e) => setOrganization({...organization, customDomain: e.target.value})}
                  className="border-2 border-border/50 focus:border-primary/50"
                  placeholder="testimonials.yourdomain.com"
                />
                <p className="text-xs text-muted-foreground">
                  Set up a custom domain for your testimonial forms and embeds
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveOrganization}>
                  Save Branding
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Email Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'emailNewTestimonial', label: 'New testimonial received', desc: 'Get notified when someone submits a testimonial' },
                      { key: 'emailWeeklyReport', label: 'Weekly summary report', desc: 'Weekly digest of your testimonial activity' },
                      { key: 'emailSystemUpdates', label: 'System updates', desc: 'Important product updates and announcements' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded border border-border/50">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <Button
                          variant={notifications[item.key as keyof typeof notifications] ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNotifications({
                            ...notifications,
                            [item.key]: !notifications[item.key as keyof typeof notifications]
                          })}
                        >
                          {notifications[item.key as keyof typeof notifications] ? "On" : "Off"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Push Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'pushNewTestimonial', label: 'New testimonial received', desc: 'Browser notifications for new testimonials' },
                      { key: 'pushWeeklyReport', label: 'Weekly summary report', desc: 'Browser notifications for weekly reports' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded border border-border/50">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <Button
                          variant={notifications[item.key as keyof typeof notifications] ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNotifications({
                            ...notifications,
                            [item.key]: !notifications[item.key as keyof typeof notifications]
                          })}
                        >
                          {notifications[item.key as keyof typeof notifications] ? "On" : "Off"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Manage your API keys and webhook settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="apiKey"
                      value={apiKey}
                      readOnly
                      className="font-mono text-sm border-2 border-border/50"
                    />
                    <Button variant="outline" size="sm" onClick={copyApiKey}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleGenerateNewApiKey}>
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Keep your API key secure. It provides full access to your account.
                  </p>
                </div>

                <div>
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-app.com/webhooks/loopcast"
                    className="border-2 border-border/50 focus:border-primary/50 mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Receive real-time notifications when testimonials are submitted
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded p-4">
                <h4 className="text-sm font-medium mb-2">Webhook Events</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• <code>testimonial.created</code> - New testimonial submitted</p>
                  <p>• <code>testimonial.published</code> - Testimonial published</p>
                  <p>• <code>form.created</code> - New form created</p>
                  <p>• <code>embed.viewed</code> - Embed widget viewed</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  Save API Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Current Plan */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Current Plan
                  <Badge variant="default">{billing.plan}</Badge>
                </CardTitle>
                <CardDescription>
                  Next billing: {new Date(billing.nextBilling).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly cost</span>
                    <span className="font-semibold">$29/month</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Change Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50">
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
                <CardDescription>
                  Your current usage and limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Forms', current: billing.usage.forms, limit: billing.limits.forms },
                    { label: 'Testimonials', current: billing.usage.testimonials, limit: billing.limits.testimonials },
                    { label: 'Views', current: billing.usage.views, limit: billing.limits.views }
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.label}</span>
                        <span>{item.current.toLocaleString()} / {item.limit.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${Math.min((item.current / item.limit) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Danger Zone */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-600">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-card/50 backdrop-blur-sm border-2 border-red-500/20">
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all data.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm">
                        <p className="font-medium text-red-800 dark:text-red-200">This will delete:</p>
                        <ul className="text-red-700 dark:text-red-300 mt-1 ml-4 list-disc text-xs">
                          <li>All testimonials and forms</li>
                          <li>All embeds and customizations</li>
                          <li>All analytics and reports</li>
                          <li>Your account and billing information</li>
                        </ul>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          Yes, Delete Account
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
