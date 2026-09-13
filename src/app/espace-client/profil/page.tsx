'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EspaceClientNav from '@/components/espace-client/EspaceClientNav'
import { Save, Loader2, AlertCircle, CheckCircle2, Lock, User } from 'lucide-react'

interface Client { id: string; email: string; name: string; phone?: string; company?: string; country?: string }

const COUNTRIES = [
  'Côte d\'Ivoire', 'Sénégal', 'Mali', 'Burkina Faso', 'Guinée', 'Togo', 'Bénin',
  'Niger', 'Cameroun', 'Gabon', 'Congo', 'RDC', 'Madagascar', 'France', 'Autre',
]

export default function ProfilPage() {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'info' | 'password'>('info')

  const [form, setForm] = useState({ name: '', phone: '', company: '', country: '' })
  const [saving, setSaving] = useState(false)
  const [infoMsg, setInfoMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })
  const [pwdSaving, setPwdSaving] = useState(false)
  const [pwdMsg, setPwdMsg] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/espace-client/profil')
      .then((r) => { if (r.status === 401) { router.push('/espace-client'); return null } return r.json() })
      .then((d) => {
        if (d) {
          setClient(d)
          setForm({ name: d.name ?? '', phone: d.phone ?? '', company: d.company ?? '', country: d.country ?? '' })
        }
      })
      .finally(() => setLoading(false))
  }, [router])

  const saveInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setInfoMsg(null)
    try {
      const res = await fetch('/api/espace-client/profil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const d = await res.json()
      if (res.ok) {
        setClient((p) => p ? { ...p, ...form } : p)
        setInfoMsg({ ok: true, text: 'Profil mis à jour avec succès.' })
      } else {
        setInfoMsg({ ok: false, text: d.error ?? 'Erreur lors de la sauvegarde.' })
      }
    } catch {
      setInfoMsg({ ok: false, text: 'Erreur réseau.' })
    } finally {
      setSaving(false)
    }
  }

  const savePwd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pwd.next !== pwd.confirm) { setPwdMsg({ ok: false, text: 'Les nouveaux mots de passe ne correspondent pas.' }); return }
    if (pwd.next.length < 8) { setPwdMsg({ ok: false, text: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' }); return }
    setPwdSaving(true)
    setPwdMsg(null)
    try {
      const res = await fetch('/api/espace-client/profil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwd.current, newPassword: pwd.next }),
      })
      const d = await res.json()
      if (res.ok) {
        setPwd({ current: '', next: '', confirm: '' })
        setPwdMsg({ ok: true, text: 'Mot de passe modifié avec succès.' })
      } else {
        setPwdMsg({ ok: false, text: d.error ?? 'Erreur lors du changement.' })
      }
    } catch {
      setPwdMsg({ ok: false, text: 'Erreur réseau.' })
    } finally {
      setPwdSaving(false)
    }
  }

  if (loading) return <div style={{ minHeight: '100vh', background: '#0B0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.3)' }}>Chargement…</div>
  if (!client) return null

  const initials = client.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F1E' }}>
      <EspaceClientNav client={client} />
      <main style={{ flex: 1, padding: '2rem 2rem 4rem', overflowX: 'hidden', maxWidth: '680px' }}>
        <style>{`
          @media(max-width:767px){main{padding-top:5rem!important}}
          .pf-input { width:100%; padding:.75rem 1rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05); color:white; font-size:.88rem; outline:none; transition:border-color .15s; box-sizing:border-box; }
          .pf-input:focus { border-color:#FF6B00; }
          .pf-input::placeholder { color:rgba(255,255,255,.22); }
          .pf-input:disabled { opacity:.45; cursor:not-allowed; }
          .pf-select option { background:#1E293B; }
          .tab-btn { padding:.6rem 1.25rem; border-radius:.75rem; font-size:.82rem; font-weight:700; cursor:pointer; border:1px solid transparent; transition:all .15s; }
        `}</style>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', marginBottom: '2rem' }}>Mon profil</h1>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 900, color: 'white', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 800, color: 'white', fontSize: '1.05rem' }}>{client.name}</div>
            <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.35)', marginTop: '.2rem' }}>{client.email}</div>
            {client.company && <div style={{ fontSize: '.72rem', color: '#FF9A4D', marginTop: '.2rem' }}>{client.company}</div>}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.75rem' }}>
          <button className="tab-btn" onClick={() => setTab('info')}
            style={{ background: tab === 'info' ? 'rgba(255,107,0,.12)' : 'rgba(255,255,255,.04)', borderColor: tab === 'info' ? 'rgba(255,107,0,.3)' : 'rgba(255,255,255,.08)', color: tab === 'info' ? '#FF9A4D' : 'rgba(255,255,255,.45)' }}>
            <User size={13} style={{ display: 'inline', marginRight: '.35rem', verticalAlign: 'middle' }} />Informations
          </button>
          <button className="tab-btn" onClick={() => setTab('password')}
            style={{ background: tab === 'password' ? 'rgba(255,107,0,.12)' : 'rgba(255,255,255,.04)', borderColor: tab === 'password' ? 'rgba(255,107,0,.3)' : 'rgba(255,255,255,.08)', color: tab === 'password' ? '#FF9A4D' : 'rgba(255,255,255,.45)' }}>
            <Lock size={13} style={{ display: 'inline', marginRight: '.35rem', verticalAlign: 'middle' }} />Mot de passe
          </button>
        </div>

        {/* Tab info */}
        {tab === 'info' && (
          <form onSubmit={saveInfo} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)', marginBottom: '.4rem', display: 'block' }}>Adresse e-mail</label>
                <input className="pf-input" value={client.email} disabled />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)', marginBottom: '.4rem', display: 'block' }}>Nom complet *</label>
                <input className="pf-input" placeholder="Votre nom et prénom" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
              </div>
              <div>
                <label style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)', marginBottom: '.4rem', display: 'block' }}>Téléphone</label>
                <input className="pf-input" placeholder="+225 07 00 00 00 00" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)', marginBottom: '.4rem', display: 'block' }}>Pays</label>
                <select className="pf-input pf-select" value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}>
                  <option value="">Sélectionner…</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)', marginBottom: '.4rem', display: 'block' }}>Entreprise / Organisation</label>
                <input className="pf-input" placeholder="Votre société (optionnel)" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
              </div>
            </div>

            {infoMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1rem', borderRadius: '.75rem', background: infoMsg.ok ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${infoMsg.ok ? 'rgba(34,197,94,.2)' : 'rgba(239,68,68,.2)'}`, color: infoMsg.ok ? '#4ADE80' : '#FCA5A5', fontSize: '.8rem' }}>
                {infoMsg.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {infoMsg.text}
              </div>
            )}

            <button type="submit" disabled={saving}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem', padding: '.875rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', cursor: saving ? 'not-allowed' : 'pointer', border: 'none', background: saving ? 'rgba(255,255,255,.08)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: saving ? 'rgba(255,255,255,.3)' : 'white', boxShadow: saving ? 'none' : '0 8px 24px rgba(255,107,0,.25)' }}>
              {saving ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sauvegarde…</> : <><Save size={15} /> Enregistrer les modifications</>}
            </button>
          </form>
        )}

        {/* Tab password */}
        {tab === 'password' && (
          <form onSubmit={savePwd} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { key: 'current', label: 'Mot de passe actuel *', placeholder: '••••••••' },
              { key: 'next',    label: 'Nouveau mot de passe * (min. 8 caractères)', placeholder: '••••••••' },
              { key: 'confirm', label: 'Confirmer le nouveau mot de passe *', placeholder: '••••••••' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)', marginBottom: '.4rem', display: 'block' }}>{label}</label>
                <input type="password" className="pf-input" placeholder={placeholder}
                  value={pwd[key as keyof typeof pwd]}
                  onChange={(e) => setPwd((p) => ({ ...p, [key]: e.target.value }))}
                  required autoComplete={key === 'current' ? 'current-password' : 'new-password'} />
              </div>
            ))}

            {pwdMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1rem', borderRadius: '.75rem', background: pwdMsg.ok ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${pwdMsg.ok ? 'rgba(34,197,94,.2)' : 'rgba(239,68,68,.2)'}`, color: pwdMsg.ok ? '#4ADE80' : '#FCA5A5', fontSize: '.8rem' }}>
                {pwdMsg.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {pwdMsg.text}
              </div>
            )}

            <button type="submit" disabled={pwdSaving}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem', padding: '.875rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', cursor: pwdSaving ? 'not-allowed' : 'pointer', border: 'none', background: pwdSaving ? 'rgba(255,255,255,.08)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: pwdSaving ? 'rgba(255,255,255,.3)' : 'white', boxShadow: pwdSaving ? 'none' : '0 8px 24px rgba(255,107,0,.25)' }}>
              {pwdSaving ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Modification…</> : <><Lock size={15} /> Changer le mot de passe</>}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
