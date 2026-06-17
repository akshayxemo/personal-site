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
    title: "Build for scale",
    body: "I focus on clean architecture, maintainable code, and systems that can grow as products evolve.",
  },
  {
    icon: Gauge,
    title: "Performance matters",
    body: "Fast, reliable, and responsive applications create better user experiences and stronger products.",
  },
  {
    icon: Users,
    title: "Collaborative mindset",
    body: "Great software comes from teamwork. I value communication, knowledge sharing, and continuous learning.",
  },
  {
    icon: Compass,
    title: "Always learning",
    body: "Technology evolves quickly, and I enjoy exploring new tools, frameworks, and engineering practices.",
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
                  I&apos;m {siteConfig.name}, a {siteConfig.role.toLowerCase()} based in {siteConfig.location}. I build modern web and
                  mobile applications with a strong focus on usability, scalability, and maintainability.
                </p>

                <p>
                  Currently, I work on healthcare technology products where I contribute across the entire stack using React,
                  Next.js, Flutter, Node.js, GraphQL, Firebase, and AWS. My work includes designing backend services, integrating
                  health-data platforms, building mobile experiences, and delivering features used in production environments.
                </p>

                <p>
                  I enjoy solving complex problems, learning new technologies, and turning ideas into reliable products. Whether
                  it&apos;s creating intuitive user experiences, building APIs, or designing event-driven systems, I&apos;m always
                  focused on delivering solutions that create real value for users.
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
