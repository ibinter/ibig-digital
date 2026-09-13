import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getClient } from '@/lib/auth'
import sql from '@/lib/db'
import EspaceClientNav from '@/components/espace-client/EspaceClientNav'
import { ShoppingBag, MessageSquare, Clock, CheckCircle, Globe, ArrowRight, AlertCircle, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: 'En attente',    color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
  in_progress: { label: 'En cours',      color: '#3B82F6', bg: 'rgba(59,130,246,.12)' },
  delivered:   { label: 'Livré',         color: '#22C55E', bg: 'rgba(34,197,94,.12)'  },
  archived:    { label: 'Archivé',       color: '#64748B', bg: 'rgba(100,116,139,.12)'},
}

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export default async function DashboardPage() {
  const client = await getClient()
  if (!client) redirect('/espace-client')

  const [orders, tickets] = await Promise.all([
    sql`SELECT id, reference, template_label, formule, status, total_initial, total_monthly, site_url, created_at FROM client_orders WHERE client_id = ${client.id} ORDER BY created_at DESC LIMIT 5`,
    sql`SELECT id, subject, status, priority, updated_at FROM client_tickets WHERE client_id = ${client.id} AND status != 'closed' ORDER BY updated_at DESC LIMIT 5`,
  ])

  const totalOrders = (await sql`SELECT COUNT(*)::int AS n FROM client_orders WHERE client_id = ${client.id}`)[0] as { n: number }
  const openTickets = (await sql`SELECT COUNT(*)::int AS n FROM client_tickets WHERE client_id = ${client.id} AND status IN ('open','in_progress')`)[0] as { n: number }
  const activeOrders = (await sql`SELECT COUNT(*)::int AS n FROM client_orders WHERE client_id = ${client.id} AND status = 'in_progress'`)[0] as { n: number }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F1E' }}>
      <EspaceClientNav client={client} />

      <main style={{ flex: 1, padding: '2rem 2rem 4rem', overflowX: 'hidden' }}>
        <style>{`
          @media (max-width: 767px) { main { padding-top: 5rem !important; } }
          .dash-card { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); border-radius:1.25rem; }
        `}</style>

        {/* En-tête */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900, color: 'white', marginBottom: '.3rem' }}>
            Bonjour, {client.name.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.88rem' }}>Voici le résumé de votre espace client.</p>
        </div>

        {/* Statistiques */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: <ShoppingBag size={20} />, label: 'Commandes totales', value: totalOrders.n, color: '#FF6B00' },
            { icon: <Clock size={20} />,       label: 'En cours',           value: activeOrders.n,  color: '#3B82F6' },
            { icon: <MessageSquare size={20} />, label: 'Tickets ouverts',  value: openTickets.n,  color: '#F59E0B' },
          ].map((stat) => (
            <div key={stat.label} className="dash-card" style={{ padding: '1.25rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.875rem', background: `${stat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, marginBottom: '.75rem' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', marginTop: '.3rem', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}

          {/* CTA nouvelle commande */}
          <Link href="/templates/commander" style={{ textDecoration: 'none' }}>
            <div className="dash-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px dashed rgba(255,107,0,.3)', background: 'rgba(255,107,0,.04)', cursor: 'pointer', height: '100%', minHeight: '120px', textAlign: 'center', gap: '.5rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,107,0,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9A4D' }}>
                <Plus size={18} />
              </div>
              <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#FF9A4D' }}>Nouvelle commande</span>
            </div>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

          {/* Commandes récentes */}
          <div className="dash-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, fontSize: '.95rem', color: 'white', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <ShoppingBag size={16} style={{ color: '#FF6B00' }} /> Commandes récentes
              </div>
              <Link href="/espace-client/commandes" style={{ fontSize: '.72rem', color: '#FF9A4D', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.25rem' }}>
                Toutes <ArrowRight size={12} />
              </Link>
            </div>

            {orders.length === 0 ? (
              <EmptyState text="Aucune commande pour l'instant." cta="Commander un template" href="/templates/commander" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {(orders as Array<Record<string, unknown>>).map((order) => {
                  const st = STATUS_LABELS[order.status as string] ?? STATUS_LABELS.pending
                  return (
                    <Link key={order.id as string} href={`/espace-client/commandes/${order.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.875rem', padding: '.875rem', borderRadius: '.875rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', transition: 'border-color .15s' }}>
                      <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '.75rem', background: 'rgba(255,107,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Globe size={14} style={{ color: '#FF9A4D' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{(order.template_label as string) ?? 'Template'}</div>
                        <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)', fontFamily: 'monospace' }}>{order.reference as string}</div>
                      </div>
                      <span style={{ fontSize: '.65rem', fontWeight: 700, color: st.color, background: st.bg, padding: '.2rem .6rem', borderRadius: '9999px', flexShrink: 0 }}>{st.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Tickets ouverts */}
          <div className="dash-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, fontSize: '.95rem', color: 'white', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <MessageSquare size={16} style={{ color: '#F59E0B' }} /> Tickets ouverts
              </div>
              <Link href="/espace-client/tickets" style={{ fontSize: '.72rem', color: '#FF9A4D', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.25rem' }}>
                Tous <ArrowRight size={12} />
              </Link>
            </div>

            {tickets.length === 0 ? (
              <EmptyState text="Aucun ticket ouvert." cta="Ouvrir un ticket" href="/espace-client/tickets" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {(tickets as Array<Record<string, unknown>>).map((t) => {
                  const priorityColor = t.priority === 'urgent' ? '#EF4444' : t.priority === 'high' ? '#F97316' : '#64748B'
                  return (
                    <Link key={t.id as string} href={`/espace-client/tickets/${t.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '.875rem', padding: '.875rem', borderRadius: '.875rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)' }}>
                      <AlertCircle size={14} style={{ color: priorityColor, flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.subject as string}</div>
                        <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)', marginTop: '2px' }}>
                          {new Date(t.updated_at as string).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <span style={{ fontSize: '.62rem', fontWeight: 700, color: t.status === 'in_progress' ? '#3B82F6' : '#F59E0B', background: t.status === 'in_progress' ? 'rgba(59,130,246,.1)' : 'rgba(245,158,11,.1)', padding: '.18rem .55rem', borderRadius: '9999px', flexShrink: 0 }}>
                        {t.status === 'in_progress' ? 'En cours' : 'Ouvert'}
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function EmptyState({ text, cta, href }: { text: string; cta: string; href: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <CheckCircle size={32} style={{ color: 'rgba(255,255,255,.1)', margin: '0 auto .75rem' }} />
      <p style={{ color: 'rgba(255,255,255,.25)', fontSize: '.8rem', marginBottom: '1rem' }}>{text}</p>
      <Link href={href} style={{ fontSize: '.78rem', fontWeight: 700, color: '#FF9A4D', textDecoration: 'none', padding: '.45rem 1rem', borderRadius: '.625rem', background: 'rgba(255,107,0,.1)', border: '1px solid rgba(255,107,0,.25)' }}>
        {cta}
      </Link>
    </div>
  )
}
