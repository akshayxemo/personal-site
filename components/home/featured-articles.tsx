import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { getFeaturedArticles, getAllArticles } from "@/lib/content"

export function FeaturedArticles() {
  const featured = getFeaturedArticles()
  const articles = (featured.length >= 2 ? featured : getAllArticles()).slice(0, 2)

  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <div>
              <p className="font-mono text-sm font-medium uppercase tracking-widest text-primary">Writing</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">Latest articles</h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Button asChild variant="ghost">
              <Link href="/articles">
                All articles
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {articles.map((article, i) => (
            <Reveal key={article.slug} as="div" delay={i * 0.08}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
