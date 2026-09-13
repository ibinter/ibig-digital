'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import { Search, Users } from 'lucide-react'

interface Client { id: string; email: string; name: string; phone?: string; company?: string; country?: string; is_active: boolean; created_at: string; order_count: number; total_spent: number }

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export default function AdminClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = (q: string) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    fetch(`/api/admin/clients?${params}`)
      .then((r) => { if (r.status === 401) { router.push('/admin'); return null } return r.json() })
      .then((d) => { if (d) setClients(d) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load('') }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>
        <style>{`
          @media(max-width:767px){main{padding-top:5rem!important}}
          .cl-srch { padding:.7rem 1rem .7rem 2.75rem; border-radius:.875rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.85rem; outline:none; width:100%; max-width:320px; box-sizing:border-box; }
          .cl-srch:focus { border-color:#FF6B00; }
          .cl-srch::placeholder { color:rgba(255,255,255,.22); }
        `}</style>

        <div style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>Clients ({clients.length})</h1>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '.9rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.3)', pointerEvents: 'none' }} />
            <input className="cl-srch" placeholder="Nom, e-mail…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') load(search) }} />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>Chargement…</div>
        ) : clients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>
            <Users size={48} style={{ margin: '0 auto 1rem', opacity: .15 }} />
            <p>Aucun client.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
              <thead>
                <tr>
                  {['Client', 'E-mail', 'Pays', 'Commandes', 'CA total', 'Inscrit le', 'Statut'].map((h) => (
                    <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,.35)', fontWeight: 700, fontSize: '.68rem', letterSpacing: '.05em', borderBottom: '1px solid rgba(255,255,255,.07)', whiteSpace: 'nowrap' }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                    <td style={{ padding: '.875rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: 'white' }}>{c.name}</div>
                      {c.company && <div style={{ fontSize: '.68rem', color: '#FF9A4D', marginTop: '1px' }}>{c.company}</div>}
                    </td>
                    <td style={{ padding: '.875rem 1rem', color: 'rgba(255,255,255,.5)' }}>{c.email}</td>
                    <td style={{ padding: '.875rem 1rem', color: 'rgba(255,255,255,.45)' }}>{c.country ?? '—'}</td>
                    <td style={{ padding: '.875rem 1rem', color: 'white', fontWeight: 700, textAlign: 'center' }}>{c.order_count}</td>
                    <td style={{ padding: '.875rem 1rem', color: c.total_spent > 0 ? '#4ADE80' : 'rgba(255,255,255,.3)', fontWeight: 700, whiteSpace: 'nowrap' }}>{c.total_spent > 0 ? fmt(c.total_spent) : '—'}</td>
                    <td style={{ padding: '.875rem 1rem', color: 'rgba(255,255,255,.3)', whiteSpace: 'nowrap', fontSize: '.75rem' }}>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
                    <td style={{ padding: '.875rem 1rem' }}>
                      <span style={{ fontSize: '.65rem', fontWeight: 700, padding: '.2rem .55rem', borderRadius: '9999px', color: c.is_active ? '#4ADE80' : '#EF4444', background: c.is_active ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)' }}>
                        {c.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
