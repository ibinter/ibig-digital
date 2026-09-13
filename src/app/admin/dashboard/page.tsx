'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { Users, ShoppingBag, MessageSquare, TrendingUp, ArrowRight, Clock, Loader, CheckCircle, Archive } from 'lucide-react'

interface Stats {
  clients: number; orders: number; openTickets: number; revenue: number
  ordersByStatus: Array<{ status: string; n: number }>
  recentOrders: Array<{ id: string; reference: string; template_label: string; formule: string; total_initial: number; status: string; created_at: string; client_name: string; client_email: string }>
}

const STATUS_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:     { label: 'En attente',  color: '#F59E0B', icon: <Clock size={12} /> },
  in_progress: { label: 'En cours',    color: '#3B82F6', icon: <Loader size={12} /> },
  delivered:   { label: 'Livré',       color: '#22C55E', icon: <CheckCircle size={12} /> },
  archived:    { label: 'Archivé',     color: '#64748B', icon: <Archive size={12} /> },
}
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => { if (r.status === 401) { router.push('/admin'); return null } return r.json() })
      .then((d) => { if (d) setStats(d) })
      .finally(() => setLoading(false))
  }, [router])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>
        <style>{`@media(max-width:767px){main{padding-top:5rem!important}}`}</style>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>Tableau de bord</h1>
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '.82rem', marginTop: '.2rem' }}>Vue d'ensemble de l'activité IBIG DIGITAL Templates</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,.2)' }}>Chargement…</div>
        ) : stats ? (
          <>
            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Clients inscrits', value: stats.clients, icon: <Users size={20} />, color: '#818CF8', bg: 'rgba(129,140,248,.1)' },
                { label: 'Commandes totales', value: stats.orders, icon: <ShoppingBag size={20} />, color: '#FF9A4D', bg: 'rgba(255,107,0,.1)' },
                { label: 'Tickets ouverts', value: stats.openTickets, icon: <MessageSquare size={20} />, color: '#F59E0B', bg: 'rgba(245,158,11,.1)' },
                { label: 'CA initial total', value: fmt(stats.revenue), icon: <TrendingUp size={20} />, color: '#4ADE80', bg: 'rgba(34,197,94,.1)' },
              ].map(({ label, value, icon, color, bg }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.75rem', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1rem' }}>{icon}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>{value}</div>
                  <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', marginTop: '.25rem' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Statuts des commandes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <div style={{ fontWeight: 800, color: 'white', marginBottom: '1.25rem', fontSize: '.9rem' }}>Commandes par statut</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                  {stats.ordersByStatus.map(({ status, n }) => {
                    const m = STATUS_META[status] ?? { label: status, color: '#64748B', icon: null }
                    return (
                      <div key={status} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>
                          <span style={{ color: m.color }}>{m.icon}</span> {m.label}
                        </div>
                        <span style={{ fontWeight: 800, color: m.color, fontSize: '.9rem' }}>{n}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Commandes récentes */}
              <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{ fontWeight: 800, color: 'white', fontSize: '.9rem' }}>Dernières commandes</span>
                  <Link href="/admin/commandes" style={{ fontSize: '.72rem', color: '#FF9A4D', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.2rem' }}>Tout voir <ArrowRight size={11} /></Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                  {stats.recentOrders.map((o) => {
                    const m = STATUS_META[o.status] ?? STATUS_META.pending
                    return (
                      <Link key={o.id} href={`/admin/commandes/${o.id}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.75rem', borderRadius: '.875rem', background: 'rgba(255,255,255,.02)', textDecoration: 'none', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '120px' }}>
                          <div style={{ fontWeight: 700, color: 'white', fontSize: '.82rem' }}>{o.template_label}</div>
                          <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)', marginTop: '1px' }}>{o.client_name} · {o.reference}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontWeight: 800, color: 'white', fontSize: '.82rem' }}>{fmt(o.total_initial)}</div>
                          <div style={{ fontSize: '.65rem', color: m.color, marginTop: '1px', display: 'flex', alignItems: 'center', gap: '.2rem', justifyContent: 'flex-end' }}>{m.icon} {m.label}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  )
}
