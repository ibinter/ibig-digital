import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight, ArrowLeft, Check, MessageSquare, Shield, Clock,
  Headphones, Zap, TrendingUp, Users, Target, Award,
  ChevronDown, Star, Globe, Smartphone, BarChart3, Palette,
} from 'lucide-react'
import { getPackBySlug } from '@/lib/queries'
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
    description: pack.description ?? `Pack ${pack.name} : solution digitale complète clé en main. Services inclus, prix transparent, livraison garantie.`,
  }
}

export const dynamic = 'force-dynamic'

/* ── Contenu statique enrichi selon le slug ── */
const PACK_CONTENT: Record<string, {
  emoji: string
  tagline: string
  audience: string
  benefits: { icon: typeof Zap; title: string; desc: string }[]
  faq: { q: string; a: string }[]
  ideal_for: string[]
}> = {
  default: {
    emoji: '🚀',
    tagline: 'Tout ce qu\'il vous faut pour réussir votre transformation digitale',
    audience: 'PME, startups et entrepreneurs qui veulent accélérer leur présence digitale',
    benefits: [
      { icon: TrendingUp, title: 'ROI mesurable', desc: 'Chaque euro investi génère de la visibilité, des leads et des ventes. Nos clients constatent en moyenne +40% de trafic web en 3 mois.' },
      { icon: Users, title: 'Équipe experte dédiée', desc: 'Designer, développeur, chef de projet — une équipe complète mobilisée pour votre projet, du brief à la livraison.' },
      { icon: Target, title: 'Livraison clé en main', desc: 'Vous n\'avez rien à gérer. IBIG DIGITAL s\'occupe de tout : conception, développement, hébergement et mise en ligne.' },
      { icon: Shield, title: 'Garantie qualité', desc: 'Satisfaction garantie ou remboursement. Chaque livrable est validé par votre équipe avant finalisation.' },
    ],
    faq: [
      { q: 'Combien de temps pour livrer ce pack ?', a: 'Selon le pack, la livraison varie de 7 à 30 jours ouvrés. Un planning précis est établi dès le démarrage du projet.' },
      { q: 'Est-ce que je peux personnaliser les services inclus ?', a: 'Oui, nous pouvons adapter le contenu du pack selon vos besoins spécifiques. Contactez-nous pour une offre sur mesure.' },
      { q: 'Quel mode de paiement acceptez-vous ?', a: 'Virement bancaire, Mobile Money (Orange Money, MTN MoMo, Wave), et paiement en plusieurs tranches possible.' },
      { q: 'Y a-t-il un suivi après la livraison ?', a: 'Oui, un support de 30 jours est inclus après livraison pour les corrections et ajustements mineurs.' },
    ],
    ideal_for: ['PME et commerces locaux', 'Startups en phase de lancement', 'Entrepreneurs individuels', 'Associations et ONG'],
  },
}

function getContent(slug: string) {
  return PACK_CONTENT[slug] ?? PACK_CONTENT['default']
}

const STEPS = [
  { n: '01', title: 'Démarrage & Brief', desc: 'Réunion de lancement, recueil de vos besoins, validation du planning et des livrables.' },
  { n: '02', title: 'Conception', desc: 'Maquettes, chartes graphiques, architecture technique — tout est validé avec vous avant développement.' },
  { n: '03', title: 'Développement', desc: 'Notre équipe développe et intègre l\'ensemble des services inclus dans votre pack.' },
  { n: '04', title: 'Livraison & Formation', desc: 'Mise en ligne, transfert de propriété, formation à l\'utilisation et support 30 jours.' },
]

const TESTIMONIAL = {
  text: 'Avec IBIG DIGITAL, nous avons lancé notre présence en ligne en moins de 3 semaines. Le pack était exactement ce dont nous avions besoin : clé en main, professionnel et au bon prix.',
  name: 'Kouamé A.',
  role: 'Directeur Général, PME Abidjan',
  stars: 5,
}

export default async function PackDetailPage({ params }: Props) {
  const { slug } = await params
  const pack = await getPackBySlug(slug).catch(() => null)
  if (!pack) notFound()

  const content = getContent(slug)
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Bonjour, je suis intéressé par le pack "${pack.name}" à ${formatPrice(pack.price)}. Pouvez-vous me donner plus d'informations ?`)}`
  const savings_pct = pack.old_value ? Math.round(((pack.old_value - pack.price) / pack.old_value) * 100) : null

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .check-row {
          display:flex; align-items:flex-start; gap:.875rem;
          padding:1rem 1.1rem; border-radius:1rem;
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07);
          transition:background .15s, border-color .15s, transform .15s;
        }
        .check-row:hover { background:rgba(255,255,255,.06); border-color:rgba(255,107,0,.25); transform:translateX(4px); }

        .benefit-card {
          padding:1.5rem; border-radius:1.25rem;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          transition:background .2s, border-color .2s, transform .2s;
        }
        .benefit-card:hover { background:rgba(255,255,255,.07); border-color:rgba(255,107,0,.2); transform:translateY(-3px); }

        .step-card {
          padding:1.5rem; border-radius:1.25rem;
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07);
          position:relative; overflow:hidden;
        }

        .faq-item {
          border-radius:1rem; background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08); overflow:hidden;
        }
        .faq-q {
          display:flex; align-items:center; justify-content:space-between;
          padding:1.1rem 1.25rem; font-weight:700; font-size:.9rem; color:white; cursor:pointer;
        }

        .btn-main {
          display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1.1rem 2rem; border-radius:1rem; font-weight:800; font-size:.9rem;
          color:#fff; text-decoration:none;
          background:linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow:0 8px 24px rgba(255,107,0,.35);
          transition:opacity .15s, transform .15s;
        }
        .btn-main:hover { opacity:.9; transform:translateY(-2px); }

        .btn-wa {
          display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1.1rem 2rem; border-radius:1rem; font-weight:700; font-size:.9rem;
          color:#fff; text-decoration:none; background:#25D366;
          box-shadow:0 6px 18px rgba(37,211,102,.22);
          transition:opacity .15s;
        }
        .btn-wa:hover { opacity:.88; }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:.9rem 1.5rem; border-radius:1rem; font-weight:600; font-size:.85rem;
          color:rgba(255,255,255,.6); text-decoration:none;
          background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
          transition:background .15s;
        }
        .btn-outline:hover { background:rgba(255,255,255,.09); }

        .savings-badge {
          background: linear-gradient(135deg,#FF6B00,#FF9A4D);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sticky-card {
          position:sticky; top:6rem;
          background:rgba(10,16,40,.8); border-radius:1.5rem;
          border:1px solid rgba(255,255,255,.1);
          backdrop-filter:blur(20px);
          overflow:hidden;
        }

        /* ── RESPONSIVE ── */
        .pack-hero-grid {
          display:grid;
          grid-template-columns: 1fr 380px;
          gap:3rem;
          align-items:start;
        }
        .pack-testimonial-grid {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:1.5rem;
          align-items:start;
        }
        @media (max-width: 900px) {
          .pack-hero-grid { grid-template-columns:1fr; }
          .sticky-card { position:static; }
        }
        @media (max-width: 640px) {
          .pack-testimonial-grid { grid-template-columns:1fr; }
          .check-row { padding:.75rem .875rem; }
          .benefit-card { padding:1.1rem; }
          .step-card { padding:1.1rem; }
        }
      `}</style>

      {/* ── BREADCRUMB ── */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'6.5rem 1.5rem 0' }}>
        <Link href="/packs" style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', fontSize:'.78rem', fontWeight:600, color:'rgba(255,255,255,.35)', textDecoration:'none', transition:'color .15s' }}>
          <ArrowLeft size={13} /> Retour aux packs
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{ position:'relative', overflow:'hidden', padding:'2.5rem 0 4rem' }}>
        {/* Orbs */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-5%', left:'5%', width:'min(600px,100vw)', height:'min(600px,100vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.18) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', top:'10%', right:'5%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.1) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .7s' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        </div>

        <div style={{ position:'relative', maxWidth:'1200px', margin:'0 auto', padding:'0 1.5rem' }} className="pack-hero-grid">

          {/* LEFT */}
          <div>
            {/* Tags */}
            <div style={{ display:'flex', alignItems:'center', gap:'.625rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
              {pack.is_featured && (
                <span style={{ display:'inline-flex', alignItems:'center', gap:'.35rem', padding:'.3rem .875rem', borderRadius:'9999px', fontSize:'.65rem', fontWeight:800, color:'#FF9A4D', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.3)', letterSpacing:'.08em' }}>
                  <Star size={10} fill="#FF9A4D" /> PACK RECOMMANDÉ
                </span>
              )}
              {savings_pct && (
                <span style={{ display:'inline-flex', alignItems:'center', padding:'.3rem .875rem', borderRadius:'9999px', fontSize:'.65rem', fontWeight:800, color:'#4ADE80', background:'rgba(74,222,128,.1)', border:'1px solid rgba(74,222,128,.25)', letterSpacing:'.06em' }}>
                  −{savings_pct}% sur la valeur totale
                </span>
              )}
            </div>

            {/* Emoji flottant + Titre */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:'1.25rem', marginBottom:'1.25rem' }}>
              <div style={{ fontSize:'3.5rem', animation:'float 3s ease-in-out infinite', flexShrink:0 }}>
                {content.emoji}
              </div>
              <h1 style={{ fontSize:'clamp(2rem,4.5vw,3.2rem)', fontWeight:900, color:'white', letterSpacing:'-.03em', lineHeight:1.1, margin:0 }}>
                {pack.name}
              </h1>
            </div>

            {/* Tagline */}
            <p style={{ fontSize:'1.1rem', color:'rgba(255,255,255,.55)', lineHeight:1.75, marginBottom:'1rem', maxWidth:'560px' }}>
              {content.tagline}
            </p>
            {pack.description && (
              <p style={{ fontSize:'.9rem', color:'rgba(255,255,255,.4)', lineHeight:1.75, marginBottom:'2rem', maxWidth:'540px' }}>
                {pack.description}
              </p>
            )}

            {/* Audience pill */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.55rem 1rem', borderRadius:'.875rem', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.09)', marginBottom:'2.5rem' }}>
              <Users size={13} style={{ color:'rgba(255,255,255,.4)' }} />
              <span style={{ fontSize:'.78rem', color:'rgba(255,255,255,.5)', fontWeight:500 }}>Pour : {content.audience}</span>
            </div>

            {/* Quick stats row */}
            <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
              {[
                { icon: Clock, label: 'Livraison', val: '7–30 jours' },
                { icon: Headphones, label: 'Support', val: '30 jours inclus' },
                { icon: Shield, label: 'Garantie', val: 'Satisfaction ou remboursé' },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:'.625rem' }}>
                  <div style={{ width:'32px', height:'32px', borderRadius:'.625rem', background:'rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={14} style={{ color:'rgba(255,255,255,.5)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.3)', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' }}>{label}</div>
                    <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.7)', fontWeight:600 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Sticky price card */}
          <div className="sticky-card">
            {pack.is_featured && (
              <div style={{ height:'3px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FF6B00)' }} />
            )}
            <div style={{ padding:'1.75rem' }}>
              {/* Price */}
              <div style={{ marginBottom:'1.25rem' }}>
                <div style={{ fontSize:'.68rem', fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.375rem' }}>Prix du pack</div>
                <div style={{ fontSize:'2.5rem', fontWeight:900, color:'white', letterSpacing:'-.04em', lineHeight:1 }}>
                  {formatPrice(pack.price)}
                </div>
                <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.3)', marginTop:'4px' }}>≈ {fcfaToUsd(pack.price)}</div>
                {pack.old_value && (
                  <div style={{ display:'flex', alignItems:'center', gap:'.625rem', marginTop:'.6rem', flexWrap:'wrap' }}>
                    <span style={{ fontSize:'.75rem', color:'rgba(255,255,255,.28)', textDecoration:'line-through' }}>
                      Valeur : {formatPrice(pack.old_value)}
                    </span>
                    {pack.savings && savings_pct && (
                      <span style={{ fontSize:'.72rem', fontWeight:800, padding:'.2rem .65rem', borderRadius:'9999px', background:'rgba(74,222,128,.12)', color:'#4ADE80', border:'1px solid rgba(74,222,128,.25)' }}>
                        Économie de {formatPrice(pack.savings)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Items summary */}
              {pack.items && pack.items.length > 0 && (
                <div style={{ padding:'.875rem', borderRadius:'.875rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', marginBottom:'1.25rem' }}>
                  <div style={{ fontSize:'.68rem', fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:'.625rem' }}>Inclus dans ce pack</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
                    {pack.items.slice(0, 5).map((item) => (
                      <div key={item.id} style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                        <Check size={11} style={{ color:'#FF9A4D', flexShrink:0 }} />
                        <span style={{ fontSize:'.78rem', color:'rgba(255,255,255,.6)', fontWeight:500 }}>
                          {item.custom_label ?? item.product?.name}
                        </span>
                      </div>
                    ))}
                    {pack.items.length > 5 && (
                      <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.3)', paddingLeft:'1.25rem' }}>
                        + {pack.items.length - 5} service{pack.items.length - 5 > 1 ? 's' : ''} supplémentaire{pack.items.length - 5 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div style={{ display:'flex', flexDirection:'column', gap:'.625rem' }}>
                <Link href={`/devis?pack=${pack.slug}`} className="btn-main">
                  Demander un devis gratuit <ArrowRight size={16} />
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <MessageSquare size={16} /> Discuter sur WhatsApp
                </a>
                <Link href="/contact" className="btn-outline">
                  Poser une question
                </Link>
              </div>

              {/* Trust micro-signals */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1.25rem', marginTop:'1.25rem', paddingTop:'1.25rem', borderTop:'1px solid rgba(255,255,255,.07)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.68rem', color:'rgba(255,255,255,.3)', fontWeight:500 }}>
                  <Shield size={11} style={{ color:'#4ADE80' }} /> Paiement sécurisé
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.68rem', color:'rgba(255,255,255,.3)', fontWeight:500 }}>
                  <Award size={11} style={{ color:'#FF9A4D' }} /> Qualité garantie
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CE QUI EST INCLUS
      ══════════════════════════════════════════ */}
      {pack.items && pack.items.length > 0 && (
        <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
            <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
            <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>
              {pack.items.length} services inclus dans ce pack
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(340px,100%),1fr))', gap:'.75rem' }}>
            {pack.items.map((item, i) => (
              <div key={item.id} className="check-row">
                <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,107,0,.14)', border:'1px solid rgba(255,107,0,.28)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'.75rem', fontWeight:800, color:'#FF9A4D' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:'white', fontSize:'.88rem', lineHeight:1.3 }}>
                    {item.custom_label ?? item.product?.name}
                  </div>
                  {item.product?.short_description && (
                    <div style={{ fontSize:'.74rem', color:'rgba(255,255,255,.4)', marginTop:'3px', lineHeight:1.5 }}>
                      {item.product.short_description}
                    </div>
                  )}
                </div>
                <Check size={14} style={{ color:'#4ADE80', flexShrink:0, marginTop:'2px' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          POURQUOI CE PACK
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Pourquoi choisir ce pack ?</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(260px,100%),1fr))', gap:'1rem' }}>
          {content.benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="benefit-card">
              <div style={{ width:'44px', height:'44px', borderRadius:'1rem', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.22)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
                <Icon size={20} style={{ color:'#FF9A4D' }} />
              </div>
              <div style={{ fontWeight:800, color:'white', fontSize:'.95rem', marginBottom:'.5rem' }}>{title}</div>
              <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.45)', lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESSUS
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Comment ça se passe ?</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(240px,100%),1fr))', gap:'1rem' }}>
          {STEPS.map((step, i) => (
            <div key={step.n} className="step-card">
              {/* Connecting line */}
              {i < STEPS.length - 1 && (
                <div style={{ position:'absolute', top:'2.5rem', right:'-1.5rem', width:'1.5rem', height:'2px', background:'rgba(255,107,0,.25)', zIndex:1 }} />
              )}
              <div style={{ fontSize:'3rem', fontWeight:900, color:'rgba(255,107,0,.12)', lineHeight:1, marginBottom:'.625rem', letterSpacing:'-.05em' }}>{step.n}</div>
              <div style={{ fontWeight:800, color:'white', fontSize:'.92rem', marginBottom:'.5rem' }}>{step.title}</div>
              <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.4)', lineHeight:1.65 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIAL + IDEAL FOR
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 1.5rem 5rem' }} className="pack-testimonial-grid">

        {/* Testimonial */}
        <div style={{ padding:'2rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-20px', right:'-20px', width:'120px', height:'120px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.08) 0%,transparent 70%)' }} />
          <div style={{ display:'flex', gap:'2px', marginBottom:'1.25rem' }}>
            {Array.from({ length: TESTIMONIAL.stars }).map((_, i) => (
              <Star key={i} size={14} fill="#FF9A4D" style={{ color:'#FF9A4D' }} />
            ))}
          </div>
          <p style={{ fontSize:'.9rem', color:'rgba(255,255,255,.65)', lineHeight:1.8, fontStyle:'italic', marginBottom:'1.25rem' }}>
            "{TESTIMONIAL.text}"
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
            <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#FF6B00,#FF9A4D)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'.85rem', color:'white', flexShrink:0 }}>
              {TESTIMONIAL.name[0]}
            </div>
            <div>
              <div style={{ fontWeight:700, color:'white', fontSize:'.85rem' }}>{TESTIMONIAL.name}</div>
              <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.35)' }}>{TESTIMONIAL.role}</div>
            </div>
          </div>
        </div>

        {/* Ideal for */}
        <div style={{ padding:'2rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)' }}>
          <div style={{ fontWeight:800, color:'white', fontSize:'.95rem', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
            <Target size={16} style={{ color:'#FF9A4D' }} /> Ce pack est idéal pour :
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'.625rem', marginBottom:'1.5rem' }}>
            {content.ideal_for.map((item) => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:'.625rem' }}>
                <Check size={13} style={{ color:'#4ADE80', flexShrink:0 }} />
                <span style={{ fontSize:'.85rem', color:'rgba(255,255,255,.6)', fontWeight:500 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:'1rem', borderRadius:'.875rem', background:'rgba(255,107,0,.08)', border:'1px solid rgba(255,107,0,.18)' }}>
            <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.45)', lineHeight:1.65 }}>
              Vous ne savez pas si ce pack est fait pour vous ?{' '}
              <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ color:'#FF9A4D', fontWeight:700, textDecoration:'none' }}>
                Parlez-en avec notre équipe →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'800px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Questions fréquentes</h2>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'.625rem' }}>
          {content.faq.map(({ q, a }) => (
            <div key={q} className="faq-item">
              <div className="faq-q">
                <span>{q}</span>
                <ChevronDown size={16} style={{ color:'rgba(255,255,255,.3)', flexShrink:0 }} />
              </div>
              <div style={{ padding:'0 1.25rem 1.1rem', fontSize:'.82rem', color:'rgba(255,255,255,.45)', lineHeight:1.75 }}>
                {a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'860px', margin:'0 auto', padding:'0 1.5rem 7rem', textAlign:'center' }}>
        <div style={{ padding:'clamp(1.5rem,5vw,3.5rem) clamp(1rem,4vw,2.5rem)', borderRadius:'2rem', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.1) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1.25rem', animation:'float 3s ease-in-out infinite' }}>{content.emoji}</div>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.5rem)', fontWeight:900, color:'white', marginBottom:'.75rem', letterSpacing:'-.025em', lineHeight:1.15 }}>
              Prêt à lancer votre projet ?
            </h2>
            <p style={{ color:'rgba(255,255,255,.4)', fontSize:'.9rem', marginBottom:'.5rem' }}>
              Pack <strong style={{ color:'rgba(255,255,255,.65)' }}>{pack.name}</strong> — {formatPrice(pack.price)}
              {pack.savings && <span style={{ color:'#4ADE80', fontWeight:700 }}> · Économisez {formatPrice(pack.savings)}</span>}
            </p>
            <p style={{ color:'rgba(255,255,255,.3)', fontSize:'.82rem', marginBottom:'2.25rem' }}>
              Devis gratuit · Réponse sous 24h · Aucun engagement
            </p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
              <Link href={`/devis?pack=${pack.slug}`} className="btn-main" style={{ fontSize:'.95rem', padding:'1.1rem 2.25rem' }}>
                Demander un devis gratuit <ArrowRight size={18} />
              </Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize:'.95rem', padding:'1.1rem 2rem' }}>
                <MessageSquare size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
