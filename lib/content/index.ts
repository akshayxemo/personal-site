import "server-only"

import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"
import readingTime from "reading-time"

import {
  type ArticleMeta,
  type ProjectMeta,
  articleFrontmatterSchema,
  projectFrontmatterSchema,
} from "./schemas"

const CONTENT_DIR = path.join(process.cwd(), "content")
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects")
const ARTICLES_DIR = path.join(CONTENT_DIR, "articles")

export interface TocItem {
  id: string
  text: string
  level: number
}

function readMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(dir, file), "utf8")
      const { data, content } = matter(raw)
      return { slug, data, content }
    })
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function getTableOfContents(content: string): TocItem[] {
  const lines = content.split("\n")
  const toc: TocItem[] = []
  let inCodeBlock = false
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue
    const match = /^(#{2,3})\s+(.*)$/.exec(line)
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/[*`]/g, "").trim()
      toc.push({ id: slugify(text), text, level })
    }
  }
  return toc
}

/* -------------------------------- Projects -------------------------------- */

export function getAllProjects(): ProjectMeta[] {
  return readMdxFiles(PROJECTS_DIR)
    .map(({ slug, data }) => ({ slug, ...projectFrontmatterSchema.parse(data) }))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      if (a.order !== b.order) return a.order - b.order
      return b.year - a.year
    })
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string) {
  const file = readMdxFiles(PROJECTS_DIR).find((f) => f.slug === slug)
  if (!file) return null
  return {
    meta: { slug: file.slug, ...projectFrontmatterSchema.parse(file.data) },
    content: file.content,
    toc: getTableOfContents(file.content),
  }
}

export function getProjectCategories(): string[] {
  const set = new Set(getAllProjects().map((p) => p.category))
  return Array.from(set).sort()
}

/* -------------------------------- Articles -------------------------------- */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getAllArticles(): ArticleMeta[] {
  return readMdxFiles(ARTICLES_DIR)
    .map(({ slug, data, content }) => ({
      slug,
      ...articleFrontmatterSchema.parse(data),
      readingTime: readingTime(content).text,
      formattedDate: formatDate(data.date as string),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((a) => a.featured)
}

export function getArticleBySlug(slug: string) {
  const file = readMdxFiles(ARTICLES_DIR).find((f) => f.slug === slug)
  if (!file) return null
  return {
    meta: {
      slug: file.slug,
      ...articleFrontmatterSchema.parse(file.data),
      readingTime: readingTime(file.content).text,
      formattedDate: formatDate(file.data.date as string),
    },
    content: file.content,
    toc: getTableOfContents(file.content),
  }
}

export function getArticleTags(): string[] {
  const set = new Set(getAllArticles().flatMap((a) => a.tags))
  return Array.from(set).sort()
}
