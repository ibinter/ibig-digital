import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Kouassi Armand',
    role: 'Directeur Général, AgriTech CI',
    text: 'IBIG DIGITAL a livré notre site e-commerce en 18 jours chrono. Résultat : +280% de commandes en ligne le premier mois. Professionnalisme exemplaire.',
    stars: 5,
    avatar: '🧑🏾‍💼',
    tag: 'E-commerce',
    color: '#FF6B00',
  },
  {
    name: 'Fatoumata Diallo',
    role: 'Fondatrice, FD Consulting',
    text: 'Mon identité visuelle et mon site ont été réalisés avec une créativité hors du commun. Mes clients pensent que j\'ai une grosse agence derrière moi !',
    stars: 5,
    avatar: '👩🏽‍💻',
    tag: 'Branding & Web',
    color: '#003B7A',
  },
  {
    name: 'Jean-Baptiste Koffi',
    role: 'CEO, JBK Immobilier',
    text: 'L\'application mobile livrée par IBIG DIGITAL fonctionne parfaitement. Le support après livraison est réactif et l\'équipe très compétente.',
    stars: 5,
    avatar: '👨🏿‍💼',
    tag: 'Application mobile',
    color: '#7C3AED',
  },
  {
    name: 'Awa Traoré',
    role: 'Gérante, Boutique Awa Mode',
    text: 'Grâce à leur gestion des réseaux sociaux, mon Instagram est passé de 800 à 12 000 abonnés en 4 mois. Mes ventes ont triplé.',
    stars: 5,
    avatar: '👩🏾‍🎨',
    tag: 'Community Management',
    color: '#EC4899',
  },
  {
    name: 'Mamadou Bah',
    role: 'DG, Bah Transport & Logistique',
    text: 'Le chatbot IA qu\'ils ont développé répond à nos clients 24h/24. Nous avons réduit notre charge de support de 60%. Investissement rentabilisé en 2 mois.',
    stars: 5,
    avatar: '🧑🏿‍💼',
    tag: 'IA & Automatisation',
    color: '#10B981',
  },
  {
    name: 'Isabelle Koné',
    role: 'Directrice Marketing, PharmaCI',
    text: 'Notre référencement Google a explosé après leur intervention SEO. Nous apparaissons maintenant en première page sur tous nos mots-clés cibles.',
    stars: 5,
    avatar: '👩🏽‍🏫',
    tag: 'SEO',
    color: '#0EA5E9',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24" style={{ background: '#F8FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(0,59,122,0.08)', color: '#003B7A' }}>
            Ils nous font confiance
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: '#001D3D', letterSpacing: '-0.02em' }}>
            Ce que disent nos clients
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#FF6B00" style={{ color: '#FF6B00' }} />)}
            <span className="font-bold ml-2" style={{ color: '#001D3D' }}>5/5</span>
            <span className="text-gray-400 text-sm">· +40 avis vérifiés</span>
          </div>
        </div>

        {/* Grille témoignages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-7 rounded-3xl relative overflow-hidden"
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>

              {/* Accent couleur */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: t.color }} />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.stars)].map((_, s) => <Star key={s} size={14} fill={t.color} style={{ color: t.color }} />)}
              </div>

              {/* Texte */}
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>

              {/* Auteur */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: `${t.color}18` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: '#001D3D' }}>{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${t.color}12`, color: t.color }}>
                  {t.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
