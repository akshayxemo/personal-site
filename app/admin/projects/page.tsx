import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search, Edit, Trash2, Copy } from "lucide-react"
import Link from "next/link"

export default async function ProjectsPage() {
  const session = await auth()
  
  if (!session?.accessToken) {
    return null
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  const files = await github.getDirectory("content/projects").catch(() => [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Projects ({files.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.sha}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{file.name.replace(".mdx", "")}</h3>
                  <p className="text-sm text-muted-foreground">{file.path}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/projects/${file.name.replace(".mdx", "")}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {files.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found</p>
                <Link href="/admin/projects/new">
                  <Button className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Create your first project
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
