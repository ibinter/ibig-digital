import type { Metadata } from 'next'
import { getProjects } from '@/lib/queries'
import ProjectCard from '@/components/ui/ProjectCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nos Réalisations',
  description: 'Découvrez les projets réalisés par IBIG DIGITAL : sites web, applications, e-commerce, branding et solutions digitales pour entreprises.',
}

export const dynamic = 'force-dynamic'

export default async function RealisationsPage() {
  const projects = await getProjects().catch(() => [])

  const types = Array.from(new Set(projects.map((p) => p.type).filter(Boolean))) as string[]
  const typeLabels: Record<string, string> = {
    site_web: 'Sites web', application: 'Applications', ecommerce: 'E-commerce',
    branding: 'Branding', marketing: 'Marketing', solution_metier: 'Solutions métier',
  }

  return (
    <div className="pt-24">
      {/* Header */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Nos réalisations</h1>
          <p className="text-blue-200 text-lg">
            Des projets concrets qui témoignent de notre expertise. Chaque réalisation est la preuve de notre engagement pour la qualité.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: 'var(--gray-50)' }}>
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark)' }}>
          Un projet similaire en tête ?
        </h2>
        <p className="text-gray-500 mb-6">Discutons de votre projet et voyons comment IBIG DIGITAL peut vous accompagner.</p>
        <Link href="/devis" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white" style={{ background: 'var(--orange)' }}>
          Demander un devis <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🏗️</div>
      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--dark)' }}>
        Portfolio en cours de construction
      </h2>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Nos réalisations sont en cours d&apos;intégration. Contactez-nous pour découvrir notre portefeuille de projets.
      </p>
      <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--blue)' }}>
        Nous contacter <ArrowRight size={16} />
      </Link>
    </div>
  )
}
