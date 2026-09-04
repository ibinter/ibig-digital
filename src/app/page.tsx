import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PacksSection from '@/components/sections/PacksSection'
import WhyIbig from '@/components/sections/WhyIbig'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaSection from '@/components/sections/CtaSection'
import { getProjects, getPacks } from '@/lib/queries'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${SITE.name} – Agence Digitale en Côte d'Ivoire`,
  description: 'IBIG DIGITAL crée vos sites web, applications mobiles, solutions e-commerce et identité visuelle. Agence digitale premium en Côte d\'Ivoire et en Afrique.',
  openGraph: {
    title: `${SITE.name} – Agence Digitale Premium`,
    description: 'Solutions digitales professionnelles pour entreprises, PME et startups.',
  },
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [projects, packs] = await Promise.all([
    getProjects({ featured: true, limit: 9 }).catch(() => []),
    getPacks().catch(() => []),
  ])

  return (
    <>
      <Hero />
      <StatsSection />
      <ProjectsSection projects={projects} />
      <ServicesSection />
      <PacksSection packs={packs} />
      <WhyIbig />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
