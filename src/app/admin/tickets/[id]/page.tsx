'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { ArrowLeft, Send, Loader2, User, Headphones } from 'lucide-react'

interface Msg { id: string; sender_type: 'client' | 'ibig'; message: string; created_at: string }
interface Ticket { id: string; subject: string; priority: string; status: string; created_at: string; client_name: string; client_email: string; order_reference?: string; template_label?: string }

const STATUS_OPTS = [{ v: 'open', l: 'Ouvert' }, { v: 'in_progress', l: 'En cours' }, { v: 'resolved', l: 'Résolu' }, { v: 'closed', l: 'Fermé' }]
const PRIORITY_COLOR: Record<string, string> = { low: '#64748B', normal: '#3B82F6', high: '#F97316', urgent: '#EF4444' }

export default function AdminTicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const bottomRef = useRef<HTMLDivElement>(null)

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState('')
  const [nextStatus, setNextStatus] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/tickets/${id}`)
      .then((r) => { if (r.status === 401) { router.push('/admin'); return null } return r.json() })
      .then((d) => { if (d) { setTicket(d.ticket); setMessages(d.messages); setNextStatus(d.ticket.status) } })
      .finally(() => setLoading(false))
  }, [id, router])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    try {
      const res = await fetch(`/api/admin/tickets/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply.trim() || undefined, status: nextStatus }),
      })
      if (res.ok) {
        if (reply.trim()) {
          setMessages((p) => [...p, { id: Date.now().toString(), sender_type: 'ibig', message: reply.trim(), created_at: new Date().toISOString() }])
          setReply('')
        }
        setTicket((p) => p ? { ...p, status: nextStatus } : p)
      }
    } finally { setSending(false) }
  }

  if (loading) return <div style={{ minHeight: '100vh', background: '#06091A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.3)', fontFamily: 'system-ui' }}>Chargement…</div>
  if (!ticket) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <style>{`
          @media(max-width:767px){main{padding-top:4rem}}
          .adm-msg-bubble { max-width:72%; padding:.8rem 1rem; border-radius:1.2rem; font-size:.84rem; line-height:1.65; word-break:break-word; }
          .adm-msg-ibig   { background:rgba(255,107,0,.1); border:1px solid rgba(255,107,0,.18); color:white; border-bottom-right-radius:.35rem; }
          .adm-msg-client { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.09); color:rgba(255,255,255,.85); border-bottom-left-radius:.35rem; }
          .rep-ta { flex:1; padding:.7rem 1rem; border-radius:1rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.85rem; outline:none; resize:none; transition:border-color .15s; }
          .rep-ta:focus { border-color:#FF6B00; }
          .rep-ta::placeholder { color:rgba(255,255,255,.22); }
          .st-sel option { background:#1E293B; }
        `}</style>

        {/* Header */}
        <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.02)', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/admin/tickets" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.75rem' }}>
            <ArrowLeft size={13} /> Tickets
          </Link>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, color: 'white', fontSize: '.92rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.subject}</div>
            <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)', display: 'flex', gap: '.75rem', marginTop: '1px', flexWrap: 'wrap' }}>
              <span>👤 {ticket.client_name} · {ticket.client_email}</span>
              {ticket.template_label && <span>📦 {ticket.template_label}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexShrink: 0 }}>
            <span style={{ fontSize: '.64rem', fontWeight: 700, color: PRIORITY_COLOR[ticket.priority] ?? '#3B82F6', background: `${PRIORITY_COLOR[ticket.priority] ?? '#3B82F6'}15`, padding: '.2rem .55rem', borderRadius: '9999px' }}>
              {ticket.priority === 'urgent' ? '🔴 Urgent' : ticket.priority === 'high' ? '🟠 Élevée' : ticket.priority === 'normal' ? '🔵 Normal' : '🟢 Faible'}
            </span>
            <select className="st-sel" value={nextStatus} onChange={(e) => setNextStatus(e.target.value)}
              style={{ padding: '.35rem .7rem', borderRadius: '.625rem', border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.07)', color: 'white', fontSize: '.72rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }}>
              {STATUS_OPTS.map(({ v, l }) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.sender_type === 'ibig' ? 'flex-end' : 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem', flexDirection: m.sender_type === 'ibig' ? 'row-reverse' : 'row' }}>
                <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: m.sender_type === 'ibig' ? 'rgba(255,107,0,.2)' : 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {m.sender_type === 'ibig' ? <Headphones size={12} style={{ color: '#FF9A4D' }} /> : <User size={12} style={{ color: 'rgba(255,255,255,.4)' }} />}
                </div>
                <div className={`adm-msg-bubble ${m.sender_type === 'ibig' ? 'adm-msg-ibig' : 'adm-msg-client'}`}>{m.message}</div>
              </div>
              <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.2)', marginTop: '.3rem', paddingLeft: m.sender_type === 'client' ? '2.25rem' : 0, paddingRight: m.sender_type === 'ibig' ? '2.25rem' : 0 }}>
                {m.sender_type === 'ibig' && <span style={{ color: '#FF9A4D', fontWeight: 700, marginRight: '.3rem' }}>Équipe IBIG DIGITAL</span>}
                {m.sender_type === 'client' && <span style={{ color: 'rgba(255,255,255,.4)', fontWeight: 700, marginRight: '.3rem' }}>{ticket.client_name}</span>}
                {new Date(m.created_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Zone réponse admin */}
        <form onSubmit={send} style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.02)', display: 'flex', gap: '.75rem', alignItems: 'flex-end' }}>
          <textarea className="rep-ta" rows={2} placeholder="Répondre au client (laissez vide pour seulement changer le statut)…" value={reply} onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(e as unknown as React.FormEvent) } }} />
          <button type="submit" disabled={sending}
            style={{ width: '2.75rem', height: '2.75rem', borderRadius: '.875rem', border: 'none', cursor: sending ? 'not-allowed' : 'pointer', background: sending ? 'rgba(255,255,255,.08)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: sending ? 'rgba(255,255,255,.2)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {sending ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
          </button>
        </form>
      </main>
    </div>
  )
}
