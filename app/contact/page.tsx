import type { Metadata } from "next"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

import { Container, PageHeader } from "@/components/page-shell"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — ${siteConfig.availability}.`,
}

const channels = [
  {
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.social.email,
    icon: Mail,
    description: "Best for project inquiries and collaboration.",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: siteConfig.social.linkedin,
    icon: Linkedin,
    description: "Let's connect professionally and stay in touch.",
    external: true,
  },
  {
    label: "GitHub",
    value: "@akshayxemo",
    href: siteConfig.social.github,
    icon: Github,
    description: "Browse my open-source work and contributions.",
    external: true,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneHref}`,
    icon: Phone,
    description: "Available during business hours, IST.",
    external: false,
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something together"
        description={`${siteConfig.availability}. I'm always happy to talk about engineering, product, and new opportunities.`}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight">Get in touch</h2>
              <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                The fastest way to reach me is by email — I usually respond within a day or two. You can also find me on
                the platforms below.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {channels.map((channel, i) => (
                <Reveal key={channel.label} delay={i * 0.06}>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <channel.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-semibold">{channel.label}</h3>
                    <p className="mt-0.5 text-sm font-medium text-primary">{channel.value}</p>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {channel.description}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <aside>
            <Reveal>
              <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
                <div>
                  <h2 className="font-semibold tracking-tight">{siteConfig.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{siteConfig.role}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" aria-hidden />
                  {siteConfig.location}
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <span className="size-2 rounded-full bg-chart-4" aria-hidden />
                    Available
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{siteConfig.availability}</p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </>
  )
}
