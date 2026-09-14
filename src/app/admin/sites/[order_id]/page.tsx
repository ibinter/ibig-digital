'use client'
import { useState, useEffect, useCallback, type ChangeEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { ArrowLeft, Save, CheckCircle, Globe, ChevronDown, ChevronUp, Loader2, Clock } from 'lucide-react'

type SectionData = Record<string, string>
type AllContent  = Record<string, { data: SectionData; updated_by: string; updated_at: string }>

const SECTION_LABELS: Record<string, string> = {
  identity: '🏢 Identité du site',
  hero:     '🎯 Section Hero',
  contact:  '📞 Coordonnées',
  hours:    '🕐 Horaires',
  about:    'ℹ️ À propos',
  services: '🛠️ Services',
  cta:      '🚀 CTA',
}

export default function AdminSiteContentPage() {
  const router = useRouter()
  const { order_id } = useParams<{ order_id: string }>()

  const [loading, setLoading]  = useState(true)
  const [saving, setSaving]    = useState<string | null>(null)
  const [saved, setSaved]      = useState<string | null>(null)
  const [content, setContent]  = useState<AllContent>({})
  const [open, setOpen]        = useState<string>('')
  const [order, setOrder]      = useState<{ template_label: string; client_name: string; site_url: string | null } | null>(null)

  useEffect(() => {
    Promise.all([
      fetch(`/api/cms/${order_id}/content`)
        .then(r => { if (r.status === 401) { router.push('/admin'); return null } return r.json() }),
      fetch(`/api/admin/commandes/${order_id}`)
        .then(r => r.ok ? r.json() : null),
    ]).then(([cmsData, orderData]) => {
      if (cmsData?.content) setContent(cmsData.content as AllContent)
      if (orderData?.order) {
        setOrder({
          template_label: orderData.order.template_label,
          client_name: orderData.order.client_name,
          site_url: orderData.order.site_url,
        })
      }
    }).finally(() => setLoading(false))
  }, [order_id, router])

  const setField = useCallback((section: string, key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], data: { ...(prev[section]?.data ?? {}), [key]: value } },
    }))
  }, [])

  const saveSection = async (section: string) => {
    setSaving(section)
    try {
      const res = await fetch(`/api/cms/${order_id}/content`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: { [section]: content[section]?.data ?? {} } }),
      })
      if (res.ok) { setSaved(section); setTimeout(() => setSaved(null), 3000) }
    } finally { setSaving(null) }
  }

  const sections = Object.keys(content)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden', maxWidth: '860px' }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg) } }
          @media(max-width:767px){main{padding-top:5rem!important}}
          .adm-cms-input { width:100%; padding:.65rem .9rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); color:white; font-size:.83rem; outline:none; transition:border .15s; box-sizing:border-box; font-family:inherit; }
          .adm-cms-input:focus { border-color:#FF6B00; }
          .adm-cms-input::placeholder { color:rgba(255,255,255,.18); }
        `}</style>

        <Link href="/admin/sites" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,.35)', fontSize: '.8rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
          <ArrowLeft size={14} /> Sites clients
        </Link>

        {order && (
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>CMS — {order.template_label}</h1>
              <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.3)', marginTop: '.2rem' }}>Client : {order.client_name}</p>
            </div>
            {order.site_url && (
              <a href={order.site_url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.6rem 1.1rem', borderRadius: '.75rem', fontSize: '.78rem', fontWeight: 700, color: '#4ADE80', background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.15)', textDecoration: 'none' }}>
                <Globe size={13} /> Voir le site
              </a>
            )}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Chargement…
          </div>
        ) : sections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>
            <p>Aucun contenu CMS pour ce site.</p>
            <p style={{ fontSize: '.75rem', marginTop: '.5rem' }}>Le client n'a pas encore rempli son contenu.</p>
          </div>
        ) : (
          <div>
            {sections.map(section => {
              const sData    = content[section]
              const isOpen   = open === section
              const isSaving = saving === section
              const wasSaved = saved === section
              const label    = SECTION_LABELS[section] ?? `📄 ${section}`
              const fields   = Object.entries(sData?.data ?? {})

              return (
                <div key={section} style={{ border: '1px solid rgba(255,255,255,.07)', borderRadius: '1.25rem', marginBottom: '.75rem', overflow: 'hidden' }}>
                  <div onClick={() => setOpen(isOpen ? '' : section)}
                    style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '1rem 1.25rem', cursor: 'pointer', background: isOpen ? 'rgba(255,107,0,.04)' : 'rgba(255,255,255,.02)' }}>
                    <span style={{ flex: 1, fontWeight: 700, color: 'white', fontSize: '.88rem' }}>{label}</span>
                    {sData?.updated_at && (
                      <span style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', gap: '.2rem' }}>
                        <Clock size={9} />
                        {sData.updated_by === 'ibig' ? '(IBIG) ' : ''}
                        {new Date(sData.updated_at).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                    {wasSaved && <span style={{ fontSize: '.7rem', color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '.25rem' }}><CheckCircle size={11} /> Sauvegardé</span>}
                    {isOpen ? <ChevronUp size={15} style={{ color: 'rgba(255,255,255,.3)' }} /> : <ChevronDown size={15} style={{ color: 'rgba(255,255,255,.2)' }} />}
                  </div>

                  {isOpen && (
                    <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 1rem' }}>
                        {fields.map(([key, val]) => (
                          <div key={key} style={{ marginBottom: '.875rem' }}>
                            <label style={{ fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.3)', display: 'block', marginBottom: '.3rem', letterSpacing: '.04em' }}>
                              {key.replace(/_/g, ' ').toUpperCase()}
                            </label>
                            {(val as string).length > 80 ? (
                              <textarea className="adm-cms-input" rows={3}
                                value={val as string}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField(section, key, e.target.value)}
                                style={{ resize: 'vertical', gridColumn: '1 / -1' }} />
                            ) : (
                              <input className="adm-cms-input" type="text"
                                value={val as string}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setField(section, key, e.target.value)} />
                            )}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '.75rem', paddingTop: '.75rem', borderTop: '1px solid rgba(255,255,255,.05)' }}>
                        <button onClick={() => saveSection(section)} disabled={isSaving}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.6rem 1.4rem', borderRadius: '.875rem', fontSize: '.8rem', fontWeight: 800, border: 'none', cursor: isSaving ? 'not-allowed' : 'pointer', background: wasSaved ? 'rgba(34,197,94,.15)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: wasSaved ? '#4ADE80' : 'white', opacity: isSaving ? .7 : 1 }}>
                          {isSaving ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Sauvegarde…</> : wasSaved ? <><CheckCircle size={13} /> Sauvegardé</> : <><Save size={13} /> Sauvegarder</>}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
