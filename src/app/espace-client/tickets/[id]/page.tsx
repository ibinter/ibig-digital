'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Loader2, User, Headphones } from 'lucide-react'

interface Msg { id: string; sender_type: 'client' | 'ibig'; message: string; created_at: string }
interface Ticket { id: string; subject: string; priority: string; status: string; created_at: string; order_reference?: string; template_label?: string }

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const bottomRef = useRef<HTMLDivElement>(null)

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)

  const PRIORITY_COLOR: Record<string, string> = { low: '#64748B', normal: '#3B82F6', high: '#F97316', urgent: '#EF4444' }

  useEffect(() => {
    fetch(`/api/espace-client/tickets/${id}`)
      .then((r) => { if (r.status === 401) { router.push('/espace-client'); return null } return r.json() })
      .then((d) => { if (d) { setTicket(d.ticket); setMessages(d.messages) } })
      .finally(() => setLoading(false))
  }, [id, router])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim() || sending) return
    setSending(true)
    try {
      const res = await fetch(`/api/espace-client/tickets/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply }),
      })
      if (res.ok) {
        setMessages((prev) => [...prev, { id: Date.now().toString(), sender_type: 'client', message: reply.trim(), created_at: new Date().toISOString() }])
        setReply('')
      }
    } finally { setSending(false) }
  }

  if (loading) return <div style={{ minHeight: '100vh', background: '#0B0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.3)' }}>Chargement…</div>
  if (!ticket) return null

  const isOpen = ticket.status === 'open' || ticket.status === 'in_progress'

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1E', display: 'flex', flexDirection: 'column', fontFamily: 'inherit' }}>
      <style>{`
        .msg-bubble { max-width:75%; padding:.875rem 1.1rem; border-radius:1.25rem; font-size:.85rem; line-height:1.65; word-break:break-word; }
        .msg-client { background:rgba(255,107,0,.12); border:1px solid rgba(255,107,0,.2); color:white; border-bottom-right-radius:.375rem; }
        .msg-ibig   { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.09); color:rgba(255,255,255,.85); border-bottom-left-radius:.375rem; }
        .rep-input  { flex:1; padding:.75rem 1.1rem; border-radius:1rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.88rem; outline:none; resize:none; transition:border-color .15s; }
        .rep-input:focus { border-color:#FF6B00; }
        .rep-input::placeholder { color:rgba(255,255,255,.25); }
      `}</style>

      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.02)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/espace-client/tickets" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.8rem' }}>
          <ArrowLeft size={14} /> Tickets
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, color: 'white', fontSize: '.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.subject}</div>
          <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)', display: 'flex', gap: '.75rem', marginTop: '2px', flexWrap: 'wrap' }}>
            {ticket.template_label && <span>📦 {ticket.template_label}</span>}
            <span>🕐 {new Date(ticket.created_at).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
          <span style={{ fontSize: '.65rem', fontWeight: 700, color: PRIORITY_COLOR[ticket.priority] ?? '#3B82F6', background: `${PRIORITY_COLOR[ticket.priority] ?? '#3B82F6'}15`, padding: '.22rem .6rem', borderRadius: '9999px' }}>
            {ticket.priority === 'urgent' ? 'Urgent' : ticket.priority === 'high' ? 'Élevée' : ticket.priority === 'low' ? 'Faible' : 'Normal'}
          </span>
          <span style={{ fontSize: '.65rem', fontWeight: 700, color: isOpen ? '#F59E0B' : '#64748B', background: isOpen ? 'rgba(245,158,11,.1)' : 'rgba(100,116,139,.1)', padding: '.22rem .6rem', borderRadius: '9999px' }}>
            {ticket.status === 'in_progress' ? 'En cours' : ticket.status === 'resolved' ? 'Résolu' : ticket.status === 'closed' ? 'Fermé' : 'Ouvert'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.sender_type === 'client' ? 'flex-end' : 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem', flexDirection: m.sender_type === 'client' ? 'row-reverse' : 'row' }}>
              <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: m.sender_type === 'client' ? 'rgba(255,107,0,.2)' : 'rgba(59,130,246,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {m.sender_type === 'client' ? <User size={12} style={{ color: '#FF9A4D' }} /> : <Headphones size={12} style={{ color: '#60A5FA' }} />}
              </div>
              <div className={`msg-bubble ${m.sender_type === 'client' ? 'msg-client' : 'msg-ibig'}`}>
                {m.message}
              </div>
            </div>
            <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.2)', marginTop: '.35rem', paddingLeft: m.sender_type === 'ibig' ? '2.25rem' : 0, paddingRight: m.sender_type === 'client' ? '2.25rem' : 0 }}>
              {m.sender_type === 'ibig' && <span style={{ color: '#60A5FA', fontWeight: 700, marginRight: '.4rem' }}>Équipe IBIG DIGITAL</span>}
              {new Date(m.created_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Zone de réponse */}
      {isOpen ? (
        <form onSubmit={send} style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.02)', display: 'flex', gap: '.75rem', alignItems: 'flex-end' }}>
          <textarea className="rep-input" rows={2} placeholder="Votre réponse…" value={reply} onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(e as unknown as React.FormEvent) } }} />
          <button type="submit" disabled={!reply.trim() || sending}
            style={{ width: '2.75rem', height: '2.75rem', borderRadius: '.875rem', border: 'none', cursor: reply.trim() && !sending ? 'pointer' : 'not-allowed', background: reply.trim() && !sending ? 'linear-gradient(135deg,#FF6B00,#FF4500)' : 'rgba(255,255,255,.08)', color: reply.trim() && !sending ? 'white' : 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {sending ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={15} />}
          </button>
        </form>
      ) : (
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,.06)', textAlign: 'center', color: 'rgba(255,255,255,.3)', fontSize: '.82rem' }}>
          Ce ticket est fermé. <Link href="/espace-client/tickets/nouveau" style={{ color: '#FF9A4D', textDecoration: 'underline' }}>Ouvrir un nouveau ticket</Link>
        </div>
      )}
    </div>
  )
}
