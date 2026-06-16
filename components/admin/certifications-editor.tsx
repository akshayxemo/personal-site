"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, GripVertical, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"
import type { Certification } from "@/lib/certifications"

interface CertificationsEditorProps {
  initialContent?: string
}

export function CertificationsEditor({ initialContent }: CertificationsEditorProps) {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // useEffect(() => {
  //   if (initialContent) {
  //     const startIndex = initialContent.indexOf("export const certifications")
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
  //           setCertifications(parsed)
  //         } catch (error) {
  //           console.error("Failed to parse certifications:", error)
  //         }
  //       }
  //     }
  //   }
  // }, [initialContent])

  useEffect(() => {
    if (!initialContent) return

    try {
      const match = initialContent.match(
        /export const certifications: Certification\[\]\s*=\s*(\[[\s\S]*?\n\])/m
      )

      if (!match) {
        console.error("Experience array not found")
        return
      }

      const arrayStr = match[1]

      const parsed = Function(`return ${arrayStr}`)() as Certification[]

      setCertifications(parsed)
    } catch (error) {
      console.error("Failed to parse certifications:", error)
    }
  }, [initialContent])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const content = `export interface Certification {
  title: string
  issuer: string
  issued: string
  credentialId?: string
  url?: string
  skills: string[]
}

export const certifications: Certification[] = ${JSON.stringify(certifications, null, 2)}
`

      const response = await fetch("/api/github/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "lib/certifications.ts",
          content,
          message: "Update certifications",
        }),
      })

      if (!response.ok) throw new Error("Failed to save")

      toast.success("Certifications saved successfully")
    } catch (error) {
      toast.error("Failed to save certifications")
    } finally {
      setIsSaving(false)
    }
  }

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        title: "",
        issuer: "",
        issued: "",
        credentialId: "",
        url: "",
        skills: [],
      },
    ])
  }

  const updateCertification = (index: number, field: keyof Certification, value: any) => {
    const updated = [...certifications]
    updated[index] = { ...updated[index], [field]: value }
    setCertifications(updated)
  }

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          Save Changes
        </Button>
      </div>

      {certifications.map((item, index) => (
        <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                {item.title || "New Certification"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCertification(index)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.title}
                  onChange={(e) => updateCertification(index, "title", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Issuer</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.issuer}
                  onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Issued Date</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.issued}
                  onChange={(e) => updateCertification(index, "issued", e.target.value)}
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Credential ID</label>
                <input
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={item.credentialId || ""}
                  onChange={(e) => updateCertification(index, "credentialId", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">URL</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={item.url || ""}
                onChange={(e) => updateCertification(index, "url", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Skills (comma-separated)</label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={item.skills.join(", ")}
                onChange={(e) => updateCertification(index, "skills", e.target.value.split(", ").filter(Boolean))}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addCertification} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Certification
      </Button>
    </div>
  )
}
