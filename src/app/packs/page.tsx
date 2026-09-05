import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, Zap, Star } from 'lucide-react'
import { getPacks } from '@/lib/queries'
import { formatPrice, fcfaToUsd } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Nos Packs – Offres Digitales Complètes | IBIG DIGITAL',
  description: 'Découvrez les packs commerciaux IBIG DIGITAL : Visibilité, Lancement Entreprise, Commerce en Ligne, Mobile Pro et Digital 360.',
}

export const dynamic = 'force-dynamic'

export default async function PacksPage() {
  const packs = await getPacks().catch(() => [])

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.25} 50%{opacity:.55} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .pack-card {
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: transform .25s, box-shadow .25s;
          display: flex;
          flex-direction: column;
        }
        .pack-card:hover { transform: translateY(-6px); }
        .pack-card-regular { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); }
        .pack-card-regular:hover { box-shadow: 0 24px 60px rgba(0,0,0,.4); border-color: rgba(255,255,255,.16); }
        .pack-card-featured { border: 2px solid rgba(255,107,0,.55); }
        .pack-card-featured:hover { box-shadow: 0 24px 60px rgba(255,107,0,.2); }
        .check-item { display:flex; align-items:flex-start; gap:.625rem; font-size:.82rem; color:rgba(255,255,255,.65); line-height:1.55; }
        .check-icon { margin-top:2px; flex-shrink:0; }
        .btn-primary {
          display:flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1rem 1.5rem; border-radius:1rem; font-weight:700; font-size:.875rem;
          color:#fff; text-decoration:none; transition:opacity .15s, transform .15s;
          background: linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow: 0 6px 20px rgba(255,107,0,.35);
        }
        .btn-primary:hover { opacity:.9; transform:scale(1.02); }
        .btn-primary-inv {
          display:flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1rem 1.5rem; border-radius:1rem; font-weight:700; font-size:.875rem;
          color:#FF6B00; text-decoration:none; transition:background .15s;
          background: rgba(255,107,0,.12); border: 1px solid rgba(255,107,0,.35);
        }
        .btn-primary-inv:hover { background: rgba(255,107,0,.2); }
        .btn-ghost {
          display:block; text-align:center; padding:.625rem;
          font-size:.78rem; font-weight:600; text-decoration:none; border-radius:.75rem;
          transition:background .15s;
        }
        .btn-ghost-light { color:rgba(255,255,255,.45); }
        .btn-ghost-light:hover { color:rgba(255,255,255,.8); background:rgba(255,255,255,.06); }
        .btn-ghost-orange { color:rgba(255,107,0,.7); }
        .btn-ghost-orange:hover { color:#FF6B00; background:rgba(255,107,0,.08); }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:'relative', paddingTop:'8rem', paddingBottom:'5rem', overflow:'hidden', textAlign:'center' }}>
        {/* Glow orbs */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-5%', left:'20%', width:'min(520px,90vw)', height:'min(520px,90vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.2) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', top:'10%', right:'15%', width:'min(360px,60vw)', height:'min(360px,60vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .8s' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        </div>

        <div style={{ position:'relative', maxWidth:'700px', margin:'0 auto', padding:'0 1.5rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.4rem 1.1rem', borderRadius:'9999px', marginBottom:'1.5rem', background:'rgba(255,107,0,.1)', border:'1px solid rgba(255,107,0,.25)' }}>
            <Zap size={12} style={{ color:'#FF9A4D' }} />
            <span style={{ fontSize:'.7rem', fontWeight:700, color:'#FF9A4D', letterSpacing:'.08em' }}>OFFRES PACKAGÉES — ÉCONOMISEZ JUSQU'À 40%</span>
          </div>
          <h1 style={{ fontSize:'clamp(2.2rem,5.5vw,3.8rem)', fontWeight:900, color:'white', marginBottom:'1rem', letterSpacing:'-.03em', lineHeight:1.1 }}>
            Nos{' '}
            <span style={{ background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              packs commerciaux
            </span>
          </h1>
          <p style={{ fontSize:'1rem', color:'rgba(255,255,255,.5)', lineHeight:1.75, maxWidth:'520px', margin:'0 auto' }}>
            Des offres complètes conçues pour chaque étape de votre développement digital, livrées clés en main.
          </p>
        </div>
      </section>

      {/* ── PACKS GRID ── */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 6rem' }}>
        {packs.length === 0 ? (
          /* Empty state */
          <div style={{ textAlign:'center', padding:'5rem 1rem' }}>
            <div style={{ fontSize:'3.5rem', marginBottom:'1.25rem', animation:'float 3s ease-in-out infinite' }}>📦</div>
            <h2 style={{ fontSize:'1.35rem', fontWeight:700, color:'white', marginBottom:'.6rem' }}>Packs en cours de configuration</h2>
            <p style={{ color:'rgba(255,255,255,.4)', maxWidth:'400px', margin:'0 auto 2rem', fontSize:'.875rem' }}>
              Nos offres packagées arrivent bientôt. Contactez-nous pour une offre personnalisée.
            </p>
            <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.875rem 2rem', borderRadius:'1rem', background:'linear-gradient(135deg,#FF6B00,#FF4500)', color:'white', fontWeight:700, fontSize:'.875rem', textDecoration:'none' }}>
              Nous contacter <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(320px,100%),1fr))', gap:'1.5rem', alignItems:'start' }}>
            {packs.map((pack, i) => (
              <div
                key={pack.id}
                className={`pack-card ${pack.is_featured ? 'pack-card-featured' : 'pack-card-regular'}`}
                style={pack.is_featured ? {
                  background: 'linear-gradient(145deg,#0d1a33 0%,#102040 50%,#0a1628 100%)',
                } : {}}
              >
                {/* Featured badge */}
                {pack.is_featured && (
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FF6B00)', backgroundSize:'200% 100%' }} />
                )}

                {/* Glow orb inside card */}
                <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'200px', height:'200px', borderRadius:'50%', background: pack.is_featured ? 'radial-gradient(circle,rgba(255,107,0,.1) 0%,transparent 65%)' : 'radial-gradient(circle,rgba(0,91,204,.08) 0%,transparent 65%)', pointerEvents:'none' }} />

                <div style={{ position:'relative', padding:'2rem' }}>
                  {/* Top row */}
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1.25rem' }}>
                    <div>
                      {pack.is_featured && (
                        <div style={{ display:'inline-flex', alignItems:'center', gap:'.35rem', padding:'.25rem .7rem', borderRadius:'9999px', background:'rgba(255,107,0,.15)', border:'1px solid rgba(255,107,0,.3)', marginBottom:'.6rem' }}>
                          <Star size={10} style={{ color:'#FF9A4D' }} />
                          <span style={{ fontSize:'.62rem', fontWeight:800, color:'#FF9A4D', letterSpacing:'.06em' }}>RECOMMANDÉ</span>
                        </div>
                      )}
                      <h2 style={{ fontSize:'1.25rem', fontWeight:900, color:'white', letterSpacing:'-.015em', lineHeight:1.2 }}>{pack.name}</h2>
                    </div>
                    <div style={{ width:'42px', height:'42px', borderRadius:'1rem', background: pack.is_featured ? 'rgba(255,107,0,.15)' : 'rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.35rem', flexShrink:0, animation:`float 3s ease-in-out infinite`, animationDelay:`${i * .4}s` }}>
                      {['📦','🚀','🛒','📱','🌐','⚡'][i % 6]}
                    </div>
                  </div>

                  {/* Description */}
                  {pack.description && (
                    <p style={{ fontSize:'.8rem', color:'rgba(255,255,255,.45)', marginBottom:'1.5rem', lineHeight:1.65 }}>
                      {pack.description}
                    </p>
                  )}

                  {/* Price */}
                  <div style={{ marginBottom:'1.5rem', padding:'1.1rem 1.25rem', borderRadius:'1rem', background: pack.is_featured ? 'rgba(255,107,0,.1)' : 'rgba(255,255,255,.04)', border: pack.is_featured ? '1px solid rgba(255,107,0,.2)' : '1px solid rgba(255,255,255,.07)' }}>
                    <div style={{ fontSize:'2.25rem', fontWeight:900, color:'white', letterSpacing:'-.03em', lineHeight:1 }}>
                      {formatPrice(pack.price)}
                    </div>
                    <div style={{ fontSize:'.75rem', color:'rgba(255,255,255,.35)', marginTop:'4px', fontWeight:500 }}>
                      ≈ {fcfaToUsd(pack.price)}
                    </div>
                    {pack.old_value && (
                      <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginTop:'.5rem', flexWrap:'wrap' }}>
                        <span style={{ fontSize:'.72rem', color:'rgba(255,255,255,.3)', textDecoration:'line-through' }}>
                          Valeur : {formatPrice(pack.old_value)}
                        </span>
                        {pack.savings && (
                          <span style={{ fontSize:'.68rem', fontWeight:800, padding:'.2rem .6rem', borderRadius:'9999px', background:'rgba(255,107,0,.2)', color:'#FFB380', border:'1px solid rgba(255,107,0,.25)' }}>
                            −{formatPrice(pack.savings)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Items */}
                  {pack.items && pack.items.length > 0 && (
                    <ul style={{ display:'flex', flexDirection:'column', gap:'.65rem', marginBottom:'1.75rem' }}>
                      {pack.items.map((item) => (
                        <li key={item.id} className="check-item">
                          <Check size={14} className="check-icon" style={{ color: pack.is_featured ? '#FF9A4D' : '#4D9FFF' }} />
                          {item.custom_label ?? item.product?.name}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTAs */}
                  <div style={{ display:'flex', flexDirection:'column', gap:'.625rem', marginTop:'auto' }}>
                    {pack.is_featured ? (
                      <Link href={`/devis?pack=${pack.slug}`} className="btn-primary">
                        Demander un devis <ArrowRight size={16} />
                      </Link>
                    ) : (
                      <Link href={`/devis?pack=${pack.slug}`} className="btn-primary-inv">
                        Demander un devis <ArrowRight size={16} />
                      </Link>
                    )}
                    <Link
                      href={`/packs/${pack.slug}`}
                      className={`btn-ghost ${pack.is_featured ? 'btn-ghost-orange' : 'btn-ghost-light'}`}
                    >
                      Voir le détail →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ maxWidth:'780px', margin:'0 auto', padding:'0 1.5rem 6rem', textAlign:'center' }}>
        <div style={{ padding:'3rem 2.5rem', borderRadius:'2rem', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.08) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <h2 style={{ fontSize:'clamp(1.5rem,3.5vw,2.1rem)', fontWeight:900, color:'white', marginBottom:'.75rem', letterSpacing:'-.025em' }}>
              Besoin d'une offre sur mesure ?
            </h2>
            <p style={{ color:'rgba(255,255,255,.4)', fontSize:'.875rem', marginBottom:'2rem', lineHeight:1.7 }}>
              Aucun pack ne correspond exactement à votre projet ? Nous construisons une solution personnalisée adaptée à votre budget et vos objectifs.
            </p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
              <Link href="/devis" style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.9rem 2rem', borderRadius:'1rem', background:'linear-gradient(135deg,#FF6B00,#FF4500)', color:'white', fontWeight:700, fontSize:'.875rem', textDecoration:'none', boxShadow:'0 8px 24px rgba(255,107,0,.3)' }}>
                Devis gratuit <ArrowRight size={16} />
              </Link>
              <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.9rem 2rem', borderRadius:'1rem', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', color:'rgba(255,255,255,.75)', fontWeight:600, fontSize:'.875rem', textDecoration:'none' }}>
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
