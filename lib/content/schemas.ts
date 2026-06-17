import { z } from "zod"

export const linkSchema = z.object({
  live: z.string().url().optional(),
  repo: z.string().url().optional(),
  caseStudy: z.string().url().optional(),
})

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  category: z.enum(["Web App", "Open Source", "Developer Tooling", "Design System", "API & Backend"]),
  tags: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  role: z.string().optional(),
  year: z.coerce.number(),
  featured: z.boolean().default(false),
  order: z.coerce.number().default(100),
  status: z.enum(["Shipped", "In Progress", "Archived"]).default("Shipped"),
  cover: z.string(),
  links: linkSchema.default({}),
})

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  externalUrl: z.string().optional(),
  readingTime: z.string().optional(),
})

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string
  readingTime: string
  formattedDate: string
}
