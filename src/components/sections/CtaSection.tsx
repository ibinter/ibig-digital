import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function CtaSection() {
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Bonjour IBIG DIGITAL, je souhaite discuter de mon projet digital.')}`

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          style={{ background: 'rgba(255,107,0,0.2)', color: 'var(--orange-light)' }}
        >
          Passez à l&apos;action
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Votre projet digital mérite<br />
          <span style={{ color: 'var(--orange)' }}>les meilleurs outils</span>
        </h2>
        <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
          Décrivez-nous votre besoin et recevez une proposition personnalisée sous 48h. Premier échange gratuit et sans engagement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-white shadow-xl transition-all hover:opacity-90 hover:shadow-2xl hover:-translate-y-0.5"
            style={{ background: 'var(--orange)' }}
          >
            Demander un devis gratuit <ArrowRight size={20} />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all"
          >
            Écrire sur WhatsApp
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-200 text-sm">
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={16} />
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={16} />
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  )
}
