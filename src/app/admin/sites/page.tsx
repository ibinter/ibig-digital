'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { Globe, Pencil, ArrowRight, Clock } from 'lucide-react'

interface SiteRow {
  id: string
  reference: string
  template_label: string
  site_url: string | null
  client_name: string
  client_email: string
  status: string
  delivery_date: string | null
  has_cms: boolean
  cms_last_update: string | null
}

const STATUS_COLOR: Record<string, string> = {
  pending: '#F59E0B', in_progress: '#3B82F6', delivered: '#22C55E', archived: '#64748B',
}
const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente', in_progress: 'En cours', delivered: 'Livré', archived: 'Archivé',
}

export default function AdminSitesPage() {
  const router = useRouter()
  const [sites, setSites] = useState<SiteRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/sites')
      .then(r => { if (r.status === 401) { router.push('/admin'); return null } return r.json() })
      .then(d => { if (d) setSites(d) })
      .finally(() => setLoading(false))
  }, [router])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06091A', fontFamily: 'system-ui,sans-serif' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>
        <style>{`@media(max-width:767px){main{padding-top:5rem!important}}`}</style>

        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>Sites clients <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'rgba(255,255,255,.3)', marginLeft: '.5rem' }}>CMS</span></h1>
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '.8rem', marginTop: '.25rem' }}>Gérez le contenu des sites livrés aux clients.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>Chargement…</div>
        ) : sites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,.2)' }}>
            <Globe size={40} style={{ margin: '0 auto 1rem', opacity: .15 }} />
            <p>Aucun site livré.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {sites.map(s => {
              const sc = STATUS_COLOR[s.status] ?? '#64748B'
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap', marginBottom: '.2rem' }}>
                      <span style={{ fontWeight: 800, color: 'white', fontSize: '.9rem' }}>{s.template_label}</span>
                      <span style={{ fontSize: '.65rem', fontWeight: 700, padding: '.18rem .55rem', borderRadius: '9999px', color: sc, background: `${sc}18` }}>{STATUS_LABEL[s.status] ?? s.status}</span>
                      {s.has_cms && (
                        <span style={{ fontSize: '.63rem', fontWeight: 700, padding: '.18rem .55rem', borderRadius: '9999px', color: '#818CF8', background: 'rgba(129,140,248,.1)' }}>CMS actif</span>
                      )}
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)' }}>
                      👤 {s.client_name} · {s.client_email}
                    </div>
                    {s.cms_last_update && (
                      <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.25)', marginTop: '.2rem', display: 'flex', alignItems: 'center', gap: '.3rem' }}>
                        <Clock size={10} /> Modifié le {new Date(s.cms_last_update).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
                    {s.site_url && (
                      <a href={s.site_url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '.3rem', padding: '.5rem .875rem', borderRadius: '.75rem', fontSize: '.75rem', fontWeight: 700, color: '#4ADE80', background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.15)', textDecoration: 'none' }}>
                        <Globe size={12} /> Voir
                      </a>
                    )}
                    <Link href={`/admin/sites/${s.id}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '.3rem', padding: '.5rem .875rem', borderRadius: '.75rem', fontSize: '.75rem', fontWeight: 700, color: '#FF9A4D', background: 'rgba(255,107,0,.08)', border: '1px solid rgba(255,107,0,.2)', textDecoration: 'none' }}>
                      <Pencil size={12} /> Contenu <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
