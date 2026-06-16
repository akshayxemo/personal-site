import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { notFound } from "next/navigation"
import { ArticleEditor } from "@/components/admin/article-editor" 

export default async function ArticleEditPage({
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

  const file = await github.getFile(`content/articles/${slug}.mdx`)

  if (!file) {
    notFound()
  }

  const content = Buffer.from(file.content!, "base64").toString("utf-8")

  return <ArticleEditor initialContent={content} slug={slug} />
}
