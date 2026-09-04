import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { Project } from '@/types'

interface Props {
  project: Project
}

const typeLabels: Record<string, string> = {
  site_web: 'Site web',
  application: 'Application',
  ecommerce: 'E-commerce',
  branding: 'Branding',
  marketing: 'Marketing',
  solution_metier: 'Solution métier',
}

export default function ProjectCard({ project }: Props) {
  const cover = project.images?.find((img) => img.is_cover) ?? project.images?.[0]
  const typeLabel = project.type ? (typeLabels[project.type] ?? project.type) : null

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group block rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {cover ? (
          <Image
            src={cover.storage_path}
            alt={cover.alt_text ?? project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: 'linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%)' }}
          >
            🖥️
          </div>
        )}
        {typeLabel && (
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: 'var(--orange)' }}
          >
            {typeLabel}
          </span>
        )}
        {project.is_featured && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'var(--blue)' }}>
            ★ Mis en avant
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-800 transition-colors" style={{ color: 'var(--dark)' }}>
          {project.title}
        </h3>
        {project.summary && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{project.summary}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {project.sector && (
              <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{project.sector}</span>
            )}
            {project.year && (
              <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{project.year}</span>
            )}
          </div>
          <span className="text-sm font-semibold flex items-center gap-1" style={{ color: 'var(--blue)' }}>
            Voir <ExternalLink size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
