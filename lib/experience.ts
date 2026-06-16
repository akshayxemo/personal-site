export interface ExperienceItem {
  company: string
  role: string
  type: "Full-time" | "Contract" | "Freelance" | "Internship"
  location: string
  start: string
  end: string
  current?: boolean
  summary: string
  highlights: string[]
  stack: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: "Northwind Labs",
    role: "Senior Full Stack Engineer",
    type: "Full-time",
    location: "Remote",
    start: "2023",
    end: "Present",
    current: true,
    summary:
      "Lead engineer on the core platform team, owning the architecture of a multi-tenant B2B SaaS product serving 40k+ daily active users.",
    highlights: [
      "Re-architected the rendering pipeline to the Next.js App Router, cutting Largest Contentful Paint by 48% and improving INP across the dashboard.",
      "Designed a typed, end-to-end RPC layer (tRPC + Zod) adopted across 6 services, eliminating an entire class of runtime API errors.",
      "Mentored 4 engineers, established the code review playbook, and drove the team's migration to a shared design system.",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "tRPC", "AWS", "Terraform"],
  },
  {
    company: "Brightwave",
    role: "Full Stack Engineer",
    type: "Full-time",
    location: "Bengaluru, India",
    start: "2021",
    end: "2023",
    summary:
      "Built customer-facing features and internal tooling for a fintech analytics platform from early stage through Series B.",
    highlights: [
      "Shipped a real-time reporting module backed by WebSockets and Redis streams, handling 5k concurrent sessions.",
      "Introduced a component library and Storybook workflow that reduced UI defects and sped up feature delivery.",
      "Owned the CI/CD pipeline, reducing deploy time from 22 to 6 minutes with parallelized builds and caching.",
    ],
    stack: ["React", "Node.js", "GraphQL", "Redis", "Docker", "GitHub Actions"],
  },
  {
    company: "Pixelforge Studio",
    role: "Frontend Engineer",
    type: "Full-time",
    location: "Kolkata, India",
    start: "2020",
    end: "2021",
    summary:
      "Delivered high-fidelity marketing sites and web apps for agency clients with a strong emphasis on performance and accessibility.",
    highlights: [
      "Built 12+ production sites scoring 95+ on Lighthouse across performance and accessibility.",
      "Created reusable animation primitives that became the studio's standard motion toolkit.",
    ],
    stack: ["JavaScript", "React", "SCSS", "Framer Motion"],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    type: "Freelance",
    location: "Remote",
    start: "2019",
    end: "2020",
    summary:
      "Partnered with founders and small businesses to design and develop their first web presence and MVPs.",
    highlights: [
      "Delivered 15+ projects spanning landing pages, dashboards, and e-commerce storefronts.",
      "Handled the full lifecycle: design, build, deployment, and post-launch support.",
    ],
    stack: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
]
