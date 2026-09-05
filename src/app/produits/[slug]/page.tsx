import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Check, X, Clock, MessageSquare, Zap, Shield,
  Award, Star, ChevronRight, Phone, TrendingUp, Users, Target, Lightbulb
} from 'lucide-react'
import { getProductBySlug, getProducts } from '@/lib/queries'
import { getStaticProductBySlug, STATIC_PRODUCTS } from '@/lib/services-data'
import { formatPrice, fcfaToUsd } from '@/lib/utils'
import { SITE } from '@/lib/constants'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = (await getProductBySlug(slug).catch(() => null)) ?? getStaticProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.seo_title ?? `${product.name} | IBIG DIGITAL`,
    description: product.seo_description ?? product.short_description,
    openGraph: product.og_image ? { images: [product.og_image] } : undefined,
  }
}

export async function generateStaticParams() {
  const dbProducts = await getProducts().catch(() => [])
  const all = dbProducts.length > 0 ? dbProducts : STATIC_PRODUCTS
  return all.map((p) => ({ slug: p.slug }))
}

export const dynamic = 'force-dynamic'

const TRUST = [
  { icon: Shield, label: 'Devis gratuit', sub: 'Sans engagement' },
  { icon: Clock, label: 'Réponse rapide', sub: 'Sous 24 heures' },
  { icon: Award, label: 'Qualité garantie', sub: 'Satisfaction assurée' },
  { icon: Star, label: 'Experts locaux', sub: 'Basé à Abidjan' },
]

const PROCESS = [
  { n: '01', title: 'Briefing', desc: 'Nous analysons vos besoins et objectifs en détail lors d\'un appel ou échange WhatsApp.' },
  { n: '02', title: 'Proposition', desc: 'Vous recevez un devis personnalisé et un planning de réalisation clair.' },
  { n: '03', title: 'Réalisation', desc: 'Notre équipe travaille avec des points d\'avancement réguliers à chaque étape.' },
  { n: '04', title: 'Livraison', desc: 'Validation finale, formation à l\'utilisation et support post-livraison inclus.' },
]

const DEFAULT_BENEFITS = [
  { icon: TrendingUp, title: 'Résultats mesurables', desc: 'Chaque service est conçu pour vous apporter des résultats concrets et suivables : visibilité, leads, ventes.' },
  { icon: Users, title: 'Équipe dédiée', desc: 'Vous bénéficiez d\'une équipe de spécialistes entièrement dédiée à votre projet, disponible et réactive.' },
  { icon: Target, title: 'Approche sur-mesure', desc: 'Pas de solution générique. Chaque stratégie est personnalisée selon votre secteur, vos objectifs et votre budget.' },
  { icon: Lightbulb, title: 'Expertise locale & globale', desc: 'Nous combinons la connaissance du marché africain avec les meilleures pratiques digitales mondiales.' },
]

const TESTIMONIAL = {
  text: 'IBIG DIGITAL a transformé notre présence digitale. Le professionnalisme, la réactivité et la qualité du travail livré dépassent nos attentes. Je recommande vivement.',
  name: 'Kouamé A.',
  role: 'Directeur Général, PME Abidjan',
  stars: 5,
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = (await getProductBySlug(slug).catch(() => null)) ?? getStaticProductBySlug(slug)
  if (!product) notFound()

  const waMessage = `Bonjour IBIG DIGITAL, je suis intéressé par le service "${product.name}". Pouvez-vous me donner plus d'informations ?`
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(waMessage)}`
  const savings = product.old_price && product.price ? product.old_price - product.price : null

  return (
    <div style={{ background: '#F4F7FB', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .scard { background:white; border-radius:1.5rem; box-shadow:0 2px 20px rgba(0,0,0,.05); overflow:hidden; }
        .feat-item {
          display:flex; align-items:flex-start; gap:.75rem; padding:.875rem 1rem;
          background:#F8FAFC; border-radius:1rem; font-size:.875rem; color:#1E293B;
          border:1px solid #EEF2F7; transition:transform .15s, box-shadow .15s;
        }
        .feat-item:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.07); }
        .incl-item { display:flex; align-items:flex-start; gap:.75rem; padding:.875rem 0; border-bottom:1px solid #F1F5F9; }
        .incl-item:last-child { border-bottom:none; }
        .benefit-card { background:white; border-radius:1.25rem; padding:1.5rem; border:1px solid #EEF2F7; transition:transform .2s, box-shadow .2s; }
        .benefit-card:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(0,0,0,.08); }
        .cta-btn-orange {
          display:flex; align-items:center; justify-content:center; gap:.5rem;
          width:100%; padding:1rem 1.5rem; border-radius:1rem; font-weight:800; color:white;
          background:linear-gradient(135deg,#FF6B00,#FF4500); box-shadow:0 8px 24px rgba(255,107,0,.3);
          transition:transform .2s, box-shadow .2s; text-decoration:none;
        }
        .cta-btn-orange:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(255,107,0,.4); }
        .cta-btn-wa {
          display:flex; align-items:center; justify-content:center; gap:.5rem;
          width:100%; padding:.875rem 1.5rem; border-radius:1rem; font-weight:700; color:white;
          background:#25D366; box-shadow:0 6px 16px rgba(37,211,102,.25); transition:transform .2s; text-decoration:none;
        }
        .cta-btn-wa:hover { transform:translateY(-2px); }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <div style={{ background:'linear-gradient(135deg,#001D3D 0%,#003B7A 60%,#0056CC 100%)', paddingTop:'6rem', paddingBottom:'4rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:0, right:0, width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 65%)', transform:'translate(30%,-30%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem' }}>
          {/* Breadcrumb */}
          <nav style={{ display:'flex', alignItems:'center', gap:'.4rem', fontSize:'.75rem', color:'rgba(255,255,255,.4)', marginBottom:'2rem', flexWrap:'wrap' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none' }}>Accueil</Link>
            <ChevronRight size={11} />
            <Link href="/services" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none' }}>Services</Link>
            {product.category && (<><ChevronRight size={11} /><span>{product.category.name}</span></>)}
            <ChevronRight size={11} />
            <span style={{ color:'rgba(255,255,255,.75)', fontWeight:600 }} className="truncate">{product.name}</span>
          </nav>

          {/* Hero centré */}
          <div style={{ textAlign:'center', maxWidth:'800px', margin:'0 auto' }}>
            {/* Badges */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap', gap:'.625rem', marginBottom:'1.5rem' }}>
              {product.category && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.4rem 1rem', borderRadius:'9999px', background:'rgba(255,107,0,.15)', border:'1px solid rgba(255,107,0,.3)', color:'#FF9A4D', fontSize:'.75rem', fontWeight:700 }}>
                  <Zap size={11} />{product.category.name}
                </div>
              )}
              {product.is_featured && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.4rem 1rem', borderRadius:'9999px', background:'rgba(255,107,0,.2)', border:'1px solid rgba(255,107,0,.3)', color:'#FF9A4D', fontSize:'.75rem', fontWeight:700 }}>
                  <Star size={11} fill="currentColor" /> Service populaire
                </div>
              )}
            </div>

            {/* Titre */}
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, color:'white', marginBottom:'1rem', letterSpacing:'-.03em', lineHeight:1.1 }}>
              {product.name}
            </h1>

            {/* Description */}
            {product.short_description && (
              <p style={{ fontSize:'1.1rem', color:'rgba(255,255,255,.6)', lineHeight:1.75, marginBottom:'2rem', maxWidth:'600px', margin:'0 auto 2rem' }}>
                {product.short_description}
              </p>
            )}

            {/* Séparateur prix */}
            <div style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', gap:'1.25rem', padding:'1.75rem 2.5rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.07)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,.12)', marginBottom:'1.75rem' }}>
              {product.promo_label && (
                <div style={{ padding:'.25rem .875rem', borderRadius:'9999px', fontSize:'.7rem', fontWeight:700, color:'white', background:'linear-gradient(135deg,#FF6B00,#FF4500)' }}>
                  🔥 {product.promo_label}
                </div>
              )}
              {product.price_type === 'on_quote' ? (
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'2rem', fontWeight:900, color:'white' }}>Sur devis</div>
                  <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.4)', marginTop:'.25rem' }}>Offre personnalisée selon vos besoins</div>
                </div>
              ) : product.price ? (
                <div style={{ textAlign:'center' }}>
                  {product.price_type === 'from' && <div style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:'.35rem' }}>À partir de</div>}
                  <div style={{ fontSize:'clamp(2.5rem,5vw,3.5rem)', fontWeight:900, color:'white', letterSpacing:'-.03em', lineHeight:1 }}>
                    {formatPrice(product.price, product.currency)}
                  </div>
                  <div style={{ fontSize:'.9rem', color:'rgba(255,255,255,.35)', marginTop:'.35rem' }}>≈ {fcfaToUsd(product.price)}</div>
                  {product.old_price && savings && (
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem', marginTop:'.625rem' }}>
                      <span style={{ fontSize:'.8rem', textDecoration:'line-through', color:'rgba(255,255,255,.3)' }}>{formatPrice(product.old_price)}</span>
                      <span style={{ fontSize:'.7rem', fontWeight:700, padding:'.2rem .6rem', borderRadius:'9999px', background:'rgba(255,107,0,.25)', color:'#FF9A4D' }}>
                        -{Math.round((savings / product.old_price!) * 100)}% économie
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ fontSize:'1.75rem', fontWeight:900, color:'white' }}>Contactez-nous</div>
              )}

              {/* Boutons côte à côte */}
              <div style={{ display:'flex', alignItems:'center', gap:'.875rem', flexWrap:'wrap', justifyContent:'center' }}>
                <Link href={`/devis?service=${product.slug}`}
                  style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.875rem 1.75rem', borderRadius:'1rem', fontWeight:800, fontSize:'.9rem', color:'white', background:'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow:'0 8px 24px rgba(255,107,0,.4)', textDecoration:'none', whiteSpace:'nowrap' }}>
                  Devis gratuit <ArrowRight size={16} />
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.875rem 1.5rem', borderRadius:'1rem', fontWeight:700, fontSize:'.9rem', color:'white', background:'#25D366', boxShadow:'0 8px 20px rgba(37,211,102,.3)', textDecoration:'none', whiteSpace:'nowrap' }}>
                  <MessageSquare size={15} /> WhatsApp
                </a>
              </div>

              {/* Mini réassurance */}
              <div style={{ display:'flex', alignItems:'center', gap:'1.25rem', flexWrap:'wrap', justifyContent:'center' }}>
                {[{ icon: Shield, text: 'Sans engagement' }, { icon: Clock, text: 'Réponse sous 24h' }].map(({ icon: Icon, text }) => (
                  <span key={text} style={{ fontSize:'.72rem', color:'rgba(255,255,255,.35)', display:'flex', alignItems:'center', gap:'.3rem' }}>
                    <Icon size={11} /> {text}
                  </span>
                ))}
                {product.delivery_time && (
                  <span style={{ fontSize:'.72rem', color:'rgba(255,255,255,.35)', display:'flex', alignItems:'center', gap:'.3rem' }}>
                    <Clock size={11} /> {product.delivery_time}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ TRUST ═══════════ */}
      <div style={{ maxWidth:'1280px', margin:'-1.5rem auto 3rem', padding:'0 1.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'1rem' }}>
          {TRUST.map(({ icon: Icon, label, sub }) => (
            <div key={label} style={{ background:'white', borderRadius:'1.25rem', padding:'1.25rem', textAlign:'center', boxShadow:'0 2px 20px rgba(0,0,0,.06)', border:'1px solid #EEF2F7' }}>
              <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'.875rem', background:'rgba(0,59,122,.07)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto .75rem' }}>
                <Icon size={17} style={{ color:'#003B7A' }} />
              </div>
              <div style={{ fontWeight:800, fontSize:'.875rem', color:'#1E293B' }}>{label}</div>
              <div style={{ fontSize:'.75rem', color:'#94A3B8', marginTop:'2px' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ CORPS ═══════════ */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'grid', gap:'2rem' }} className="lg:grid-cols-[1fr_360px]">

          {/* ── COLONNE GAUCHE ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem' }}>

            {/* Images */}
            {product.images && product.images.length > 0 && (
              <div className="scard">
                <div style={{ display:'grid', gridTemplateColumns: product.images.length === 1 ? '1fr' : 'repeat(auto-fit,minmax(min(200px,100%),1fr))', gap:'2px' }}>
                  {product.images.map((img) => (
                    <div key={img.id} style={{ position:'relative', minHeight:'180px', height:'clamp(180px,30vw,260px)', background:'#F1F5F9' }}>
                      <Image src={img.storage_path} alt={img.alt_text ?? product.name} fill style={{ objectFit:'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problème résolu */}
            {product.problem_solved && (
              <div className="scard" style={{ padding:'2rem', borderLeft:'5px solid #FF6B00' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1rem' }}>
                  <div style={{ width:'2.25rem', height:'2.25rem', borderRadius:'.75rem', background:'rgba(255,107,0,.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Zap size={16} style={{ color:'#FF6B00' }} />
                  </div>
                  <h2 style={{ fontWeight:900, fontSize:'1rem', color:'#FF6B00', margin:0 }}>Le problème que nous résolvons</h2>
                </div>
                <p style={{ color:'#475569', lineHeight:1.75, margin:0 }}>{product.problem_solved}</p>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="scard" style={{ padding:'2rem' }}>
                <h2 style={{ fontWeight:900, fontSize:'1.25rem', color:'#001D3D', marginBottom:'1.25rem' }}>À propos de ce service</h2>
                <div style={{ color:'#475569', lineHeight:1.8, whiteSpace:'pre-line' }}>{product.description}</div>
              </div>
            )}

            {/* ═══ SECTION PERSUASIVE (toujours affichée) ═══ */}
            <div className="scard" style={{ padding:'2rem' }}>
              <h2 style={{ fontWeight:900, fontSize:'1.25rem', color:'#001D3D', marginBottom:'.5rem' }}>
                Pourquoi choisir ce service ?
              </h2>
              <p style={{ color:'#64748B', fontSize:'.9rem', marginBottom:'1.75rem', lineHeight:1.6 }}>
                Chez IBIG DIGITAL, chaque service est conçu pour générer un impact réel sur votre activité.
                Voici ce qui nous distingue et pourquoi nos clients nous font confiance.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1rem' }}>
                {DEFAULT_BENEFITS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="benefit-card">
                    <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'.875rem', background:'linear-gradient(135deg,#001D3D,#003B7A)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
                      <Icon size={16} style={{ color:'white' }} />
                    </div>
                    <div style={{ fontWeight:800, color:'#1E293B', marginBottom:'.375rem', fontSize:'.9rem' }}>{title}</div>
                    <div style={{ color:'#64748B', fontSize:'.82rem', lineHeight:1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fonctionnalités */}
            {product.features && product.features.length > 0 && (
              <div className="scard" style={{ padding:'2rem' }}>
                <h2 style={{ fontWeight:900, fontSize:'1.25rem', color:'#001D3D', marginBottom:'1.25rem' }}>Ce que vous obtenez</h2>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'.75rem' }}>
                  {product.features.map((f, i) => (
                    <div key={i} className="feat-item">
                      <div style={{ width:'1.75rem', height:'1.75rem', borderRadius:'.5rem', background:'rgba(0,59,122,.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Check size={13} style={{ color:'#003B7A' }} />
                      </div>
                      <span style={{ fontWeight:600, lineHeight:1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclus / Non inclus */}
            {(product.included?.length || product.not_included?.length) ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.25rem' }}>
                {product.included && product.included.length > 0 && (
                  <div className="scard" style={{ padding:'1.75rem' }}>
                    <h3 style={{ fontWeight:900, fontSize:'.95rem', color:'#001D3D', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
                      <span style={{ width:'1.5rem', height:'1.5rem', borderRadius:'50%', background:'#DCFCE7', color:'#16A34A', fontSize:'.7rem', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900 }}>✓</span>
                      Inclus dans l&apos;offre
                    </h3>
                    <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                      {product.included.map((item, i) => (
                        <li key={i} className="incl-item">
                          <Check size={14} style={{ color:'#16A34A', flexShrink:0, marginTop:'2px' }} />
                          <span style={{ fontSize:'.875rem', color:'#374151', lineHeight:1.5 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.not_included && product.not_included.length > 0 && (
                  <div className="scard" style={{ padding:'1.75rem' }}>
                    <h3 style={{ fontWeight:900, fontSize:'.95rem', color:'#001D3D', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
                      <span style={{ width:'1.5rem', height:'1.5rem', borderRadius:'50%', background:'#FEF2F2', color:'#DC2626', fontSize:'.7rem', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900 }}>✕</span>
                      Non inclus
                    </h3>
                    <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                      {product.not_included.map((item, i) => (
                        <li key={i} className="incl-item">
                          <X size={14} style={{ color:'#CBD5E1', flexShrink:0, marginTop:'2px' }} />
                          <span style={{ fontSize:'.875rem', color:'#94A3B8', lineHeight:1.5 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            {/* Témoignage client */}
            <div className="scard" style={{ padding:'2rem', background:'linear-gradient(135deg,#F8FAFF,#F0F4FF)' }}>
              <div style={{ display:'flex', gap:'.25rem', marginBottom:'1rem' }}>
                {Array.from({ length: TESTIMONIAL.stars }).map((_, i) => (
                  <Star key={i} size={16} fill="#FF6B00" style={{ color:'#FF6B00' }} />
                ))}
              </div>
              <blockquote style={{ fontSize:'1rem', color:'#1E293B', lineHeight:1.75, fontStyle:'italic', marginBottom:'1.25rem', borderLeft:'3px solid #003B7A', paddingLeft:'1rem' }}>
                &ldquo;{TESTIMONIAL.text}&rdquo;
              </blockquote>
              <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'50%', background:'linear-gradient(135deg,#003B7A,#0056CC)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:900, fontSize:'.875rem', flexShrink:0 }}>
                  {TESTIMONIAL.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight:800, fontSize:'.875rem', color:'#001D3D' }}>{TESTIMONIAL.name}</div>
                  <div style={{ fontSize:'.75rem', color:'#64748B' }}>{TESTIMONIAL.role}</div>
                </div>
              </div>
            </div>

            {/* Processus */}
            <div className="scard" style={{ padding:'2rem' }}>
              <h2 style={{ fontWeight:900, fontSize:'1.25rem', color:'#001D3D', marginBottom:'1.75rem' }}>Comment ça se passe ?</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem' }}>
                {PROCESS.map((step) => (
                  <div key={step.n} style={{ display:'flex', gap:'1rem' }}>
                    <div style={{ flexShrink:0, width:'3rem', height:'3rem', borderRadius:'1rem', background:'linear-gradient(135deg,#001D3D,#003B7A)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'.875rem' }}>
                      {step.n}
                    </div>
                    <div>
                      <div style={{ fontWeight:800, fontSize:'.875rem', color:'#001D3D', marginBottom:'.25rem' }}>{step.title}</div>
                      <div style={{ fontSize:'.8rem', color:'#64748B', lineHeight:1.6 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── SIDEBAR ── */}
          <div>
            <div style={{ position:'sticky', top:'5.5rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>

              {/* Carte prix principale */}
              <div className="scard" style={{ padding:'1.75rem', border:'2px solid #FF6B00' }}>
                {product.promo_label && (
                  <div style={{ display:'inline-block', padding:'.3rem .875rem', borderRadius:'9999px', fontSize:'.75rem', fontWeight:700, color:'white', background:'linear-gradient(135deg,#FF6B00,#FF4500)', marginBottom:'1rem' }}>
                    🔥 {product.promo_label}
                  </div>
                )}

                {product.price_type === 'on_quote' ? (
                  <div style={{ fontWeight:900, fontSize:'1.5rem', color:'#003B7A', marginBottom:'.5rem' }}>Sur devis</div>
                ) : product.price ? (
                  <div style={{ marginBottom:'1.25rem' }}>
                    {product.price_type === 'from' && <div style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#94A3B8', marginBottom:'.2rem' }}>À partir de</div>}
                    <div style={{ fontSize:'2.25rem', fontWeight:900, color:'#003B7A', letterSpacing:'-.02em', lineHeight:1 }}>
                      {formatPrice(product.price, product.currency)}
                    </div>
                    <div style={{ fontSize:'.9rem', fontWeight:600, color:'#94A3B8', marginTop:'.2rem' }}>≈ {fcfaToUsd(product.price)}</div>
                    {product.old_price && savings && (
                      <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginTop:'.5rem' }}>
                        <span style={{ fontSize:'.8rem', textDecoration:'line-through', color:'#CBD5E1' }}>{formatPrice(product.old_price)}</span>
                        <span style={{ fontSize:'.7rem', fontWeight:700, padding:'.15rem .5rem', borderRadius:'9999px', background:'rgba(255,107,0,.1)', color:'#FF6B00' }}>
                          Économie : {formatPrice(savings)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontWeight:900, fontSize:'1.5rem', color:'#003B7A', marginBottom:'1.25rem' }}>Contactez-nous</div>
                )}

                {product.delivery_time && (
                  <div style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.75rem 0', marginBottom:'1rem', borderTop:'1px solid #F1F5F9', borderBottom:'1px solid #F1F5F9', fontSize:'.875rem', color:'#475569' }}>
                    <Clock size={14} style={{ color:'#FF6B00', flexShrink:0 }} />
                    <span><strong>Délai :</strong> {product.delivery_time}</span>
                  </div>
                )}

                <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
                  <Link href={`/devis?service=${product.slug}`} className="cta-btn-orange">
                    Demander un devis <ArrowRight size={16} />
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="cta-btn-wa">
                    <MessageSquare size={15} /> Discuter sur WhatsApp
                  </a>
                  <a href={`tel:${SITE.phone}`}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem', padding:'.75rem', borderRadius:'.875rem', fontWeight:700, fontSize:'.8rem', color:'#003B7A', border:'1px solid #E2E8F0', background:'white', textDecoration:'none', transition:'background .2s' }}>
                    <Phone size={13} /> Appeler directement
                  </a>
                </div>
              </div>

              {/* Garanties */}
              <div className="scard" style={{ padding:'1.5rem' }}>
                <h3 style={{ fontWeight:900, fontSize:'.875rem', color:'#001D3D', marginBottom:'1rem' }}>Nos garanties</h3>
                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'.75rem' }}>
                  {[
                    { icon: Shield, text: 'Satisfaction ou remboursement' },
                    { icon: Award, text: 'Expertise certifiée & reconnue' },
                    { icon: Clock, text: 'Respect des délais convenus' },
                    { icon: Star, text: 'Support inclus après livraison' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} style={{ display:'flex', alignItems:'center', gap:'.75rem', fontSize:'.8rem', color:'#475569' }}>
                      <div style={{ width:'1.75rem', height:'1.75rem', borderRadius:'.5rem', background:'rgba(0,59,122,.07)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Icon size={12} style={{ color:'#003B7A' }} />
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact rapide */}
              <div style={{ background:'linear-gradient(135deg,#001D3D,#003B7A)', borderRadius:'1.25rem', padding:'1.5rem', textAlign:'center' }}>
                <div style={{ fontSize:'2rem', marginBottom:'.75rem', display:'inline-block', animation:'float 3s ease-in-out infinite' }}>💬</div>
                <p style={{ color:'white', fontWeight:800, fontSize:'.875rem', marginBottom:'.25rem' }}>Une question ?</p>
                <p style={{ color:'rgba(255,255,255,.5)', fontSize:'.75rem', marginBottom:'1rem' }}>Réponse garantie en moins de 2h</p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.625rem 1.25rem', borderRadius:'.875rem', fontWeight:700, fontSize:'.8rem', color:'white', background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.2)', textDecoration:'none' }}>
                  <MessageSquare size={13} /> Écrire maintenant
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
