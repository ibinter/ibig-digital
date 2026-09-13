'use client'
import { useState, useEffect, Suspense, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Loader2, AlertCircle } from 'lucide-react'

function NouveauTicketForm() {
  const router = useRouter()
  const sp = useSearchParams()
  const orderId = sp.get('order_id') ?? ''
  const orderRef = sp.get('order_ref') ?? ''

  const [orders, setOrders] = useState<Array<{ id: string; reference: string; template_label: string }>>([])
  const [form, setForm] = useState({ subject: '', message: '', order_id: orderId, priority: 'normal' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    fetch('/api/espace-client/commandes').then((r) => r.json()).then(setOrders).catch(() => {})
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/espace-client/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erreur lors de la création.'); return }
      router.push(`/espace-client/tickets/${data.ticketId}`)
    } catch {
      setError('Erreur réseau.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1E', padding: '2rem', paddingTop: '5rem', fontFamily: 'inherit' }}>
      <style>{`
        .nt-input { width:100%; padding:.75rem 1rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.9rem; outline:none; transition:border-color .15s; box-sizing:border-box; }
        .nt-input:focus { border-color:#FF6B00; }
        .nt-input::placeholder { color:rgba(255,255,255,.25); }
        .nt-select option { background:#1E293B; }
      `}</style>

      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <Link href="/espace-client/tickets" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,.35)', fontSize: '.8rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
          <ArrowLeft size={14} /> Retour aux tickets
        </Link>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', marginBottom: '.5rem' }}>Nouveau ticket</h1>
        <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.85rem', marginBottom: '2rem' }}>Décrivez votre demande. Notre équipe vous répond sous 24h.</p>

        <form onSubmit={submit} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Commande liée */}
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Commande concernée (optionnel)</label>
            <select className="nt-input nt-select" value={form.order_id} onChange={(e) => set('order_id', e.target.value)}>
              <option value="">Aucune commande spécifique</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>{o.template_label} — {o.reference}</option>
              ))}
            </select>
            {orderRef && <p style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.25)', marginTop: '.4rem' }}>Pré-sélectionné : {orderRef}</p>}
          </div>

          {/* Priorité */}
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.75rem', display: 'block' }}>Priorité</label>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'low',    label: '🟢 Faible',  desc: 'Question générale' },
                { id: 'normal', label: '🔵 Normale', desc: 'Demande standard' },
                { id: 'high',   label: '🟠 Élevée',  desc: 'Problème bloquant' },
                { id: 'urgent', label: '🔴 Urgent',  desc: 'Site inaccessible' },
              ].map((p) => (
                <button key={p.id} type="button" onClick={() => set('priority', p.id)}
                  style={{ padding: '.5rem 1rem', borderRadius: '.75rem', fontSize: '.78rem', fontWeight: 700, cursor: 'pointer', border: `1px solid ${form.priority === p.id ? '#FF6B00' : 'rgba(255,255,255,.1)'}`, background: form.priority === p.id ? 'rgba(255,107,0,.12)' : 'rgba(255,255,255,.04)', color: form.priority === p.id ? '#FF9A4D' : 'rgba(255,255,255,.5)', transition: 'all .15s' }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sujet */}
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Sujet *</label>
            <input className="nt-input" placeholder="Résumez votre demande en une ligne" value={form.subject} onChange={(e) => set('subject', e.target.value)} required />
          </div>

          {/* Message */}
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Description détaillée *</label>
            <textarea className="nt-input" rows={6} placeholder="Décrivez votre problème ou votre demande en détail. Plus vous êtes précis, plus nous pourrons vous aider rapidement." value={form.message} onChange={(e) => set('message', e.target.value)} required style={{ resize: 'vertical', minHeight: '140px' }} />
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1rem', borderRadius: '.75rem', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', color: '#FCA5A5', fontSize: '.8rem' }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem', padding: '.9rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.95rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', background: loading ? 'rgba(255,255,255,.08)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: loading ? 'rgba(255,255,255,.3)' : 'white', boxShadow: loading ? 'none' : '0 8px 24px rgba(255,107,0,.3)' }}>
            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Envoi…</> : <><Send size={15} /> Envoyer le ticket</>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function NouveauTicketPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0B0F1E' }} />}>
      <NouveauTicketForm />
    </Suspense>
  )
}
