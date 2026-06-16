"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import { toast } from "sonner"
import type { SiteConfig } from "@/lib/site-config"

interface SiteSettingsEditorProps {
  initialContent?: string
}

export function SiteSettingsEditor({ initialContent }: SiteSettingsEditorProps) {
  const [config, setConfig] = useState<any>({
    name: "",
    shortName: "",
    initials: "",
    role: "",
    tagline: "",
    description: "",
    url: "",
    location: "",
    email: "",
    phone: "",
    phoneHref: "",
    availability: "",
    resumePath: "",
    social: {
      github: "",
      linkedin: "",
      email: "",
    },
    nav: [],
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (initialContent) {
      const startIndex = initialContent.indexOf("export const siteConfig")
      if (startIndex !== -1) {
        const objStart = initialContent.indexOf("{", startIndex)
        if (objStart !== -1) {
          let depth = 0
          let objEnd = objStart
          for (let i = objStart; i < initialContent.length; i++) {
            if (initialContent[i] === "{") depth++
            if (initialContent[i] === "}") depth--
            if (depth === 0) {
              objEnd = i + 1
              break
            }
          }
          try {
            const objStr = initialContent.slice(objStart, objEnd)
            const parsed = eval(`(${objStr})`)
            setConfig(parsed)
          } catch (error) {
            console.error("Failed to parse site config:", error)
          }
        }
      }
    }
  }, [initialContent])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const content = `export const siteConfig = ${JSON.stringify(config, null, 2)} as const

export type SiteConfig = typeof siteConfig
`

      const response = await fetch("/api/github/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "lib/site-config.ts",
          content,
          message: "Update site settings",
        }),
      })

      if (!response.ok) throw new Error("Failed to save")

      toast.success("Settings saved successfully")
    } catch (error) {
      toast.error("Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const updateConfig = (field: keyof SiteConfig, value: any) => {
    setConfig({ ...config, [field]: value })
  }

  const updateSocial = (field: keyof SiteConfig["social"], value: string) => {
    setConfig({
      ...config,
      social: { ...config.social, [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.name}
                onChange={(e) => updateConfig("name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Short Name</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.shortName}
                onChange={(e) => updateConfig("shortName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Initials</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.initials}
                onChange={(e) => updateConfig("initials", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Role</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.role}
                onChange={(e) => updateConfig("role", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Tagline</label>
            <input
              className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={config.tagline}
              onChange={(e) => updateConfig("tagline", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]"
              value={config.description}
              onChange={(e) => updateConfig("description", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.email}
                onChange={(e) => updateConfig("email", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.phone}
                onChange={(e) => updateConfig("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.location}
                onChange={(e) => updateConfig("location", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Availability</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={config.availability}
                onChange={(e) => updateConfig("availability", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">GitHub</label>
            <input
              className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={config.social.github}
              onChange={(e) => updateSocial("github", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">LinkedIn</label>
            <input
              className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={config.social.linkedin}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
