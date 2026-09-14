'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  demoFile: string
  bgDark: string
  primaryColor: string
  tplId: string
  style: string
}

const SCALE = 0.215

export default function TemplateCardIframe({ demoFile, bgDark, primaryColor, tplId, style }: Props) {
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '200px', threshold: 0 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ background: bgDark, position: 'relative', overflow: 'hidden', height: '200px', borderBottom: '1px solid rgba(255,255,255,.07)' }}
    >
      {/* Glow arrière-plan */}
      <div style={{ position: 'absolute', top: '-30%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle,${primaryColor}30 0%,transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />

      {/* Barre navigateur */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4, padding: '.45rem .6rem', background: 'rgba(0,0,0,.55)', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: '.35rem', backdropFilter: 'blur(4px)' }}>
        <div style={{ display: 'flex', gap: '.2rem' }}>
          {['#EF4444','#F59E0B','#22C55E'].map((c) => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: .65 }} />)}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: '.2rem', padding: '.15rem .45rem', fontSize: '.48rem', color: 'rgba(255,255,255,.25)', fontFamily: 'monospace' }}>
          www.{tplId}.com
        </div>
      </div>

      {/* iframe lazy */}
      {visible && (
        <div style={{ position: 'absolute', top: '24px', left: 0, right: 0, bottom: 0, zIndex: 2, overflow: 'hidden' }}>
          <div style={{
            width: `${100 / SCALE}%`,
            height: `${100 / SCALE}%`,
            transformOrigin: 'top left',
            transform: `scale(${SCALE})`,
            opacity: loaded ? 1 : 0,
            transition: 'opacity .4s ease',
          }}>
            <iframe
              src={`/demos/${demoFile}`}
              onLoad={() => setLoaded(true)}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block', pointerEvents: 'none' }}
              title={tplId}
              sandbox="allow-same-origin allow-scripts"
              loading="lazy"
            />
          </div>
          {/* Skeleton pendant le chargement */}
          {!loaded && (
            <div style={{ position: 'absolute', inset: 0, background: bgDark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 24, height: 24, border: `2px solid ${primaryColor}40`, borderTopColor: primaryColor, borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
            </div>
          )}
        </div>
      )}

      {/* Badge style */}
      <div style={{ position: 'absolute', bottom: '.6rem', right: '.6rem', padding: '.2rem .55rem', borderRadius: '.35rem', background: 'rgba(0,0,0,.7)', border: '1px solid rgba(255,255,255,.1)', fontSize: '.5rem', fontWeight: 700, color: 'rgba(255,255,255,.5)', backdropFilter: 'blur(4px)', zIndex: 5 }}>
        {style.toUpperCase()}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
