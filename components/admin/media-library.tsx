"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import type { GitHubFile } from "@/lib/github"

interface MediaLibraryProps {
  files: GitHubFile[]
  username: string | undefined
}

export function MediaLibrary({ files, username }: MediaLibraryProps) {
  const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null)

  const imageFiles = files.filter(
    (file) =>
      file.type === "file" &&
      (file.name.endsWith(".png") ||
        file.name.endsWith(".jpg") ||
        file.name.endsWith(".jpeg") ||
        file.name.endsWith(".gif") ||
        file.name.endsWith(".svg") ||
        file.name.endsWith(".webp"))
  )

  const copyUrl = (path: string) => {
    const url = `/${path}`
    navigator.clipboard.writeText(url)
    toast.success("URL copied to clipboard")
  }

  const deleteFile = async (file: GitHubFile) => {
    try {
      const response = await fetch(`/api/github/files?path=${file.path}&message=Delete ${file.name}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("File deleted successfully")
      window.location.reload()
    } catch (error) {
      toast.error("Failed to delete file")
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {imageFiles.map((file) => (
        <div
          key={file.sha}
          className="group relative aspect-square rounded-lg overflow-hidden border border-border/50 bg-background/50"
        >
          <img
            src={`https://raw.githubusercontent.com/${username}/personal-site/main/${file.path}`}
            alt={file.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => copyUrl(file.path)}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => deleteFile(file)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-xs text-white truncate">{file.name}</p>
          </div>
        </div>
      ))}
      {imageFiles.length === 0 && (
        <div className="col-span-full text-center py-12">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images found</p>
        </div>
      )}
    </div>
  )
}
