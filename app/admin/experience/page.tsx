import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ExperienceEditor } from "@/components/admin/experience-editor" 

export default async function ExperiencePage() {
  const session = await auth()
  
  if (!session?.accessToken) {
    return null
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  const file = await github.getFile("lib/experience.ts").catch(() => null)
  const content = file ? Buffer.from(file.content!, "base64").toString("utf-8") : ""
  console.log(file, content);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground mt-2">
            Manage your work experience
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <ExperienceEditor initialContent={content} />
    </div>
  )
}
