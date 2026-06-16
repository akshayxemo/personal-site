import { Hero } from "@/components/home/hero"
import { SkillsSection } from "@/components/home/skills-section"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { FeaturedArticles } from "@/components/home/featured-articles"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <SkillsSection />
      <FeaturedProjects />
      <FeaturedArticles />
      <CtaSection />
    </>
  )
}
