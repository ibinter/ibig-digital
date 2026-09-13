'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { router.push('/admin/dashboard') }
      else { const d = await res.json(); setError(d.error ?? 'Erreur.') }
    } catch { setError('Erreur réseau.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06091A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'system-ui,sans-serif' }}>
      <style>{`
        .adm-input { width:100%; padding:.8rem 1rem .8rem 2.75rem; border-radius:.875rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.9rem; outline:none; transition:border-color .15s; box-sizing:border-box; }
        .adm-input:focus { border-color:#FF6B00; }
        .adm-input::placeholder { color:rgba(255,255,255,.22); }
      `}</style>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', letterSpacing: '-.02em' }}>
            IBIG <span style={{ color: '#FF6B00' }}>DIGITAL</span>
          </div>
          <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.3)', marginTop: '.4rem' }}>Back-office · Accès réservé</div>
        </div>

        <form onSubmit={submit} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={15} style={{ position: 'absolute', left: '.9rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.3)', pointerEvents: 'none' }} />
            <input className="adm-input" type="email" placeholder="Adresse e-mail" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required autoFocus />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={15} style={{ position: 'absolute', left: '.9rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.3)', pointerEvents: 'none' }} />
            <input className="adm-input" type={showPwd ? 'text' : 'password'} placeholder="Mot de passe" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required style={{ paddingRight: '2.75rem' }} />
            <button type="button" onClick={() => setShowPwd((p) => !p)} style={{ position: 'absolute', right: '.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.3)', padding: 0 }}>
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && <div style={{ padding: '.7rem 1rem', borderRadius: '.75rem', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', color: '#FCA5A5', fontSize: '.78rem' }}>{error}</div>}

          <button type="submit" disabled={loading}
            style={{ padding: '.9rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', background: loading ? 'rgba(255,255,255,.08)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: loading ? 'rgba(255,255,255,.3)' : 'white', marginTop: '.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
            {loading ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Connexion…</> : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
