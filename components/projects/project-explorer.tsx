"use client"

import { Search, X } from "lucide-react"
import { useMemo, useState } from "react"

import { ProjectCard } from "@/components/project-card"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ProjectMeta } from "@/lib/content/schemas"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 9

export function ProjectExplorer({
  projects,
  categories,
}: {
  projects: ProjectMeta[]
  categories: string[]
}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>("All")
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category
      if (!matchesCategory) return false
      if (!q) return true
      const haystack = [p.title, p.summary, p.category, ...p.tags, ...p.stack].join(" ").toLowerCase()
      return haystack.includes(q)
    })
  }, [projects, query, category])

  const shown = filtered.slice(0, visible)
  const filters = ["All", ...categories]

  function selectCategory(value: string) {
    setCategory(value)
    setVisible(PAGE_SIZE)
  }

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
              onChange={(e) => {
                setQuery(e.target.value)
                setVisible(PAGE_SIZE)
              }}
              placeholder="Search projects by name, stack, or tag..."
              aria-label="Search projects"
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {filters.map((value) => {
              const active = value === category
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectCategory(value)}
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
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {category !== "All" ? ` in ${category}` : ""}
      </p>

      {shown.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">No projects match your search.</p>
          <Button
            variant="outline"
            onClick={() => {
              setQuery("")
              selectCategory("All")
            }}
          >
            <X className="size-4" />
            Clear filters
          </Button>
        </div>
      )}

      {visible < filtered.length ? (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more projects
          </Button>
        </div>
      ) : null}
    </div>
  )
}
