import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Compass, Gauge, Layers, Users } from "lucide-react"

import { Container, PageHeader } from "@/components/page-shell"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { skills } from "@/lib/skills"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.role} based in ${siteConfig.location}.`,
}

const values = [
  {
    icon: Layers,
    title: "Systems over snippets",
    body: "I build for the long run — composable architectures, typed contracts, and documentation that lets teams move fast without breaking things.",
  },
  {
    icon: Gauge,
    title: "Performance is a feature",
    body: "Speed and reliability are first-class requirements. I treat budgets, Core Web Vitals, and observability as part of the product.",
  },
  {
    icon: Users,
    title: "Built with people",
    body: "Great software is a team sport. I mentor, write clearly, and design APIs and interfaces that respect the humans who use them.",
  },
  {
    icon: Compass,
    title: "Pragmatic, not dogmatic",
    body: "I pick the right tool for the problem, ship iteratively, and optimize for outcomes over ideology.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineer, builder, and lifelong learner"
        description="I turn complex problems into fast, accessible, and maintainable products."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src="/akshay-portrait.png"
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 300px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-6 flex flex-col gap-2 text-sm">
                <p className="font-semibold">{siteConfig.name}</p>
                <p className="text-muted-foreground">{siteConfig.role}</p>
                <p className="text-muted-foreground">{siteConfig.location}</p>
              </div>
              <Button asChild className="mt-6 w-full">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <div className="flex flex-col gap-12">
            <Reveal>
              <div className="prose-content max-w-none space-y-4 text-pretty text-base leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m {siteConfig.name}, a {siteConfig.role.toLowerCase()} based in {siteConfig.location}. Over the
                  past six years I&apos;ve shipped production web applications, design systems, and developer tooling for
                  startups and established teams alike.
                </p>
                <p>
                  My work sits at the intersection of product and platform. On the frontend, I care about details:
                  motion, accessibility, and interfaces that feel effortless. On the backend, I build resilient APIs,
                  thoughtful data models, and the observability that keeps systems healthy at scale.
                </p>
                <p>
                  I believe the best engineering is invisible — it just works. I&apos;m happiest when I&apos;m reducing
                  complexity, mentoring teammates, and turning ambiguous problems into shippable, measurable outcomes.
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight">How I work</h2>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {values.map((value, i) => (
                  <Reveal key={value.title} delay={i * 0.06}>
                    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <value.icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 font-semibold">{value.title}</h3>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight">Skills &amp; tools</h2>
              </Reveal>
              <div className="mt-6 flex flex-col gap-5">
                {skills.map((group, i) => (
                  <Reveal key={group.category} delay={i * 0.05}>
                    <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-baseline sm:gap-6">
                      <h3 className="w-32 shrink-0 text-sm font-semibold text-muted-foreground">{group.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-border bg-card px-2.5 py-1 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
