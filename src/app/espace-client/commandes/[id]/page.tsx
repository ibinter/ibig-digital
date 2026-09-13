import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { getClient } from '@/lib/auth'
import sql from '@/lib/db'
import EspaceClientNav from '@/components/espace-client/EspaceClientNav'
import { ArrowLeft, ExternalLink, Globe, Key, MessageSquare, CheckCircle, Clock, Loader, Archive } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS: Record<string, { label: string; color: string; bg: string; icon: ReactNode }> = {
  pending:     { label: 'En attente de traitement', color: '#F59E0B', bg: 'rgba(245,158,11,.12)', icon: <Clock size={14} /> },
  in_progress: { label: 'En cours de réalisation',  color: '#3B82F6', bg: 'rgba(59,130,246,.12)', icon: <Loader size={14} /> },
  delivered:   { label: 'Site livré',                color: '#22C55E', bg: 'rgba(34,197,94,.12)',  icon: <CheckCircle size={14} /> },
  archived:    { label: 'Archivé',                   color: '#64748B', bg: 'rgba(100,116,139,.12)', icon: <Archive size={14} /> },
}
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export default async function CommandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const client = await getClient()
  if (!client) redirect('/espace-client')

  const { id } = await params
  const rows = await sql`
    SELECT * FROM client_orders WHERE id = ${id} AND client_id = ${client.id} LIMIT 1
  `
  if (!rows[0]) notFound()
  const order = rows[0] as Record<string, unknown>
  const st = STATUS[order.status as string] ?? STATUS.pending

  const tickets = await sql`
    SELECT id, subject, status, priority, updated_at FROM client_tickets
    WHERE order_id = ${id} AND client_id = ${client.id}
    ORDER BY updated_at DESC
  `

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F1E' }}>
      <EspaceClientNav client={client} />
      <main style={{ flex: 1, padding: '2rem 2rem 4rem', overflowX: 'hidden', maxWidth: '900px' }}>
        <style>{`@media(max-width:767px){main{padding-top:5rem!important}}`}</style>

        <Link href="/espace-client/commandes" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,.35)', fontSize: '.8rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
          <ArrowLeft size={14} /> Retour aux commandes
        </Link>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', marginBottom: '.3rem' }}>{(order.template_label as string) ?? 'Ma commande'}</h1>
            <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.3)', fontFamily: 'monospace' }}>Réf. {order.reference as string}</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.45rem 1rem', borderRadius: '9999px', fontSize: '.78rem', fontWeight: 700, color: st.color, background: st.bg }}>
            {st.icon} {st.label}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>

          {/* Détails de la config */}
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem', gridColumn: 'span 1' }}>
            <div style={{ fontSize: '.72rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.06em', marginBottom: '1rem' }}>CONFIGURATION</div>
            {[
              { l: 'Template', v: order.template_label },
              { l: 'Formule', v: order.formule },
              { l: 'Domaine', v: order.domain || '—' },
              { l: 'Hébergement', v: order.hosting },
              { l: 'Maintenance', v: order.maintenance },
            ].map(({ l, v }) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '.45rem 0', borderBottom: '1px solid rgba(255,255,255,.04)', fontSize: '.82rem' }}>
                <span style={{ color: 'rgba(255,255,255,.4)' }}>{l}</span>
                <span style={{ fontWeight: 600, color: 'white', textTransform: 'capitalize' }}>{v as string ?? '—'}</span>
              </div>
            ))}
          </div>

          {/* Prix */}
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <div style={{ fontSize: '.72rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.06em', marginBottom: '1rem' }}>FACTURATION</div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)', marginBottom: '.2rem' }}>Montant initial</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>{fmt(order.total_initial as number)}</div>
            </div>
            {(order.total_annual as number) > 0 && (
              <div style={{ padding: '.5rem .75rem', borderRadius: '.625rem', background: 'rgba(255,107,0,.06)', border: '1px solid rgba(255,107,0,.15)', marginBottom: '.5rem' }}>
                <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.3)' }}>Renouvellement annuel</div>
                <div style={{ fontWeight: 800, color: '#FF9A4D' }}>{fmt(order.total_annual as number)}/an</div>
              </div>
            )}
            {(order.total_monthly as number) > 0 && (
              <div style={{ padding: '.5rem .75rem', borderRadius: '.625rem', background: 'rgba(99,102,241,.06)', border: '1px solid rgba(99,102,241,.15)' }}>
                <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.3)' }}>Abonnement mensuel</div>
                <div style={{ fontWeight: 800, color: '#818CF8' }}>{fmt(order.total_monthly as number)}/mois</div>
              </div>
            )}
          </div>
        </div>

        {/* Accès au site (si livré) */}
        {order.status === 'delivered' && !!(order.site_url || order.admin_url) && (
          <div style={{ background: 'rgba(34,197,94,.05)', border: '1px solid rgba(34,197,94,.2)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '.72rem', fontWeight: 800, color: '#4ADE80', letterSpacing: '.06em', marginBottom: '1rem' }}>🎉 VOTRE SITE EST EN LIGNE</div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {!!order.site_url && (
                <a href={order.site_url as string} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1.5rem', borderRadius: '.875rem', fontWeight: 700, fontSize: '.85rem', color: 'white', background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.3)', textDecoration: 'none' }}>
                  <Globe size={15} /> Voir mon site <ExternalLink size={13} />
                </a>
              )}
              {!!order.admin_url && (
                <a href={order.admin_url as string} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1.5rem', borderRadius: '.875rem', fontWeight: 700, fontSize: '.85rem', color: 'rgba(255,255,255,.6)', border: '1px solid rgba(255,255,255,.12)', textDecoration: 'none' }}>
                  <Key size={15} /> Administration <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Tickets liés */}
        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 800, fontSize: '.95rem', color: 'white', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <MessageSquare size={16} style={{ color: '#F59E0B' }} /> Tickets de support
            </div>
            <Link href={`/espace-client/tickets/nouveau?order_id=${order.id}&order_ref=${order.reference}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', padding: '.45rem 1rem', borderRadius: '.625rem', fontSize: '.75rem', fontWeight: 700, color: '#FF9A4D', background: 'rgba(255,107,0,.08)', border: '1px solid rgba(255,107,0,.2)', textDecoration: 'none' }}>
              + Nouveau ticket
            </Link>
          </div>
          {tickets.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,.25)', fontSize: '.82rem', textAlign: 'center', padding: '1.5rem' }}>Aucun ticket pour cette commande.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {(tickets as Array<Record<string, unknown>>).map((t) => (
                <Link key={t.id as string} href={`/espace-client/tickets/${t.id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '.875rem', padding: '.875rem', borderRadius: '.875rem', background: 'rgba(255,255,255,.03)', textDecoration: 'none' }}>
                  <MessageSquare size={14} style={{ color: 'rgba(255,255,255,.3)', flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '.82rem', color: 'white', fontWeight: 600 }}>{t.subject as string}</span>
                  <span style={{ fontSize: '.65rem', color: '#F59E0B', background: 'rgba(245,158,11,.1)', padding: '.18rem .55rem', borderRadius: '9999px' }}>
                    {t.status === 'in_progress' ? 'En cours' : 'Ouvert'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
