import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { Pack } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  packs: Pack[]
}

const fallbackPacks = [
  {
    id: '1', name: 'Pack Visibilité', slug: 'pack-visibilite',
    price: 225000, old_value: 350000, savings: 125000, is_featured: false, is_active: true, sort_order: 1,
    description: 'Idéal pour indépendants, artisans et professionnels libéraux.',
    items: [
      { id: '1', pack_id: '1', quantity: 1, sort_order: 0, custom_label: 'Logo + mini-charte graphique' },
      { id: '2', pack_id: '1', quantity: 1, sort_order: 1, custom_label: 'Carte digitale professionnelle sécurisée' },
      { id: '3', pack_id: '1', quantity: 1, sort_order: 2, custom_label: 'Page Facebook professionnelle' },
      { id: '4', pack_id: '1', quantity: 1, sort_order: 3, custom_label: 'Configuration WhatsApp Business' },
    ]
  },
  {
    id: '2', name: 'Pack Lancement Entreprise', slug: 'pack-lancement-entreprise',
    price: 525000, old_value: 750000, savings: 225000, is_featured: true, is_active: true, sort_order: 2,
    description: 'Présence digitale complète pour votre entreprise.',
    items: [
      { id: '5', pack_id: '2', quantity: 1, sort_order: 0, custom_label: 'Site web professionnel' },
      { id: '6', pack_id: '2', quantity: 1, sort_order: 1, custom_label: 'Identité visuelle complète' },
      { id: '7', pack_id: '2', quantity: 1, sort_order: 2, custom_label: 'Page Facebook + WhatsApp Business' },
      { id: '8', pack_id: '2', quantity: 1, sort_order: 3, custom_label: 'Carte digitale + e-mails pro' },
    ]
  },
  {
    id: '3', name: 'Pack Digital 360', slug: 'pack-digital-360',
    price: 1250000, old_value: 1800000, savings: 550000, is_featured: true, is_active: true, sort_order: 5,
    description: 'Solution complète avec outil digital, identité, animation et maintenance.',
    items: [
      { id: '9', pack_id: '3', quantity: 1, sort_order: 0, custom_label: 'Site web + PWA' },
      { id: '10', pack_id: '3', quantity: 1, sort_order: 1, custom_label: 'Identité visuelle + SEO initial' },
      { id: '11', pack_id: '3', quantity: 1, sort_order: 2, custom_label: 'Présence réseaux sociaux' },
      { id: '12', pack_id: '3', quantity: 1, sort_order: 3, custom_label: 'Community management + maintenance' },
    ]
  },
]

export default function PacksSection({ packs }: Props) {
  const displayPacks = packs.length > 0 ? packs.slice(0, 3) : fallbackPacks

  return (
    <section className="py-20" style={{ background: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(0,59,122,0.08)', color: 'var(--blue)' }}
          >
            Offres groupées
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--dark)' }}>
            Nos packs commerciaux
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Des offres packagées pour démarrer plus vite, avec des économies substantielles sur les prestations séparées.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayPacks.map((pack) => (
            <div
              key={pack.id}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                pack.is_featured
                  ? 'shadow-2xl border-2'
                  : 'bg-white shadow-md border border-gray-100'
              }`}
              style={pack.is_featured ? {
                background: 'linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%)',
                borderColor: 'var(--orange)',
              } : undefined}
            >
              {pack.is_featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white shadow"
                  style={{ background: 'var(--orange)' }}
                >
                  ★ Recommandé
                </div>
              )}

              <div className={`mb-6 ${pack.is_featured ? 'text-white' : ''}`}>
                <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
                {pack.description && (
                  <p className={`text-sm ${pack.is_featured ? 'text-blue-100' : 'text-gray-500'}`}>
                    {pack.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <div className={`text-4xl font-bold ${pack.is_featured ? 'text-white' : ''}`} style={!pack.is_featured ? { color: 'var(--blue)' } : {}}>
                  {formatPrice(pack.price)}
                </div>
                {pack.old_value && (
                  <div className={`text-sm line-through mt-1 ${pack.is_featured ? 'text-blue-200' : 'text-gray-400'}`}>
                    Valeur : {formatPrice(pack.old_value)}
                  </div>
                )}
                {pack.savings && (
                  <div
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: pack.is_featured ? 'rgba(255,107,0,0.25)' : 'rgba(255,107,0,0.1)', color: pack.is_featured ? '#FFD6B0' : 'var(--orange)' }}
                  >
                    Économisez {formatPrice(pack.savings)}
                  </div>
                )}
              </div>

              {pack.items && pack.items.length > 0 && (
                <ul className="space-y-3 mb-8 flex-1">
                  {pack.items.map((item) => (
                    <li key={item.id} className={`flex items-start gap-2 text-sm ${pack.is_featured ? 'text-blue-50' : 'text-gray-600'}`}>
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color: pack.is_featured ? '#FF8C42' : 'var(--orange)' }} />
                      {item.custom_label ?? ('product' in item ? (item as { product?: { name: string } }).product?.name : undefined)}
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={`/packs/${pack.slug}`}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 ${
                  pack.is_featured ? 'text-blue-900' : 'text-white'
                }`}
                style={{ background: pack.is_featured ? 'white' : 'var(--blue)' }}
              >
                Découvrir ce pack <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/packs"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 transition-all hover:shadow-lg"
            style={{ borderColor: 'var(--orange)', color: 'var(--orange)' }}
          >
            Voir tous les packs <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
