export interface SkillGroup {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Go", "HTML & CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Radix UI", "Redux"],
  },
  {
    category: "Backend",
    items: ["Node.js", "GraphQL", "tRPC", "REST", "gRPC", "Prisma"],
  },
  {
    category: "Data & Infra",
    items: ["PostgreSQL", "Redis", "ClickHouse", "Docker", "Kubernetes", "AWS"],
  },
  {
    category: "Practices",
    items: ["Testing", "CI/CD", "Accessibility", "Design Systems", "Observability", "Performance"],
  },
]

export const stats = [
  { label: "Years of experience", value: "6+" },
  { label: "Projects shipped", value: "40+" },
  { label: "Teams mentored", value: "5" },
  { label: "Open-source repos", value: "20+" },
]
