import type { ReactNode } from "react"

import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function PageHeader({ eyebrow, title, description, align = "left" }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow ? (
            <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">{eyebrow}</p>
          ) : null}
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </Reveal>
      </Container>
    </div>
  )
}
