import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { SiteSettingsEditor } from "@/components/admin/site-settings-editor" 

export default async function SettingsPage() {
  const session = await auth()
  
  if (!session?.accessToken) {
    return null
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  const file = await github.getFile("lib/site-config.ts").catch(() => null)
  const content = file ? Buffer.from(file.content!, "base64").toString("utf-8") : ""

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your site configuration
        </p>
      </div>

      <SiteSettingsEditor initialContent={content} />
    </div>
  )
}
