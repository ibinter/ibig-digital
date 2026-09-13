'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { Search, ArrowRight, Clock, Loader, CheckCircle, Archive } from 'lucide-react'

interface Order { id: string; reference: string; template_label: string; formule: string; total_initial: number; status: string; created_at: string; client_name: string; client_email: string; domain?: string }

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: 'En attente',  color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
  in_progress: { label: 'En cours',    color: '#3B82F6', bg: 'rgba(59,130,246,.12)' },
  delivered:   { label: 'Livré ✓',    color: '#22C55E', bg: 'rgba(34,197,94,.12)' },
  archived:    { label: 'Archivé',     color: '#64748B', bg: 'rgba(100,116,139,.12)' },
}
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'
const FILTERS = ['', 'pending', 'in_progress', 'delivered', 'archived']
const FILTER_LABELS: Record<string, string> = { '': 'Toutes', pending: 'En attente', in_progress: 'En cours', delivered: 'Livrées', archived: 'Archivées' }

export default function AdminCommandesPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  const load = (st: string, q: string) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (st) params.set('status', st)
    if (q) params.set('q', q)
    fetch(`/api/admin/commandes?${params}`)
      .then((r) => { if (r.status === 401) { router.push('/admin'); return null } return r.json() })
      .then((d) => { if (d) setOrders(d) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(status, search) }, [status])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>
        <style>{`
          @media(max-width:767px){main{padding-top:5rem!important}}
          .srch { padding:.7rem 1rem .7rem 2.75rem; border-radius:.875rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.85rem; outline:none; width:100%; max-width:320px; box-sizing:border-box; }
          .srch:focus { border-color:#FF6B00; }
          .srch::placeholder { color:rgba(255,255,255,.22); }
          .filter-btn { padding:.45rem 1rem; border-radius:.75rem; font-size:.75rem; font-weight:700; cursor:pointer; border:1px solid rgba(255,255,255,.08); transition:all .15s; }
        `}</style>

        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', marginBottom: '1.25rem' }}>Commandes</h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '.9rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.3)', pointerEvents: 'none' }} />
              <input className="srch" placeholder="Réf., client, e-mail…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') load(status, search) }} />
            </div>
            <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
              {FILTERS.map((f) => (
                <button key={f} className="filter-btn" onClick={() => setStatus(f)}
                  style={{ background: status === f ? 'rgba(255,107,0,.12)' : 'rgba(255,255,255,.04)', borderColor: status === f ? 'rgba(255,107,0,.3)' : 'rgba(255,255,255,.08)', color: status === f ? '#FF9A4D' : 'rgba(255,255,255,.45)' }}>
                  {FILTER_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>Chargement…</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>Aucune commande.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {orders.map((o) => {
              const m = STATUS_META[o.status] ?? STATUS_META.pending
              return (
                <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap', marginBottom: '.25rem' }}>
                      <span style={{ fontWeight: 800, color: 'white', fontSize: '.9rem' }}>{o.template_label}</span>
                      <span style={{ fontSize: '.65rem', fontWeight: 700, color: m.color, background: m.bg, padding: '.18rem .55rem', borderRadius: '9999px' }}>{m.label}</span>
                    </div>
                    <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.35)', fontFamily: 'monospace', marginBottom: '.35rem' }}>Réf. {o.reference}</div>
                    <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>
                      👤 <span style={{ color: 'rgba(255,255,255,.6)' }}>{o.client_name}</span> · {o.client_email}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontWeight: 900, color: 'white', fontSize: '.95rem' }}>{fmt(o.total_initial)}</div>
                    <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)', marginTop: '.2rem' }}>{new Date(o.created_at).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <Link href={`/admin/commandes/${o.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '.35rem', padding: '.55rem 1.1rem', borderRadius: '.75rem', fontSize: '.78rem', fontWeight: 700, color: '#FF9A4D', background: 'rgba(255,107,0,.08)', border: '1px solid rgba(255,107,0,.2)', textDecoration: 'none', flexShrink: 0 }}>
                    Gérer <ArrowRight size={13} />
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
