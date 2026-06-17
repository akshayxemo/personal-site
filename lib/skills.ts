export interface SkillGroup {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "Python", "Java", "HTML & CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "React Query", "Redux", "Chart.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "GraphQL", "REST APIs", "Payload CMS", "Firebase RTDB"],
  },
  {
    category: "Mobile & Cloud",
    items: ["Flutter", "Bloc", "AWS", "Docker", "CI/CD", "Serverless"],
  },
  {
    category: "Databases & Tools",
    items: ["MongoDB", "MySQL", "Supabase", "Jest", "Git", "GitHub Actions"],
  },
]

export const stats = [
  { label: "Years of experience", value: "2+" },
  { label: "Features shipped", value: "30+" },
  { label: "Systems built", value: "5+" },
  { label: "Tech stack expertise", value: "20+" },
]