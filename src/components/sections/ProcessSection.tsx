const steps = [
  {
    n: '01',
    title: 'Analyse du besoin',
    desc: 'Nous étudions votre projet, vos objectifs et votre contexte pour cerner précisément le besoin.',
  },
  {
    n: '02',
    title: 'Proposition & cadrage',
    desc: 'Nous vous soumettons une proposition détaillée : périmètre, délais, coût et livrables.',
  },
  {
    n: '03',
    title: 'Conception',
    desc: 'Maquettes, wireframes et design system validés ensemble avant le développement.',
  },
  {
    n: '04',
    title: 'Développement & production',
    desc: 'Réalisation technique avec les meilleures technologies, en phases validées.',
  },
  {
    n: '05',
    title: 'Tests & mise en ligne',
    desc: 'Recette complète, corrections et déploiement en production sur votre domaine.',
  },
  {
    n: '06',
    title: 'Formation & accompagnement',
    desc: 'Prise en main, documentation et suivi après livraison pour votre autonomie.',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-20" style={{ background: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(0,59,122,0.08)', color: 'var(--blue)' }}
          >
            Notre méthode
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: 'var(--dark)' }}>
            Comment nous travaillons
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="relative p-7 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all"
            >
              <div
                className="text-5xl font-black opacity-10 absolute top-4 right-5"
                style={{ color: 'var(--blue)' }}
              >
                {step.n}
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white mb-5"
                style={{ background: i % 2 === 0 ? 'var(--blue)' : 'var(--orange)' }}
              >
                {step.n}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--dark)' }}>{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
