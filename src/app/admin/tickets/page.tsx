'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { ArrowRight } from 'lucide-react'

interface Ticket { id: string; subject: string; priority: string; status: string; created_at: string; updated_at: string; order_reference?: string; template_label?: string; client_name: string; client_email: string; message_count: number }

const PRIORITY_COLOR: Record<string, string> = { low: '#64748B', normal: '#3B82F6', high: '#F97316', urgent: '#EF4444' }
const PRIORITY_LABEL: Record<string, string> = { low: 'Faible', normal: 'Normal', high: 'Élevée', urgent: 'Urgent' }
const STATUS_LABEL: Record<string, string> = { open: 'Ouvert', in_progress: 'En cours', resolved: 'Résolu', closed: 'Fermé' }
const FILTERS = [{ v: '', l: 'Tous' }, { v: 'open', l: 'Ouverts' }, { v: 'in_progress', l: 'En cours' }, { v: 'resolved', l: 'Résolus' }, { v: 'closed', l: 'Fermés' }]

export default function AdminTicketsPage() {
  const router = useRouter()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('open')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    fetch(`/api/admin/tickets?${params}`)
      .then((r) => { if (r.status === 401) { router.push('/admin'); return null } return r.json() })
      .then((d) => { if (d) setTickets(d) })
      .finally(() => setLoading(false))
  }, [status, router])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>
        <style>{`@media(max-width:767px){main{padding-top:5rem!important}} .fb{padding:.42rem .9rem;border-radius:.75rem;font-size:.74rem;font-weight:700;cursor:pointer;border:1px solid transparent;transition:all .15s}`}</style>

        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>Tickets support</h1>
          <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
            {FILTERS.map(({ v, l }) => (
              <button key={v} className="fb" onClick={() => setStatus(v)}
                style={{ background: status === v ? 'rgba(255,107,0,.12)' : 'rgba(255,255,255,.04)', borderColor: status === v ? 'rgba(255,107,0,.3)' : 'rgba(255,255,255,.08)', color: status === v ? '#FF9A4D' : 'rgba(255,255,255,.45)' }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>Chargement…</div>
        ) : tickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>Aucun ticket.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {tickets.map((t) => {
              const pc = PRIORITY_COLOR[t.priority] ?? '#3B82F6'
              const isOpen = t.status === 'open' || t.status === 'in_progress'
              return (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.5rem', borderRadius: '1.25rem', background: 'rgba(255,255,255,.03)', border: `1px solid ${isOpen ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.04)'}`, flexWrap: 'wrap', opacity: isOpen ? 1 : .6 }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '.88rem', marginBottom: '.25rem' }}>{t.subject}</div>
                    <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.35)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span>👤 {t.client_name}</span>
                      {t.template_label && <span>📦 {t.template_label}</span>}
                      <span>💬 {t.message_count} msg</span>
                      <span>🕐 {new Date(t.updated_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '.4rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '.64rem', fontWeight: 700, color: pc, background: `${pc}15`, padding: '.18rem .5rem', borderRadius: '9999px', border: `1px solid ${pc}30` }}>{PRIORITY_LABEL[t.priority] ?? t.priority}</span>
                    <span style={{ fontSize: '.64rem', fontWeight: 700, color: isOpen ? '#F59E0B' : '#64748B', background: isOpen ? 'rgba(245,158,11,.1)' : 'rgba(100,116,139,.1)', padding: '.18rem .5rem', borderRadius: '9999px' }}>{STATUS_LABEL[t.status] ?? t.status}</span>
                  </div>
                  <Link href={`/admin/tickets/${t.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '.3rem', padding: '.5rem 1rem', borderRadius: '.75rem', fontSize: '.75rem', fontWeight: 700, color: '#FF9A4D', background: 'rgba(255,107,0,.08)', border: '1px solid rgba(255,107,0,.2)', textDecoration: 'none', flexShrink: 0 }}>
                    Répondre <ArrowRight size={12} />
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
