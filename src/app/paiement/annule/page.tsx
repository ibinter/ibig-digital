import type { Metadata } from 'next'
import Link from 'next/link'
import { XCircle, ArrowLeft, MessageCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Paiement annulé | IBIG DIGITAL' }

export default async function PaiementAnnule({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams

  return (
    <main style={{ minHeight: '100vh', background: '#FFF7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'white', borderRadius: '1.5rem', padding: 'clamp(2rem,6vw,4rem)', maxWidth: '520px', width: '100%', textAlign: 'center', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>

        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <XCircle size={44} style={{ color: '#DC2626' }} />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', marginBottom: '0.75rem' }}>
          Paiement annulé
        </h1>
        <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Votre paiement n&apos;a pas abouti. Aucun montant n&apos;a été débité. Vous pouvez réessayer ou nous contacter pour obtenir de l&apos;aide.
        </p>

        {ref && (
          <div style={{ background: '#F9FAFB', borderRadius: '0.75rem', padding: '0.875rem 1.25rem', marginBottom: '1.75rem', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Référence</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>{ref}</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link
            href="/templates/commander"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', background: '#FF6B00', color: 'white', fontWeight: 700, borderRadius: '0.875rem', textDecoration: 'none', fontSize: '14px' }}
          >
            Réessayer le paiement
          </Link>
          <a
            href="https://wa.me/2250778882592?text=Bonjour%20IBIG%20DIGITAL%2C%20j%27ai%20eu%20un%20problème%20lors%20du%20paiement"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', background: 'rgba(37,211,102,0.1)', color: '#16A34A', fontWeight: 700, borderRadius: '0.875rem', textDecoration: 'none', fontSize: '14px', border: '1px solid rgba(37,211,102,0.25)' }}
          >
            <MessageCircle size={16} /> Aide via WhatsApp
          </a>
          <Link
            href="/templates"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', background: '#F9FAFB', color: '#374151', fontWeight: 600, borderRadius: '0.875rem', textDecoration: 'none', fontSize: '14px', border: '1px solid #E5E7EB' }}
          >
            <ArrowLeft size={15} /> Retour aux templates
          </Link>
        </div>
      </div>
    </main>
  )
}
