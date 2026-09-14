'use client'
import React, { useState, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, Monitor, Tablet, Smartphone, ExternalLink, ShoppingCart, RefreshCw } from 'lucide-react'

type Viewport = 'desktop' | 'tablet' | 'mobile'

const VP_CONFIG: Record<Viewport, { width: string; label: string }> = {
  desktop: { width: '100%',   label: 'Bureau' },
  tablet:  { width: '768px',  label: 'Tablette' },
  mobile:  { width: '375px',  label: 'Mobile' },
}

interface Props {
  demoFile: string | null
  tplName: string
  tplId: string
  secteurId: string
  secteurLabel: string
  primaryColor: string
  basePrice: number
}

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export default function DemoClient({ demoFile, tplName, tplId, secteurId, secteurLabel, primaryColor, basePrice }: Props) {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const demoUrl = demoFile ? `/demos/${demoFile}` : null

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow: hidden; }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: translateY(0) } }

        .demo-shell {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          flex-direction: column;
          background: #0B0F1A;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
        }

        /* ── Top bar ── */
        .demo-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          height: 56px;
          padding: 0 16px;
          background: #111827;
          border-bottom: 1px solid rgba(255,255,255,.07);
          flex-shrink: 0;
          animation: fadeIn .25s ease;
          z-index: 10;
        }
        .demo-topbar-left  { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .demo-topbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

        .demo-back {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 10px; border-radius: 8px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.55);
          font-size: 12px; font-weight: 600;
          text-decoration: none; flex-shrink: 0;
          transition: background .15s;
        }
        .demo-back:hover { background: rgba(255,255,255,.1); color: white; }

        .demo-title {
          display: flex; align-items: center; gap: 8px;
          overflow: hidden;
        }
        .demo-title-text {
          font-size: 13px; font-weight: 700; color: white;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .demo-badge {
          font-size: 10px; font-weight: 700; padding: 2px 8px;
          border-radius: 999px; background: rgba(255,255,255,.08);
          color: rgba(255,255,255,.45); white-space: nowrap; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,.1);
        }

        /* ── Viewport switcher ── */
        .demo-vp {
          display: flex; background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
          overflow: hidden;
        }
        .demo-vp-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 5px 10px;
          background: transparent; border: none; cursor: pointer;
          color: rgba(255,255,255,.4); font-size: 11px; font-weight: 700;
          transition: all .15s; white-space: nowrap;
        }
        .demo-vp-btn.active { background: rgba(255,255,255,.12); color: white; }
        .demo-vp-label { display: none; }
        @media (min-width: 640px) { .demo-vp-label { display: inline; } }

        .demo-refresh {
          display: flex; align-items: center; gap: 4px;
          padding: 6px 10px; border-radius: 8px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.4); font-size: 11px;
          cursor: pointer; transition: all .15s;
        }
        .demo-refresh:hover { color: white; background: rgba(255,255,255,.1); }

        .demo-open-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 8px;
          font-size: 12px; font-weight: 700;
          color: white; text-decoration: none;
          transition: opacity .15s;
        }
        .demo-open-btn:hover { opacity: .85; }

        .demo-order-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 8px;
          font-size: 12px; font-weight: 800;
          background: #FF6B00; color: white;
          text-decoration: none;
          transition: opacity .15s, transform .15s;
          white-space: nowrap;
        }
        .demo-order-btn:hover { opacity: .9; transform: translateY(-1px); }
        .demo-order-label { display: none; }
        @media (min-width: 480px) { .demo-order-label { display: inline; } }

        /* ── Price pill ── */
        .demo-price-pill {
          display: none; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px;
          font-size: 12px; font-weight: 800; color: white;
          border: 1px solid rgba(255,255,255,.15);
          background: rgba(255,255,255,.05);
        }
        @media (min-width: 768px) { .demo-price-pill { display: flex; } }

        /* ── Stage ── */
        .demo-stage {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background: #0B0F1A;
          overflow: hidden;
          padding: 0;
          position: relative;
        }

        /* ── Browser chrome ── */
        .demo-browser {
          display: flex; flex-direction: column;
          background: #111827;
          border-radius: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          transition: width .3s cubic-bezier(.4,0,.2,1);
        }
        .demo-browser.constrained {
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 20px 60px rgba(0,0,0,.6);
          height: calc(100% - 24px);
          margin-top: 12px;
        }

        .browser-chrome {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(255,255,255,.03);
          border-bottom: 1px solid rgba(255,255,255,.07);
          flex-shrink: 0;
        }
        .browser-dots { display: flex; gap: 5px; }
        .browser-dot  { width: 10px; height: 10px; border-radius: 50%; opacity: .7; }
        .browser-url  {
          flex: 1; background: rgba(255,255,255,.05); border-radius: 5px;
          padding: 4px 10px; font-size: 11px; font-family: monospace;
          color: rgba(255,255,255,.35); overflow: hidden;
          white-space: nowrap; text-overflow: ellipsis;
          display: flex; align-items: center; gap: 6px;
        }

        .iframe-wrap { flex: 1; position: relative; overflow: hidden; }
        .demo-iframe { width: 100%; height: 100%; border: none; display: block; }

        .demo-loading {
          position: absolute; inset: 0;
          background: #111827;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px; z-index: 5;
        }
        .demo-spinner {
          width: 44px; height: 44px; border-radius: 50%;
          border: 3px solid rgba(255,255,255,.08);
          animation: spin 1s linear infinite;
        }
        .demo-spinner-text { font-size: 13px; color: rgba(255,255,255,.35); }

        /* ── No demo ── */
        .demo-empty {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 100%; gap: 16px; padding: 2rem; text-align: center;
          color: rgba(255,255,255,.5);
        }
      `}</style>

      <div className="demo-shell">

        {/* ── Top bar ── */}
        <div className="demo-topbar">
          <div className="demo-topbar-left">
            <Link href={`/templates/${secteurId}/${tplId}`} className="demo-back">
              <ArrowLeft size={13} /> Retour
            </Link>
            <div className="demo-title">
              <span className="demo-title-text">{tplName}</span>
              <span className="demo-badge">{secteurLabel}</span>
            </div>
          </div>

          <div className="demo-topbar-right">
            {/* Viewport */}
            <div className="demo-vp">
              {([['desktop', <Monitor key="d" size={12}/>], ['tablet', <Tablet key="t" size={12}/>], ['mobile', <Smartphone key="m" size={12}/>]] as [Viewport, ReactNode][]).map(([vp, icon]) => (
                <button key={vp} onClick={() => setViewport(vp)} className={`demo-vp-btn${viewport === vp ? ' active' : ''}`}>
                  {icon}
                  <span className="demo-vp-label">{VP_CONFIG[vp].label}</span>
                </button>
              ))}
            </div>

            {/* Refresh */}
            <button className="demo-refresh" onClick={() => { setLoading(true); setKey(k => k + 1) }}>
              <RefreshCw size={11} />
            </button>

            {/* Price */}
            <div className="demo-price-pill" style={{ borderColor: `${primaryColor}40`, color: primaryColor }}>
              Dès {fmt(basePrice)}
            </div>

            {/* Open fullscreen */}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="demo-open-btn"
                style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)' }}>
                <ExternalLink size={12} />
                <span className="demo-vp-label">Ouvrir</span>
              </a>
            )}

            {/* Commander */}
            <Link href={`/templates/commander?template=${tplId}&secteur=${secteurId}`} className="demo-order-btn">
              <ShoppingCart size={13} />
              <span className="demo-order-label">Commander</span>
            </Link>
          </div>
        </div>

        {/* ── Stage ── */}
        <div className="demo-stage">
          <div
            className={`demo-browser${viewport !== 'desktop' ? ' constrained' : ''}`}
            style={{ width: VP_CONFIG[viewport].width, maxWidth: '100%' }}
          >
            {/* browser chrome */}
            <div className="browser-chrome">
              <div className="browser-dots">
                {['#EF4444','#F59E0B','#22C55E'].map(c => <div key={c} className="browser-dot" style={{ background: c }} />)}
              </div>
              <div className="browser-url">
                <span style={{ color: '#22C55E', fontSize: '10px' }}>●</span>
                www.{tplId.replace(/-/g, '')}.com
              </div>
            </div>

            {/* iframe */}
            <div className="iframe-wrap">
              {demoUrl ? (
                <>
                  {loading && (
                    <div className="demo-loading">
                      <div className="demo-spinner" style={{ borderTopColor: primaryColor }} />
                      <div className="demo-spinner-text">Chargement du site démo…</div>
                    </div>
                  )}
                  <iframe
                    key={key}
                    ref={iframeRef}
                    src={demoUrl}
                    className="demo-iframe"
                    title={`Démo ${tplName}`}
                    onLoad={() => setLoading(false)}
                    sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                  />
                </>
              ) : (
                <div className="demo-empty">
                  <div style={{ fontSize: '3rem' }}>🚧</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,.6)' }}>Démo en préparation</div>
                  <p style={{ fontSize: '14px', maxWidth: 320, lineHeight: 1.7, margin: 0 }}>
                    Ce template sera bientôt disponible en prévisualisation. Commandez maintenant et recevez un lien de démo personnalisé.
                  </p>
                  <Link href={`/templates/commander?template=${tplId}&secteur=${secteurId}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px', background: '#FF6B00', color: 'white', fontWeight: 800, borderRadius: 10, textDecoration: 'none', fontSize: 14 }}>
                    <ShoppingCart size={15} /> Commander ce template
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
