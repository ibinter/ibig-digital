'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const categories = [
  {
    icon: '🌐',
    title: 'Sites Web',
    slug: 'sites-web',
    description: 'Sites vitrine, corporate & portails web modernes, rapides et optimisés SEO.',
    services: ['Site vitrine', 'Site corporate', 'Landing page', 'Site institutionnel'],
    from: '75 000',
    gradient: 'linear-gradient(135deg, #003B7A 0%, #0056B3 100%)',
    accent: '#003B7A',
  },
  {
    icon: '🛒',
    title: 'E-commerce',
    slug: 'ecommerce',
    description: 'Boutiques en ligne clé en main avec paiement Mobile Money et carte bancaire.',
    services: ['Boutique WooCommerce', 'Shopify', 'E-shop sur mesure', 'Marketplace'],
    from: '200 000',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF4500 100%)',
    accent: '#FF6B00',
  },
  {
    icon: '📱',
    title: 'Applications',
    slug: 'applications',
    description: 'Applications iOS & Android natives ou hybrides pour vos utilisateurs.',
    services: ['App iOS & Android', 'App web progressive', 'App métier', 'Tableau de bord'],
    from: '500 000',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    accent: '#7C3AED',
  },
  {
    icon: '🎨',
    title: 'Design & Branding',
    slug: 'design',
    description: 'Logo, charte graphique et supports qui font rayonner votre marque.',
    services: ['Logo & identité', 'Charte graphique', 'Supports print', 'UI/UX design'],
    from: '50 000',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
    accent: '#EC4899',
  },
  {
    icon: '📣',
    title: 'Marketing Digital',
    slug: 'marketing-digital',
    description: 'Google Ads, Meta Ads et stratégies pour générer des leads qualifiés.',
    services: ['Google Ads', 'Meta Ads', 'Email marketing', 'Stratégie digitale'],
    from: '100 000',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    accent: '#0EA5E9',
  },
  {
    icon: '🤖',
    title: 'Intelligence Artificielle',
    slug: 'ia-automatisation',
    description: 'Chatbots IA, automatisation et intégrations pour gagner du temps.',
    services: ['Chatbot IA', 'Automatisation', 'Intégration API', 'Analyse de données'],
    from: '150 000',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    accent: '#10B981',
  },
  {
    icon: '📈',
    title: 'Community Management',
    slug: 'community-management',
    description: 'Gestion professionnelle de vos réseaux sociaux et création de contenu.',
    services: ['Facebook & Instagram', 'LinkedIn', 'TikTok', 'Reporting mensuel'],
    from: '80 000',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    accent: '#F59E0B',
  },
  {
    icon: '🔍',
    title: 'SEO & Référencement',
    slug: 'seo',
    description: 'Positionnement Google durable pour attirer des clients en continu.',
    services: ['Audit SEO', 'Optimisation on-page', 'Netlinking', 'Suivi de positions'],
    from: '60 000',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    accent: '#06B6D4',
  },
]

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(0,59,122,0.08)', color: '#003B7A' }}>
            55+ services disponibles
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6" style={{ color: '#001D3D', letterSpacing: '-0.02em' }}>
            Tout ce dont votre entreprise<br />a besoin pour{' '}
            <span style={{ background: 'linear-gradient(90deg, #003B7A, #FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              dominer son marché
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            De la conception à la mise en ligne, nous couvrons l&apos;intégralité de vos besoins digitaux avec des équipes spécialisées dans chaque domaine.
          </p>
        </div>

        {/* Grille */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((cat, i) => (
            <Link
              href="/services"
              key={cat.slug}
              className="group relative bg-white rounded-3xl p-6 transition-all duration-300 border border-gray-100"
              style={{
                boxShadow: hovered === i
                  ? `0 20px 60px ${cat.accent}22, 0 4px 20px rgba(0,0,0,0.08)`
                  : '0 2px 12px rgba(0,0,0,0.04)',
                transform: hovered === i ? 'translateY(-4px)' : 'none',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icône */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300"
                style={{
                  background: hovered === i ? cat.gradient : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  transform: hovered === i ? 'scale(1.1)' : 'none',
                }}>
                {cat.icon}
              </div>

              <div className="font-black text-lg mb-2" style={{ color: '#001D3D' }}>{cat.title}</div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{cat.description}</p>

              {/* Liste services */}
              <div className="flex flex-col gap-1.5 mb-5">
                {cat.services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1 h-1 rounded-full" style={{ background: cat.accent }} />
                    {s}
                  </div>
                ))}
              </div>

              {/* Prix */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-400">À partir de</div>
                  <div className="font-black text-sm" style={{ color: cat.accent }}>{cat.from} FCFA</div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: hovered === i ? cat.gradient : '#f4f4f4',
                    color: hovered === i ? 'white' : '#999',
                  }}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/services"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #003B7A, #0056B3)', boxShadow: '0 8px 30px rgba(0,59,122,0.3)' }}>
            Explorer tous nos services
            <ExternalLink size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
