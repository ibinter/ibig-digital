'use client'
import { useState, useEffect, useCallback, type ChangeEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, CheckCircle, AlertCircle, Globe, Image as ImageIcon, Phone, Clock, MapPin, Info, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'

/* ── Types ── */
interface FieldDef { key: string; label: string; type: 'text' | 'textarea' | 'tel' | 'email' | 'url' | 'color' }
interface SectionDef { id: string; label: string; icon: string; fields: FieldDef[] }

const SECTIONS: SectionDef[] = [
  {
    id: 'identity', label: 'Identité du site', icon: '🏢',
    fields: [
      { key: 'business_name',  label: 'Nom de l\'entreprise',  type: 'text' },
      { key: 'tagline',        label: 'Slogan / accroche',      type: 'text' },
      { key: 'primary_color',  label: 'Couleur principale',     type: 'color' },
      { key: 'logo_url',       label: 'URL du logo',            type: 'url' },
    ],
  },
  {
    id: 'hero', label: 'Section d\'accueil (Hero)', icon: '🎯',
    fields: [
      { key: 'title',    label: 'Titre principal',    type: 'text' },
      { key: 'subtitle', label: 'Sous-titre',         type: 'textarea' },
      { key: 'cta_text', label: 'Texte du bouton CTA', type: 'text' },
      { key: 'bg_image', label: 'Image de fond (URL)', type: 'url' },
    ],
  },
  {
    id: 'contact', label: 'Coordonnées', icon: '📞',
    fields: [
      { key: 'phone',    label: 'Téléphone principal', type: 'tel' },
      { key: 'phone2',   label: 'Téléphone secondaire', type: 'tel' },
      { key: 'email',    label: 'E-mail de contact',   type: 'email' },
      { key: 'address',  label: 'Adresse complète',    type: 'textarea' },
      { key: 'whatsapp', label: 'Numéro WhatsApp',     type: 'tel' },
      { key: 'facebook', label: 'Page Facebook (URL)', type: 'url' },
      { key: 'instagram',label: 'Instagram (URL)',     type: 'url' },
    ],
  },
  {
    id: 'hours', label: 'Horaires d\'ouverture', icon: '🕐',
    fields: [
      { key: 'lun_ven', label: 'Lundi – Vendredi', type: 'text' },
      { key: 'samedi',  label: 'Samedi',            type: 'text' },
      { key: 'dimanche',label: 'Dimanche',          type: 'text' },
      { key: 'note',    label: 'Note sur les horaires', type: 'text' },
    ],
  },
  {
    id: 'about', label: 'À propos', icon: 'ℹ️',
    fields: [
      { key: 'title',       label: 'Titre de la section',  type: 'text' },
      { key: 'description', label: 'Présentation',         type: 'textarea' },
      { key: 'founded',     label: 'Année de création',    type: 'text' },
      { key: 'team_size',   label: 'Taille de l\'équipe',  type: 'text' },
      { key: 'image_url',   label: 'Photo (URL)',          type: 'url' },
    ],
  },
  {
    id: 'services', label: 'Services / Offres', icon: '🛠️',
    fields: [
      { key: 'title',       label: 'Titre de la section', type: 'text' },
      { key: 'service_1',   label: 'Service 1',           type: 'text' },
      { key: 'service_2',   label: 'Service 2',           type: 'text' },
      { key: 'service_3',   label: 'Service 3',           type: 'text' },
      { key: 'service_4',   label: 'Service 4',           type: 'text' },
      { key: 'service_5',   label: 'Service 5',           type: 'text' },
      { key: 'service_6',   label: 'Service 6',           type: 'text' },
    ],
  },
  {
    id: 'cta', label: 'Appel à l\'action (CTA)', icon: '🚀',
    fields: [
      { key: 'title',    label: 'Titre CTA',       type: 'text' },
      { key: 'subtitle', label: 'Sous-titre CTA',  type: 'text' },
      { key: 'btn_text', label: 'Texte du bouton', type: 'text' },
      { key: 'btn_url',  label: 'Lien du bouton',  type: 'url' },
    ],
  },
]

const SECTION_ICON_MAP: Record<string, typeof ArrowLeft> = {
  identity: Globe,
  hero: ImageIcon,
  contact: Phone,
  hours: Clock,
  about: Info,
  services: MapPin,
  cta: Globe,
}

type SectionData = Record<string, string>
type AllContent  = Record<string, SectionData>

export default function MonSitePage() {
  const router = useRouter()
  const { order_id } = useParams<{ order_id: string }>()

  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState<string | null>(null)
  const [saved, setSaved]       = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [content, setContent]   = useState<AllContent>({})
  const [open, setOpen]         = useState<string>('identity')
  const [orderInfo, setOrderInfo] = useState<{ template_label: string; site_url: string } | null>(null)

  /* ── Chargement du contenu ── */
  useEffect(() => {
    Promise.all([
      fetch(`/api/cms/${order_id}/content`).then(r => {
        if (r.status === 401) { router.push('/espace-client'); return null }
        if (r.status === 400) { setError('Votre site n\'est pas encore livré. L\'éditeur sera disponible à la livraison.'); return null }
        return r.json()
      }),
      fetch(`/api/espace-client/orders/${order_id}`).then(r => r.ok ? r.json() : null),
    ]).then(([cmsData, orderData]) => {
      if (cmsData?.content) {
        const flat: AllContent = {}
        for (const [section, val] of Object.entries(cmsData.content as Record<string, { data: SectionData }>)) {
          flat[section] = val.data ?? {}
        }
        setContent(flat)
      }
      if (orderData) setOrderInfo(orderData)
    }).finally(() => setLoading(false))
  }, [order_id, router])

  const setField = useCallback((section: string, key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }))
  }, [])

  const saveSection = async (sectionId: string) => {
    setSaving(sectionId)
    setError(null)
    try {
      const res = await fetch(`/api/cms/${order_id}/content`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: { [sectionId]: content[sectionId] ?? {} } }),
      })
      const d = await res.json()
      if (!res.ok) { setError(d.error ?? 'Erreur lors de la sauvegarde.'); return }
      setSaved(sectionId)
      setTimeout(() => setSaved(null), 3000)
    } catch {
      setError('Erreur réseau.')
    } finally {
      setSaving(null)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0B0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.3)', fontFamily: 'system-ui,sans-serif', gap: '1rem' }}>
      <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      Chargement de votre éditeur…
    </div>
  )

  if (error && !content) return (
    <div style={{ minHeight: '100vh', background: '#0B0F1E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', fontFamily: 'system-ui,sans-serif' }}>
      <AlertCircle size={40} style={{ color: '#EF4444' }} />
      <p style={{ color: 'rgba(255,255,255,.6)', textAlign: 'center', maxWidth: 400 }}>{error}</p>
      <Link href="/espace-client/commandes" style={{ color: '#FF9A4D', textDecoration: 'none', fontSize: '.85rem' }}>← Retour aux commandes</Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1E', fontFamily: 'system-ui,sans-serif' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }
        .cms-input { width:100%; padding:.75rem 1rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); color:white; font-size:.88rem; outline:none; transition:border-color .15s; box-sizing:border-box; font-family:inherit; }
        .cms-input:focus { border-color:#FF6B00; background:rgba(255,107,0,.04); }
        .cms-input::placeholder { color:rgba(255,255,255,.2); }
        .cms-input[type="color"] { height:44px; padding:.25rem .5rem; cursor:pointer; }
        .cms-section { border:1px solid rgba(255,255,255,.07); border-radius:1.25rem; overflow:hidden; margin-bottom:.75rem; }
        .cms-section-head { display:flex; align-items:center; gap:.75rem; padding:1.1rem 1.25rem; cursor:pointer; user-select:none; transition:background .15s; }
        .cms-section-head:hover { background:rgba(255,255,255,.02); }
        .cms-section-body { padding:1.25rem; border-top:1px solid rgba(255,255,255,.06); animation:fadeIn .2s ease; }
        .cms-label { font-size:.72rem; font-weight:700; color:rgba(255,255,255,.35); letter-spacing:.04em; display:block; margin-bottom:.4rem; }
        .cms-field { margin-bottom:1rem; }
        .cms-save-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.65rem 1.5rem; border-radius:.875rem; font-size:.82rem; font-weight:800; border:none; cursor:pointer; transition:all .15s; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#0B0F1E', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/espace-client/commandes" style={{ display: 'flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,.35)', fontSize: '.8rem', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Commandes
          </Link>
          <div>
            <div style={{ fontWeight: 900, color: 'white', fontSize: '1rem' }}>
              Modifier mon site
            </div>
            {orderInfo?.template_label && (
              <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)', marginTop: '1px' }}>{orderInfo.template_label}</div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.75rem', color: '#FCA5A5', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', padding: '.4rem .875rem', borderRadius: '.75rem' }}>
              <AlertCircle size={13} /> {error}
            </div>
          )}
          {orderInfo?.site_url && (
            <a href={orderInfo.site_url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.6rem 1.1rem', borderRadius: '.75rem', fontSize: '.78rem', fontWeight: 700, color: '#4ADE80', background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', textDecoration: 'none' }}>
              <Globe size={13} /> Voir mon site
            </a>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.35)', marginBottom: '2rem', lineHeight: 1.6 }}>
          Modifiez le contenu de votre site section par section. Chaque modification est sauvegardée indépendamment et appliquée automatiquement sur votre site en ligne.
        </p>

        {SECTIONS.map((section) => {
          const isOpen   = open === section.id
          const isSaving = saving === section.id
          const wasSaved = saved === section.id
          const SIcon    = SECTION_ICON_MAP[section.id] ?? Globe

          return (
            <div key={section.id} className="cms-section">
              {/* Header */}
              <div className="cms-section-head" onClick={() => setOpen(isOpen ? '' : section.id)}
                style={{ background: isOpen ? 'rgba(255,107,0,.04)' : 'rgba(255,255,255,.02)' }}>
                <span style={{ fontSize: '1.25rem' }}>{section.icon}</span>
                <span style={{ flex: 1, fontWeight: 700, color: 'white', fontSize: '.9rem' }}>{section.label}</span>
                {wasSaved && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', color: '#4ADE80', animation: 'fadeIn .3s ease' }}>
                    <CheckCircle size={12} /> Sauvegardé
                  </span>
                )}
                {isOpen ? <ChevronUp size={16} style={{ color: 'rgba(255,255,255,.3)' }} /> : <ChevronDown size={16} style={{ color: 'rgba(255,255,255,.2)' }} />}
              </div>

              {/* Body */}
              {isOpen && (
                <div className="cms-section-body">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0 1.25rem' }}>
                    {section.fields.map((field) => (
                      <div key={field.key} className="cms-field" style={{ gridColumn: field.type === 'textarea' ? '1 / -1' : undefined }}>
                        <label className="cms-label" htmlFor={`${section.id}-${field.key}`}>
                          <SIcon size={10} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea id={`${section.id}-${field.key}`} className="cms-input" rows={3}
                            placeholder={`Saisir : ${field.label.toLowerCase()}`}
                            value={content[section.id]?.[field.key] ?? ''}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField(section.id, field.key, e.target.value)}
                            style={{ resize: 'vertical' }} />
                        ) : (
                          <input id={`${section.id}-${field.key}`} type={field.type} className="cms-input"
                            placeholder={field.type === 'url' ? 'https://' : field.type === 'color' ? '#FF6B00' : `Saisir : ${field.label.toLowerCase()}`}
                            value={content[section.id]?.[field.key] ?? ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setField(section.id, field.key, e.target.value)} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,.05)' }}>
                    <button className="cms-save-btn" onClick={() => saveSection(section.id)} disabled={isSaving}
                      style={{ background: wasSaved ? 'rgba(34,197,94,.15)' : 'linear-gradient(135deg,#FF6B00,#FF4500)', color: wasSaved ? '#4ADE80' : 'white', opacity: isSaving ? .7 : 1 }}>
                      {isSaving ? (
                        <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sauvegarde…</>
                      ) : wasSaved ? (
                        <><CheckCircle size={14} /> Sauvegardé</>
                      ) : (
                        <><Save size={14} /> Sauvegarder cette section</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Info bandeau */}
        <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', borderRadius: '.875rem', background: 'rgba(59,130,246,.06)', border: '1px solid rgba(59,130,246,.15)', fontSize: '.78rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'rgba(255,255,255,.6)' }}>Astuce :</strong> Les modifications sont appliquées automatiquement sur votre site. Si vous avez besoin de changer des images ou des éléments plus complexes, <Link href="/espace-client/tickets/nouveau" style={{ color: '#60A5FA', textDecoration: 'none' }}>ouvrez un ticket de support</Link>.
        </div>
      </div>
    </div>
  )
}
