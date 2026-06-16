import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProjectCard } from "@/components/project-card"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { getFeaturedProjects } from "@/lib/content"

export function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 3)

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <div>
              <p className="font-mono text-sm font-medium uppercase tracking-widest text-primary">Selected work</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">Featured projects</h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Button asChild variant="ghost">
              <Link href="/projects">
                All projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} as="div" delay={i * 0.08}>
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
