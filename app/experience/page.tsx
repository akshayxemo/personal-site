import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Briefcase } from "lucide-react"

import { Container, PageHeader } from "@/components/page-shell"
import { Reveal } from "@/components/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { experience } from "@/lib/experience"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional experience and career timeline of ${siteConfig.name}, ${siteConfig.role}.`,
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="A track record of shipping"
        description="Six years building products and platforms across SaaS, fintech, and agency work — from individual contributor to engineering lead."
      />

      <Container className="py-16 sm:py-20">
        <ol className="relative flex flex-col gap-10 border-l border-border pl-6 sm:pl-8">
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.company}-${job.start}`} delay={i * 0.06} className="relative">
              <span
                className="absolute -left-[31px] top-1.5 flex size-3.5 items-center justify-center sm:-left-[39px]"
                aria-hidden
              >
                <span
                  className={
                    job.current
                      ? "size-3.5 rounded-full border-2 border-primary bg-primary"
                      : "size-3.5 rounded-full border-2 border-border bg-background"
                  }
                />
              </span>

              <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                  <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
                    {job.start} &ndash; {job.end}
                  </span>
                  <span aria-hidden>&middot;</span>
                  <span>{job.location}</span>
                  <Badge variant="secondary" className="font-normal">
                    {job.type}
                  </Badge>
                  {job.current ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-chart-4">
                      <span className="size-1.5 rounded-full bg-current" aria-hidden />
                      Current
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight">{job.role}</h2>
                <p className="mt-0.5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Briefcase className="size-4" aria-hidden />
                  {job.company}
                </p>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{job.summary}</p>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                  {job.stack.map((tech) => (
                    <span key={tech} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Want the full picture?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Download my resume or explore the projects behind this experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/projects">View projects</Link>
              </Button>
              <Button asChild>
                <Link href="/resume">
                  View resume
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  )
}
