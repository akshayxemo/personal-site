import fs from "node:fs"
import path from "node:path"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download, FileText, Mail } from "lucide-react"

import { Container, PageHeader } from "@/components/page-shell"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { experience } from "@/lib/experience"
import { siteConfig } from "@/lib/site-config"
import { skills } from "@/lib/skills"

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${siteConfig.name} — ${siteConfig.role} based in ${siteConfig.location}.`,
}

function resumeExists() {
  try {
    const filePath = path.join(process.cwd(), "public", siteConfig.resumePath)
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

export default function ResumePage() {
  const hasResume = resumeExists()
  const currentRole = experience.find((job) => job.current) ?? experience[0]

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Resume & summary"
        description={`A quick overview of my experience and skills. ${
          hasResume ? "Download the full PDF below." : "The downloadable PDF is being updated — reach out for a copy."
        }`}
      />

      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{siteConfig.name} — {siteConfig.role}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {hasResume
                    ? "PDF resume, kept up to date with my latest experience."
                    : "PDF not available right now — email me and I'll send the latest version."}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {hasResume ? (
                <Button asChild>
                  <a href={siteConfig.resumePath} download>
                    <Download className="size-4" />
                    Download PDF
                  </a>
                </Button>
              ) : (
                <Button asChild>
                  <a href={siteConfig.social.email}>
                    <Mail className="size-4" />
                    Request resume
                  </a>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/contact">Contact me</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div className="flex flex-col gap-10">
            <section>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight">Summary</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{siteConfig.description}</p>
              </Reveal>
            </section>

            <section>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
              </Reveal>
              <div className="mt-6 flex flex-col gap-6">
                {experience.map((job, i) => (
                  <Reveal key={`${job.company}-${job.start}`} delay={i * 0.05}>
                    <div className="border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h3 className="font-semibold">
                          {job.role} <span className="text-muted-foreground">· {job.company}</span>
                        </h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {job.start} &ndash; {job.end}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            <section>
              <Reveal>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Details
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <dl className="mt-4 flex flex-col gap-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Location</dt>
                    <dd>{siteConfig.location}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Currently</dt>
                    <dd>
                      {currentRole.role} at {currentRole.company}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Availability</dt>
                    <dd>{siteConfig.availability}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href={siteConfig.social.email} className="text-primary underline-offset-4 hover:underline">
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </section>

            <section>
              <Reveal>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Core skills
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {skills.flatMap((group) => group.items.slice(0, 3)).map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-card px-2.5 py-1 text-sm text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </section>

            <Reveal delay={0.1}>
              <Button asChild variant="outline" className="w-full">
                <Link href="/experience">
                  Full experience
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </aside>
        </div>
      </Container>
    </>
  )
}
