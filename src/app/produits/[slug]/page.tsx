import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, X, Clock, MessageSquare, Zap, Shield, Award, Star, ChevronRight, Phone } from 'lucide-react'
import { getProductBySlug, getProducts } from '@/lib/queries'
import { formatPrice, fcfaToUsd } from '@/lib/utils'
import { SITE } from '@/lib/constants'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)
  if (!product) return {}
  return {
    title: product.seo_title ?? `${product.name} | IBIG DIGITAL`,
    description: product.seo_description ?? product.short_description,
    openGraph: product.og_image ? { images: [product.og_image] } : undefined,
  }
}

export async function generateStaticParams() {
  const products = await getProducts().catch(() => [])
  return products.map((p) => ({ slug: p.slug }))
}

export const dynamic = 'force-dynamic'

const TRUST = [
  { icon: Shield, label: 'Devis gratuit', sub: 'Sans engagement' },
  { icon: Clock, label: 'Réponse rapide', sub: 'Sous 24 heures' },
  { icon: Award, label: 'Qualité garantie', sub: 'Satisfaction assurée' },
  { icon: Star, label: 'Experts locaux', sub: 'Basé à Abidjan' },
]

const PROCESS = [
  { n: '01', title: 'Briefing', desc: 'Nous analysons vos besoins et objectifs en détail.' },
  { n: '02', title: 'Proposition', desc: 'Devis personnalisé et planning de réalisation.' },
  { n: '03', title: 'Réalisation', desc: 'Notre équipe travaille avec un suivi régulier.' },
  { n: '04', title: 'Livraison', desc: 'Validation, formation et support post-livraison.' },
]

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)
  if (!product) notFound()

  const waMessage = `Bonjour IBIG DIGITAL, je suis intéressé par le service "${product.name}". Pouvez-vous me donner plus d'informations ?`
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(waMessage)}`

  const hasPrice = product.price_type !== 'on_quote' && product.price
  const savings = product.old_price && product.price ? product.old_price - product.price : null

  return (
    <div style={{ background: '#F4F7FB', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .prod-hero { background: linear-gradient(135deg,#001D3D 0%,#003B7A 60%,#0056CC 100%); }
        .scard { background:white; border-radius:1.5rem; box-shadow:0 2px 20px rgba(0,0,0,.06); }
        .feat-item {
          display:flex; align-items:center; gap:.75rem;
          padding:.875rem 1rem; background:white; border-radius:1rem;
          border:1px solid #EEF2F7; font-size:.875rem; font-weight:600; color:#1E293B;
          transition: transform .15s, box-shadow .15s;
        }
        .feat-item:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.08); }
        .incl-item { display:flex; align-items:flex-start; gap:.75rem; padding:.75rem 0; border-bottom:1px solid #F1F5F9; }
        .incl-item:last-child { border-bottom:none; }
        .trust-card { background:white; border-radius:1.25rem; padding:1.25rem; text-align:center; border:1px solid #EEF2F7; }
        .cta-btn-orange {
          display:flex; align-items:center; justify-content:center; gap:.5rem;
          width:100%; padding:1rem 1.5rem; border-radius:1rem; font-weight:800;
          color:white; font-size:.9rem; text-decoration:none;
          background:linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow:0 8px 24px rgba(255,107,0,.35);
          transition:transform .2s, box-shadow .2s; border:none; cursor:pointer;
        }
        .cta-btn-orange:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(255,107,0,.45); }
        .cta-btn-wa {
          display:flex; align-items:center; justify-content:center; gap:.5rem;
          width:100%; padding:1rem 1.5rem; border-radius:1rem; font-weight:700;
          color:white; font-size:.9rem; text-decoration:none;
          background:#25D366; box-shadow:0 6px 20px rgba(37,211,102,.3);
          transition:transform .2s; border:none; cursor:pointer;
        }
        .cta-btn-wa:hover { transform:translateY(-2px); }
      `}</style>

      {/* ══════════ HERO DARK ══════════ */}
      <div className="prod-hero pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(255,107,0,.15) 0%,transparent 70%)', transform:'translate(30%,-30%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color:'rgba(255,255,255,.45)' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,.45)', textDecoration:'none' }} className="hover:text-white">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/services" style={{ color:'rgba(255,255,255,.45)', textDecoration:'none' }} className="hover:text-white">Services</Link>
            {product.category && (
              <>
                <ChevronRight size={12} />
                <span style={{ color:'rgba(255,255,255,.45)' }}>{product.category.name}</span>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              {product.category && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                  style={{ background:'rgba(255,107,0,.15)', color:'#FF9A4D', border:'1px solid rgba(255,107,0,.25)' }}>
                  <Zap size={11} />
                  {product.category.name}
                </div>
              )}
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing:'-.02em', lineHeight:1.1 }}>
                {product.name}
              </h1>
              {product.short_description && (
                <p className="text-lg leading-relaxed mb-6" style={{ color:'rgba(255,255,255,.65)' }}>
                  {product.short_description}
                </p>
              )}
              {/* Badges rapides */}
              <div className="flex flex-wrap gap-3">
                {product.delivery_time && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', border:'1px solid rgba(255,255,255,.12)' }}>
                    <Clock size={11} /> {product.delivery_time}
                  </span>
                )}
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.7)', border:'1px solid rgba(255,255,255,.12)' }}>
                  <Shield size={11} /> Satisfaction garantie
                </span>
                {product.is_featured && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background:'rgba(255,107,0,.2)', color:'#FF9A4D', border:'1px solid rgba(255,107,0,.3)' }}>
                    <Star size={11} fill="currentColor" /> Service populaire
                  </span>
                )}
              </div>
            </div>

            {/* Mini prix card dans le hero */}
            <div className="rounded-2xl p-7" style={{ background:'rgba(255,255,255,.07)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,.12)' }}>
              {product.promo_label && (
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                  style={{ background:'linear-gradient(135deg,#FF6B00,#FF4500)' }}>
                  🔥 {product.promo_label}
                </div>
              )}
              {product.price_type === 'on_quote' ? (
                <div>
                  <div className="text-3xl font-black text-white mb-1">Sur devis</div>
                  <div style={{ color:'rgba(255,255,255,.45)', fontSize:'.875rem' }}>Contactez-nous pour une offre personnalisée</div>
                </div>
              ) : product.price ? (
                <div>
                  {product.price_type === 'from' && (
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:'rgba(255,255,255,.4)' }}>À partir de</div>
                  )}
                  <div className="text-4xl font-black text-white" style={{ letterSpacing:'-.02em' }}>
                    {formatPrice(product.price, product.currency)}
                  </div>
                  <div className="text-lg font-semibold mt-1" style={{ color:'rgba(255,255,255,.5)' }}>
                    ≈ {fcfaToUsd(product.price)}
                  </div>
                  {product.old_price && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm line-through" style={{ color:'rgba(255,255,255,.3)' }}>
                        {formatPrice(product.old_price)}
                      </span>
                      {savings && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background:'rgba(255,107,0,.25)', color:'#FF9A4D' }}>
                          -{Math.round((savings / product.old_price!) * 100)}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-2xl font-black text-white">Contactez-nous</div>
              )}

              <div className="flex flex-col gap-3 mt-6">
                <Link href={`/devis?service=${product.slug}`} className="cta-btn-orange">
                  Demander un devis <ArrowRight size={17} />
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="cta-btn-wa">
                  <MessageSquare size={17} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ TRUST BADGES ══════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="trust-card">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background:'rgba(0,59,122,.08)' }}>
                <Icon size={18} style={{ color:'#003B7A' }} />
              </div>
              <div className="font-bold text-sm" style={{ color:'#1E293B' }}>{label}</div>
              <div className="text-xs mt-0.5" style={{ color:'#94A3B8' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ CORPS PRINCIPAL ══════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── COLONNE PRINCIPALE ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Images */}
            {product.images && product.images.length > 0 && (
              <div className="scard overflow-hidden">
                <div className="grid grid-cols-2 gap-0.5">
                  {product.images.map((img, i) => (
                    <div key={img.id} className={`relative ${i === 0 && product.images!.length === 1 ? 'col-span-2' : ''} h-52 bg-gray-100`}>
                      <Image src={img.storage_path} alt={img.alt_text ?? product.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problème résolu */}
            {product.problem_solved && (
              <div className="scard p-7" style={{ borderLeft:'5px solid #FF6B00' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:'rgba(255,107,0,.1)' }}>
                    <Zap size={16} style={{ color:'#FF6B00' }} />
                  </div>
                  <h2 className="font-black text-base" style={{ color:'#FF6B00' }}>Le problème que nous résolvons</h2>
                </div>
                <p className="leading-relaxed" style={{ color:'#475569' }}>{product.problem_solved}</p>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="scard p-7">
                <h2 className="font-black text-xl mb-5" style={{ color:'#001D3D' }}>À propos de ce service</h2>
                <div className="leading-relaxed whitespace-pre-line" style={{ color:'#475569' }}>{product.description}</div>
              </div>
            )}

            {/* Fonctionnalités */}
            {product.features && product.features.length > 0 && (
              <div className="scard p-7">
                <h2 className="font-black text-xl mb-6" style={{ color:'#001D3D' }}>Ce que vous obtenez</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <div key={i} className="feat-item">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background:'rgba(0,59,122,.08)' }}>
                        <Check size={14} style={{ color:'#003B7A' }} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclus / Non inclus */}
            {(product.included || product.not_included) && (
              <div className="grid sm:grid-cols-2 gap-6">
                {product.included && product.included.length > 0 && (
                  <div className="scard p-7">
                    <h3 className="font-black text-base mb-4 flex items-center gap-2" style={{ color:'#001D3D' }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background:'#DCFCE7', color:'#16A34A' }}>✓</span>
                      Inclus dans l&apos;offre
                    </h3>
                    <ul>
                      {product.included.map((item, i) => (
                        <li key={i} className="incl-item">
                          <Check size={15} className="shrink-0 mt-0.5" style={{ color:'#16A34A' }} />
                          <span className="text-sm" style={{ color:'#374151' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.not_included && product.not_included.length > 0 && (
                  <div className="scard p-7">
                    <h3 className="font-black text-base mb-4 flex items-center gap-2" style={{ color:'#001D3D' }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background:'#FEF2F2', color:'#DC2626' }}>✕</span>
                      Non inclus
                    </h3>
                    <ul>
                      {product.not_included.map((item, i) => (
                        <li key={i} className="incl-item">
                          <X size={15} className="shrink-0 mt-0.5" style={{ color:'#CBD5E1' }} />
                          <span className="text-sm" style={{ color:'#94A3B8' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Notre processus */}
            <div className="scard p-7">
              <h2 className="font-black text-xl mb-8" style={{ color:'#001D3D' }}>Comment ça se passe ?</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {PROCESS.map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm"
                      style={{ background:'linear-gradient(135deg,#001D3D,#003B7A)', color:'white' }}>
                      {step.n}
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1" style={{ color:'#001D3D' }}>{step.title}</div>
                      <div className="text-sm leading-relaxed" style={{ color:'#64748B' }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── SIDEBAR STICKY ── */}
          <div className="space-y-5">
            <div className="sticky top-24 space-y-5">

              {/* Carte prix principale */}
              <div className="scard p-7" style={{ border:'2px solid #FF6B00' }}>
                {product.promo_label && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                    style={{ background:'linear-gradient(135deg,#FF6B00,#FF4500)' }}>
                    🔥 {product.promo_label}
                  </div>
                )}

                {product.price_type === 'on_quote' ? (
                  <div className="text-2xl font-black mb-1" style={{ color:'#003B7A' }}>Sur devis</div>
                ) : product.price ? (
                  <div className="mb-4">
                    {product.price_type === 'from' && (
                      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color:'#94A3B8' }}>À partir de</div>
                    )}
                    <div className="text-4xl font-black" style={{ color:'#003B7A', letterSpacing:'-.02em' }}>
                      {formatPrice(product.price, product.currency)}
                    </div>
                    <div className="text-base font-semibold mt-0.5" style={{ color:'#94A3B8' }}>
                      ≈ {fcfaToUsd(product.price)}
                    </div>
                    {product.old_price && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm line-through" style={{ color:'#CBD5E1' }}>
                          {formatPrice(product.old_price)}
                        </span>
                        {savings && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background:'rgba(255,107,0,.1)', color:'#FF6B00' }}>
                            Économie : {formatPrice(savings)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xl font-black mb-4" style={{ color:'#003B7A' }}>Contactez-nous</div>
                )}

                {product.delivery_time && (
                  <div className="flex items-center gap-2 py-3 mb-4 border-y text-sm" style={{ color:'#475569', borderColor:'#F1F5F9' }}>
                    <Clock size={14} style={{ color:'#FF6B00' }} />
                    <span className="font-semibold">Délai de livraison :</span> {product.delivery_time}
                  </div>
                )}

                <div className="space-y-3">
                  <Link href={`/devis?service=${product.slug}`} className="cta-btn-orange">
                    Demander un devis <ArrowRight size={17} />
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="cta-btn-wa">
                    <MessageSquare size={17} /> Discuter sur WhatsApp
                  </a>
                  <a href={`tel:${SITE.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm border transition-colors"
                    style={{ color:'#003B7A', borderColor:'#E2E8F0', background:'white' }}>
                    <Phone size={15} /> Appeler directement
                  </a>
                </div>
              </div>

              {/* Garanties */}
              <div className="scard p-6">
                <h3 className="font-black text-sm mb-4" style={{ color:'#001D3D' }}>Nos garanties</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Shield, text: 'Satisfaction ou remboursement' },
                    { icon: Award, text: 'Expertise certifiée' },
                    { icon: Clock, text: 'Respect des délais' },
                    { icon: Star, text: 'Support post-livraison' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm" style={{ color:'#475569' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background:'rgba(0,59,122,.07)' }}>
                        <Icon size={13} style={{ color:'#003B7A' }} />
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact direct */}
              <div className="rounded-2xl p-6 text-center" style={{ background:'linear-gradient(135deg,#001D3D,#003B7A)' }}>
                <div className="text-3xl mb-3" style={{ animation:'float 3s ease-in-out infinite', display:'inline-block' }}>💬</div>
                <p className="text-white font-bold text-sm mb-1">Une question ?</p>
                <p className="text-xs mb-4" style={{ color:'rgba(255,255,255,.55)' }}>Notre équipe répond en moins de 2h</p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background:'rgba(255,255,255,.12)', color:'white', textDecoration:'none', border:'1px solid rgba(255,255,255,.2)' }}>
                  <MessageSquare size={14} /> Écrire maintenant
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* ══════════ CTA FINAL ══════════ */}
        <div className="mt-16 rounded-3xl overflow-hidden relative"
          style={{ background:'linear-gradient(135deg,#001D3D 0%,#003B7A 60%,#FF6B00 160%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(circle at 80% 50%,rgba(255,107,0,.2) 0%,transparent 55%)' }} />
          <div className="relative px-8 py-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ letterSpacing:'-.02em' }}>
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color:'rgba(255,255,255,.6)' }}>
              Obtenez votre devis personnalisé gratuitement sous 24h. Sans engagement, sans frais cachés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/devis?service=${product.slug}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white"
                style={{ background:'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow:'0 8px 28px rgba(255,107,0,.4)' }}>
                Demander un devis gratuit <ArrowRight size={18} />
              </Link>
              <Link href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold border text-white"
                style={{ borderColor:'rgba(255,255,255,.2)', background:'rgba(255,255,255,.07)' }}>
                Voir tous nos services
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
