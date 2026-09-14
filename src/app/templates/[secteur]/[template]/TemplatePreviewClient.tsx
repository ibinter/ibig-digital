'use client'
import { useState, useRef, useEffect } from 'react'
import { Maximize2, Monitor, Tablet, Smartphone, RefreshCw, ExternalLink } from 'lucide-react'

interface ColorTheme {
  name: string
  primary: string
  accent: string
  bg: string
  label: string
}

const GLOBAL_THEMES: ColorTheme[] = [
  { name: 'original', label: 'Original', primary: '', accent: '', bg: '' },
  { name: 'blue',     label: 'Bleu Royal',    primary: '#1E40AF', accent: '#3B82F6', bg: '#EFF6FF' },
  { name: 'green',    label: 'Vert Nature',   primary: '#166534', accent: '#22C55E', bg: '#F0FDF4' },
  { name: 'rose',     label: 'Rose Élégant',  primary: '#9D174D', accent: '#EC4899', bg: '#FDF2F8' },
  { name: 'purple',   label: 'Violet',        primary: '#6D28D9', accent: '#8B5CF6', bg: '#EDE9FE' },
  { name: 'gold',     label: 'Or Prestige',   primary: '#92400E', accent: '#F59E0B', bg: '#FFFBEB' },
  { name: 'dark',     label: 'Sombre',        primary: '#111827', accent: '#6B7280', bg: '#1F2937' },
]

type Viewport = 'desktop' | 'tablet' | 'mobile'

interface Props {
  demoFile?: string
  primaryColor: string
  tplName: string
  sectorId: string
  tplId: string
}

export default function TemplatePreviewClient({ demoFile, primaryColor, tplName, sectorId, tplId }: Props) {
  const [theme, setTheme] = useState<ColorTheme>(GLOBAL_THEMES[0])
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const demoUrl = demoFile ? `/demos/${demoFile}` : null

  const injectTheme = (t: ColorTheme) => {
    if (!iframeRef.current || t.name === 'original') return
    try {
      const doc = iframeRef.current.contentDocument
      if (!doc) return
      let style = doc.getElementById('__ibig_theme_override__') as HTMLStyleElement | null
      if (!style) {
        style = doc.createElement('style')
        style.id = '__ibig_theme_override__'
        doc.head.appendChild(style)
      }
      style.textContent = `
        :root {
          --primary: ${t.primary} !important;
          --accent: ${t.accent} !important;
          --bg-main: ${t.bg} !important;
          --green: ${t.primary} !important;
          --blue: ${t.primary} !important;
          --rose: ${t.primary} !important;
          --purple: ${t.primary} !important;
          --gold: ${t.accent} !important;
          --teal: ${t.primary} !important;
          --orange: ${t.accent} !important;
          --green-light: ${t.bg} !important;
          --blue-light: ${t.bg} !important;
          --rose-light: ${t.bg} !important;
          --purple-light: ${t.bg} !important;
          --gold-light: ${t.bg} !important;
        }
        .btn-orange,.nav-cta,.demo-btn,.form-submit,.btn-green,.btn-rose,.btn-blue,.btn-navy,.btn-gold,.nav-btn-blue,.fc-btn,.prod-btn,.prod-add { background: ${t.primary} !important; border-color: ${t.primary} !important; }
        .nav-cta,.demo-btn,.form-submit,.btn-green,.btn-rose,.btn-blue,.btn-navy,.btn-gold,.nav-btn-blue { color: white !important; }
        .sec-eyebrow,.cat-count,.form-eyebrow,.acc-eyebrow,.hd-text,.sd-text { color: ${t.primary} !important; }
        .cta-band,.stats-strip,.hero-stats { background: ${t.primary} !important; }
        .prop-badge.pb-vente,.bio-badge { background: ${t.primary} !important; }
      `
    } catch {
      // cross-origin safety — won't happen for same-origin /demos/
    }
  }

  const applyTheme = (t: ColorTheme) => {
    setTheme(t)
    if (t.name === 'original') {
      try {
        const doc = iframeRef.current?.contentDocument
        if (doc) {
          const existing = doc.getElementById('__ibig_theme_override__')
          if (existing) existing.remove()
        }
      } catch { /* ignore */ }
    } else {
      injectTheme(t)
    }
  }

  const handleLoad = () => {
    setLoading(false)
    if (theme.name !== 'original') injectTheme(theme)
  }

  const viewportWidth: Record<Viewport, string> = {
    desktop: '100%',
    tablet:  '768px',
    mobile:  '375px',
  }

  const SCALE = 0.48

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {/* Viewport switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '.5rem', overflow: 'hidden' }}>
          {([['desktop','Bureau'], ['tablet','Tablette'], ['mobile','Mobile']] as [Viewport,string][]).map(([vp, label]) => (
            <button key={vp} onClick={() => setViewport(vp)}
              style={{ padding: '.35rem .75rem', background: viewport === vp ? 'rgba(255,255,255,.12)' : 'transparent', border: 'none', color: viewport === vp ? 'white' : 'rgba(255,255,255,.35)', fontSize: '.62rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.3rem', transition: 'all .15s' }}>
              {vp === 'desktop' ? <Monitor size={11}/> : vp === 'tablet' ? <Tablet size={11}/> : <Smartphone size={11}/>}
              {label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button onClick={() => { setLoading(true); setKey(k => k+1) }}
            style={{ padding: '.35rem .75rem', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '.5rem', color: 'rgba(255,255,255,.5)', fontSize: '.62rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.3rem' }}>
            <RefreshCw size={11}/> Rafraîchir
          </button>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '.35rem .875rem', background: primaryColor, border: 'none', borderRadius: '.5rem', color: 'white', fontSize: '.62rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.3rem', textDecoration: 'none' }}>
              <ExternalLink size={11}/> Plein écran
            </a>
          )}
        </div>
      </div>

      {/* ── Color theme picker ── */}
      <div>
        <div style={{ fontSize: '.55rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.5rem' }}>
          🎨 Aperçu couleurs — choisissez un thème
        </div>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
          {GLOBAL_THEMES.map((t) => (
            <button key={t.name} onClick={() => applyTheme(t)}
              title={t.label}
              style={{
                padding: '.3rem .75rem',
                border: theme.name === t.name ? `2px solid white` : '1.5px solid rgba(255,255,255,.15)',
                borderRadius: '9999px',
                background: t.name === 'original' ? 'rgba(255,255,255,.06)' : t.name === 'dark' ? '#1F2937' : t.bg,
                color: theme.name === t.name ? 'white' : t.name === 'original' ? 'rgba(255,255,255,.6)' : t.name === 'dark' ? 'white' : t.primary,
                fontSize: '.62rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '.35rem',
                transition: 'all .15s',
              }}>
              {t.name !== 'original' && <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: t.primary, flexShrink: 0 }} />}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Browser frame ── */}
      <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 30px 80px rgba(0,0,0,.55)', background: '#0D1117', position: 'relative' }}>
        {/* Browser chrome */}
        <div style={{ padding: '.75rem 1rem', background: 'rgba(255,255,255,.04)', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: '.625rem' }}>
          <div style={{ display: 'flex', gap: '.375rem' }}>
            {['#EF4444','#F59E0B','#22C55E'].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: .75 }} />)}
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: '.35rem', padding: '.25rem .75rem', fontSize: '.58rem', color: 'rgba(255,255,255,.3)', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <span style={{ color: '#22C55E', fontSize: '.55rem' }}>●</span>
            www.{tplId}.com
            {theme.name !== 'original' && <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,.2)', fontSize: '.5rem' }}>Thème : {theme.label}</span>}
          </div>
        </div>

        {/* Iframe viewport container */}
        <div style={{ height: '520px', overflow: 'hidden', position: 'relative', display: 'flex', justifyContent: 'center', background: '#0D1117' }}>
          {/* Loading overlay */}
          {loading && (
            <div style={{ position: 'absolute', inset: 0, background: '#0D1117', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, gap: '1rem' }}>
              <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,.1)', borderTopColor: primaryColor, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>Chargement du site démo...</div>
            </div>
          )}

          {demoUrl ? (
            <div style={{ width: viewportWidth[viewport], maxWidth: '100%', height: '100%', transition: 'width .3s ease', overflow: 'hidden', position: 'relative' }}>
              {/* Scale wrapper */}
              <div style={{ width: `${100/SCALE}%`, height: `${100/SCALE}%`, transformOrigin: 'top left', transform: `scale(${SCALE})`, position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}>
                <iframe
                  key={key}
                  ref={iframeRef}
                  src={demoUrl}
                  onLoad={handleLoad}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  title={`Démo ${tplName}`}
                  sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                />
              </div>
            </div>
          ) : (
            /* No demo yet — friendly placeholder */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>🚧</div>
              <div style={{ fontSize: '.88rem', fontWeight: 700, color: 'rgba(255,255,255,.6)' }}>Démo en cours de préparation</div>
              <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.7, maxWidth: 280 }}>
                Ce template sera bientôt disponible en prévisualisation live. Commandez dès maintenant et recevez un lien de démo personnalisé.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.625rem .875rem', borderRadius: '.625rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
        <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.3)' }}>
          👁 Aperçu live · Pour naviguer dans le site cliquez <strong style={{color:'rgba(255,255,255,.55)'}}>Plein écran</strong> →
        </span>
        {demoUrl && (
          <a href={demoUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '.6rem', color: primaryColor, textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '.25rem' }}>
            Voir en plein écran <ExternalLink size={9}/>
          </a>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
