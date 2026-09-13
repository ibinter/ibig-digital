'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, UserPlus, AlertCircle, Loader2, CheckCircle } from 'lucide-react'

export default function EspaceClientPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', company: '', country: "Côte d'Ivoire" })
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const COUNTRIES = ["Côte d'Ivoire", 'Sénégal', 'Mali', 'Burkina Faso', 'Guinée', 'Togo', 'Bénin', 'Cameroun', 'Ghana', 'Nigeria', 'France', 'Belgique', 'Autre']

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/espace-client/auth/login' : '/api/espace-client/auth/register'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Une erreur est survenue.'); return }
      setSuccess(mode === 'login' ? 'Connexion réussie…' : 'Compte créé ! Redirection…')
      setTimeout(() => router.push('/espace-client/dashboard'), 800)
    } catch {
      setError('Erreur réseau. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06091A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'inherit' }}>
      <style>{`
        .ec-input { width:100%; padding:.75rem 1rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.9rem; outline:none; transition:border-color .15s; box-sizing:border-box; }
        .ec-input:focus { border-color:#FF6B00; background:rgba(255,107,0,.05); }
        .ec-input::placeholder { color:rgba(255,255,255,.25); }
        .ec-select { appearance:none; }
        .ec-select option { background:#1E293B; }
        .ec-btn { width:100%; padding:.875rem; border-radius:1rem; font-weight:800; font-size:.95rem; cursor:pointer; border:none; display:flex; align-items:center; justify-content:center; gap:.6rem; transition:all .18s; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', marginBottom: '.25rem' }}>
            IBIG <span style={{ color: '#FF6B00' }}>DIGITAL</span>
          </div>
          <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', fontWeight: 600 }}>ESPACE CLIENT</div>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '1.5rem', padding: '2rem' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,.05)', borderRadius: '.875rem', padding: '.25rem', marginBottom: '1.75rem' }}>
            {(['login', 'register'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
                style={{ flex: 1, padding: '.625rem', borderRadius: '.625rem', border: 'none', cursor: 'pointer', fontSize: '.82rem', fontWeight: 700, transition: 'all .15s',
                  background: mode === m ? 'rgba(255,107,0,.15)' : 'transparent',
                  color: mode === m ? '#FF9A4D' : 'rgba(255,255,255,.4)',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,.3)' : 'none' }}>
                {m === 'login' ? '🔑 Connexion' : '✨ Créer un compte'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'register' && (
              <>
                <div>
                  <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Nom complet *</label>
                  <input className="ec-input" placeholder="Votre nom et prénom" value={form.name} onChange={(e) => set('name', e.target.value)} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Téléphone</label>
                    <input className="ec-input" placeholder="+225 07 …" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Pays</label>
                    <select className="ec-input ec-select" value={form.country} onChange={(e) => set('country', e.target.value)}>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Entreprise / Organisation</label>
                  <input className="ec-input" placeholder="Nom de votre structure (optionnel)" value={form.company} onChange={(e) => set('company', e.target.value)} />
                </div>
              </>
            )}

            <div>
              <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Adresse email *</label>
              <input className="ec-input" type="email" placeholder="email@exemple.com" value={form.email} onChange={(e) => set('email', e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: '.4rem', display: 'block' }}>Mot de passe *</label>
              <div style={{ position: 'relative' }}>
                <input className="ec-input" type={showPwd ? 'text' : 'password'} placeholder={mode === 'register' ? 'Min. 8 caractères' : 'Votre mot de passe'} value={form.password} onChange={(e) => set('password', e.target.value)} required style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPwd((v) => !v)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', cursor: 'pointer', padding: 0 }}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1rem', borderRadius: '.75rem', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', color: '#FCA5A5', fontSize: '.8rem' }}>
                <AlertCircle size={14} style={{ flexShrink: 0 }} /> {error}
              </div>
            )}
            {success && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1rem', borderRadius: '.75rem', background: 'rgba(74,222,128,.1)', border: '1px solid rgba(74,222,128,.2)', color: '#4ADE80', fontSize: '.8rem' }}>
                <CheckCircle size={14} style={{ flexShrink: 0 }} /> {success}
              </div>
            )}

            <button type="submit" className="ec-btn" disabled={loading}
              style={{ background: loading ? 'rgba(255,255,255,.08)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: loading ? 'rgba(255,255,255,.3)' : 'white', boxShadow: loading ? 'none' : '0 8px 24px rgba(255,107,0,.3)', marginTop: '.25rem' }}>
              {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Chargement…</> : mode === 'login' ? <><LogIn size={16} /> Se connecter</> : <><UserPlus size={16} /> Créer mon compte</>}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: '.72rem', marginTop: '1.5rem' }}>
          En vous connectant, vous acceptez nos <a href="/cgu" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'underline' }}>CGU</a> et notre <a href="/politique-confidentialite" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'underline' }}>politique de confidentialité</a>.
        </p>
      </div>
    </div>
  )
}
