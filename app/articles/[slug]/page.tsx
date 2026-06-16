import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import { MdxContent } from "@/components/mdx-content"
import { Container } from "@/components/page-shell"
import { Reveal } from "@/components/reveal"
import { TableOfContents } from "@/components/table-of-contents"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllArticles, getArticleBySlug } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Article not found" }

  const { meta } = article
  return {
    title: meta.title,
    description: meta.summary,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date,
      images: meta.cover ? [{ url: meta.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      images: meta.cover ? [meta.cover] : undefined,
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const { meta, content, toc } = article
  const related = getAllArticles()
    .filter((a) => a.slug !== meta.slug && a.tags.some((t) => meta.tags.includes(t)))
    .slice(0, 2)

  return (
    <article>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" aria-hidden />
        <Container className="relative py-12 sm:py-16">
          <Reveal className="max-w-3xl">
            <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6 text-muted-foreground">
              <Link href="/articles">
                <ArrowLeft className="size-4" />
                All articles
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={meta.date}>{meta.formattedDate}</time>
              <span aria-hidden>&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden />
                {meta.readingTime}
              </span>
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{meta.title}</h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{meta.summary}</p>
            {meta.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </Reveal>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        {meta.cover ? (
          <Reveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={meta.cover || "/placeholder.svg"}
                alt={`${meta.title} cover`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_220px] lg:gap-16">
          <div className="min-w-0">
            <MdxContent source={content} />
          </div>

          {toc.length > 0 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          ) : null}
        </div>
      </Container>

      {related.length > 0 ? (
        <div className="border-t border-border">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <h2 className="text-balance text-2xl font-semibold tracking-tight">Related articles</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <Button asChild variant="ghost">
                  <Link href="/articles">
                    All articles
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.08}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </article>
  )
}
