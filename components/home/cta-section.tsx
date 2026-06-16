import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function CtaSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-glow opacity-80" aria-hidden />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s build something exceptional together
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {siteConfig.availability}. Whether you have a role in mind or a problem to solve, I&apos;d love to hear
                about it.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <Mail className="size-4" />
                    Get in touch
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about">
                    More about me
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
