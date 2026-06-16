"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface ArticleEditorProps {
  initialContent?: string
  slug?: string
  isNew?: boolean
}

export function ArticleEditor({ initialContent = "", slug, isNew }: ArticleEditorProps) {
  const router = useRouter()
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const path = isNew 
        ? `content/articles/${slug || "new-article"}.mdx`
        : `content/articles/${slug}.mdx`
      
      const message = isNew 
        ? `Create article: ${slug}`
        : `Update article: ${slug}`

      const response = await fetch("/api/github/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, content, message }),
      })

      if (!response.ok) throw new Error("Failed to save")

      toast.success("Article saved successfully")
      if (isNew) {
        router.push("/admin/articles")
      }
    } catch (error) {
      toast.error("Failed to save article")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isNew ? "New Article" : `Edit: ${slug}`}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isNew ? "Write a new article" : "Edit article content"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Frontmatter</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-64 p-4 rounded-lg bg-background border border-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="---
title: My Article
summary: A brief description
date: 2024-01-01
tags: []
featured: false
cover: /articles/cover.png
---"
              value={content.split("---")[1] || ""}
              onChange={(e) => {
                const frontmatter = e.target.value
                const body = content.split("---").slice(2).join("---") || ""
                setContent(`---\n${frontmatter}\n---\n${body}`)
              }}
            />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Body Content (MDX)</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-64 p-4 rounded-lg bg-background border border-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Write your article content in MDX..."
              value={content.split("---").slice(2).join("---") || ""}
              onChange={(e) => {
                const body = e.target.value
                const frontmatter = content.split("---")[1] || ""
                setContent(`---\n${frontmatter}\n---\n${body}`)
              }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Full Content</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full h-96 p-4 rounded-lg bg-background border border-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
