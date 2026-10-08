import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TemplatesSection from '@/components/sections/TemplatesSection'
import PacksSection from '@/components/sections/PacksSection'
import WhyIbig from '@/components/sections/WhyIbig'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaSection from '@/components/sections/CtaSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { getProjects, getPacks } from '@/lib/queries'
import { SITE } from '@/lib/constants'
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'IBIG DIGITAL — Agence Digitale Abidjan | Sites Web dès 19 900 FCFA | Côte d\'Ivoire',
  description: 'IBIG DIGITAL, agence digitale #1 en Côte d\'Ivoire. Création de sites web professionnels dès 19 900 FCFA, applications mobiles, e-commerce, marketing digital, SEO et IA. Livraison en 5 jours, paiement en 3× sans frais. Devis gratuit 24h. Abidjan, Côte d\'Ivoire.',
  keywords: [
    'agence digitale Côte d\'Ivoire','agence web Abidjan','création site web Abidjan',
    'site web pas cher Côte d\'Ivoire','agence digitale Afrique','création site web FCFA',
    'agence marketing digital Abidjan','développement application mobile Côte d\'Ivoire',
    'e-commerce Abidjan','IBIG DIGITAL','agence numérique Abidjan',
    'site web restaurant Côte d\'Ivoire','site web entreprise Abidjan',
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: 'IBIG DIGITAL — Sites Web dès 19 900 FCFA | Agence Digitale Abidjan',
    description: 'Agence digitale à Abidjan. Sites web, apps, e-commerce, marketing. Livraison 5 jours, paiement 3× sans frais. +40 clients satisfaits.',
    images: [{ url: `${SITE.url}/icon-512x512.png`, width: 512, height: 512, alt: 'IBIG DIGITAL' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBIG DIGITAL — Agence Digitale Abidjan | Dès 19 900 FCFA',
    description: 'Sites web, apps, e-commerce en Côte d\'Ivoire. Livraison 5 jours, 3× sans frais.',
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
      <LocalBusinessJsonLd />
      <Hero />
      <StatsSection />
      <ProjectsSection projects={projects} />
      <ServicesSection />
      <TemplatesSection />
      <PacksSection packs={packs} />
      <WhyIbig />
      <TestimonialsSection />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
