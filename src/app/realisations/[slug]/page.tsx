import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Tag, Globe } from 'lucide-react'
import { getProjectBySlug, getProjects } from '@/lib/queries'
import { SITE } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug).catch(() => null)
  if (!project) return {}
  return {
    title: project.seo_title ?? project.title,
    description: project.seo_description ?? project.summary,
  }
}

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => [])
  return projects.map((p) => ({ slug: p.slug }))
}

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug).catch(() => null)
  if (!project) notFound()

  const cover = project.images?.find((img) => img.is_cover) ?? project.images?.[0]
  const gallery = project.images?.filter((img) => !img.is_before && !img.is_after) ?? []
  const beforeAfter = {
    before: project.images?.find((img) => img.is_before),
    after: project.images?.find((img) => img.is_after),
  }

  const waMsg = `Bonjour IBIG DIGITAL, j'ai vu votre réalisation "${project.title}" et je souhaite un projet similaire.`
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(waMsg)}`

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-700">Accueil</Link>
          <span>/</span>
          <Link href="/realisations" className="hover:text-blue-700">Réalisations</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{project.title}</span>
        </div>
      </div>

      {/* Hero */}
      {cover && (
        <div className="relative h-72 md:h-96 overflow-hidden bg-gray-900">
          <Image
            src={cover.storage_path}
            alt={cover.alt_text ?? project.title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">{project.title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contenu */}
          <div className="lg:col-span-2 space-y-10">
            {!cover && (
              <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: 'var(--dark)' }}>{project.title}</h1>
            )}

            {project.summary && (
              <p className="text-lg text-gray-600 leading-relaxed">{project.summary}</p>
            )}

            {project.challenge && (
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Problématique client</h2>
                <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Solution apportée</h2>
                <p className="text-gray-600 leading-relaxed">{project.solution}</p>
              </div>
            )}

            {/* Avant / Après */}
            {beforeAfter.before && beforeAfter.after && (
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Avant / Après</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Avant</div>
                    <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={beforeAfter.before.storage_path} alt="Avant" fill className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--orange)' }}>Après</div>
                    <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={beforeAfter.after.storage_path} alt="Après" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Galerie */}
            {gallery.length > 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Galerie</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.slice(1).map((img) => (
                    <div key={img.id} className="relative h-36 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={img.storage_path} alt={img.alt_text ?? ''} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.results && (
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,59,122,0.04)', borderLeft: '4px solid var(--orange)' }}>
                <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--orange)' }}>Résultats & bénéfices</h2>
                <p className="text-gray-600">{project.results}</p>
              </div>
            )}

            {/* CTA */}
            <div className="p-8 rounded-2xl text-center" style={{ background: 'var(--gray-50)' }}>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark)' }}>
                Besoin d&apos;un projet similaire ?
              </h3>
              <p className="text-gray-500 mb-6">Décrivez-nous votre besoin et recevez une proposition sous 48h.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/devis" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'var(--orange)' }}>
                  Demander un devis <ArrowRight size={16} />
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: '#25D366' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4" style={{ color: 'var(--dark)' }}>Informations</h3>
              <dl className="space-y-3">
                {project.show_client && project.client_name && (
                  <div><dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Client</dt><dd className="font-medium">{project.client_name}</dd></div>
                )}
                {project.sector && (
                  <div><dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Secteur</dt><dd className="flex items-center gap-1"><Tag size={13} />{project.sector}</dd></div>
                )}
                {project.year && (
                  <div><dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Année</dt><dd className="flex items-center gap-1"><Calendar size={13} />{project.year}</dd></div>
                )}
                {project.type && (
                  <div><dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Type</dt><dd>{project.type}</dd></div>
                )}
                {project.show_url && project.project_url && (
                  <div>
                    <dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">Lien</dt>
                    <dd>
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:underline" style={{ color: 'var(--blue)' }}>
                        <Globe size={13} /> Voir le projet
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {project.services && project.services.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-3" style={{ color: 'var(--dark)' }}>Prestations réalisées</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(0,59,122,0.08)', color: 'var(--blue)' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-3" style={{ color: 'var(--dark)' }}>Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
