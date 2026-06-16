import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import type { ProjectMeta } from "@/lib/content/schemas"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  Shipped: "text-chart-4",
  "In Progress": "text-primary",
  Archived: "text-muted-foreground",
}

export function ProjectCard({ project, priority = false }: { project: ProjectMeta; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={project.cover || "/placeholder.svg"}
          alt={`${project.title} cover`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="font-normal">
            {project.category}
          </Badge>
          <span className={cn("flex items-center gap-1.5 text-xs font-medium", statusStyles[project.status])}>
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {project.status}
          </span>
        </div>
        <h3 className="mt-4 flex items-start justify-between gap-2 text-lg font-semibold tracking-tight">
          <span className="text-balance">{project.title}</span>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </h3>
        <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
