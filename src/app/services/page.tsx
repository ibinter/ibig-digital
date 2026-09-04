import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Zap, Star } from 'lucide-react'
import { getCategories, getProducts } from '@/lib/queries'
import { formatPrice, fcfaToUsd } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Nos Services – Solutions Digitales Premium | IBIG DIGITAL',
  description: "77+ services digitaux : sites web, applications, documents QR, e-commerce, design, marketing, IA. Devis gratuit en 24h.",
}

export const dynamic = 'force-dynamic'

const CAT = {
  'sites-web':            { g: 'linear-gradient(135deg,#0A2540 0%,#003B7A 60%,#0056CC 100%)', accent: '#4D9FFF', icon: '🌐', glow: '0,91,204' },
  'ecommerce':            { g: 'linear-gradient(135deg,#7A1500 0%,#C13200 60%,#FF6B00 100%)', accent: '#FF9A4D', icon: '🛒', glow: '255,107,0' },
  'applications':         { g: 'linear-gradient(135deg,#2D0070 0%,#5B21B6 60%,#8B5CF6 100%)', accent: '#C4B5FD', icon: '📱', glow: '124,58,237' },
  'documents-qr':         { g: 'linear-gradient(135deg,#003D38 0%,#0F766E 60%,#14B8A6 100%)', accent: '#5EEAD4', icon: '📄', glow: '15,118,110' },
  'design':               { g: 'linear-gradient(135deg,#6B0033 0%,#BE185D 60%,#EC4899 100%)', accent: '#F9A8D4', icon: '🎨', glow: '236,72,153' },
  'marketing-digital':    { g: 'linear-gradient(135deg,#003A5C 0%,#0284C7 60%,#38BDF8 100%)', accent: '#7DD3FC', icon: '📣', glow: '14,165,233' },
  'ia-automatisation':    { g: 'linear-gradient(135deg,#003D20 0%,#059669 60%,#34D399 100%)', accent: '#6EE7B7', icon: '🤖', glow: '16,185,129' },
  'community-management': { g: 'linear-gradient(135deg,#5C3600 0%,#D97706 60%,#FBBF24 100%)', accent: '#FDE68A', icon: '📈', glow: '245,158,11' },
  'seo':                  { g: 'linear-gradient(135deg,#003B52 0%,#0891B2 60%,#22D3EE 100%)', accent: '#67E8F9', icon: '🔍', glow: '6,182,212' },
  'hebergement':          { g: 'linear-gradient(135deg,#1C2430 0%,#334155 60%,#64748B 100%)', accent: '#CBD5E1', icon: '☁️', glow: '100,116,139' },
  'cybersecurite':        { g: 'linear-gradient(135deg,#5C0000 0%,#B91C1C 60%,#F87171 100%)', accent: '#FCA5A5', icon: '🛡️', glow: '239,68,68' },
  'formation':            { g: 'linear-gradient(135deg,#2E003D 0%,#7C3AED 60%,#A78BFA 100%)', accent: '#DDD6FE', icon: '🎓', glow: '139,92,246' },
  'video-contenu':        { g: 'linear-gradient(135deg,#4A0000 0%,#991B1B 60%,#DC2626 100%)', accent: '#FCA5A5', icon: '🎬', glow: '220,38,38' },
  'emailing':             { g: 'linear-gradient(135deg,#001A6B 0%,#1D4ED8 60%,#60A5FA 100%)', accent: '#93C5FD', icon: '✉️', glow: '37,99,235' },
  'consulting-digital':   { g: 'linear-gradient(135deg,#3D1900 0%,#92400E 60%,#D97706 100%)', accent: '#FCD34D', icon: '🧭', glow: '146,64,14' },
  'print-supports':       { g: 'linear-gradient(135deg,#0A0A0A 0%,#1F2937 60%,#374151 100%)', accent: '#9CA3AF', icon: '🖨️', glow: '55,65,81' },
  'cartes-digitales':     { g: 'linear-gradient(135deg,#4A0025 0%,#9D174D 60%,#EC4899 100%)', accent: '#F9A8D4', icon: '📲', glow: '190,24,93' },
  'whatsapp-business':    { g: 'linear-gradient(135deg,#003D15 0%,#15803D 60%,#4ADE80 100%)', accent: '#86EFAC', icon: '💬', glow: '22,163,74' },
}
const DEF = { g: 'linear-gradient(135deg,#001D3D,#003B7A)', accent: '#4D9FFF', icon: '⚡', glow: '0,59,122' }

interface Props { searchParams: Promise<{ cat?: string }> }

export default async function ServicesPage({ searchParams }: Props) {
  const { cat } = await searchParams
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ])

  const grouped = categories.map((c) => ({
    category: c,
    products: products.filter((p) => p.category_id === c.id),
    s: CAT[c.slug as keyof typeof CAT] ?? DEF,
  })).filter((g) => g.products.length > 0)

  const active = cat ? (grouped.find((g) => g.category.slug === cat) ?? grouped[0]) : grouped[0]

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.4} 50%{opacity:.8} }
        @keyframes slide-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .cat-tile {
          position:relative; border-radius:1.5rem; overflow:hidden;
          display:flex; flex-direction:column; padding:1.5rem;
          text-decoration:none; cursor:pointer;
          transition: transform .25s ease, box-shadow .25s ease;
          border: 1.5px solid rgba(255,255,255,0.08);
        }
        .cat-tile:hover { transform:translateY(-4px) scale(1.02); }
        .cat-tile.active-tile { border-color: rgba(255,255,255,0.3); }
        .cat-tile .shine {
          position:absolute; inset:0; opacity:0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          transition: opacity .25s;
        }
        .cat-tile:hover .shine { opacity:1; }

        .svc-card {
          position:relative; border-radius:1.25rem; overflow:hidden;
          display:flex; flex-direction:column; text-decoration:none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
          padding: 1.5rem;
        }
        .svc-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .svc-card .card-glow {
          position:absolute; top:-40px; right:-40px;
          width:120px; height:120px; border-radius:50%;
          opacity:0; transition:opacity .3s;
          filter: blur(30px);
        }
        .svc-card:hover .card-glow { opacity:.5; }

        .price-tag {
          display:inline-block; padding:.3rem .8rem; border-radius:.5rem;
          font-weight:900; font-size:1.1rem; letter-spacing:-.02em;
        }

        .btn-orange {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.875rem 2rem; border-radius:1rem;
          font-weight:800; color:white; font-size:.9rem;
          background: linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow: 0 8px 30px rgba(255,107,0,.45);
          text-decoration:none; transition: transform .2s, box-shadow .2s;
        }
        .btn-orange:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(255,107,0,.55); }

        .active-section { animation: slide-in .4s ease; }

        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.15); border-radius:2px; }
      `}</style>

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* bg orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(0,91,204,0.25) 0%,transparent 70%)', animation: 'pulse-glow 4s ease-in-out infinite' }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(255,107,0,0.15) 0%,transparent 70%)', animation: 'pulse-glow 5s ease-in-out infinite .5s' }} />
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.15) 0%,transparent 70%)' }} />
        </div>
        {/* grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
            style={{ background:'rgba(255,107,0,0.1)', borderColor:'rgba(255,107,0,0.25)', backdropFilter:'blur(10px)' }}>
            <Zap size={14} style={{ color:'#FF6B00' }} />
            <span className="text-xs font-bold" style={{ color:'#FF9A4D' }}>
              {products.length}+ SERVICES PROFESSIONNELS
            </span>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background:'#FF6B00' }} />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing:'-0.03em', lineHeight:1.05 }}>
            Solutions{' '}
            <span style={{
              background: 'linear-gradient(90deg,#FF6B00 0%,#FF9A4D 40%,#FFD4A0 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>
              digitales
            </span>
            <br />
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.6em', fontWeight:700 }}>
              qui transforment votre business
            </span>
          </h1>

          {/* stats row */}
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            {[
              { n: `${products.length}+`, l: 'Services' },
              { n: `${grouped.length}`, l: 'Catégories' },
              { n: '24h', l: 'Devis gratuit' },
              { n: '100%', l: 'Made in Africa' },
            ].map(({ n, l }) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black" style={{
                  background:'linear-gradient(135deg,#FF6B00,#FFD4A0)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
                }}>{n}</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color:'rgba(255,255,255,0.4)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 55 900 5 600 30C300 55 100 15 0 35L0 60Z" fill="#06091A"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════ CATÉGORIES GRID ═══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-white mb-1">Choisissez votre domaine</h2>
          <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.875rem' }}>Cliquez sur une catégorie pour voir les services et tarifs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {grouped.map(({ category, products: cp, s }) => {
            const isActive = active?.category.slug === category.slug
            return (
              <Link
                key={category.slug}
                href={`/services?cat=${category.slug}`}
                className={`cat-tile ${isActive ? 'active-tile' : ''}`}
                style={{
                  background: s.g,
                  boxShadow: isActive
                    ? `0 0 0 2px rgba(${s.glow},0.8), 0 20px 50px rgba(${s.glow},0.35)`
                    : `0 8px 24px rgba(${s.glow},0.2)`,
                  minHeight:'110px',
                }}
              >
                <div className="shine" />
                {isActive && (
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full animate-pulse"
                    style={{ background:'white', boxShadow:'0 0 6px white' }} />
                )}
                <div className="text-3xl mb-2" style={{ animation:'float 3s ease-in-out infinite', display:'inline-block' }}>
                  {s.icon}
                </div>
                <div className="font-bold text-white text-xs leading-tight mb-1">{category.name}</div>
                <div className="text-xs font-semibold" style={{ color:`rgba(${s.glow},0.9)`, background:'rgba(0,0,0,0.25)', borderRadius:'6px', padding:'2px 6px', display:'inline-block', marginTop:'auto' }}>
                  {cp.length} services
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ═══════════════════════════ SERVICES DE LA CATÉGORIE ACTIVE ═══════════════════════════ */}
      {active && (
        <section className="active-section max-w-7xl mx-auto px-4 pb-24">
          {/* header catégorie */}
          <div className="relative rounded-3xl overflow-hidden mb-10 p-8 sm:p-10"
            style={{ background: active.s.g }}>
            <div className="absolute inset-0" style={{
              backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
              backgroundSize:'30px 30px'
            }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full"
              style={{ background:`radial-gradient(circle,rgba(${active.s.glow},0.4) 0%,transparent 70%)`, transform:'translate(30%,-30%)' }} />

            <div className="relative flex items-center gap-6 flex-wrap">
              <div className="text-6xl" style={{ animation:'float 3s ease-in-out infinite', display:'inline-block' }}>
                {active.s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-3xl sm:text-4xl font-black text-white">{active.category.name}</h2>
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)' }}>
                    {active.products.length} service{active.products.length > 1 ? 's' : ''}
                  </span>
                </div>
                {active.category.description && (
                  <p className="text-white/70 max-w-2xl text-sm">{active.category.description}</p>
                )}
              </div>
              <Link href="/devis" className="btn-orange shrink-0">
                Devis gratuit <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* grille services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {active.products.map((product) => (
              <Link key={product.id} href={`/produits/${product.slug}`} className="svc-card">
                {/* glow */}
                <div className="card-glow" style={{ background:`rgba(${active.s.glow},1)` }} />

                {/* top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[1.25rem]"
                  style={{ background: active.s.g }} />

                <div className="flex items-start justify-between gap-3 mb-4 pt-1">
                  <h3 className="font-black text-white text-base leading-snug flex-1">
                    {product.name}
                  </h3>
                  {product.is_featured && (
                    <span className="shrink-0 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                      style={{ background:`rgba(${active.s.glow},0.2)`, color: active.s.accent }}>
                      <Star size={10} fill="currentColor" /> Top
                    </span>
                  )}
                </div>

                {product.short_description && (
                  <p className="text-sm mb-5 line-clamp-2" style={{ color:'rgba(255,255,255,0.5)' }}>
                    {product.short_description}
                  </p>
                )}

                <div className="mt-auto flex items-end justify-between">
                  <div>
                    {product.price_type === 'on_quote' ? (
                      <div className="price-tag" style={{ background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.5)' }}>
                        Sur devis
                      </div>
                    ) : product.price ? (
                      <>
                        {product.price_type === 'from' && (
                          <div className="text-xs mb-1 font-semibold uppercase tracking-wide" style={{ color:'rgba(255,255,255,0.35)' }}>
                            À partir de
                          </div>
                        )}
                        <div className="price-tag" style={{ background:`rgba(${active.s.glow},0.2)`, color: active.s.accent }}>
                          {formatPrice(product.price)}
                        </div>
                        <div className="text-xs mt-1 font-medium" style={{ color:'rgba(255,255,255,0.35)' }}>
                          ≈ {fcfaToUsd(product.price)}
                        </div>
                      </>
                    ) : null}
                    {product.delivery_time && (
                      <div className="flex items-center gap-1 mt-2 text-xs" style={{ color:'rgba(255,255,255,0.3)' }}>
                        <Clock size={10} />{product.delivery_time}
                      </div>
                    )}
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background:`rgba(${active.s.glow},0.25)`, color: active.s.accent }}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════ CTA FINAL ═══════════════════════════ */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
            style={{ background: 'linear-gradient(135deg,#001D3D 0%,#003B7A 50%,#FF6B00 150%)' }}>
            <div className="absolute inset-0" style={{
              backgroundImage:'radial-gradient(circle at 70% 50%,rgba(255,107,0,0.25) 0%,transparent 60%)'
            }} />
            <div className="relative">
              <div className="text-5xl mb-4" style={{ animation:'float 3s ease-in-out infinite', display:'inline-block' }}>🚀</div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ letterSpacing:'-0.02em' }}>
                Prêt à décoller ?
              </h2>
              <p className="text-lg mb-8" style={{ color:'rgba(255,255,255,0.65)', maxWidth:'480px', margin:'0 auto 2rem' }}>
                Obtenez votre devis personnalisé sous 24h, gratuitement et sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/devis" className="btn-orange">
                  Demander un devis <ArrowRight size={18} />
                </Link>
                <Link href="/packs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold border text-white"
                  style={{ borderColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(10px)', background:'rgba(255,255,255,0.06)' }}>
                  Voir nos packs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
