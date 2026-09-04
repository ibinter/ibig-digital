const reasons = [
  {
    icon: '🎯',
    title: 'Orienté besoins',
    desc: 'Chaque solution est conçue sur mesure pour votre métier et vos objectifs commerciaux.',
  },
  {
    icon: '🏆',
    title: 'Solutions professionnelles',
    desc: 'Des standards de qualité élevés, des technologies modernes et des livrables prêts à l\'emploi.',
  },
  {
    icon: '🤝',
    title: 'Accompagnement continu',
    desc: 'Formation, support après livraison et suivi pour que votre outil digital reste performant.',
  },
  {
    icon: '🔒',
    title: 'Sécurité & fiabilité',
    desc: 'Sites sécurisés, hébergements fiables et pratiques de développement conformes aux standards.',
  },
  {
    icon: '⚡',
    title: 'Expertise pluridisciplinaire',
    desc: 'Une équipe capable de couvrir web, mobile, design, marketing, IA et cybersécurité.',
  },
  {
    icon: '🌍',
    title: 'Ancrage local, vision globale',
    desc: 'Expertise du marché ivoirien et africain, avec des standards internationaux.',
  },
]

export default function WhyIbig() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: 'rgba(255,107,0,0.1)', color: 'var(--orange)' }}
            >
              Pourquoi nous choisir
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'var(--dark)' }}>
              Pourquoi choisir<br />
              <span style={{ color: 'var(--blue)' }}>IBIG DIGITAL ?</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              IBIG DIGITAL n&apos;est pas une simple agence web. C&apos;est un partenaire de transformation digitale qui comprend vos enjeux business et vous propose des solutions adaptées à votre réalité.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: '55+', l: 'Services disponibles' },
                { v: '5', l: 'Packs clés en main' },
                { v: '48h', l: 'Réponse garantie' },
                { v: '100%', l: 'Sur mesure' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="p-4 rounded-xl text-center"
                  style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)' }}
                >
                  <div className="text-2xl font-bold" style={{ color: 'var(--blue)' }}>{s.v}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all"
                style={{ background: 'var(--gray-50)' }}
              >
                <div className="text-3xl mb-3">{reason.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--dark)' }}>{reason.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
