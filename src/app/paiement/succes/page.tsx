import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Paiement confirmé | IBIG DIGITAL' }

export default async function PaiementSucces({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams

  return (
    <main style={{ minHeight: '100vh', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'white', borderRadius: '1.5rem', padding: 'clamp(2rem,6vw,4rem)', maxWidth: '540px', width: '100%', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>

        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={44} style={{ color: '#16A34A' }} />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', marginBottom: '0.75rem' }}>
          Paiement confirmé !
        </h1>
        <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Merci pour votre confiance. Votre commande a bien été enregistrée et notre équipe va vous contacter sous <strong>24h</strong> pour démarrer votre projet.
        </p>

        {ref && (
          <div style={{ background: '#F9FAFB', borderRadius: '0.75rem', padding: '0.875rem 1.25rem', marginBottom: '1.75rem', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Référence de commande</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>{ref}</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href="https://wa.me/2250778882592?text=Bonjour%20IBIG%20DIGITAL%2C%20je%20viens%20de%20payer%20ma%20commande"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', background: '#25D366', color: 'white', fontWeight: 700, borderRadius: '0.875rem', textDecoration: 'none', fontSize: '14px' }}
          >
            <MessageCircle size={16} /> Contacter via WhatsApp
          </a>
          <Link
            href="/templates"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', background: '#F9FAFB', color: '#374151', fontWeight: 600, borderRadius: '0.875rem', textDecoration: 'none', fontSize: '14px', border: '1px solid #E5E7EB' }}
          >
            Voir d&apos;autres templates <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  )
}
