"use client"

import { Search, X } from "lucide-react"
import { useMemo, useState } from "react"

import { ArticleCard } from "@/components/article-card"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ArticleMeta } from "@/lib/content/schemas"
import { cn } from "@/lib/utils"

export function ArticleExplorer({ articles, tags }: { articles: ArticleMeta[]; tags: string[] }) {
  const [query, setQuery] = useState("")
  const [tag, setTag] = useState<string>("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      const matchesTag = tag === "All" || a.tags.includes(tag)
      if (!matchesTag) return false
      if (!q) return true
      const haystack = [a.title, a.summary, ...a.tags].join(" ").toLowerCase()
      return haystack.includes(q)
    })
  }, [articles, query, tag])

  const filters = ["All", ...tags]

  return (
    <div className="flex flex-col gap-8">
      <Reveal>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles by title or topic..."
              aria-label="Search articles"
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {filters.map((value) => {
              const active = value === tag
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTag(value)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {tag !== "All" ? ` tagged ${tag}` : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.05}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">No articles match your search.</p>
          <Button
            variant="outline"
            onClick={() => {
              setQuery("")
              setTag("All")
            }}
          >
            <X className="size-4" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
