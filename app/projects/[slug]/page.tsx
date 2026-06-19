import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ExternalLink, FileText, Github } from "lucide-react"

import { MdxContent } from "@/components/mdx-content"
import { Container } from "@/components/page-shell"
import { ProjectCard } from "@/components/project-card"
import { Reveal } from "@/components/reveal"
import { TableOfContents } from "@/components/table-of-contents"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getAllProjects, getProjectBySlug } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project not found" }

  const { meta } = project
  return {
    title: meta.title,
    description: meta.summary,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.summary,
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

const linkConfig = [
  { key: "live", label: "Live site", icon: ExternalLink },
  { key: "repo", label: "Source code", icon: Github },
  { key: "caseStudy", label: "Case study", icon: FileText },
] as const

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { meta, content, toc } = project
  const related = getAllProjects()
    .filter((p) => p.slug !== meta.slug && p.category === meta.category)
    .slice(0, 3)

  const links = linkConfig.filter(({ key }) => meta.links[key])

  return (
    <article>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" aria-hidden />
        <Container className="relative py-12 sm:py-16">
          <Reveal>
            <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6 text-muted-foreground">
              <Link href="/projects">
                <ArrowLeft className="size-4" />
                All projects
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="font-normal">
                {meta.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{meta.year}</span>
              <span aria-hidden className="text-muted-foreground">
                &middot;
              </span>
              <span className="text-sm text-muted-foreground">{meta.status}</span>
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{meta.title}</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{meta.summary}</p>
            {links.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {links.map(({ key, label, icon: Icon }) => (
                  <Button key={key} asChild variant={key === "live" ? "default" : "outline"} size="sm">
                    <a href={meta.links[key]} target="_blank" rel="noopener noreferrer">
                      <Icon className="size-4" />
                      {label}
                    </a>
                  </Button>
                ))}
              </div>
            ) : null}
          </Reveal>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <Reveal>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
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

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_220px] lg:gap-16">
          <div className="min-w-0">
            <MdxContent source={content} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {meta.role ? (
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Role
                    </p>
                    <p className="mt-1 text-sm">{meta.role}</p>
                  </div>
                ) : null}
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {meta.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {toc.length > 0 ? <TableOfContents items={toc} /> : null}

            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 ? (
        <div className="border-t border-border">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <h2 className="text-balance text-2xl font-semibold tracking-tight">Related projects</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <Button asChild variant="ghost">
                  <Link href="/projects">
                    All projects
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </div>
      ) : (
        <Separator />
      )}
    </article>
  )
}
