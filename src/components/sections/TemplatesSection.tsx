'use client'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'

const SECTORS = [
  { icon: '🍽️', label: 'Restaurant' },
  { icon: '🏠', label: 'Immobilier' },
  { icon: '🏥', label: 'Santé' },
  { icon: '🎓', label: 'Formation' },
  { icon: '🛒', label: 'E-commerce' },
  { icon: '🏗️', label: 'BTP' },
  { icon: '⚖️', label: 'Cabinet' },
  { icon: '🏨', label: 'Hôtel' },
  { icon: '💄', label: 'Beauté' },
  { icon: '🚗', label: 'Auto' },
  { icon: '💼', label: 'Corporate' },
  { icon: '🌾', label: 'Agriculture' },
]

const POINTS = [
  'Template professionnel responsive',
  'Contenu 100% administrable',
  'SEO optimisé dès le départ',
  'Mobile Money & paiement en ligne',
  'Livraison en 3 à 7 jours',
]

export default function TemplatesSection() {
  return (
    <section style={{ background: '#06091A', padding: '5rem 0', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tpl-scroll-track { display:flex; gap:1rem; animation:scroll-left 22s linear infinite; width:max-content; }
        .tpl-pill { display:inline-flex; align-items:center; gap:.5rem; padding:.55rem 1.1rem; border-radius:9999px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); white-space:nowrap; font-size:.8rem; font-weight:700; color:rgba(255,255,255,.55); }
        .tpl-cta-primary:hover { opacity:.9; transform:translateY(-2px); }
        .tpl-cta-secondary:hover { background:rgba(255,255,255,.08); }
      `}</style>

      {/* Glows d'ambiance */}
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,91,204,.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,0,.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Badge */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.4rem 1.1rem', borderRadius: '9999px', background: 'rgba(255,107,0,.1)', border: '1px solid rgba(255,107,0,.25)', marginBottom: '1.5rem' }}>
            <Zap size={12} style={{ color: '#FF9A4D' }} />
            <span style={{ fontSize: '.7rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.07em' }}>NOUVEAU SERVICE — TEMPLATES PRÊTS À L&apos;EMPLOI</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Colonne gauche — Texte */}
          <div>
            <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', fontWeight: 900, color: 'white', letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Votre site web professionnel{' '}
              <span style={{ background: 'linear-gradient(90deg,#FF6B00,#FF9A4D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                prêt en quelques jours
              </span>
            </h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
              IBIG DIGITAL lance sa plateforme de <strong style={{ color: 'rgba(255,255,255,.7)' }}>100+ templates professionnels</strong> spécialisés
              par secteur. Choisissez votre modèle, configurez vos options et soyez en ligne rapidement — sans
              expertise technique.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', marginBottom: '2.5rem' }}>
              {POINTS.map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
                  <CheckCircle size={15} style={{ color: '#4ADE80', flexShrink: 0 }} />
                  <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>{p}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/templates/commander"
                className="tpl-cta-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '.875rem 2rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 10px 30px rgba(255,107,0,.3)', textDecoration: 'none', transition: 'all .2s' }}>
                Configurer mon site web <ArrowRight size={16} />
              </Link>
              <Link href="/templates"
                className="tpl-cta-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.875rem 1.75rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.85rem', color: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,.1)', textDecoration: 'none', transition: 'all .2s' }}>
                Voir les templates
              </Link>
            </div>
          </div>

          {/* Colonne droite — Grille visuelle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
            {SECTORS.map((s, i) => (
              <div key={s.label}
                style={{
                  padding: '1.25rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255,255,255,.07)',
                  background: i % 3 === 0 ? 'rgba(255,107,0,.06)' : i % 3 === 1 ? 'rgba(0,91,204,.06)' : 'rgba(255,255,255,.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.75rem',
                  transition: 'border-color .2s',
                }}>
                <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'rgba(255,255,255,.6)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Défilement des secteurs (mobile) */}
        <div style={{ marginTop: '3rem', overflow: 'hidden', mask: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}>
          <div className="tpl-scroll-track">
            {[...SECTORS, ...SECTORS].map((s, i) => (
              <div key={i} className="tpl-pill">
                <span>{s.icon}</span> {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Compteurs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap', marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,.05)' }}>
          {[
            { n: '100+', l: 'Templates' },
            { n: '12', l: 'Secteurs' },
            { n: 'Dès 29 900', l: 'FCFA' },
            { n: '3–7 j', l: 'Délai livraison' },
          ].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white' }}>{n}</div>
              <div style={{ fontSize: '.68rem', fontWeight: 600, color: 'rgba(255,255,255,.3)', marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
