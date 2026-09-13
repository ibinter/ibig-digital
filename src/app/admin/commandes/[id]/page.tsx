'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { ArrowLeft, Save, Loader2, ExternalLink, MessageSquare } from 'lucide-react'

interface Order {
  id: string; reference: string; template_label: string; template_sector: string; formule: string
  domain?: string; hosting: string; maintenance: string; total_initial: number; total_annual: number; total_monthly: number
  status: string; site_url?: string; admin_url?: string; delivery_date?: string; notes?: string; created_at: string
  client_name: string; client_email: string; client_phone?: string; client_company?: string
  modules?: string; personalization?: string
}
interface Ticket { id: string; subject: string; status: string; priority: string; updated_at: string }

const STATUSES = ['pending', 'in_progress', 'delivered', 'archived']
const STATUS_LABELS: Record<string, string> = { pending: 'En attente', in_progress: 'En cours', delivered: 'Livré', archived: 'Archivé' }
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export default function AdminCommandeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState({ status: '', site_url: '', admin_url: '', delivery_date: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/commandes/${id}`)
      .then((r) => { if (r.status === 401) { router.push('/admin'); return null } return r.json() })
      .then((d) => {
        if (d) {
          setOrder(d.order)
          setTickets(d.tickets)
          setEdit({ status: d.order.status, site_url: d.order.site_url ?? '', admin_url: d.order.admin_url ?? '', delivery_date: d.order.delivery_date ? d.order.delivery_date.slice(0, 10) : '', notes: d.order.notes ?? '' })
        }
      })
      .finally(() => setLoading(false))
  }, [id, router])

  const save = async () => {
    setSaving(true)
    await fetch(`/api/admin/commandes/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(edit) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div style={{ minHeight: '100vh', background: '#06091A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.3)', fontFamily: 'system-ui' }}>Chargement…</div>
  if (!order) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden', maxWidth: '960px' }}>
        <style>{`
          @media(max-width:767px){main{padding-top:5rem!important}}
          .adm-inp { width:100%; padding:.7rem .9rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.85rem; outline:none; box-sizing:border-box; transition:border-color .15s; }
          .adm-inp:focus { border-color:#FF6B00; }
          .adm-inp::placeholder { color:rgba(255,255,255,.22); }
          .adm-select option { background:#1E293B; }
        `}</style>

        <Link href="/admin/commandes" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,.3)', fontSize: '.78rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
          <ArrowLeft size={13} /> Retour
        </Link>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'white', marginBottom: '.2rem' }}>{order.template_label}</h1>
            <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', fontFamily: 'monospace' }}>Réf. {order.reference} · {new Date(order.created_at).toLocaleDateString('fr-FR')}</div>
          </div>
          <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', textAlign: 'right' }}>
            <div style={{ fontWeight: 700, color: 'white', fontSize: '.88rem' }}>{order.client_name}</div>
            <div>{order.client_email}</div>
            {order.client_phone && <div>{order.client_phone}</div>}
            {order.client_company && <div style={{ color: '#FF9A4D' }}>{order.client_company}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {/* Config */}
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <div style={{ fontSize: '.7rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.06em', marginBottom: '1rem' }}>CONFIGURATION CLIENT</div>
            {[
              ['Secteur', order.template_sector],
              ['Formule', order.formule],
              ['Domaine', order.domain || '—'],
              ['Hébergement', order.hosting],
              ['Maintenance', order.maintenance],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '.4rem 0', borderBottom: '1px solid rgba(255,255,255,.04)', fontSize: '.8rem' }}>
                <span style={{ color: 'rgba(255,255,255,.4)' }}>{l}</span>
                <span style={{ fontWeight: 600, color: 'white', textTransform: 'capitalize' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Facturation */}
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <div style={{ fontSize: '.7rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.06em', marginBottom: '1rem' }}>FACTURATION</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', marginBottom: '.5rem' }}>{fmt(order.total_initial)}</div>
            {order.total_annual > 0 && <div style={{ fontSize: '.8rem', color: '#FF9A4D', marginBottom: '.25rem' }}>Renouvellement : {fmt(order.total_annual)}/an</div>}
            {order.total_monthly > 0 && <div style={{ fontSize: '.8rem', color: '#818CF8' }}>Abonnement : {fmt(order.total_monthly)}/mois</div>}
          </div>
        </div>

        {/* Zone de gestion */}
        <div style={{ background: 'rgba(255,107,0,.04)', border: '1px solid rgba(255,107,0,.2)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '.7rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.06em', marginBottom: '1.25rem' }}>GESTION DE LA COMMANDE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: '.35rem', display: 'block' }}>Statut *</label>
              <select className="adm-inp adm-select" value={edit.status} onChange={(e) => setEdit((p) => ({ ...p, status: e.target.value }))}>
                {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: '.35rem', display: 'block' }}>Date de livraison</label>
              <input type="date" className="adm-inp" value={edit.delivery_date} onChange={(e) => setEdit((p) => ({ ...p, delivery_date: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: '.35rem', display: 'block' }}>URL du site livré</label>
              <input className="adm-inp" placeholder="https://monsite.com" value={edit.site_url} onChange={(e) => setEdit((p) => ({ ...p, site_url: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: '.35rem', display: 'block' }}>URL administration</label>
              <input className="adm-inp" placeholder="https://monsite.com/admin" value={edit.admin_url} onChange={(e) => setEdit((p) => ({ ...p, admin_url: e.target.value }))} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: '.35rem', display: 'block' }}>Notes internes</label>
              <textarea className="adm-inp" rows={3} placeholder="Notes visibles uniquement par l'équipe IBIG…" value={edit.notes} onChange={(e) => setEdit((p) => ({ ...p, notes: e.target.value }))} style={{ resize: 'vertical' }} />
            </div>
          </div>
          <button onClick={save} disabled={saving}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1.5rem', borderRadius: '.875rem', fontWeight: 800, fontSize: '.85rem', cursor: saving ? 'not-allowed' : 'pointer', border: 'none', background: saved ? 'rgba(34,197,94,.2)' : saving ? 'rgba(255,255,255,.08)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: saved ? '#4ADE80' : saving ? 'rgba(255,255,255,.3)' : 'white' }}>
            {saving ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sauvegarde…</> : saved ? '✓ Sauvegardé' : <><Save size={14} /> Enregistrer</>}
          </button>
        </div>

        {/* Liens rapides */}
        {(edit.site_url || edit.admin_url) && (
          <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {edit.site_url && <a href={edit.site_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.55rem 1.1rem', borderRadius: '.75rem', fontSize: '.78rem', fontWeight: 700, color: '#4ADE80', background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', textDecoration: 'none' }}>Site client <ExternalLink size={12} /></a>}
            {edit.admin_url && <a href={edit.admin_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.55rem 1.1rem', borderRadius: '.75rem', fontSize: '.78rem', fontWeight: 700, color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>Backoffice site <ExternalLink size={12} /></a>}
          </div>
        )}

        {/* Tickets liés */}
        {tickets.length > 0 && (
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', padding: '1.5rem' }}>
            <div style={{ fontWeight: 800, color: 'white', marginBottom: '1rem', fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <MessageSquare size={15} style={{ color: '#F59E0B' }} /> Tickets de support ({tickets.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {tickets.map((t) => (
                <Link key={t.id} href={`/admin/tickets/${t.id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '.875rem', padding: '.75rem', borderRadius: '.875rem', background: 'rgba(255,255,255,.02)', textDecoration: 'none' }}>
                  <span style={{ flex: 1, fontSize: '.82rem', color: 'white', fontWeight: 600 }}>{t.subject}</span>
                  <span style={{ fontSize: '.65rem', color: '#F59E0B', background: 'rgba(245,158,11,.1)', padding: '.18rem .5rem', borderRadius: '9999px' }}>{t.status}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
