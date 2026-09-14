'use client'
import { useState, useRef } from 'react'
import type { ReactNode } from 'react'
import { Monitor, Tablet, Smartphone, RefreshCw, ExternalLink } from 'lucide-react'

interface ColorTheme {
  name: string
  primary: string
  accent: string
  bg: string
  label: string
}

const GLOBAL_THEMES: ColorTheme[] = [
  { name: 'original', label: 'Original',     primary: '',        accent: '',        bg: ''        },
  { name: 'blue',     label: 'Bleu Royal',   primary: '#1E40AF', accent: '#3B82F6', bg: '#EFF6FF' },
  { name: 'green',    label: 'Vert Nature',  primary: '#166534', accent: '#22C55E', bg: '#F0FDF4' },
  { name: 'rose',     label: 'Rose Élégant', primary: '#9D174D', accent: '#EC4899', bg: '#FDF2F8' },
  { name: 'purple',   label: 'Violet',       primary: '#6D28D9', accent: '#8B5CF6', bg: '#EDE9FE' },
  { name: 'gold',     label: 'Or Prestige',  primary: '#92400E', accent: '#F59E0B', bg: '#FFFBEB' },
  { name: 'dark',     label: 'Sombre',       primary: '#111827', accent: '#6B7280', bg: '#1F2937' },
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
    } catch { /* cross-origin safety */ }
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
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }

        .preview-wrap { display: flex; flex-direction: column; gap: 1rem; }

        /* Toolbar */
        .preview-toolbar {
          display: flex; align-items: center; gap: .625rem;
          flex-wrap: wrap; justify-content: space-between;
        }
        .vp-switcher {
          display: flex;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: .5rem;
          overflow: hidden;
        }
        .vp-btn {
          padding: .35rem .75rem;
          border: none; cursor: pointer;
          font-size: .62rem; font-weight: 700;
          display: flex; align-items: center; gap: .3rem;
          transition: all .15s;
        }
        .vp-btn-label { display: inline; }
        .preview-actions { display: flex; gap: .5rem; }
        .preview-refresh {
          padding: .35rem .75rem;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: .5rem;
          color: rgba(255,255,255,.5);
          font-size: .62rem; cursor: pointer;
          display: flex; align-items: center; gap: .3rem;
        }
        .preview-fullscreen {
          padding: .35rem .875rem;
          border: none; border-radius: .5rem;
          color: white; font-size: .62rem; font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; gap: .3rem;
          text-decoration: none;
        }

        /* Theme picker */
        .theme-picker-label {
          font-size: .55rem; font-weight: 800;
          color: rgba(255,255,255,.3); letter-spacing: .12em;
          text-transform: uppercase; margin-bottom: .5rem;
        }
        .theme-pills {
          display: flex; gap: .4rem;
          overflow-x: auto; padding-bottom: .25rem;
          scrollbar-width: none;
        }
        .theme-pills::-webkit-scrollbar { display: none; }
        .theme-pill {
          padding: .3rem .75rem;
          border-radius: 9999px;
          font-size: .62rem; font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; gap: .35rem;
          transition: all .15s;
          white-space: nowrap; flex-shrink: 0;
        }

        /* Browser frame */
        .preview-browser {
          border-radius: 1.25rem; overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 30px 80px rgba(0,0,0,.55);
          background: #0D1117; position: relative;
        }
        .browser-chrome {
          padding: .75rem 1rem;
          background: rgba(255,255,255,.04);
          border-bottom: 1px solid rgba(255,255,255,.07);
          display: flex; align-items: center; gap: .625rem;
        }
        .browser-dots { display: flex; gap: .375rem; }
        .browser-dot { width: 10px; height: 10px; border-radius: 50%; opacity: .75; }
        .browser-url {
          flex: 1; background: rgba(255,255,255,.06);
          border-radius: .35rem; padding: .25rem .75rem;
          font-size: .58rem; color: rgba(255,255,255,.3);
          font-family: monospace;
          display: flex; align-items: center; gap: .4rem;
          min-width: 0; overflow: hidden;
        }
        .browser-url-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .preview-viewport-wrap {
          height: 460px; overflow: hidden;
          position: relative; display: flex;
          justify-content: center; background: #0D1117;
        }
        .preview-loading {
          position: absolute; inset: 0; background: #0D1117;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 10; gap: 1rem;
        }
        .preview-spinner {
          width: 40px; height: 40px;
          border: 3px solid rgba(255,255,255,.1);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .preview-caption {
          display: flex; align-items: center; justify-content: space-between;
          padding: .625rem .875rem; border-radius: .625rem;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.06);
          flex-wrap: wrap; gap: .5rem;
        }
        .preview-caption-text { font-size: .6rem; color: rgba(255,255,255,.3); }
        .preview-caption-link { font-size: .6rem; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: .25rem; }

        /* ── Responsive mobile ── */
        @media (max-width: 480px) {
          .vp-btn-label { display: none; }
          .vp-btn { padding: .35rem .55rem; }
          .preview-viewport-wrap { height: 340px; }
          .preview-browser { border-radius: .875rem; }
        }
      `}</style>

      <div className="preview-wrap">

        {/* ── Toolbar ── */}
        <div className="preview-toolbar">
          <div className="vp-switcher">
            {([['desktop', 'Bureau', <Monitor key="d" size={11}/>], ['tablet', 'Tablette', <Tablet key="t" size={11}/>], ['mobile', 'Mobile', <Smartphone key="m" size={11}/>]] as [Viewport, string, ReactNode][]).map(([vp, label, icon]) => (
              <button key={vp} onClick={() => setViewport(vp)} className="vp-btn"
                style={{ background: viewport === vp ? 'rgba(255,255,255,.12)' : 'transparent', color: viewport === vp ? 'white' : 'rgba(255,255,255,.35)' }}>
                {icon}
                <span className="vp-btn-label">{label}</span>
              </button>
            ))}
          </div>

          <div className="preview-actions">
            <button onClick={() => { setLoading(true); setKey(k => k + 1) }} className="preview-refresh">
              <RefreshCw size={11}/> <span className="vp-btn-label">Rafraîchir</span>
            </button>
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="preview-fullscreen"
                style={{ background: primaryColor }}>
                <ExternalLink size={11}/> Plein écran
              </a>
            )}
          </div>
        </div>

        {/* ── Color theme picker ── */}
        <div>
          <div className="theme-picker-label">🎨 Aperçu couleurs — choisissez un thème</div>
          <div className="theme-pills">
            {GLOBAL_THEMES.map((t) => (
              <button key={t.name} onClick={() => applyTheme(t)} title={t.label} className="theme-pill"
                style={{
                  border: theme.name === t.name ? '2px solid white' : '1.5px solid rgba(255,255,255,.15)',
                  background: t.name === 'original' ? 'rgba(255,255,255,.06)' : t.name === 'dark' ? '#1F2937' : t.bg,
                  color: theme.name === t.name ? 'white' : t.name === 'original' ? 'rgba(255,255,255,.6)' : t.name === 'dark' ? 'white' : t.primary,
                }}>
                {t.name !== 'original' && <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: t.primary, flexShrink: 0 }} />}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Browser frame ── */}
        <div className="preview-browser">
          <div className="browser-chrome">
            <div className="browser-dots">
              {['#EF4444','#F59E0B','#22C55E'].map((c) => <div key={c} className="browser-dot" style={{ background: c }} />)}
            </div>
            <div className="browser-url">
              <span style={{ color: '#22C55E', fontSize: '.55rem', flexShrink: 0 }}>●</span>
              <span className="browser-url-text">www.{tplId}.com{theme.name !== 'original' ? ` · Thème : ${theme.label}` : ''}</span>
            </div>
          </div>

          <div className="preview-viewport-wrap">
            {loading && (
              <div className="preview-loading">
                <div className="preview-spinner" style={{ borderTopColor: primaryColor }} />
                <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>Chargement du site démo...</div>
              </div>
            )}

            {demoUrl ? (
              <div style={{ width: viewportWidth[viewport], maxWidth: '100%', height: '100%', transition: 'width .3s ease', overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${100 / SCALE}%`, height: `${100 / SCALE}%`, transformOrigin: 'top left', transform: `scale(${SCALE})`, position: 'absolute', top: 0, left: 0 }}>
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

        {/* ── Caption ── */}
        <div className="preview-caption">
          <span className="preview-caption-text">
            👁 Aperçu live · Pour naviguer dans le site cliquez <strong style={{ color: 'rgba(255,255,255,.55)' }}>Plein écran</strong>
          </span>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="preview-caption-link" style={{ color: primaryColor }}>
              Voir en plein écran <ExternalLink size={9}/>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
