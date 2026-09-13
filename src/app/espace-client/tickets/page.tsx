import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getClient } from '@/lib/auth'
import sql from '@/lib/db'
import EspaceClientNav from '@/components/espace-client/EspaceClientNav'
import { MessageSquare, Plus, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const PRIORITY: Record<string, { label: string; color: string }> = {
  low:    { label: 'Faible',  color: '#64748B' },
  normal: { label: 'Normal',  color: '#3B82F6' },
  high:   { label: 'Élevée', color: '#F97316' },
  urgent: { label: 'Urgent',  color: '#EF4444' },
}
const STATUS_LABEL: Record<string, string> = {
  open:        'Ouvert',
  in_progress: 'En cours',
  resolved:    'Résolu',
  closed:      'Fermé',
}

export default async function TicketsPage() {
  const client = await getClient()
  if (!client) redirect('/espace-client')

  const tickets = await sql`
    SELECT t.id, t.subject, t.priority, t.status, t.created_at, t.updated_at,
           o.reference AS order_reference, o.template_label,
           (SELECT COUNT(*)::int FROM ticket_messages tm WHERE tm.ticket_id = t.id) AS message_count
    FROM client_tickets t
    LEFT JOIN client_orders o ON o.id = t.order_id
    WHERE t.client_id = ${client.id}
    ORDER BY t.updated_at DESC
  `

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F1E' }}>
      <EspaceClientNav client={client} />
      <main style={{ flex: 1, padding: '2rem 2rem 4rem', overflowX: 'hidden' }}>
        <style>{`@media(max-width:767px){main{padding-top:5rem!important}}`}</style>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', marginBottom: '.3rem' }}>Support & tickets</h1>
            <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.85rem' }}>Suivez vos demandes auprès de notre équipe.</p>
          </div>
          <Link href="/espace-client/tickets/nouveau" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1.5rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.85rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', textDecoration: 'none' }}>
            <Plus size={15} /> Nouveau ticket
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'rgba(255,255,255,.25)' }}>
            <MessageSquare size={48} style={{ margin: '0 auto 1.5rem', opacity: .2 }} />
            <p style={{ marginBottom: '1.5rem' }}>Aucun ticket pour l&apos;instant.</p>
            <Link href="/espace-client/tickets/nouveau" style={{ padding: '.875rem 2rem', borderRadius: '1rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', textDecoration: 'none', fontSize: '.88rem' }}>
              Ouvrir un ticket
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {(tickets as Array<Record<string, unknown>>).map((t) => {
              const prio = PRIORITY[t.priority as string] ?? PRIORITY.normal
              const isOpen = t.status === 'open' || t.status === 'in_progress'
              return (
                <Link key={t.id as string} href={`/espace-client/tickets/${t.id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', background: 'rgba(255,255,255,.03)', border: `1px solid ${isOpen ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.04)'}`, textDecoration: 'none', opacity: isOpen ? 1 : .6, flexWrap: 'wrap' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '.875rem', background: isOpen ? 'rgba(245,158,11,.1)' : 'rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={16} style={{ color: isOpen ? '#F59E0B' : 'rgba(255,255,255,.2)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '.92rem', marginBottom: '.25rem' }}>{t.subject as string}</div>
                    <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {!!t.order_reference && <span>📦 {t.template_label as string}</span>}
                      <span>💬 {t.message_count as number} message{(t.message_count as number) > 1 ? 's' : ''}</span>
                      <span>🕐 {new Date(t.updated_at as string).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '.65rem', fontWeight: 700, color: prio.color, background: `${prio.color}15`, padding: '.2rem .55rem', borderRadius: '9999px', border: `1px solid ${prio.color}30` }}>{prio.label}</span>
                    <span style={{ fontSize: '.65rem', fontWeight: 700, color: isOpen ? '#F59E0B' : '#64748B', background: isOpen ? 'rgba(245,158,11,.1)' : 'rgba(100,116,139,.1)', padding: '.2rem .55rem', borderRadius: '9999px' }}>
                      {STATUS_LABEL[t.status as string] ?? t.status as string}
                    </span>
                    <ArrowRight size={14} style={{ color: 'rgba(255,255,255,.2)' }} />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
