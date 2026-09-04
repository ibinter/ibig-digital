const stats = [
  { value: '55+', label: 'Services & produits', icon: '🧩' },
  { value: '5', label: 'Packs commerciaux', icon: '📦' },
  { value: '7', label: "Domaines d'expertise", icon: '🏆' },
  { value: '48h', label: 'Délai de réponse', icon: '⚡' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div
                className="text-4xl font-bold mb-1 transition-colors"
                style={{ color: 'var(--blue)' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
