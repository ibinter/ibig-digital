import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'

const highlights = [
  'Sites web & applications',
  'Design & identité visuelle',
  'Marketing digital & IA',
]

export default function Hero() {
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Bonjour IBIG DIGITAL, je souhaite discuter de mon projet digital.')}`

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 50%, var(--blue-light) 100%)',
      }}
    >
      {/* Motif décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'var(--orange)' }}
        />
        <div
          className="absolute bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'var(--orange)' }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenu */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{ background: 'rgba(255,107,0,0.15)', color: 'var(--orange-light)' }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--orange)' }} />
              Agence Digitale – Côte d&apos;Ivoire &amp; Afrique
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transformez votre
              <span style={{ color: 'var(--orange)' }}> vision</span>
              <br />en réalité digitale
            </h1>

            <p className="text-lg text-blue-200 mb-8 leading-relaxed max-w-xl">
              IBIG DIGITAL conçoit des sites web, applications, solutions e-commerce et outils marketing pour les entreprises, PME, startups et entrepreneurs.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {highlights.map((h) => (
                <div key={h} className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: 'var(--orange)' }} />
                  <span className="text-sm text-blue-100">{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-xl transition-all hover:opacity-90 hover:shadow-2xl hover:-translate-y-0.5"
                style={{ background: 'var(--orange)' }}
              >
                Demander un devis <ArrowRight size={20} />
              </Link>
              <Link
                href="/realisations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all"
              >
                Voir nos réalisations
              </Link>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-blue-200 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#25D366' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Écrire sur WhatsApp maintenant
            </a>
          </div>

          {/* Visuel */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Cards flottantes */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🌐', label: 'Sites web', count: '30+', desc: 'projets livrés' },
                  { icon: '📱', label: 'Applications', count: '10+', desc: 'apps mobiles' },
                  { icon: '🛒', label: 'E-commerce', count: '15+', desc: 'boutiques en ligne' },
                  { icon: '🎨', label: 'Design', count: '50+', desc: 'identités visuelles' },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="p-6 rounded-2xl backdrop-blur-sm border"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <div className="text-3xl mb-3">{card.icon}</div>
                    <div className="text-2xl font-bold text-white">{card.count}</div>
                    <div className="text-sm text-blue-200">{card.desc}</div>
                    <div className="text-xs text-blue-300 mt-1">{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Badge flottant */}
              <div
                className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl shadow-2xl"
                style={{ background: 'var(--orange)' }}
              >
                <div className="text-white font-bold text-sm">IBIG PARTNERS</div>
                <div className="text-orange-100 text-xs">Programme d&apos;affiliation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
