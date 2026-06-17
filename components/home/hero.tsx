import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/lib/site-config"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-40 h-112 w-md -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-chart-4" aria-hidden="true" />
            {siteConfig.availability}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {siteConfig.name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-pretty text-xl font-medium text-primary sm:text-2xl">{siteConfig.role}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                View projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/resume">
                <Download className="size-4" />
                Resume
              </Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-8 flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="GitHub profile">
              <a href={siteConfig.social.github} target="_blank" rel="noreferrer noopener">
                <Github className="size-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="LinkedIn profile">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer noopener">
                <Linkedin className="size-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Email Akshay">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="size-5" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
