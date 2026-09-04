import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const reasons = [
  {
    icon: '⚡',
    title: 'Livraison express',
    description: 'Sites web livrés en 15 jours, applications en 45 jours. Des délais tenus, des plannings respectés.',
    stat: '15j',
    statLabel: 'délai moyen site vitrine',
    gradient: 'linear-gradient(135deg, #FF6B00, #FF4500)',
  },
  {
    icon: '🎯',
    title: 'Résultats mesurables',
    description: 'Chaque solution est conçue pour convertir. Suivi des performances inclus dans tous nos projets.',
    stat: '+300%',
    statLabel: 'de trafic en moyenne',
    gradient: 'linear-gradient(135deg, #003B7A, #0056B3)',
  },
  {
    icon: '🛡️',
    title: 'Garantie 3 mois',
    description: 'Après livraison, nous assurons corrections et ajustements sans frais supplémentaires pendant 3 mois.',
    stat: '3 mois',
    statLabel: 'de garantie incluse',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
  },
  {
    icon: '🌍',
    title: 'Expertise locale & globale',
    description: 'Basés en Côte d\'Ivoire, nous connaissons les réalités du marché africain et des standards internationaux.',
    stat: '5+',
    statLabel: 'pays accompagnés',
    gradient: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
  },
  {
    icon: '💬',
    title: 'Support WhatsApp 7j/7',
    description: 'Un interlocuteur dédié joignable directement sur WhatsApp pour toutes vos questions, à tout moment.',
    stat: '< 2h',
    statLabel: 'de temps de réponse',
    gradient: 'linear-gradient(135deg, #25D366, #128C7E)',
  },
  {
    icon: '💰',
    title: 'Tarifs transparents',
    description: 'Devis détaillé avant démarrage. Pas de frais cachés. Prix accessibles avec des packs adaptés à tous budgets.',
    stat: '0',
    statLabel: 'frais cachés',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
  },
]

const bigStats = [
  { value: '55+', label: 'Services disponibles', icon: '🚀' },
  { value: '5', label: 'Packs tout-inclus', icon: '📦' },
  { value: '48h', label: 'Premier devis rendu', icon: '⏱️' },
  { value: '100%', label: 'Satisfaction garantie', icon: '✅' },
]

export default function WhyIbig() {
  return (
    <section className="py-24" style={{ background: '#001D3D' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(255,107,0,0.15)', color: '#FF8C42' }}>
            Pourquoi choisir IBIG DIGITAL
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            L&apos;agence qui fait la{' '}
            <span style={{ background: 'linear-gradient(90deg, #FF6B00, #FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              différence
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Des centaines d&apos;entrepreneurs africains nous font confiance. Voici ce qui nous distingue vraiment.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {bigStats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Raisons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((r) => (
            <div key={r.title} className="group p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Icône + stat */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: r.gradient }}>
                  {r.icon}
                </div>
                <div className="text-right">
                  <div className="font-black text-xl text-white">{r.stat}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{r.statLabel}</div>
                </div>
              </div>
              <h3 className="font-black text-lg text-white mb-2">{r.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{r.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/devis"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #FF4500)', boxShadow: '0 8px 30px rgba(255,107,0,0.4)' }}>
            Démarrer mon projet maintenant <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
