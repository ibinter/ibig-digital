import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    icon: '🌐',
    title: 'Sites web',
    desc: 'Sites vitrine, corporate, landing pages et portails web professionnels.',
    href: '/services/sites-web',
    color: '#003B7A',
  },
  {
    icon: '📱',
    title: 'Applications',
    desc: 'Applications web et mobiles Android, iOS et multiplateformes.',
    href: '/services/applications',
    color: '#0056B3',
  },
  {
    icon: '🛒',
    title: 'E-commerce',
    desc: 'Boutiques en ligne, marketplaces et solutions de vente digitale.',
    href: '/services/ecommerce',
    color: '#003B7A',
  },
  {
    icon: '🎨',
    title: 'Design & Branding',
    desc: 'Logo, charte graphique, identité visuelle et packaging.',
    href: '/services/design',
    color: '#FF6B00',
  },
  {
    icon: '📣',
    title: 'Marketing digital',
    desc: 'Google Ads, Meta Ads, TikTok Ads, SEO et stratégie digitale.',
    href: '/services/marketing-digital',
    color: '#FF6B00',
  },
  {
    icon: '🤖',
    title: 'IA & Automatisation',
    desc: 'Chatbots IA, automatisation de processus et assistants virtuels.',
    href: '/services/ia-automatisation',
    color: '#0056B3',
  },
  {
    icon: '🔒',
    title: 'Cybersécurité',
    desc: 'Audit de sécurité, test de pénétration et protection des systèmes.',
    href: '/services/cybersecurite',
    color: '#003B7A',
  },
  {
    icon: '☁️',
    title: 'Hébergement & Infra',
    desc: 'Hébergement, maintenance, optimisation et sauvegarde.',
    href: '/services/hebergement',
    color: '#6C757D',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(255,107,0,0.1)', color: 'var(--orange)' }}
          >
            Nos solutions
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--dark)' }}>
            Des services adaptés à chaque besoin
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            IBIG DIGITAL couvre l&apos;ensemble du spectre digital pour accompagner votre croissance à chaque étape.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--gray-50)' }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110"
                style={{ background: `${service.color}15` }}
              >
                {service.icon}
              </div>
              <h3
                className="font-bold text-lg mb-2 group-hover:transition-colors"
                style={{ color: 'var(--dark)' }}
              >
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.desc}</p>
              <span
                className="text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--blue)' }}
              >
                Découvrir <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 transition-all hover:shadow-lg"
            style={{ borderColor: 'var(--blue)', color: 'var(--blue)' }}
          >
            Voir tous nos services <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
