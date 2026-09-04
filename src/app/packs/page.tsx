import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { getPacks } from '@/lib/queries'
import { formatPrice, fcfaToUsd } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Nos Packs',
  description: 'Découvrez les packs commerciaux IBIG DIGITAL : Visibilité, Lancement Entreprise, Commerce en Ligne, Mobile Pro et Digital 360.',
}

export const dynamic = 'force-dynamic'

export default async function PacksPage() {
  const packs = await getPacks().catch(() => [])

  return (
    <div className="pt-24">
      <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Nos packs commerciaux</h1>
          <p className="text-blue-200 text-lg">Des offres packagées pensées pour chaque étape de votre développement digital, avec des économies substantielles.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div key={pack.id} className={`relative rounded-2xl p-8 flex flex-col ${pack.is_featured ? 'shadow-2xl border-2' : 'bg-white shadow-md border border-gray-100'}`}
              style={pack.is_featured ? { background: 'linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%)', borderColor: 'var(--orange)' } : undefined}
            >
              {pack.is_featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style={{ background: 'var(--orange)' }}>
                  ★ Recommandé
                </div>
              )}
              <h2 className={`text-2xl font-bold mb-2 ${pack.is_featured ? 'text-white' : ''}`} style={!pack.is_featured ? { color: 'var(--dark)' } : {}}>
                {pack.name}
              </h2>
              {pack.description && (
                <p className={`text-sm mb-6 ${pack.is_featured ? 'text-blue-100' : 'text-gray-500'}`}>{pack.description}</p>
              )}
              <div className="mb-6">
                <div className={`text-4xl font-bold ${pack.is_featured ? 'text-white' : ''}`} style={!pack.is_featured ? { color: 'var(--blue)' } : {}}>
                  {formatPrice(pack.price)}
                </div>
                <div className={`text-sm mt-0.5 font-medium ${pack.is_featured ? 'text-blue-200' : 'text-gray-400'}`}>
                  ≈ {fcfaToUsd(pack.price)}
                </div>
                {pack.old_value && (
                  <div className={`text-sm line-through mt-1 ${pack.is_featured ? 'text-blue-200' : 'text-gray-400'}`}>
                    Valeur : {formatPrice(pack.old_value)} · {fcfaToUsd(pack.old_value)}
                  </div>
                )}
                {pack.savings && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: pack.is_featured ? 'rgba(255,107,0,0.25)' : 'rgba(255,107,0,0.1)', color: pack.is_featured ? '#FFD6B0' : 'var(--orange)' }}>
                    Économisez {formatPrice(pack.savings)} · {fcfaToUsd(pack.savings)}
                  </span>
                )}
              </div>
              {pack.items && pack.items.length > 0 && (
                <ul className="space-y-2 mb-8 flex-1">
                  {pack.items.map((item) => (
                    <li key={item.id} className={`flex items-start gap-2 text-sm ${pack.is_featured ? 'text-blue-50' : 'text-gray-600'}`}>
                      <Check size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--orange-light)' }} />
                      {item.custom_label ?? item.product?.name}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col gap-3 mt-auto">
                <Link href={`/devis?pack=${pack.slug}`}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: pack.is_featured ? 'white' : 'var(--orange)', color: pack.is_featured ? 'var(--blue)' : 'white' }}>
                  Demander un devis <ArrowRight size={16} />
                </Link>
                <Link href={`/packs/${pack.slug}`}
                  className={`text-center text-sm font-medium py-2 ${pack.is_featured ? 'text-blue-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                  Voir le détail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
