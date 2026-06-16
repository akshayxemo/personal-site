import type { Metadata } from "next"

import { ArticleExplorer } from "@/components/articles/article-explorer"
import { Container, PageHeader } from "@/components/page-shell"
import { getAllArticles, getArticleTags } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Articles",
  description: `Writing by ${siteConfig.name} on engineering, performance, design systems, and developer experience.`,
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  const tags = getArticleTags()

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes on building for the web"
        description="Essays and deep dives on engineering, performance, type safety, and design systems. Search or filter by topic."
      />
      <Container className="py-16 sm:py-20">
        <ArticleExplorer articles={articles} tags={tags} />
      </Container>
    </>
  )
}
