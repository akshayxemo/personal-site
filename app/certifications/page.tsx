import type { Metadata } from "next"
import { Award, ExternalLink } from "lucide-react"

import { Container, PageHeader } from "@/components/page-shell"
import { Reveal } from "@/components/reveal"
import { certifications } from "@/lib/certifications"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Certifications",
  description: `Professional certifications and credentials earned by ${siteConfig.name}.`,
}

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certifications"
        title="Learning and professional development"
        description="Certifications, coursework, and continuous learning focused on software engineering, cloud technologies, and modern application development."
      />

      <Container className="py-16 sm:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const isLink = Boolean(cert.url)
            const Wrapper = isLink ? "a" : "div"
            return (
              <Reveal as="li" key={cert.title} delay={i * 0.05} className="h-full">
                <Wrapper
                  {...(isLink
                    ? { href: cert.url, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Award className="size-5" aria-hidden />
                    </span>
                    {isLink ? (
                      <ExternalLink
                        className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden
                      />
                    ) : null}
                  </div>

                  <h2 className="mt-4 text-balance font-semibold leading-snug tracking-tight">{cert.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>

                  <dl className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
                    <div className="flex gap-2">
                      <dt className="font-medium">Issued</dt>
                      <dd>{cert.issued}</dd>
                    </div>
                    {cert.credentialId ? (
                      <div className="flex gap-2">
                        <dt className="font-medium">ID</dt>
                        <dd className="font-mono">{cert.credentialId}</dd>
                      </div>
                    ) : null}
                  </dl>

                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Wrapper>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
