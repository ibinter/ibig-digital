import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategories, getProducts } from '@/lib/queries'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Nos Services',
  description: 'Découvrez tous les services digitaux d\'IBIG DIGITAL : sites web, applications, e-commerce, design, marketing, IA, cybersécurité et plus.',
}

export const revalidate = 3600

export default async function ServicesPage() {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ])

  const grouped = categories.map((cat) => ({
    category: cat,
    products: products.filter((p) => p.category_id === cat.id),
  })).filter((g) => g.products.length > 0)

  return (
    <div className="pt-24">
      {/* Header */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Nos services</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Un catalogue complet de solutions digitales pour accompagner votre croissance, de la création au déploiement.
          </p>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {grouped.length === 0 ? (
          <CatalogEmpty />
        ) : (
          <div className="space-y-16">
            {grouped.map(({ category, products: catProducts }) => (
              <div key={category.id}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--dark)' }}>
                    {category.name}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-sm text-gray-400">{catProducts.length} service{catProducts.length > 1 ? 's' : ''}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/produits/${product.slug}`}
                      className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-800 transition-colors" style={{ color: 'var(--dark)' }}>
                        {product.name}
                      </h3>
                      {product.short_description && (
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.short_description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          {product.price_type === 'on_quote' ? (
                            <span className="text-sm font-semibold text-gray-500">Sur devis</span>
                          ) : product.price ? (
                            <span className="font-bold" style={{ color: 'var(--blue)' }}>
                              {product.price_type === 'from' ? 'À partir de ' : ''}
                              {formatPrice(product.price)}
                            </span>
                          ) : null}
                        </div>
                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--orange)' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function CatalogEmpty() {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">🔧</div>
      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--dark)' }}>Catalogue en cours de chargement</h2>
      <p className="text-gray-500 mb-6">Les services seront disponibles très prochainement.</p>
      <Link href="/devis" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--orange)' }}>
        Demander un devis <ArrowRight size={16} />
      </Link>
    </div>
  )
}
