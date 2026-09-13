import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getClient } from '@/lib/auth'
import sql from '@/lib/db'
import EspaceClientNav from '@/components/espace-client/EspaceClientNav'
import { Globe, ArrowRight, Plus, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: 'En attente',    color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
  in_progress: { label: 'En cours',      color: '#3B82F6', bg: 'rgba(59,130,246,.12)' },
  delivered:   { label: 'Livré ✓',       color: '#22C55E', bg: 'rgba(34,197,94,.12)'  },
  archived:    { label: 'Archivé',       color: '#64748B', bg: 'rgba(100,116,139,.12)'},
}
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export default async function CommandesPage() {
  const client = await getClient()
  if (!client) redirect('/espace-client')

  const orders = await sql`
    SELECT id, reference, template_sector, template_label, formule, domain, hosting, maintenance,
           total_initial, total_annual, total_monthly, status, site_url, delivery_date, created_at
    FROM client_orders
    WHERE client_id = ${client.id}
    ORDER BY created_at DESC
  `

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F1E' }}>
      <EspaceClientNav client={client} />
      <main style={{ flex: 1, padding: '2rem 2rem 4rem', overflowX: 'hidden' }}>
        <style>{`@media(max-width:767px){main{padding-top:5rem!important}}`}</style>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', marginBottom: '.3rem' }}>Mes commandes</h1>
            <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.85rem' }}>{orders.length} commande{orders.length > 1 ? 's' : ''} au total</p>
          </div>
          <Link href="/templates/commander" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1.5rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.85rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', textDecoration: 'none' }}>
            <Plus size={15} /> Nouvelle commande
          </Link>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'rgba(255,255,255,.25)' }}>
            <Globe size={48} style={{ margin: '0 auto 1.5rem', opacity: .2 }} />
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Vous n&apos;avez pas encore de commande.</p>
            <Link href="/templates/commander" style={{ padding: '.875rem 2rem', borderRadius: '1rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', textDecoration: 'none', fontSize: '.88rem' }}>
              Commander un template
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(orders as Array<Record<string, unknown>>).map((order) => {
              const st = STATUS[order.status as string] ?? STATUS.pending
              return (
                <div key={order.id as string} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '1rem', background: 'rgba(255,107,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Globe size={20} style={{ color: '#FF9A4D' }} />
                  </div>

                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap', marginBottom: '.3rem' }}>
                      <span style={{ fontWeight: 800, color: 'white', fontSize: '.95rem' }}>{(order.template_label as string) ?? 'Template'}</span>
                      <span style={{ fontSize: '.68rem', fontWeight: 700, color: st.color, background: st.bg, padding: '.2rem .6rem', borderRadius: '9999px' }}>{st.label}</span>
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', fontFamily: 'monospace', marginBottom: '.5rem' }}>Réf. {order.reference as string}</div>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)' }}>
                        🧾 Formule : <span style={{ color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>{order.formule as string}</span>
                      </span>
                      {!!order.domain && (
                        <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)' }}>
                          🌐 <span style={{ color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>{order.domain as string}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 900, color: 'white', marginBottom: '.2rem' }}>{fmt(order.total_initial as number)}</div>
                    {(order.total_monthly as number) > 0 && <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)' }}>+{fmt(order.total_monthly as number)}/mois</div>}
                    {!!order.site_url && (
                      <a href={order.site_url as string} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', color: '#4ADE80', marginTop: '.4rem', textDecoration: 'none' }}>
                        <ExternalLink size={11} /> Voir le site
                      </a>
                    )}
                  </div>

                  <Link href={`/espace-client/commandes/${order.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '.35rem', padding: '.625rem 1.1rem', borderRadius: '.75rem', fontSize: '.78rem', fontWeight: 700, color: '#FF9A4D', background: 'rgba(255,107,0,.08)', border: '1px solid rgba(255,107,0,.2)', textDecoration: 'none', flexShrink: 0 }}>
                    Détails <ArrowRight size={13} />
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
