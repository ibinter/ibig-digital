'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Star, Zap } from 'lucide-react'
import { formatPrice, fcfaToUsd } from '@/lib/utils'

const CAT: Record<string, { g: string; accent: string; icon: string; glow: string }> = {
  'sites-web':            { g: 'linear-gradient(135deg,#0A2540,#003B7A,#0056CC)', accent: '#4D9FFF', icon: '🌐', glow: '0,91,204' },
  'ecommerce':            { g: 'linear-gradient(135deg,#7A1500,#C13200,#FF6B00)', accent: '#FF9A4D', icon: '🛒', glow: '255,107,0' },
  'applications':         { g: 'linear-gradient(135deg,#2D0070,#5B21B6,#8B5CF6)', accent: '#C4B5FD', icon: '📱', glow: '124,58,237' },
  'documents-qr':         { g: 'linear-gradient(135deg,#003D38,#0F766E,#14B8A6)', accent: '#5EEAD4', icon: '📄', glow: '15,118,110' },
  'design':               { g: 'linear-gradient(135deg,#6B0033,#BE185D,#EC4899)', accent: '#F9A8D4', icon: '🎨', glow: '236,72,153' },
  'marketing-digital':    { g: 'linear-gradient(135deg,#003A5C,#0284C7,#38BDF8)', accent: '#7DD3FC', icon: '📣', glow: '14,165,233' },
  'ia-automatisation':    { g: 'linear-gradient(135deg,#003D20,#059669,#34D399)', accent: '#6EE7B7', icon: '🤖', glow: '16,185,129' },
  'community-management': { g: 'linear-gradient(135deg,#5C3600,#D97706,#FBBF24)', accent: '#FDE68A', icon: '📈', glow: '245,158,11' },
  'seo':                  { g: 'linear-gradient(135deg,#003B52,#0891B2,#22D3EE)', accent: '#67E8F9', icon: '🔍', glow: '6,182,212' },
  'hebergement':          { g: 'linear-gradient(135deg,#1C2430,#334155,#64748B)', accent: '#CBD5E1', icon: '☁️', glow: '100,116,139' },
  'cybersecurite':        { g: 'linear-gradient(135deg,#5C0000,#B91C1C,#F87171)', accent: '#FCA5A5', icon: '🛡️', glow: '239,68,68' },
  'formation':            { g: 'linear-gradient(135deg,#2E003D,#7C3AED,#A78BFA)', accent: '#DDD6FE', icon: '🎓', glow: '139,92,246' },
  'video-contenu':        { g: 'linear-gradient(135deg,#4A0000,#991B1B,#DC2626)', accent: '#FCA5A5', icon: '🎬', glow: '220,38,38' },
  'emailing':             { g: 'linear-gradient(135deg,#001A6B,#1D4ED8,#60A5FA)', accent: '#93C5FD', icon: '✉️', glow: '37,99,235' },
  'consulting-digital':   { g: 'linear-gradient(135deg,#3D1900,#92400E,#D97706)', accent: '#FCD34D', icon: '🧭', glow: '146,64,14' },
  'print-supports':       { g: 'linear-gradient(135deg,#0A0A0A,#1F2937,#374151)', accent: '#9CA3AF', icon: '🖨️', glow: '55,65,81' },
  'cartes-digitales':     { g: 'linear-gradient(135deg,#4A0025,#9D174D,#EC4899)', accent: '#F9A8D4', icon: '📲', glow: '190,24,93' },
  'whatsapp-business':    { g: 'linear-gradient(135deg,#003D15,#15803D,#4ADE80)', accent: '#86EFAC', icon: '💬', glow: '22,163,74' },
}
const DEF = { g: 'linear-gradient(135deg,#001D3D,#003B7A)', accent: '#4D9FFF', icon: '⚡', glow: '0,59,122' }

type Category = { id: number; name: string; slug: string; description?: string | null }
type Product = {
  id: number; name: string; slug: string; short_description?: string | null
  price?: number | null; price_type?: string | null; delivery_time?: string | null
  is_featured?: boolean; category_id: number
}

interface Props {
  categories: Category[]
  products: Product[]
}

export default function ServicesCatalog({ categories, products }: Props) {
  const servicesSectionRef = useRef<HTMLDivElement>(null)

  const grouped = categories.map((c) => ({
    category: c,
    products: products.filter((p) => p.category_id === c.id),
    s: CAT[c.slug] ?? DEF,
  })).filter((g) => g.products.length > 0)

  const [activeSlug, setActiveSlug] = useState(grouped[0]?.category.slug ?? '')
  const [shouldScroll, setShouldScroll] = useState(false)
  const active = grouped.find((g) => g.category.slug === activeSlug) ?? grouped[0]

  useEffect(() => {
    if (!shouldScroll) return
    setShouldScroll(false)
    const el = servicesSectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }, [activeSlug, shouldScroll])

  function handleCategoryClick(slug: string) {
    setActiveSlug(slug)
    setShouldScroll(true)
  }

  return (
    <>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.35} 50%{opacity:.75} }
        @keyframes slide-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .cat-tile {
          position:relative; border-radius:1.5rem; overflow:hidden;
          display:flex; flex-direction:column; padding:1.25rem;
          cursor:pointer; border: 1.5px solid rgba(255,255,255,0.07);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s;
          min-height:100px; user-select:none;
        }
        .cat-tile:hover { transform:translateY(-4px) scale(1.02); border-color:rgba(255,255,255,0.2); }
        .cat-tile.active-tile { border-color:rgba(255,255,255,0.35) !important; }
        .cat-tile .shine {
          position:absolute; inset:0; opacity:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 55%);
          transition:opacity .2s; pointer-events:none;
        }
        .cat-tile:hover .shine, .cat-tile.active-tile .shine { opacity:1; }

        .svc-card {
          position:relative; border-radius:1.25rem; overflow:hidden;
          display:flex; flex-direction:column; text-decoration:none;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);
          transition:transform .2s, border-color .2s, box-shadow .2s;
          padding:1.5rem;
        }
        .svc-card:hover {
          transform:translateY(-4px);
          border-color:rgba(255,255,255,0.18);
          box-shadow:0 20px 60px rgba(0,0,0,0.45);
        }
        .svc-card .card-glow {
          position:absolute; top:-40px; right:-40px;
          width:120px; height:120px; border-radius:50%;
          opacity:0; transition:opacity .3s; filter:blur(30px); pointer-events:none;
        }
        .svc-card:hover .card-glow { opacity:.4; }

        .btn-orange {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.8rem 1.75rem; border-radius:1rem; font-weight:800; color:white;
          background:linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow:0 8px 28px rgba(255,107,0,.4); text-decoration:none;
          transition:transform .2s, box-shadow .2s; font-size:.875rem; white-space:nowrap;
        }
        .btn-orange:hover { transform:translateY(-2px); box-shadow:0 12px 35px rgba(255,107,0,.55); }

        .services-section { animation: slide-in .35s ease; }
      `}</style>

      {/* ─── GRILLE CATÉGORIES ─── */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1rem 4rem' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <h2 style={{ fontSize:'1.5rem', fontWeight:900, color:'white', marginBottom:'.375rem' }}>
            Choisissez votre domaine
          </h2>
          <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'.875rem' }}>
            Cliquez sur une catégorie pour voir les services et tarifs
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',
          gap:'0.75rem',
        }}>
          {grouped.map(({ category, products: cp, s }) => {
            const isActive = activeSlug === category.slug
            return (
              <div
                key={category.slug}
                className={`cat-tile ${isActive ? 'active-tile' : ''}`}
                onClick={() => handleCategoryClick(category.slug)}
                style={{
                  background: s.g,
                  boxShadow: isActive
                    ? `0 0 0 2px rgba(${s.glow},.9), 0 16px 45px rgba(${s.glow},.35)`
                    : `0 6px 20px rgba(${s.glow},.2)`,
                }}
              >
                <div className="shine" />
                {isActive && (
                  <div style={{
                    position:'absolute', top:'0.75rem', right:'0.75rem',
                    width:'8px', height:'8px', borderRadius:'50%',
                    background:'white', boxShadow:'0 0 8px white',
                    animation:'pulse-glow 1.5s ease-in-out infinite'
                  }} />
                )}
                <div style={{ fontSize:'2rem', marginBottom:'0.5rem', display:'inline-block', animation:'float 3s ease-in-out infinite' }}>
                  {s.icon}
                </div>
                <div style={{ fontWeight:800, color:'white', fontSize:'.8rem', lineHeight:1.3, marginBottom:'0.5rem' }}>
                  {category.name}
                </div>
                <div style={{
                  marginTop:'auto', fontSize:'.7rem', fontWeight:700,
                  background:'rgba(0,0,0,0.25)', borderRadius:'6px', padding:'3px 8px',
                  display:'inline-block', color:`rgba(${s.glow},1)`,
                  filter:'brightness(1.5)',
                }}>
                  {cp.length} service{cp.length > 1 ? 's' : ''}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── SECTION SERVICES ACTIVE ─── */}
      {active && (
        <section
          ref={servicesSectionRef}
          className="services-section"
          key={active.category.slug}
          style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1rem 6rem' }}
        >
          {/* Header catégorie */}
          <div style={{
            position:'relative', borderRadius:'1.75rem', overflow:'hidden',
            padding:'2.5rem 2rem', marginBottom:'2rem', background: active.s.g,
          }}>
            <div style={{
              position:'absolute', inset:0,
              backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
              backgroundSize:'30px 30px', pointerEvents:'none',
            }} />
            <div style={{
              position:'absolute', top:0, right:0, width:'250px', height:'250px', borderRadius:'50%',
              background:`radial-gradient(circle,rgba(${active.s.glow},.5) 0%,transparent 70%)`,
              transform:'translate(30%,-30%)', pointerEvents:'none',
            }} />
            <div style={{ position:'relative', display:'flex', alignItems:'center', gap:'1.5rem', flexWrap:'wrap' }}>
              <div style={{ fontSize:'3.5rem', animation:'float 3s ease-in-out infinite', display:'inline-block' }}>
                {active.s.icon}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flexWrap:'wrap', marginBottom:'0.375rem' }}>
                  <h2 style={{ fontSize:'1.75rem', fontWeight:900, color:'white', margin:0 }}>
                    {active.category.name}
                  </h2>
                  <span style={{
                    padding:'.25rem .75rem', borderRadius:'9999px', fontSize:'.7rem',
                    fontWeight:700, color:'white', background:'rgba(255,255,255,0.15)',
                    backdropFilter:'blur(10px)',
                  }}>
                    {active.products.length} service{active.products.length > 1 ? 's' : ''}
                  </span>
                </div>
                {active.category.description && (
                  <p style={{ color:'rgba(255,255,255,.65)', fontSize:'.875rem', margin:0, maxWidth:'600px' }}>
                    {active.category.description}
                  </p>
                )}
              </div>
              <Link href={`/devis?service=${active.category.slug}`} className="btn-orange">
                Devis gratuit <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Grille services */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.25rem' }}>
            {active.products.map((product) => (
              <Link key={product.id} href={`/produits/${product.slug}`} className="svc-card">
                <div className="card-glow" style={{ background:`rgba(${active.s.glow},1)` }} />
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:active.s.g, borderRadius:'1.25rem 1.25rem 0 0' }} />

                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'0.75rem', marginBottom:'0.75rem', paddingTop:'0.25rem' }}>
                  <h3 style={{ fontWeight:900, color:'white', fontSize:'.9rem', lineHeight:1.35, flex:1, margin:0 }}>
                    {product.name}
                  </h3>
                  {product.is_featured && (
                    <span style={{
                      display:'flex', alignItems:'center', gap:'3px', flexShrink:0,
                      fontSize:'.65rem', fontWeight:700, padding:'.25rem .5rem', borderRadius:'.5rem',
                      background:`rgba(${active.s.glow},.2)`, color:active.s.accent,
                    }}>
                      <Star size={9} fill="currentColor" /> Top
                    </span>
                  )}
                </div>

                {product.short_description && (
                  <p style={{ fontSize:'.8rem', color:'rgba(255,255,255,.45)', lineHeight:1.5, marginBottom:'1rem',
                    display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {product.short_description}
                  </p>
                )}

                <div style={{ marginTop:'auto', display:'flex', alignItems:'flex-end', justifyContent:'space-between', paddingTop:'.75rem', borderTop:'1px solid rgba(255,255,255,.06)' }}>
                  <div>
                    {product.price_type === 'on_quote' ? (
                      <span style={{ fontSize:'.8rem', fontWeight:700, color:'rgba(255,255,255,.35)', padding:'.25rem .6rem', background:'rgba(255,255,255,.06)', borderRadius:'.5rem' }}>
                        Sur devis
                      </span>
                    ) : product.price ? (
                      <>
                        {product.price_type === 'from' && (
                          <div style={{ fontSize:'.65rem', color:'rgba(255,255,255,.3)', marginBottom:'2px', textTransform:'uppercase', letterSpacing:'.05em' }}>
                            À partir de
                          </div>
                        )}
                        <div style={{ fontWeight:900, fontSize:'1rem', color:active.s.accent, padding:'.2rem .6rem', background:`rgba(${active.s.glow},.15)`, borderRadius:'.5rem', display:'inline-block' }}>
                          {formatPrice(product.price)}
                        </div>
                        <div style={{ fontSize:'.7rem', color:'rgba(255,255,255,.3)', marginTop:'2px' }}>
                          ≈ {fcfaToUsd(product.price)}
                        </div>
                      </>
                    ) : null}
                    {product.delivery_time && (
                      <div style={{ display:'flex', alignItems:'center', gap:'3px', marginTop:'4px', fontSize:'.7rem', color:'rgba(255,255,255,.25)' }}>
                        <Clock size={9} />{product.delivery_time}
                      </div>
                    )}
                  </div>
                  <div style={{
                    width:'2.25rem', height:'2.25rem', borderRadius:'.75rem', flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:`rgba(${active.s.glow},.25)`, color:active.s.accent,
                  }}>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section style={{ padding:'0 1rem 6rem' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{
            position:'relative', borderRadius:'2rem', overflow:'hidden',
            padding:'4rem 2rem', textAlign:'center',
            background:'linear-gradient(135deg,#001D3D 0%,#003B7A 50%,#FF6B00 160%)',
          }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 70% 50%,rgba(255,107,0,.2) 0%,transparent 55%)', pointerEvents:'none' }} />
            <div style={{ position:'relative' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem', display:'inline-block', animation:'float 3s ease-in-out infinite' }}>🚀</div>
              <h2 style={{ fontSize:'2.5rem', fontWeight:900, color:'white', marginBottom:'.75rem', letterSpacing:'-.02em' }}>
                Prêt à décoller ?
              </h2>
              <p style={{ color:'rgba(255,255,255,.6)', fontSize:'1rem', maxWidth:'420px', margin:'0 auto 2rem' }}>
                Obtenez votre devis personnalisé sous 24h, gratuitement et sans engagement.
              </p>
              <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/devis" className="btn-orange" style={{ fontSize:'1rem', padding:'1rem 2rem' }}>
                  Demander un devis <ArrowRight size={18} />
                </Link>
                <Link href="/packs" style={{
                  display:'inline-flex', alignItems:'center', gap:'.5rem',
                  padding:'1rem 2rem', borderRadius:'1rem', fontWeight:700, color:'white',
                  border:'1.5px solid rgba(255,255,255,.2)', backdropFilter:'blur(10px)',
                  background:'rgba(255,255,255,.06)', textDecoration:'none',
                }}>
                  Voir nos packs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating action badge */}
      <div style={{
        position:'fixed', bottom:'6rem', right:'1.5rem', zIndex:40,
        display:'flex', alignItems:'center', gap:'.5rem',
        padding:'.6rem 1rem', borderRadius:'9999px',
        background:'rgba(0,29,61,0.9)', border:'1px solid rgba(255,255,255,.12)',
        backdropFilter:'blur(16px)', color:'white', fontSize:'.75rem', fontWeight:700,
        boxShadow:'0 8px 32px rgba(0,0,0,.4)',
        pointerEvents:'none',
      }}>
        <Zap size={12} style={{ color:'#FF6B00' }} />
        {products.length}+ services
      </div>
    </>
  )
}
