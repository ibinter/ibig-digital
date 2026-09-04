import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { SITE, NAV_LINKS } from '@/lib/constants'

const services = [
  { label: 'Sites web & présence digitale', href: '/services#sites-web' },
  { label: 'Applications web & mobiles', href: '/services#applications' },
  { label: 'E-commerce', href: '/services#ecommerce' },
  { label: 'Design & identité visuelle', href: '/services#design' },
  { label: 'Marketing digital', href: '/services#marketing-digital' },
  { label: 'IA & Automatisation', href: '/services#ia-automatisation' },
  { label: 'Cybersécurité', href: '/services#cybersecurite' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--dark)' }} className="text-white">
      {/* CTA banner */}
      <div style={{ background: 'var(--blue)' }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à lancer votre projet digital ?
          </h2>
          <p className="text-blue-200 mb-8">
            Décrivez-nous votre besoin, nous vous proposons une solution adaptée sous 48h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'var(--orange)' }}
            >
              Demander un devis <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Bonjour IBIG DIGITAL, je souhaite discuter de mon projet.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/logo-full.png"
                alt="IBIG DIGITAL"
                width={200}
                height={60}
                style={{ height: '52px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La branche digitale d&apos;INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL. Nous accompagnons les entreprises dans leur transformation numérique.
            </p>
            <div className="space-y-3">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={15} style={{ color: 'var(--orange)' }} />
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={15} style={{ color: 'var(--orange)' }} />
                {SITE.phone}
              </a>
              <a href={`tel:${SITE.whatsapp}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={15} style={{ color: 'var(--orange)' }} />
                {SITE.whatsapp} (WhatsApp)
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://kits.intermark-business.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm inline-flex items-center gap-1.5 font-semibold transition-colors"
                  style={{ color: '#FF9A4D' }}
                >
                  📦 Kits IBIG
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-6">Nos services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packs & Devis */}
          <div>
            <h3 className="font-semibold text-white mb-6">Nos offres</h3>
            <ul className="space-y-3 mb-8">
              <li><Link href="/packs/pack-visibilite" className="text-sm text-gray-400 hover:text-white transition-colors">Pack Visibilité</Link></li>
              <li><Link href="/packs/pack-lancement-entreprise" className="text-sm text-gray-400 hover:text-white transition-colors">Pack Lancement Entreprise</Link></li>
              <li><Link href="/packs/pack-commerce-en-ligne" className="text-sm text-gray-400 hover:text-white transition-colors">Pack Commerce en Ligne</Link></li>
              <li><Link href="/packs/pack-mobile-pro" className="text-sm text-gray-400 hover:text-white transition-colors">Pack Mobile Pro</Link></li>
              <li><Link href="/packs/pack-digital-360" className="text-sm text-gray-400 hover:text-white transition-colors">Pack Digital 360</Link></li>
              <li><Link href="/packs" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--orange)' }}>Voir tous les packs →</Link></li>
            </ul>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--orange)' }}
            >
              Demander un devis <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {year} IBIG DIGITAL – {SITE.company}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/mentions-legales" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Confidentialité</Link>
            <Link href="/cgv" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">CGV</Link>
            <Link href="/cgu" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
