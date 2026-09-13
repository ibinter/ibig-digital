import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Star, Zap } from 'lucide-react'
import { SECTORS_MAP } from '../templates-data'

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

export async function generateMetadata({ params }: { params: Promise<{ secteur: string }> }): Promise<Metadata> {
  const { secteur } = await params
  const s = SECTORS_MAP[secteur]
  if (!s) return { title: 'Templates | IBIG DIGITAL' }
  return {
    title: `Templates ${s.label} | Sites Web Professionnels | IBIG DIGITAL`,
    description: `${s.templates.length} templates de sites web professionnels pour ${s.label}. À partir de ${fmt(s.basePrice)}. Personnalisables, administrables, livrés en 3-7 jours.`,
  }
}

export function generateStaticParams() {
  return Object.keys(SECTORS_MAP).map((id) => ({ secteur: id }))
}

const BADGE_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  Bestseller: { bg: 'rgba(245,158,11,.15)', text: '#F59E0B', border: 'rgba(245,158,11,.35)' },
  Populaire:  { bg: 'rgba(34,197,94,.12)',  text: '#4ADE80', border: 'rgba(34,197,94,.3)'  },
  Nouveau:    { bg: 'rgba(59,130,246,.12)', text: '#60A5FA', border: 'rgba(59,130,246,.3)' },
  Pro:        { bg: 'rgba(168,85,247,.12)', text: '#C084FC', border: 'rgba(168,85,247,.3)' },
}

export default async function SecteurPage({ params }: { params: Promise<{ secteur: string }> }) {
  const { secteur } = await params
  const s = SECTORS_MAP[secteur]
  if (!s) notFound()

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        .tpl-card { border-radius:1.25rem; border:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.025); transition:transform .2s,border-color .2s,box-shadow .2s; overflow:hidden; }
        .tpl-card:hover { transform:translateY(-5px); border-color:rgba(255,255,255,.14); box-shadow:0 20px 50px rgba(0,0,0,.5); }
      `}</style>

      {/* ═══ HERO SECTEUR ═══ */}
      <section style={{ position: 'relative', paddingTop: '7rem', paddingBottom: '4rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', right: '0', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle,${s.color}18 0%,transparent 65%)`, animation: 'pulse-glow 5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,.3)', fontSize: '.78rem', textDecoration: 'none', marginBottom: '2rem' }}>
            <ArrowLeft size={13} /> Retour aux templates
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', animation: 'float 3s ease-in-out infinite' }}>{s.icon}</div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '.3rem .8rem', borderRadius: '9999px', background: `${s.color}15`, border: `1px solid ${s.color}30`, fontSize: '.65rem', fontWeight: 800, color: s.color, letterSpacing: '.08em', marginBottom: '.4rem' }}>
                {s.templates.length} TEMPLATES DISPONIBLES
              </div>
              <h1 style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 900, color: 'white', letterSpacing: '-.03em', lineHeight: 1.1, margin: 0 }}>
                {s.label}
              </h1>
            </div>
          </div>

          <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.45)', maxWidth: '600px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            {s.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.6rem 1.25rem', borderRadius: '1rem', background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
              <Zap size={14} style={{ color: s.color }} />
              <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>
                À partir de <strong style={{ color: 'white' }}>{fmt(s.basePrice)}</strong>
              </span>
            </div>
            <Link href={`/templates/commander?secteur=${s.id}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.6rem 1.5rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.82rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 8px 20px rgba(255,107,0,.25)', textDecoration: 'none' }}>
              Commander directement <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ GRILLE TEMPLATES ═══ */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 7rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.5rem' }}>
          {s.templates.map((tpl) => (
            <Link key={tpl.id} href={`/templates/${s.id}/${tpl.id}`} className="tpl-card" style={{ textDecoration: 'none', display: 'block' }}>
              {/* Mock Browser */}
              <div style={{ background: tpl.bgDark, position: 'relative', overflow: 'hidden', height: '200px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                {/* Glow */}
                <div style={{ position: 'absolute', top: '-30%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle,${tpl.primaryColor}30 0%,transparent 65%)`, pointerEvents: 'none' }} />

                {/* Browser chrome */}
                <div style={{ padding: '.5rem .75rem', background: 'rgba(255,255,255,.04)', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                  <div style={{ display: 'flex', gap: '.25rem' }}>
                    {['#EF4444','#F59E0B','#22C55E'].map((c) => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: .6 }} />)}
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,.05)', borderRadius: '.25rem', padding: '.2rem .5rem', fontSize: '.5rem', color: 'rgba(255,255,255,.2)', fontFamily: 'monospace' }}>
                    {tpl.id}.votre-site.com
                  </div>
                </div>

                {/* Contenu mock */}
                <div style={{ padding: '.875rem', display: 'flex', flexDirection: 'column', gap: '.5rem', position: 'relative', zIndex: 1 }}>
                  {/* Nav */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.25rem' }}>
                    <div style={{ width: '45px', height: '5px', borderRadius: '3px', background: `${tpl.primaryColor}80` }} />
                    <div style={{ display: 'flex', gap: '.4rem' }}>
                      {[28,22,32,20].map((w,i) => <div key={i} style={{ width: `${w}px`, height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.12)' }} />)}
                    </div>
                    <div style={{ width: '40px', height: '16px', borderRadius: '3px', background: tpl.primaryColor, opacity: .8 }} />
                  </div>
                  {/* Hero */}
                  <div style={{ background: `${tpl.primaryColor}18`, borderRadius: '.5rem', padding: '.75rem', border: `1px solid ${tpl.primaryColor}25` }}>
                    <div style={{ width: '65%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.5)', marginBottom: '.35rem' }} />
                    <div style={{ width: '45%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.25)', marginBottom: '.5rem' }} />
                    <div style={{ display: 'flex', gap: '.4rem' }}>
                      <div style={{ width: '55px', height: '16px', borderRadius: '3px', background: tpl.primaryColor }} />
                      <div style={{ width: '45px', height: '16px', borderRadius: '3px', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)' }} />
                    </div>
                  </div>
                  {/* Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.4rem' }}>
                    {[0,1,2].map((i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,.04)', borderRadius: '.375rem', padding: '.5rem', border: '1px solid rgba(255,255,255,.06)' }}>
                        <div style={{ width: '100%', height: '18px', borderRadius: '.25rem', background: `${tpl.primaryColor}30`, marginBottom: '.3rem' }} />
                        <div style={{ width: '80%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,.2)', marginBottom: '.15rem' }} />
                        <div style={{ width: '60%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,.1)' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badge style */}
                <div style={{ position: 'absolute', bottom: '.75rem', right: '.75rem', padding: '.25rem .625rem', borderRadius: '.4rem', background: 'rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.12)', fontSize: '.55rem', fontWeight: 700, color: 'rgba(255,255,255,.5)', backdropFilter: 'blur(4px)' }}>
                  {tpl.style.toUpperCase()}
                </div>
              </div>

              {/* Info carte */}
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.5rem', marginBottom: '.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'white', fontSize: '.95rem', marginBottom: '.2rem' }}>{tpl.name}</div>
                    <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.5 }}>{tpl.tagline}</div>
                  </div>
                  {tpl.badge && (
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.2rem .55rem', borderRadius: '9999px', fontSize: '.58rem', fontWeight: 800, background: BADGE_COLOR[tpl.badge].bg, color: BADGE_COLOR[tpl.badge].text, border: `1px solid ${BADGE_COLOR[tpl.badge].border}` }}>
                      <Star size={8} /> {tpl.badge}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '.875rem', paddingTop: '.875rem', borderTop: '1px solid rgba(255,255,255,.05)' }}>
                  <div>
                    <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.25)', marginBottom: '.1rem' }}>À partir de</div>
                    <div style={{ fontSize: '.9rem', fontWeight: 900, color: 'white' }}>{fmt(s.basePrice)}</div>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.72rem', fontWeight: 700, color: tpl.primaryColor }}>
                    Voir le template <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA bas */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2.5rem', borderRadius: '1.5rem', background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.06)' }}>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.88rem', marginBottom: '1.5rem' }}>
            Vous avez trouvé votre template ? Configurez votre commande et obtenez un devis instantané.
          </p>
          <Link href={`/templates/commander?secteur=${s.id}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '.875rem 2rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 10px 25px rgba(255,107,0,.25)', textDecoration: 'none' }}>
            Commander un template {s.label} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
