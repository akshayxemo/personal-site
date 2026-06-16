import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { notFound } from "next/navigation"
import { ProjectEditor } from "@/components/admin/project-editor" 

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const session = await auth()
  const { slug } = await params
  
  if (!session?.accessToken) {
    return null
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  const file = await github.getFile(`content/projects/${slug}.mdx`)

  if (!file) {
    notFound()
  }

  const content = Buffer.from(file.content!, "base64").toString("utf-8")

  return <ProjectEditor initialContent={content} slug={slug} />
}
