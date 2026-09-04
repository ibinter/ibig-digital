import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, MessageSquare, ExternalLink, Zap, Shield, Clock, HeadphonesIcon } from 'lucide-react'
import { getPackBySlug, getPacks } from '@/lib/queries'
import { formatPrice, fcfaToUsd } from '@/lib/utils'
import { SITE } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pack = await getPackBySlug(slug).catch(() => null)
  if (!pack) return { title: 'Pack introuvable' }
  return {
    title: `${pack.name} – Pack Digital | IBIG DIGITAL`,
    description: pack.description ?? `Découvrez le pack ${pack.name} d'IBIG DIGITAL : services inclus, prix et avantages.`,
  }
}

export const dynamic = 'force-dynamic'

const GUARANTEES = [
  { icon: Shield, title: 'Satisfaction garantie', desc: 'Livraison conforme ou remboursement' },
  { icon: Clock, title: 'Délais respectés', desc: 'Planning établi dès le lancement' },
  { icon: HeadphonesIcon, title: 'Support dédié', desc: 'Équipe disponible tout au long du projet' },
  { icon: Zap, title: 'Résultats rapides', desc: 'Premiers livrables en moins de 7 jours' },
]

export default async function PackDetailPage({ params }: Props) {
  const { slug } = await params
  const pack = await getPackBySlug(slug).catch(() => null)
  if (!pack) notFound()

  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Bonjour, je suis intéressé par le pack "${pack.name}" à ${formatPrice(pack.price)}. Pouvez-vous me donner plus d'informations ?`)}`

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .check-row { display:flex; align-items:flex-start; gap:.875rem; padding:.875rem 1rem; border-radius:.875rem; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); transition:background .15s,border-color .15s; }
        .check-row:hover { background:rgba(255,255,255,.05); border-color:rgba(255,255,255,.12); }
        .guarantee-card { padding:1.25rem; border-radius:1.1rem; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); display:flex; flex-direction:column; gap:.5rem; }
        .btn-main { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:1.1rem 2rem; border-radius:1rem; font-weight:800; font-size:.9rem; color:#fff; text-decoration:none; background:linear-gradient(135deg,#FF6B00,#FF4500); box-shadow:0 8px 24px rgba(255,107,0,.35); transition:opacity .15s,transform .15s; }
        .btn-main:hover { opacity:.9; transform:translateY(-1px); }
        .btn-wa { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:1.1rem 2rem; border-radius:1rem; font-weight:700; font-size:.9rem; color:#fff; text-decoration:none; background:#25D366; box-shadow:0 6px 18px rgba(37,211,102,.25); transition:opacity .15s; }
        .btn-wa:hover { opacity:.88; }
        .btn-outline { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:1rem 1.75rem; border-radius:1rem; font-weight:600; font-size:.875rem; color:rgba(255,255,255,.65); text-decoration:none; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); transition:background .15s; }
        .btn-outline:hover { background:rgba(255,255,255,.09); }
      `}</style>

      {/* ── BACK LINK ── */}
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'6rem 1.5rem 0' }}>
        <Link href="/packs" style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', fontSize:'.8rem', fontWeight:600, color:'rgba(255,255,255,.4)', textDecoration:'none', marginBottom:'2rem' }}>
          <ArrowLeft size={14} /> Tous les packs
        </Link>
      </div>

      {/* ── HERO ── */}
      <section style={{ position:'relative', overflow:'hidden', paddingBottom:'3rem' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-10%', left:'10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.18) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', top:'5%', right:'10%', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.1) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .6s' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        </div>

        <div style={{ position:'relative', maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem' }}>
          <div style={{ maxWidth:'680px' }}>
            {pack.is_featured && (
              <div style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.35rem .9rem', borderRadius:'9999px', marginBottom:'1.25rem', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.3)' }}>
                <span style={{ fontSize:'.62rem', fontWeight:800, color:'#FF9A4D', letterSpacing:'.08em' }}>★ PACK RECOMMANDÉ</span>
              </div>
            )}
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, color:'white', marginBottom:'1rem', letterSpacing:'-.03em', lineHeight:1.1 }}>
              {pack.name}
            </h1>
            {pack.description && (
              <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,.5)', lineHeight:1.75, marginBottom:'2rem', maxWidth:'540px' }}>
                {pack.description}
              </p>
            )}

            {/* Price block */}
            <div style={{ display:'inline-flex', flexDirection:'column', gap:'.5rem', padding:'1.5rem 2rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', backdropFilter:'blur(20px)', marginBottom:'2rem' }}>
              <div style={{ fontSize:'2.75rem', fontWeight:900, color:'white', letterSpacing:'-.04em', lineHeight:1 }}>
                {formatPrice(pack.price)}
              </div>
              <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.35)', fontWeight:500 }}>≈ {fcfaToUsd(pack.price)}</div>
              {pack.old_value && (
                <div style={{ display:'flex', alignItems:'center', gap:'.75rem', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'.78rem', color:'rgba(255,255,255,.3)', textDecoration:'line-through' }}>
                    Valeur réelle : {formatPrice(pack.old_value)}
                  </span>
                  {pack.savings && (
                    <span style={{ fontSize:'.72rem', fontWeight:800, padding:'.25rem .7rem', borderRadius:'9999px', background:'rgba(255,107,0,.2)', color:'#FFB380', border:'1px solid rgba(255,107,0,.3)' }}>
                      Vous économisez {formatPrice(pack.savings)}
                    </span>
                  )}
                </div>
              )}
              <div style={{ display:'flex', gap:'.75rem', marginTop:'.5rem', flexWrap:'wrap' }}>
                <Link href={`/devis?pack=${pack.slug}`} className="btn-main">
                  Demander un devis <ArrowRight size={16} />
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <MessageSquare size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 6rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'2rem', alignItems:'start' }}>

          {/* Left — items */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.5rem' }}>
              <div style={{ height:'3px', width:'2rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
              <h2 style={{ fontWeight:800, fontSize:'.9rem', color:'white', letterSpacing:'.06em', textTransform:'uppercase' }}>Ce qui est inclus dans ce pack</h2>
            </div>

            {pack.items && pack.items.length > 0 ? (
              <div style={{ display:'flex', flexDirection:'column', gap:'.625rem', marginBottom:'3rem' }}>
                {pack.items.map((item, idx) => (
                  <div key={item.id} className="check-row">
                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,107,0,.15)', border:'1px solid rgba(255,107,0,.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Check size={13} style={{ color:'#FF9A4D' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight:700, color:'white', fontSize:'.88rem' }}>
                        {item.custom_label ?? item.product?.name}
                      </div>
                      {item.product?.short_description && (
                        <div style={{ fontSize:'.76rem', color:'rgba(255,255,255,.4)', marginTop:'2px', lineHeight:1.5 }}>
                          {item.product.short_description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color:'rgba(255,255,255,.35)', fontSize:'.875rem', marginBottom:'3rem' }}>
                Contactez-nous pour obtenir le détail complet de ce pack.
              </p>
            )}

            {/* Guarantees */}
            <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.25rem' }}>
              <div style={{ height:'3px', width:'2rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
              <h2 style={{ fontWeight:800, fontSize:'.9rem', color:'white', letterSpacing:'.06em', textTransform:'uppercase' }}>Nos engagements</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:'.875rem' }}>
              {GUARANTEES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="guarantee-card">
                  <div style={{ width:'36px', height:'36px', borderRadius:'.75rem', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={16} style={{ color:'#FF9A4D' }} />
                  </div>
                  <div style={{ fontWeight:700, color:'white', fontSize:'.85rem' }}>{title}</div>
                  <div style={{ fontSize:'.75rem', color:'rgba(255,255,255,.4)', lineHeight:1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — sticky sidebar */}
          <div style={{ position:'sticky', top:'6rem', display:'flex', flexDirection:'column', gap:'1rem' }}>

            {/* Summary card */}
            <div style={{ borderRadius:'1.5rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.09)', overflow:'hidden' }}>
              {pack.is_featured && (
                <div style={{ height:'3px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
              )}
              <div style={{ padding:'1.5rem' }}>
                <div style={{ fontSize:'.72rem', fontWeight:700, color:'rgba(255,255,255,.35)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.75rem' }}>Récapitulatif</div>
                <div style={{ fontSize:'1.75rem', fontWeight:900, color:'white', letterSpacing:'-.03em', marginBottom:'4px' }}>{formatPrice(pack.price)}</div>
                <div style={{ fontSize:'.75rem', color:'rgba(255,255,255,.3)', marginBottom:'1rem' }}>≈ {fcfaToUsd(pack.price)}</div>
                {pack.savings && (
                  <div style={{ padding:'.6rem .875rem', borderRadius:'.75rem', background:'rgba(255,107,0,.1)', border:'1px solid rgba(255,107,0,.2)', marginBottom:'1rem', fontSize:'.78rem', color:'#FFB380', fontWeight:700 }}>
                    💰 Économie de {formatPrice(pack.savings)}
                  </div>
                )}
                <div style={{ display:'flex', flexDirection:'column', gap:'.625rem' }}>
                  <Link href={`/devis?pack=${pack.slug}`} className="btn-main" style={{ fontSize:'.82rem', padding:'.875rem 1.25rem' }}>
                    Demander un devis <ArrowRight size={15} />
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize:'.82rem', padding:'.875rem 1.25rem' }}>
                    <MessageSquare size={15} /> WhatsApp
                  </a>
                  <Link href="/contact" className="btn-outline" style={{ fontSize:'.82rem', padding:'.75rem 1.25rem' }}>
                    Autre question
                  </Link>
                </div>
              </div>
            </div>

            {/* Items count */}
            {pack.items && pack.items.length > 0 && (
              <div style={{ padding:'1.1rem 1.25rem', borderRadius:'1.1rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', display:'flex', alignItems:'center', gap:'.75rem' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'.75rem', background:'rgba(77,159,255,.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'1.1rem', animation:'float 3s ease-in-out infinite' }}>
                  📦
                </div>
                <div>
                  <div style={{ fontSize:'.85rem', fontWeight:700, color:'white' }}>{pack.items.length} service{pack.items.length > 1 ? 's' : ''} inclus</div>
                  <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.35)' }}>Tout compris, clé en main</div>
                </div>
              </div>
            )}

            {/* ibigsoft link */}
            <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer"
              style={{ display:'flex', alignItems:'center', gap:'.6rem', padding:'.875rem 1.1rem', borderRadius:'1rem', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', textDecoration:'none', fontSize:'.75rem', color:'rgba(255,255,255,.4)' }}>
              <ExternalLink size={12} />
              Voir nos 11 logiciels SaaS sur ibigsoft.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
