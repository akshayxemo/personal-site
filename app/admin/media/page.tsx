import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Search, Copy, Trash2 } from "lucide-react"
import { MediaLibrary } from "@/components/admin/media-library" 

export default async function MediaPage() {
  const session = await auth()
  const user = session?.user
  
  if (!session?.accessToken) {
    return null
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  const files = await github.getDirectory("public").catch(() => [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-2">
            Manage your images and media files
          </p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Files ({files.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search files..."
                className="pl-10 pr-4 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MediaLibrary files={files} username={user?.username} />
        </CardContent>
      </Card>
    </div>
  )
}
