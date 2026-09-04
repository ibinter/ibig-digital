import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/types'
import ProjectCard from '@/components/ui/ProjectCard'

interface Props {
  projects: Project[]
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section className="py-20" style={{ background: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(0,59,122,0.08)', color: 'var(--blue)' }}
          >
            Portfolio
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--dark)' }}>
            Nos réalisations
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Des projets concrets qui parlent pour nous. Chaque réalisation reflète notre engagement pour la qualité et les résultats.
          </p>
        </div>

        {projects.length === 0 ? (
          <EmptyProjects />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--blue)' }}
          >
            Voir toutes nos réalisations <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function EmptyProjects() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🏗️</div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dark)' }}>
        Portfolio en cours de construction
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Nos réalisations seront bientôt disponibles. Contactez-nous pour découvrir nos projets.
      </p>
    </div>
  )
}
