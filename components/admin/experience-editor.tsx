"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"
import type { ExperienceItem } from "@/lib/experience"

interface ExperienceEditorProps {
  initialContent?: string
}

export function ExperienceEditor({ initialContent }: ExperienceEditorProps) {
  const [experience, setExperience] = useState<ExperienceItem[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // useEffect(() => {
  //   if (initialContent) {
  //     // Parse the TypeScript file to extract experience array
  //     const startIndex = initialContent.indexOf("export const experience: ExperienceItem[]")
  //     if (startIndex !== -1) {
  //       const arrayStart = initialContent.indexOf("[", startIndex)
  //       if (arrayStart !== -1) {
  //         let depth = 0
  //         let arrayEnd = arrayStart
  //         for (let i = arrayStart; i < initialContent.length; i++) {
  //           if (initialContent[i] === "[") depth++
  //           if (initialContent[i] === "]") depth--
  //           if (depth === 0) {
  //             arrayEnd = i + 1
  //             break
  //           }
  //         }
  //         try {
  //           const arrayStr = initialContent.slice(arrayStart, arrayEnd)
  //           const parsed = eval(arrayStr)
  //           setExperience(parsed)
  //         } catch (error) {
  //           console.error("Failed to parse experience:", error)
  //         }
  //       }
  //     }
  //   }
  // }, [initialContent])
  useEffect(() => {
    if (!initialContent) return

    try {
      const match = initialContent.match(
        /export const experience: ExperienceItem\[\]\s*=\s*(\[[\s\S]*?\n\])/m
      )

      if (!match) {
        console.error("Experience array not found")
        return
      }

      const arrayStr = match[1]

      const parsed = Function(`return ${arrayStr}`)() as ExperienceItem[]

      setExperience(parsed)
    } catch (error) {
      console.error("Failed to parse experience:", error)
    }
}, [initialContent])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const content = `export interface ExperienceItem {
  company: string
  role: string
  type: "Full-time" | "Contract" | "Freelance" | "Internship"
  location: string
  start: string
  end: string
  current?: boolean
  summary: string
  highlights: string[]
  stack: string[]
}

export const experience: ExperienceItem[] = ${JSON.stringify(experience, null, 2)}
`

      const response = await fetch("/api/github/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "lib/experience.ts",
          content,
          message: "Update experience",
        }),
      })

      if (!response.ok) throw new Error("Failed to save")

      toast.success("Experience saved successfully")
    } catch (error) {
      toast.error("Failed to save experience")
    } finally {
      setIsSaving(false)
    }
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        role: "",
        type: "Full-time",
        location: "",
        start: "",
        end: "",
        current: false,
        summary: "",
        highlights: [],
        stack: [],
      },
    ])
  }

  const updateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          Save Changes
        </Button>
      </div>

      {experience.map((item, index) => (
        <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                {item.company || "New Experience"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(index)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Company</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.role}
                  onChange={(e) => updateExperience(index, "role", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.type}
                  onChange={(e) => updateExperience(index, "type", e.target.value)}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.location}
                  onChange={(e) => updateExperience(index, "location", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.start}
                  onChange={(e) => updateExperience(index, "start", e.target.value)}
                  placeholder="2023"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">End</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.end}
                  onChange={(e) => updateExperience(index, "end", e.target.value)}
                  placeholder="Present"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Summary</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]"
                value={item.summary}
                onChange={(e) => updateExperience(index, "summary", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Stack (comma-separated)</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={item.stack.join(", ")}
                onChange={(e) => updateExperience(index, "stack", e.target.value.split(", ").filter(Boolean))}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  )
}
