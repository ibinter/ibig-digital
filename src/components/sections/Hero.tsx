'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'
import { SITE } from '@/lib/constants'

const words = ['sites web', 'applications', 'e-commerce', 'stratégies IA', 'identités visuelles']

const counters = [
  { value: 100, suffix: '+', label: 'Templates pro' },
  { value: 40, suffix: '+', label: 'Clients satisfaits' },
  { value: 5, suffix: ' j', label: 'Délai livraison' },
  { value: 19900, suffix: ' FCFA', label: 'À partir de', format: true },
]

function useCounter(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, started])
  return count
}

function Counter({ value, suffix, label, format }: { value: number; suffix: string; label: string; format?: boolean }) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(value, 1600, started)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const display = format ? count.toLocaleString('fr-FR') : count
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {display}{suffix}
      </div>
      <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.4)', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Bonjour IBIG DIGITAL, je souhaite discuter de mon projet digital.')}`

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => { setWordIndex((i) => (i + 1) % words.length); setFade(true) }, 350)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#06091A' }}>

      <style>{`
        @keyframes ibig-pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.2);opacity:1} }
        @keyframes ibig-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes ibig-in { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ibig-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ibig-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .hero-word { transition: opacity .35s ease, transform .35s ease; }
        .hero-btn-primary { transition: transform .2s, box-shadow .2s; }
        .hero-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(255,107,0,.5) !important; }
        .hero-btn-ghost:hover { background: rgba(255,255,255,.08) !important; }
        .hero-card:hover { transform: translateY(-3px); }
        .hero-card { transition: transform .3s; }
        .float-1{animation:ibig-float 5s ease-in-out infinite}
        .float-2{animation:ibig-float 7s ease-in-out infinite 1s}
        .float-3{animation:ibig-float 6s ease-in-out infinite .5s}
      `}</style>

      {/* Fond — orbes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Orbe violet */}
        <div style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: 'clamp(300px,45vw,700px)', height: 'clamp(300px,45vw,700px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,.45) 0%, transparent 65%)',
          animation: 'ibig-pulse 9s ease-in-out infinite',
        }} />
        {/* Orbe orange */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 'clamp(250px,35vw,550px)', height: 'clamp(250px,35vw,550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,.3) 0%, transparent 65%)',
          animation: 'ibig-pulse 7s ease-in-out infinite 2s',
        }} />
        {/* Orbe bleu */}
        <div style={{
          position: 'absolute', top: '35%', left: '20%',
          width: 'clamp(150px,20vw,320px)', height: 'clamp(150px,20vw,320px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,91,187,.25) 0%, transparent 65%)',
          animation: 'ibig-pulse 11s ease-in-out infinite 1s',
        }} />
        {/* Grille fine */}
        <div style={{
          position: 'absolute', inset: 0, opacity: .025,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Cercle déco tournant */}
        <div style={{
          position: 'absolute', top: '15%', right: '8%',
          width: 200, height: 200,
          border: '1px solid rgba(124,58,237,.15)',
          borderRadius: '50%',
          animation: 'ibig-spin 25s linear infinite',
        }} />
        <div style={{
          position: 'absolute', top: 'calc(15% + 30px)', right: 'calc(8% + 30px)',
          width: 140, height: 140,
          border: '1px solid rgba(255,107,0,.1)',
          borderRadius: '50%',
          animation: 'ibig-spin 18s linear infinite reverse',
        }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(6rem,10vw,8rem) clamp(1rem,4vw,2rem) 5rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,480px),1fr))', gap: 'clamp(3rem,6vw,5rem)', alignItems: 'center' }}>

          {/* ── GAUCHE ── */}
          <div style={{ animation: 'ibig-in .7s ease both' }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100, marginBottom: 32,
              background: 'rgba(124,58,237,.12)',
              border: '1px solid rgba(124,58,237,.3)',
              color: '#A78BFA', fontSize: '.72rem', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '.1em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', display: 'inline-block', animation: 'ibig-pulse 2s ease-in-out infinite' }} />
              Agence Digitale · Côte d&apos;Ivoire &amp; Afrique
            </div>

            {/* Titre */}
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 900, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
              Votre site web pro<br />
              <span style={{ display: 'inline-block', marginTop: 8 }}>
                <span
                  className="hero-word"
                  style={{
                    background: 'linear-gradient(90deg, #FF6B00 0%, #7C3AED 50%, #FF6B00 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'ibig-shimmer 4s linear infinite',
                    opacity: fade ? 1 : 0,
                    transform: fade ? 'translateY(0)' : 'translateY(8px)',
                  }}>
                  {words[wordIndex]}
                </span>
              </span>
              <br />
              <span style={{ color: 'rgba(255,255,255,.7)' }}>dès 19 900 FCFA</span>
            </h1>

            <p style={{ fontSize: '1rem', color: 'rgba(200,210,255,.75)', lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
              IBIG DIGITAL crée des sites web, applications et stratégies digitales pour les entrepreneurs et PME africains — livrés en 5 jours, paiement en 3× sans frais.
            </p>

            {/* Avantages pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
              {[
                { icon: Zap, text: 'Livraison en 5 jours', color: '#FBBF24' },
                { icon: Shield, text: 'Satisfaction garantie', color: '#34D399' },
                { icon: TrendingUp, text: 'Paiement en 3×', color: '#60A5FA' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 100,
                  background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)',
                  color: 'rgba(255,255,255,.8)', fontSize: '.75rem', fontWeight: 600,
                }}>
                  <Icon size={13} style={{ color }} />
                  {text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
              <Link href="/templates/commander" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 14, fontWeight: 800, fontSize: '.9rem',
                color: 'white', textDecoration: 'none',
                background: 'linear-gradient(135deg, #FF6B00 0%, #E84E00 100%)',
                boxShadow: '0 8px 24px rgba(255,107,0,.35)',
              }} className="hero-btn-primary">
                Créer mon site maintenant <ArrowRight size={18} />
              </Link>
              <Link href="/devis" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', borderRadius: 14, fontWeight: 700, fontSize: '.9rem',
                color: 'rgba(255,255,255,.85)', textDecoration: 'none',
                background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
              }} className="hero-btn-ghost">
                Devis gratuit en 24h
              </Link>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {['🧑🏾‍💼','👩🏽‍💻','🧑🏿‍🏫','👨🏽‍💼','👩🏾‍💼'].map((e, i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: '50%', border: '2px solid #06091A',
                    background: 'rgba(124,58,237,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.9rem', marginLeft: i === 0 ? 0 : -8,
                  }}>{e}</div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#FF6B00"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontSize: '.7rem', color: 'rgba(200,210,255,.55)', margin: 0 }}>+40 clients satisfaits en Afrique</p>
              </div>
            </div>
          </div>

          {/* ── DROITE — Cards glassmorphism ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'ibig-in .9s ease .25s both' }}>

            {/* Card principale — projet en cours */}
            <div className="hero-card float-1" style={{
              padding: '24px 28px', borderRadius: 24,
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.09)',
              backdropFilter: 'blur(24px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '.65rem', color: '#A78BFA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>Projet en cours</div>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem' }}>Site Restaurant Premium</div>
                  <div style={{ color: 'rgba(200,210,255,.5)', fontSize: '.78rem', marginTop: 4 }}>Livraison dans 4 jours</div>
                </div>
                <div style={{ padding: '4px 12px', borderRadius: 100, background: 'rgba(52,211,153,.12)', border: '1px solid rgba(52,211,153,.25)', color: '#34D399', fontSize: '.68rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  ● En cours
                </div>
              </div>
              <div style={{ height: 6, borderRadius: 100, background: 'rgba(255,255,255,.06)', overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ height: '100%', width: '85%', borderRadius: 100, background: 'linear-gradient(90deg, #7C3AED, #FF6B00)', transition: 'width 1s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '.72rem', color: 'rgba(200,210,255,.5)' }}>85% complété</span>
                <span style={{ fontSize: '.72rem', color: '#A78BFA', fontWeight: 700 }}>19 900 FCFA</span>
              </div>
            </div>

            {/* 4 mini-cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '🌐', count: '100+', label: 'Templates', cls: 'float-2', color: 'rgba(124,58,237,.15)' },
                { icon: '🚀', count: '5 j', label: 'Livraison', cls: 'float-3', color: 'rgba(255,107,0,.15)' },
                { icon: '✅', count: '40+', label: 'Clients', cls: 'float-1', color: 'rgba(52,211,153,.12)' },
                { icon: '🔁', count: '3×', label: 'Paiement', cls: 'float-2', color: 'rgba(96,165,250,.12)' },
              ].map((c) => (
                <div key={c.label} className={`hero-card ${c.cls}`} style={{
                  padding: '18px 20px', borderRadius: 18,
                  background: c.color, border: '1px solid rgba(255,255,255,.07)',
                }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ color: 'white', fontWeight: 900, fontSize: '1.4rem', lineHeight: 1 }}>{c.count}</div>
                  <div style={{ color: 'rgba(200,210,255,.5)', fontSize: '.68rem', marginTop: 4, fontWeight: 600 }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Bandeau promo */}
            <div className="hero-card" style={{
              padding: '16px 20px', borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(255,107,0,.12) 0%, rgba(124,58,237,.12) 100%)',
              border: '1px solid rgba(255,107,0,.2)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg, #FF6B00, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 900, fontSize: '.85rem',
              }}>🎁</div>
              <div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '.88rem' }}>Paiement en 3× sans frais</div>
                <div style={{ color: 'rgba(255,200,100,.7)', fontSize: '.72rem', marginTop: 2 }}>Dès 19 900 FCFA · 3 mensualités · 0% intérêts</div>
              </div>
              <ArrowRight size={16} style={{ color: '#FF6B00', marginLeft: 'auto', flexShrink: 0 }} />
            </div>
          </div>
        </div>

        {/* ── Compteurs bas de page ── */}
        <div style={{
          marginTop: 'clamp(3rem,6vw,5rem)',
          padding: '28px 32px',
          borderRadius: 20,
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.07)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
          gap: 24,
          backdropFilter: 'blur(10px)',
        }}>
          {counters.map((c) => (
            <Counter key={c.label} {...c} />
          ))}
        </div>
      </div>

      {/* Vague de transition */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0 70L1440 70L1440 25C1100 70 600 5 0 45L0 70Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
