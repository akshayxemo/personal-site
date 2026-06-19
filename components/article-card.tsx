import { Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import type { ArticleMeta } from "@/lib/content/schemas"

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={article.externalUrl || `/articles/${article.slug}`}
      target={article.externalUrl ? "_blank" : undefined}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {article.cover ? (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={article.cover || "/placeholder.svg"}
            alt={`${article.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={article.date}>{article.formattedDate}</time>
          <span aria-hidden>&middot;</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {article.readingTime}
          </span>
        </div>
        <h3 className="mt-3 text-balance text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">{article.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
          {article.tags.slice(0, 10).map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
