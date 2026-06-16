import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

import { Container } from "@/components/page-shell"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" aria-hidden />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-sm font-medium uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              Browse projects
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
