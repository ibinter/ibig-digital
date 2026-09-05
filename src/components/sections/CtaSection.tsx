import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function CtaSection() {
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Bonjour IBIG DIGITAL ! Je souhaite discuter de mon projet digital.')}`

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#fff' }}>
      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,59,122,0.06) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Carte principale */}
        <div className="rounded-3xl p-6 sm:p-10 lg:p-14 text-center"
          style={{ background: 'linear-gradient(135deg, #001D3D 0%, #003B7A 50%, #0056B3 100%)', boxShadow: '0 30px 80px rgba(0,59,122,0.3)' }}>

          {/* Badge urgence */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8"
            style={{ background: 'rgba(255,107,0,0.2)', color: '#FF8C42', border: '1px solid rgba(255,107,0,0.3)' }}>
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse inline-block" />
            Devis gratuit — Réponse sous 24h
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Prêt à propulser<br />votre business en ligne ?
          </h2>

          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Discutons de votre projet. Notre équipe analyse vos besoins et vous propose une solution sur mesure, adaptée à votre budget.
          </p>

          {/* Témoignage inline */}
          <div className="inline-flex items-start gap-4 p-5 rounded-2xl mb-10 text-left max-w-md mx-auto"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-lg"
              style={{ background: 'rgba(255,107,0,0.2)' }}>🧑🏾‍💼</div>
            <div>
              <p className="text-sm italic text-white mb-1">&ldquo;IBIG DIGITAL a transformé mon activité. Mon site a été livré en 12 jours, parfait du premier coup.&rdquo;</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Kouassi A. — Directeur, AgriTech CI</p>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF4500)', boxShadow: '0 8px 30px rgba(255,107,0,0.5)' }}>
              Demander un devis gratuit <ArrowRight size={20} />
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-semibold text-white border transition-all hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
              <MessageCircle size={20} />
              WhatsApp direct
            </a>
          </div>

          {/* Réassurance */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {['Aucun engagement', 'Devis sous 24h', 'Paiement en plusieurs fois', 'Support 7j/7'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF6B00' }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
