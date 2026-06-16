import Link from "next/link"
import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/utils"

function Callout({ children, type = "note" }: { children: ReactNode; type?: "note" | "tip" | "warning" }) {
  const styles = {
    note: "border-primary/40 bg-primary/5",
    tip: "border-chart-4/40 bg-chart-4/5",
    warning: "border-destructive/40 bg-destructive/5",
  }
  return (
    <div className={cn("my-6 rounded-lg border-l-4 px-4 py-3 text-sm leading-relaxed", styles[type])}>{children}</div>
  )
}

export const mdxComponents: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="leading-relaxed" {...props} />,
  a: ({ href = "#", ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#")
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-primary underline-offset-4 hover:underline"
          {...props}
        />
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline-offset-4 hover:underline"
        {...props}
      />
    )
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="mt-6 border-l-4 border-border pl-4 italic text-muted-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground before:content-none after:content-none data-[rehype-pretty-code-figure]:bg-transparent"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
  Callout,
}
