const steps = [
  {
    n: '01',
    title: 'Analyse de votre projet',
    desc: 'Entretien découverte pour cerner vos objectifs, votre audience et vos contraintes. Résultat : une vision claire de votre projet.',
    icon: '🎯',
    color: '#003B7A',
  },
  {
    n: '02',
    title: 'Proposition sur mesure',
    desc: 'Devis détaillé avec périmètre, délais, technologies et livrables. Aucun frais caché, tout est transparent.',
    icon: '📋',
    color: '#FF6B00',
  },
  {
    n: '03',
    title: 'Design & maquettes',
    desc: 'Conception visuelle validée avec vous avant développement. Vos retours sont intégrés à chaque étape.',
    icon: '🎨',
    color: '#7C3AED',
  },
  {
    n: '04',
    title: 'Développement',
    desc: 'Production technique avec les meilleures technologies. Suivi d\'avancement régulier et phases de validation.',
    icon: '⚙️',
    color: '#0EA5E9',
  },
  {
    n: '05',
    title: 'Tests & mise en ligne',
    desc: 'Recette complète sur tous appareils, corrections et déploiement en production sur votre domaine.',
    icon: '🚀',
    color: '#10B981',
  },
  {
    n: '06',
    title: 'Formation & suivi',
    desc: 'Prise en main, documentation, garantie 3 mois et support WhatsApp pour votre pleine autonomie.',
    icon: '🤝',
    color: '#F59E0B',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(0,59,122,0.08)', color: '#003B7A' }}>
            Notre méthode éprouvée
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: '#001D3D', letterSpacing: '-0.02em' }}>
            De l&apos;idée au lancement en{' '}
            <span style={{ background: 'linear-gradient(90deg, #003B7A, #FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              6 étapes
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Un processus structuré, transparent et orienté résultat — pour vous livrer ce qui compte vraiment.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.n} className="relative p-7 rounded-3xl bg-white border border-gray-100 transition-all hover:-translate-y-1"
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>

              {/* Numéro fantôme */}
              <div className="absolute top-4 right-5 text-6xl font-black" style={{ color: `${step.color}0D` }}>
                {step.n}
              </div>

              {/* Icône */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: `${step.color}15` }}>
                {step.icon}
              </div>

              {/* Badge étape */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: `${step.color}12`, color: step.color }}>
                Étape {step.n}
              </div>

              <h3 className="font-black text-lg mb-2" style={{ color: '#001D3D' }}>{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
