import type { Metadata } from "next"

import { Container, PageHeader } from "@/components/page-shell"
import { ProjectExplorer } from "@/components/projects/project-explorer"
import { getAllProjects, getProjectCategories } from "@/lib/content"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected projects by ${siteConfig.name} — web apps, design systems, developer tooling, and open source.`,
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const categories = getProjectCategories()

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've designed and built"
        description="A selection of production apps, design systems, and developer tools. Search or filter by category to explore."
      />
      <Container className="py-16 sm:py-20">
        <ProjectExplorer projects={projects} categories={categories} />
      </Container>
    </>
  )
}
