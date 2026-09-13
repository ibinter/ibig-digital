import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle, Star, Zap } from 'lucide-react'
import { SECTORS_MAP } from '../../templates-data'

const FORMULES = [
  { id: 'standard', name: 'Standard', desc: 'Besoins essentiels', supplement: 0, color: '#64748B', gradient: 'linear-gradient(135deg,rgba(30,41,59,.9),rgba(51,65,85,.9))', features: ['Template de base complet', 'Design responsive mobile', 'Contenu administrable', '5 pages incluses', 'Formulaire de contact', 'SEO de base'] },
  { id: 'premium',  name: 'Premium',  desc: 'Besoins plus complets', supplement: 50000, color: '#FF6B00', gradient: 'linear-gradient(135deg,rgba(124,29,6,.9),rgba(194,65,12,.9))', popular: true, features: ['Tout Standard inclus', 'Personnalisation avancée', 'Domaine + hébergement 1 an', '10 pages incluses', 'Blog & galerie', 'Réseaux sociaux', 'Analytics'] },
  { id: 'elite',    name: 'Elite',    desc: 'Entreprises exigeantes', supplement: 150000, color: '#7C3AED', gradient: 'linear-gradient(135deg,rgba(30,27,75,.9),rgba(79,70,229,.9))', features: ['Tout Premium inclus', 'Modules au choix', 'Espace client/membre', 'Paiement en ligne', 'Maintenance 3 mois offerte', 'Support prioritaire 7j/7'] },
]

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export async function generateMetadata({ params }: { params: Promise<{ secteur: string; template: string }> }): Promise<Metadata> {
  const { secteur, template } = await params
  const s = SECTORS_MAP[secteur]
  const tpl = s?.templates.find((t) => t.id === template)
  if (!s || !tpl) return { title: 'Template | IBIG DIGITAL' }
  return {
    title: `${tpl.name} — Template ${s.label} | IBIG DIGITAL`,
    description: `${tpl.description} À partir de ${fmt(s.basePrice)}. Site web professionnel livré en 3-7 jours.`,
  }
}

export function generateStaticParams() {
  return Object.values(SECTORS_MAP).flatMap((s) =>
    s.templates.map((t) => ({ secteur: s.id, template: t.id }))
  )
}

export default async function TemplatePage({ params }: { params: Promise<{ secteur: string; template: string }> }) {
  const { secteur, template } = await params
  const s = SECTORS_MAP[secteur]
  const tpl = s?.templates.find((t) => t.id === template)
  if (!s || !tpl) notFound()

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        @keyframes shimmer { 0%{opacity:.4} 50%{opacity:.8} 100%{opacity:.4} }
        .formule-card { border-radius:1.5rem; overflow:hidden; position:relative; transition:transform .25s,box-shadow .25s; }
        .formule-card:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,.5); }
        .feature-row { display:flex; align-items:center; gap:.75rem; padding:.625rem 0; border-bottom:1px solid rgba(255,255,255,.05); }
        .feature-row:last-child { border-bottom:none; }
        .page-tag { display:inline-flex; align-items:center; padding:.35rem .875rem; border-radius:9999px; font-size:.68rem; font-weight:700; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.55); }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', paddingTop: '7rem', paddingBottom: '4rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle,${tpl.primaryColor}22 0%,transparent 65%)`, animation: 'pulse-glow 5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '2rem', fontSize: '.72rem', color: 'rgba(255,255,255,.3)' }}>
            <Link href="/templates" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}>Templates</Link>
            <span>/</span>
            <Link href={`/templates/${s.id}`} style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}>{s.icon} {s.label}</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,.6)' }}>{tpl.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '.3rem .8rem', borderRadius: '9999px', background: `${tpl.primaryColor}18`, border: `1px solid ${tpl.primaryColor}35`, fontSize: '.65rem', fontWeight: 800, color: tpl.primaryColor, letterSpacing: '.07em' }}>
                  {s.icon} {s.label.toUpperCase()}
                </span>
                {tpl.badge && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', padding: '.3rem .7rem', borderRadius: '9999px', background: 'rgba(245,158,11,.12)', border: '1px solid rgba(245,158,11,.3)', fontSize: '.62rem', fontWeight: 800, color: '#F59E0B' }}>
                    <Star size={9} /> {tpl.badge}
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 900, color: 'white', marginBottom: '.75rem', letterSpacing: '-.03em', lineHeight: 1.1 }}>
                {tpl.name}
              </h1>
              <p style={{ fontSize: '1.1rem', color: tpl.accentColor, fontWeight: 600, marginBottom: '1rem' }}>{tpl.tagline}</p>
              <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.8, marginBottom: '2rem' }}>{tpl.description}</p>

              {/* Prix */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', background: `${tpl.primaryColor}10`, border: `1px solid ${tpl.primaryColor}25`, marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.3)', fontWeight: 600, letterSpacing: '.05em', marginBottom: '.2rem' }}>TEMPLATE — À PARTIR DE</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'white' }}>{fmt(s.basePrice)}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.28)', marginTop: '.15rem' }}>Formule Standard · domaine & hébergement en option</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={`/templates/commander?secteur=${s.id}&formule=premium`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '.9rem 2rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 10px 30px rgba(255,107,0,.3)', textDecoration: 'none' }}>
                  Commander ce template <ArrowRight size={16} />
                </Link>
                <Link href={`/templates/${s.id}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.9rem 1.5rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.82rem', color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)', textDecoration: 'none' }}>
                  <ArrowLeft size={13} /> Autres templates {s.label}
                </Link>
              </div>
            </div>

            {/* Right: Mock Browser grand */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 40px 100px rgba(0,0,0,.65)', background: tpl.bgDark }}>
                {/* Browser chrome */}
                <div style={{ padding: '.875rem 1.25rem', background: 'rgba(255,255,255,.04)', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                  <div style={{ display: 'flex', gap: '.4rem' }}>
                    {['#EF4444','#F59E0B','#22C55E'].map((c) => <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, opacity: .7 }} />)}
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: '.4rem', padding: '.3rem .875rem', fontSize: '.62rem', color: 'rgba(255,255,255,.25)', fontFamily: 'monospace' }}>
                    www.{tpl.id}.com
                  </div>
                </div>

                {/* Contenu détaillé */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.875rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle,${tpl.primaryColor}25 0%,transparent 65%)`, pointerEvents: 'none' }} />

                  {/* Nav */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '.75rem', borderBottom: `2px solid ${tpl.primaryColor}30`, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '.4rem', background: `${tpl.primaryColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem' }}>{s.icon}</div>
                      <div style={{ width: '55px', height: '6px', borderRadius: '3px', background: `${tpl.primaryColor}70` }} />
                    </div>
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      {tpl.pages.slice(0, 4).map((p, i) => <div key={i} style={{ height: '5px', borderRadius: '2px', background: 'rgba(255,255,255,.15)', width: `${25 + (i % 3) * 10}px` }} />)}
                    </div>
                    <div style={{ width: '65px', height: '24px', borderRadius: '.4rem', background: tpl.primaryColor }} />
                  </div>

                  {/* Hero banner */}
                  <div style={{ background: `linear-gradient(135deg,${tpl.primaryColor}22,transparent)`, borderRadius: '.875rem', padding: '1.5rem', border: `1px solid ${tpl.primaryColor}20`, position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '72%', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.55)', marginBottom: '.6rem' }} />
                    <div style={{ width: '50%', height: '7px', borderRadius: '3.5px', background: `${tpl.accentColor}80`, marginBottom: '.5rem' }} />
                    <div style={{ width: '85%', height: '5px', borderRadius: '2.5px', background: 'rgba(255,255,255,.15)', marginBottom: '.25rem' }} />
                    <div style={{ width: '70%', height: '5px', borderRadius: '2.5px', background: 'rgba(255,255,255,.1)', marginBottom: '1rem' }} />
                    <div style={{ display: 'flex', gap: '.625rem' }}>
                      <div style={{ width: '90px', height: '28px', borderRadius: '.4rem', background: tpl.primaryColor }} />
                      <div style={{ width: '75px', height: '28px', borderRadius: '.4rem', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)' }} />
                    </div>
                  </div>

                  {/* Features grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.625rem', position: 'relative', zIndex: 1 }}>
                    {[0,1,2,3].map((i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,.04)', borderRadius: '.625rem', padding: '.875rem', border: '1px solid rgba(255,255,255,.07)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '.4rem', background: `${tpl.primaryColor}25`, marginBottom: '.5rem' }} />
                        <div style={{ width: '75%', height: '5px', borderRadius: '2.5px', background: 'rgba(255,255,255,.35)', marginBottom: '.3rem' }} />
                        <div style={{ width: '90%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.12)', marginBottom: '.2rem' }} />
                        <div style={{ width: '60%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.08)' }} />
                      </div>
                    ))}
                  </div>

                  {/* CTA bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.875rem', background: `${tpl.primaryColor}15`, borderRadius: '.75rem', border: `1px solid ${tpl.primaryColor}25`, position: 'relative', zIndex: 1 }}>
                    <div>
                      <div style={{ width: '100px', height: '5px', borderRadius: '2.5px', background: 'rgba(255,255,255,.45)', marginBottom: '.3rem' }} />
                      <div style={{ width: '70px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.2)' }} />
                    </div>
                    <div style={{ width: '85px', height: '28px', borderRadius: '.4rem', background: tpl.primaryColor }} />
                  </div>
                </div>
              </div>

              {/* Badge livraison */}
              <div style={{ position: 'absolute', bottom: '-1rem', left: '-1rem', padding: '.75rem 1.25rem', borderRadius: '1rem', background: '#0B1120', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 12px 30px rgba(0,0,0,.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Zap size={14} style={{ color: '#4ADE80' }} />
                  <div>
                    <div style={{ fontSize: '.7rem', fontWeight: 800, color: 'white' }}>Livré en 3-7 jours</div>
                    <div style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.3)' }}>Personnalisé à votre image</div>
                  </div>
                </div>
              </div>

              {/* Badge style */}
              <div style={{ position: 'absolute', top: '4.5rem', right: '-1rem', padding: '.5rem 1rem', borderRadius: '.875rem', background: `${tpl.primaryColor}20`, border: `1px solid ${tpl.primaryColor}40`, fontSize: '.65rem', fontWeight: 800, color: tpl.primaryColor, backdropFilter: 'blur(8px)' }}>
                Style {tpl.style}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FONCTIONNALITÉS + PAGES ═══ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Features */}
          <div>
            <div style={{ fontSize: '.68rem', fontWeight: 800, color: tpl.primaryColor, letterSpacing: '.08em', marginBottom: '1rem' }}>FONCTIONNALITÉS INCLUSES</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', marginBottom: '1.5rem', letterSpacing: '-.025em' }}>Ce template contient</h2>
            <div>
              {tpl.features.map((f) => (
                <div key={f} className="feature-row">
                  <CheckCircle size={15} style={{ color: '#4ADE80', flexShrink: 0 }} />
                  <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pages + autres templates du secteur */}
          <div>
            {/* Pages */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '.68rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', marginBottom: '1rem' }}>PAGES INCLUSES</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {tpl.pages.map((p) => (
                  <span key={p} className="page-tag">{p}</span>
                ))}
              </div>
            </div>

            {/* Autres templates */}
            <div>
              <div style={{ fontSize: '.68rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', marginBottom: '1rem' }}>AUTRES TEMPLATES {s.label.toUpperCase()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {s.templates.filter((t) => t.id !== tpl.id).slice(0, 4).map((t) => (
                  <Link key={t.id} href={`/templates/${s.id}/${t.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.75rem 1rem', borderRadius: '.875rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', textDecoration: 'none', transition: 'border-color .15s' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '.5rem', background: `${t.primaryColor}25`, flexShrink: 0, border: `1px solid ${t.primaryColor}30` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'white' }}>{t.name}</div>
                      <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.3)' }}>{t.tagline}</div>
                    </div>
                    <ArrowRight size={12} style={{ color: 'rgba(255,255,255,.25)', flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FORMULES ═══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '.875rem' }}>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,transparent,#FF6B00)' }} />
            <span style={{ fontSize: '.68rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.08em' }}>NOS FORMULES POUR CE TEMPLATE</span>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900, color: 'white', letterSpacing: '-.025em' }}>
            Choisissez votre formule
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
          {FORMULES.map((f) => {
            const price = s.basePrice + f.supplement
            return (
              <div key={f.name} className="formule-card" style={{ background: f.gradient }}>
                {f.popular && (
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '.3rem', padding: '.3rem .75rem', borderRadius: '9999px', fontSize: '.62rem', fontWeight: 800, background: 'rgba(255,107,0,.15)', color: '#FF9A4D', border: '1px solid rgba(255,107,0,.35)' }}>
                    <Star size={9} /> Le plus choisi
                  </div>
                )}
                <div style={{ padding: '2rem' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '.65rem', fontWeight: 700, color: f.color, letterSpacing: '.06em', marginBottom: '.4rem' }}>{f.desc.toUpperCase()}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', marginBottom: '.4rem' }}>{f.name}</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white' }}>{fmt(price)}</div>
                    {f.supplement > 0 && <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.28)', marginTop: '.1rem' }}>Base {fmt(s.basePrice)} + supplément formule</div>}
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', borderBottom: '1px solid rgba(255,255,255,.1)', padding: '1rem 0', marginBottom: '1.25rem' }}>
                    {f.features.map((feat) => (
                      <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', marginBottom: '.5rem' }}>
                        <CheckCircle size={12} style={{ color: '#4ADE80', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.62)', lineHeight: 1.5 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={`/templates/commander?secteur=${s.id}&formule=${f.id}`}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', padding: '.8rem', borderRadius: '.875rem', fontWeight: 800, fontSize: '.82rem', color: 'white', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', textDecoration: 'none' }}>
                    Choisir {f.name} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem 7rem', textAlign: 'center' }}>
        <div style={{ padding: '3rem 2rem', borderRadius: '2rem', background: `linear-gradient(135deg,${tpl.primaryColor}12,rgba(0,0,0,.1))`, border: `1px solid ${tpl.primaryColor}22` }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>{s.icon}</div>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: 'white', marginBottom: '.75rem', letterSpacing: '-.025em' }}>
            Prêt à lancer votre site avec {tpl.name} ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', marginBottom: '1.75rem', maxWidth: '450px', margin: '0 auto 1.75rem', lineHeight: 1.8 }}>
            Configurez votre commande en quelques minutes. Notre équipe prend en charge la personnalisation et la mise en ligne.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href={`/templates/commander?secteur=${s.id}&formule=premium`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '1rem 2rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.88rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 10px 28px rgba(255,107,0,.3)', textDecoration: 'none' }}>
              Commander {tpl.name} <ArrowRight size={16} />
            </Link>
            <Link href={`/templates/${s.id}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '1rem 1.5rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.82rem', color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)', textDecoration: 'none' }}>
              <ArrowLeft size={13} /> Voir d&apos;autres templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
