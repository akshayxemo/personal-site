import type { MetadataRoute } from "next"

import { getAllArticles, getAllProjects } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/articles",
    "/experience",
    "/certifications",
    "/resume",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${base}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...articleRoutes]
}
