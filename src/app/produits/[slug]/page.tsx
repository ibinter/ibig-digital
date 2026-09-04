import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, X, Clock, MessageSquare } from 'lucide-react'
import { getProductBySlug, getProducts } from '@/lib/queries'
import { formatPrice } from '@/lib/utils'
import { SITE } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)
  if (!product) return {}
  return {
    title: product.seo_title ?? product.name,
    description: product.seo_description ?? product.short_description,
    openGraph: product.og_image ? { images: [product.og_image] } : undefined,
  }
}

export async function generateStaticParams() {
  const products = await getProducts().catch(() => [])
  return products.map((p) => ({ slug: p.slug }))
}

export const revalidate = 3600

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)
  if (!product) notFound()

  const waMessage = `Bonjour IBIG DIGITAL, je suis intéressé par le service "${product.name}". Pouvez-vous me donner plus d'informations ?`
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-700">Accueil</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-blue-700">Services</Link>
          {product.category && (
            <>
              <span>/</span>
              <span>{product.category.name}</span>
            </>
          )}
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-10">
            {/* En-tête */}
            <div>
              {product.category && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(0,59,122,0.08)', color: 'var(--blue)' }}>
                  {product.category.name}
                </span>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--dark)' }}>
                {product.name}
              </h1>
              {product.short_description && (
                <p className="text-lg text-gray-600 leading-relaxed">{product.short_description}</p>
              )}
            </div>

            {/* Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((img) => (
                  <div key={img.id} className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={img.storage_path}
                      alt={img.alt_text ?? product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Problème résolu */}
            {product.problem_solved && (
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,59,122,0.04)', borderLeft: '4px solid var(--blue)' }}>
                <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--blue)' }}>Problème résolu</h2>
                <p className="text-gray-600">{product.problem_solved}</p>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--dark)' }}>Description détaillée</h2>
                <div className="prose text-gray-600 leading-relaxed">{product.description}</div>
              </div>
            )}

            {/* Inclus / Non inclus */}
            {(product.included || product.not_included) && (
              <div className="grid sm:grid-cols-2 gap-6">
                {product.included && (
                  <div>
                    <h3 className="font-bold mb-3" style={{ color: 'var(--dark)' }}>Ce qui est inclus</h3>
                    <ul className="space-y-2">
                      {product.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--orange)' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.not_included && (
                  <div>
                    <h3 className="font-bold mb-3" style={{ color: 'var(--dark)' }}>Non inclus</h3>
                    <ul className="space-y-2">
                      {product.not_included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <X size={16} className="mt-0.5 shrink-0 text-gray-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Fonctionnalités */}
            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--dark)' }}>Fonctionnalités & livrables</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--orange)' }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prix & CTA */}
            <div className="sticky top-24 p-8 rounded-2xl border-2 shadow-lg" style={{ borderColor: 'var(--orange)', background: 'white' }}>
              {product.promo_label && (
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4" style={{ background: 'var(--orange)' }}>
                  {product.promo_label}
                </div>
              )}

              <div className="mb-2">
                {product.price_type === 'on_quote' ? (
                  <div className="text-2xl font-bold" style={{ color: 'var(--blue)' }}>Sur devis</div>
                ) : product.price ? (
                  <>
                    {product.price_type === 'from' && <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">À partir de</div>}
                    <div className="text-3xl font-bold" style={{ color: 'var(--blue)' }}>
                      {formatPrice(product.price, product.currency)}
                    </div>
                    {product.old_price && (
                      <div className="text-sm text-gray-400 line-through mt-1">{formatPrice(product.old_price)}</div>
                    )}
                  </>
                ) : (
                  <div className="text-xl font-bold text-gray-600">Contactez-nous</div>
                )}
              </div>

              {product.delivery_time && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b">
                  <Clock size={15} />
                  Délai : {product.delivery_time}
                </div>
              )}

              <div className="space-y-3">
                <Link
                  href={`/devis?service=${product.slug}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90"
                  style={{ background: 'var(--orange)' }}
                >
                  Demander un devis <ArrowRight size={18} />
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: '#25D366' }}
                >
                  <MessageSquare size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
