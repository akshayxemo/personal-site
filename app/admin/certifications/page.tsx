import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CertificationsEditor } from "@/components/admin/certifications-editor"

export default async function CertificationsPage() {
  const session = await auth()
  
  if (!session?.accessToken) {
    return null
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  const file = await github.getFile("lib/certifications.ts").catch(() => null)
  const content = file ? Buffer.from(file.content!, "base64").toString("utf-8") : ""

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground mt-2">
            Manage your certifications
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <CertificationsEditor initialContent={content} />
    </div>
  )
}
