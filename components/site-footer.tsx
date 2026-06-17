import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link"

import { siteConfig } from "@/lib/site-config"
// import Image from "next/image"

const socials = [
  { label: "GitHub", href: siteConfig.social.github, icon: Github, external: true },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: siteConfig.social.email, icon: Mail, external: false },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              {/* <Image
                width={36}
                height={36}
                src={"/akshay-portrait.png"}
                alt="AKD"
                className="rounded-lg border border-primary transition-transform group-hover:scale-105"
              /> */}
              <span className="text-md font-semibold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{siteConfig.tagline}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden />
              {siteConfig.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer navigation">
              <h2 className="text-sm font-semibold">Navigate</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {siteConfig.nav.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="More navigation">
              <h2 className="text-sm font-semibold">More</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {siteConfig.nav.slice(5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-semibold">Connect</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {socials.map(({ label, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4" aria-hidden />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS, and shadcn/ui.</p>
        </div>
      </div>
    </footer>
  )
}
