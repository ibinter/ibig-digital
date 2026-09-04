import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { getCategories, getProducts } from '@/lib/queries'
import { formatPrice, fcfaToUsd } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Nos Services – Solutions Digitales | IBIG DIGITAL',
  description: "Découvrez les 55+ services digitaux d'IBIG DIGITAL : sites web, applications, e-commerce, design, marketing digital, IA et SEO. Tarifs transparents, devis gratuit en 24h.",
}

export const dynamic = 'force-dynamic'

const categoryStyles: Record<string, { gradient: string; accent: string; icon: string }> = {
  'sites-web':            { gradient: 'linear-gradient(135deg,#003B7A,#0056B3)', accent: '#003B7A', icon: '🌐' },
  'ecommerce':            { gradient: 'linear-gradient(135deg,#FF6B00,#FF4500)', accent: '#FF6B00', icon: '🛒' },
  'applications':         { gradient: 'linear-gradient(135deg,#7C3AED,#5B21B6)', accent: '#7C3AED', icon: '📱' },
  'documents-qr':         { gradient: 'linear-gradient(135deg,#0F766E,#0D9488)', accent: '#0F766E', icon: '📄' },
  'design':               { gradient: 'linear-gradient(135deg,#EC4899,#BE185D)', accent: '#EC4899', icon: '🎨' },
  'marketing-digital':    { gradient: 'linear-gradient(135deg,#0EA5E9,#0284C7)', accent: '#0EA5E9', icon: '📣' },
  'ia-automatisation':    { gradient: 'linear-gradient(135deg,#10B981,#059669)', accent: '#10B981', icon: '🤖' },
  'community-management': { gradient: 'linear-gradient(135deg,#F59E0B,#D97706)', accent: '#F59E0B', icon: '📈' },
  'seo':                  { gradient: 'linear-gradient(135deg,#06B6D4,#0891B2)', accent: '#06B6D4', icon: '🔍' },
  'hebergement':          { gradient: 'linear-gradient(135deg,#64748B,#475569)', accent: '#64748B', icon: '☁️' },
  'cybersecurite':        { gradient: 'linear-gradient(135deg,#EF4444,#DC2626)', accent: '#EF4444', icon: '🛡️' },
  'formation':            { gradient: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', accent: '#8B5CF6', icon: '🎓' },
  'video-contenu':        { gradient: 'linear-gradient(135deg,#DC2626,#B91C1C)', accent: '#DC2626', icon: '🎬' },
  'emailing':             { gradient: 'linear-gradient(135deg,#2563EB,#1D4ED8)', accent: '#2563EB', icon: '✉️' },
  'consulting-digital':   { gradient: 'linear-gradient(135deg,#92400E,#78350F)', accent: '#92400E', icon: '🧭' },
  'print-supports':       { gradient: 'linear-gradient(135deg,#374151,#1F2937)', accent: '#374151', icon: '🖨️' },
  'cartes-digitales':     { gradient: 'linear-gradient(135deg,#BE185D,#9D174D)', accent: '#BE185D', icon: '📲' },
  'whatsapp-business':    { gradient: 'linear-gradient(135deg,#16A34A,#15803D)', accent: '#16A34A', icon: '💬' },
}
const defaultStyle = { gradient: 'linear-gradient(135deg,#003B7A,#0056B3)', accent: '#003B7A', icon: '⚡' }

export default async function ServicesPage() {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ])

  const grouped = categories.map((cat) => ({
    category: cat,
    products: products.filter((p) => p.category_id === cat.id),
    style: categoryStyles[cat.slug] ?? defaultStyle,
  })).filter((g) => g.products.length > 0)

  const totalServices = products.length

  return (
    <div className="pt-20">
      <style>{`
        .service-card {
          background: white;
          border-radius: 1.5rem;
          padding: 1.5rem;
          border: 1px solid #f0f0f0;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          border-color: rgba(0,59,122,0.2);
        }
        .service-card .card-arrow {
          width: 2.25rem; height: 2.25rem;
          border-radius: 0.75rem;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }
        .service-card:hover .card-arrow { transform: scale(1.15); }
        .service-card .card-bar {
          position: absolute; top: 0; left: 1.5rem; right: 1.5rem;
          height: 3px; border-radius: 0 0 3px 3px;
          opacity: 0; transition: opacity 0.25s;
        }
        .service-card:hover .card-bar { opacity: 1; }
        .service-card .card-title { color: #001D3D; font-weight: 900; font-size: 1.1rem; margin-bottom: 0.75rem; }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden py-24" style={{ background: '#001D3D' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(0,91,187,0.4) 0%,transparent 70%)' }} />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(255,107,0,0.2) 0%,transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8 border"
            style={{ background: 'rgba(255,107,0,0.12)', borderColor: 'rgba(255,107,0,0.3)', color: '#FF8C42' }}>
            <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: '#FF6B00' }} />
            {totalServices > 0 ? `${totalServices}+ services disponibles` : 'Catalogue complet'}
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Toutes nos solutions<br />
            <span style={{ background: 'linear-gradient(90deg,#FF6B00,#FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              digitales
            </span>
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            De la création de site à l&apos;intelligence artificielle — tout ce dont votre entreprise a besoin pour dominer son marché digital.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['⚡ Devis gratuit en 24h', '🚀 Livraison express', '✅ Garantie 3 mois'].map((b) => (
              <div key={b} className="px-4 py-2 rounded-full text-sm"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1100 60 600 0 0 35L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* CATALOGUE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {grouped.length === 0 ? (
            <CatalogEmpty />
          ) : (
            <div className="space-y-20">
              {grouped.map(({ category, products: catProducts, style }) => (
                <div key={category.id}>
                  {/* En-tête catégorie */}
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: style.gradient }}>
                      {style.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h2 className="text-2xl font-black" style={{ color: '#001D3D' }}>{category.name}</h2>
                        <span className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{ background: `${style.accent}18`, color: style.accent }}>
                          {catProducts.length} service{catProducts.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      {category.description && (
                        <p className="text-sm text-gray-500">{category.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Grille produits */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catProducts.map((product) => (
                      <Link key={product.id} href={`/produits/${product.slug}`} className="service-card">

                        {/* Barre couleur top au hover */}
                        <div className="card-bar" style={{ background: style.gradient }} />

                        {/* Badge populaire */}
                        {product.is_featured && (
                          <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{ background: `${style.accent}15`, color: style.accent }}>
                            ★ Populaire
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="card-title pr-16">{product.name}</div>
                          {product.short_description && (
                            <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-3">
                              {product.short_description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                          <div>
                            {product.price_type === 'on_quote' ? (
                              <span className="text-sm font-bold text-gray-400">Sur devis</span>
                            ) : product.price ? (
                              <div>
                                {product.price_type === 'from' && (
                                  <div className="text-xs text-gray-400 mb-0.5">À partir de</div>
                                )}
                                <span className="font-black text-base" style={{ color: style.accent }}>
                                  {formatPrice(product.price)}
                                </span>
                                <span className="block text-xs text-gray-400 mt-0.5">
                                  ≈ {fcfaToUsd(product.price)}
                                </span>
                              </div>
                            ) : null}
                            {product.delivery_time && (
                              <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                <Clock size={11} />
                                {product.delivery_time}
                              </div>
                            )}
                          </div>
                          <div className="card-arrow" style={{ background: `${style.accent}15`, color: style.accent }}>
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#F8FAFB' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4" style={{ color: '#001D3D' }}>
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            Décrivez-nous votre projet — nous avons une solution sur mesure pour chaque besoin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 8px 30px rgba(255,107,0,0.3)' }}>
              Demander un devis gratuit <ArrowRight size={18} />
            </Link>
            <Link href="/packs"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold border transition-all hover:-translate-y-1"
              style={{ color: '#003B7A', borderColor: '#003B7A', background: 'white' }}>
              Voir nos packs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function CatalogEmpty() {
  return (
    <div className="text-center py-24">
      <div className="text-6xl mb-6">🚀</div>
      <h2 className="text-2xl font-black mb-3" style={{ color: '#001D3D' }}>Catalogue en cours de chargement</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">Nos 55+ services seront disponibles très prochainement.</p>
      <Link href="/devis"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white"
        style={{ background: 'linear-gradient(135deg,#FF6B00,#FF4500)' }}>
        Demander un devis <ArrowRight size={16} />
      </Link>
    </div>
  )
}
