import { Reveal } from "@/components/reveal"
import { skills, stats } from "@/lib/skills"

export function SkillsSection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono text-sm font-medium uppercase tracking-widest text-primary">Toolkit</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
                The stack I reach for to ship reliable products
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Six years building across the stack — from pixel-perfect interfaces to resilient backends and the
                tooling that keeps teams shipping.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card p-5">
                    <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="flex flex-col gap-5">
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.06}>
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
    </section>
  )
}
