import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Star, Zap } from 'lucide-react'
import { SECTORS_MAP } from '../templates-data'
import { getDemoFile } from '@/lib/demo-files'
import TemplateCardIframe from './TemplateCardIframe'

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

        /* ── Card ── */
        .tpl-card {
          border-radius: 1.25rem;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.025);
          transition: transform .2s, border-color .2s, box-shadow .2s;
          overflow: hidden;
          text-decoration: none;
          display: block;
        }
        .tpl-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,.14);
          box-shadow: 0 20px 50px rgba(0,0,0,.5);
        }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          padding-top: 7rem;
          padding-bottom: 4rem;
          overflow: hidden;
        }
        .hero-inner {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }
        .hero-back-link {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          color: rgba(255,255,255,.3);
          font-size: .78rem;
          text-decoration: none;
          margin-bottom: 2rem;
        }
        .hero-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .75rem;
          margin-bottom: 1.5rem;
        }
        .hero-icon {
          font-size: 3rem;
          animation: float 3s ease-in-out infinite;
        }
        .hero-count-badge {
          display: inline-flex;
          align-items: center;
          padding: .3rem .8rem;
          border-radius: 9999px;
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .08em;
        }
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          color: white;
          letter-spacing: -.03em;
          line-height: 1.1;
          margin: 0;
        }
        .hero-desc {
          font-size: .95rem;
          color: rgba(255,255,255,.45);
          max-width: 600px;
          line-height: 1.8;
          margin: 0 auto 2rem;
        }
        .hero-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .hero-price-badge {
          display: flex;
          align-items: center;
          gap: .5rem;
          padding: .6rem 1.25rem;
          border-radius: 1rem;
        }
        .hero-price-text {
          font-size: .78rem;
          color: rgba(255,255,255,.6);
          font-weight: 600;
        }
        .hero-commander-btn {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .6rem 1.5rem;
          border-radius: 1rem;
          font-weight: 700;
          font-size: .82rem;
          color: white;
          background: linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow: 0 8px 20px rgba(255,107,0,.25);
          text-decoration: none;
          white-space: nowrap;
        }

        /* ── Grid ── */
        .tpl-grid-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem 7rem;
        }
        .tpl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .card-info {
          padding: 1.25rem 1.5rem;
        }
        .card-info-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: .5rem;
          margin-bottom: .5rem;
        }
        .card-name {
          font-weight: 800;
          color: white;
          font-size: .95rem;
          margin-bottom: .2rem;
        }
        .card-tagline {
          font-size: .72rem;
          color: rgba(255,255,255,.35);
          line-height: 1.5;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: .875rem;
          padding-top: .875rem;
          border-top: 1px solid rgba(255,255,255,.05);
        }
        .card-price-label {
          font-size: .6rem;
          color: rgba(255,255,255,.25);
          margin-bottom: .1rem;
        }
        .card-price-value {
          font-size: .9rem;
          font-weight: 900;
          color: white;
        }
        .card-see-link {
          display: inline-flex;
          align-items: center;
          gap: .3rem;
          font-size: .72rem;
          font-weight: 700;
        }

        /* ── Bottom CTA ── */
        .bottom-cta {
          text-align: center;
          margin-top: 3rem;
          padding: 2.5rem;
          border-radius: 1.5rem;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.06);
        }
        .bottom-cta p {
          color: rgba(255,255,255,.4);
          font-size: .88rem;
          margin-bottom: 1.5rem;
        }
        .bottom-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          padding: .875rem 2rem;
          border-radius: 1rem;
          font-weight: 800;
          font-size: .9rem;
          color: white;
          background: linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow: 0 10px 25px rgba(255,107,0,.25);
          text-decoration: none;
        }

        /* ══════════════════════════════════════
           RESPONSIVE — tablette ≤ 768px
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 5rem;
            padding-bottom: 3rem;
          }
          .hero-inner {
            padding: 0 1rem;
          }
          .hero-icon { font-size: 2.25rem; }
          .hero-title { font-size: clamp(1.6rem, 6vw, 2.5rem); }
          .hero-desc  { font-size: .88rem; }
          .tpl-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
          }
          .tpl-grid-section { padding: 0 1rem 4rem; }
          .bottom-cta { padding: 1.75rem 1rem; }
          .bottom-cta-btn { font-size: .82rem; padding: .75rem 1.5rem; }
        }

        /* ══════════════════════════════════════
           RESPONSIVE — mobile ≤ 480px
        ══════════════════════════════════════ */
        @media (max-width: 480px) {
          .hero-section {
            padding-top: 4.5rem;
            padding-bottom: 2.5rem;
          }
          .hero-inner { padding: 0 .875rem; }
          .hero-icon  { font-size: 2rem; }
          .hero-title { font-size: clamp(1.4rem, 7vw, 2rem); }
          .hero-desc  { font-size: .82rem; }
          .hero-cta-row {
            flex-direction: column;
            align-items: stretch;
            gap: .75rem;
          }
          .hero-price-badge {
            justify-content: center;
          }
          .hero-commander-btn {
            justify-content: center;
            padding: .75rem 1.5rem;
            font-size: .85rem;
          }
          .tpl-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .tpl-grid-section { padding: 0 .875rem 3rem; }
          .card-info { padding: 1rem 1.1rem; }
          .card-name  { font-size: .88rem; }
          .card-tagline { font-size: .68rem; }
          .bottom-cta { padding: 1.25rem .875rem; border-radius: 1rem; }
          .bottom-cta p { font-size: .8rem; }
          .bottom-cta-btn { font-size: .8rem; padding: .7rem 1.25rem; }
        }
      `}</style>

      {/* ═══ HERO SECTEUR ═══ */}
      <section className="hero-section">
        {/* Arrière-plan décoratif */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', right: '0', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle,${s.color}18 0%,transparent 65%)`, animation: 'pulse-glow 5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>

        <div className="hero-inner">
          <Link href="/templates" className="hero-back-link">
            <ArrowLeft size={13} /> Retour aux templates
          </Link>

          <div className="hero-meta">
            <div className="hero-icon">{s.icon}</div>
            <div
              className="hero-count-badge"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}
            >
              {s.templates.length} TEMPLATES DISPONIBLES
            </div>
            <h1 className="hero-title">{s.label}</h1>
          </div>

          <p className="hero-desc">{s.description}</p>

          <div className="hero-cta-row">
            <div
              className="hero-price-badge"
              style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}
            >
              <Zap size={14} style={{ color: s.color }} />
              <span className="hero-price-text">
                À partir de <strong style={{ color: 'white' }}>{fmt(s.basePrice)}</strong>
              </span>
            </div>
            <Link href={`/templates/commander?secteur=${s.id}`} className="hero-commander-btn">
              Commander directement <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ GRILLE TEMPLATES ═══ */}
      <section className="tpl-grid-section">
        <div className="tpl-grid">
          {s.templates.map((tpl) => (
            <Link key={tpl.id} href={`/templates/${s.id}/${tpl.id}`} className="tpl-card">
              <TemplateCardIframe
                demoFile={getDemoFile(s.id, tpl.id)}
                bgDark={tpl.bgDark}
                primaryColor={tpl.primaryColor}
                tplId={tpl.id}
                style={tpl.style}
              />
              <div className="card-info">
                <div className="card-info-top">
                  <div>
                    <div className="card-name">{tpl.name}</div>
                    <div className="card-tagline">{tpl.tagline}</div>
                  </div>
                  {tpl.badge && (
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.2rem .55rem', borderRadius: '9999px', fontSize: '.58rem', fontWeight: 800, background: BADGE_COLOR[tpl.badge].bg, color: BADGE_COLOR[tpl.badge].text, border: `1px solid ${BADGE_COLOR[tpl.badge].border}` }}>
                      <Star size={8} /> {tpl.badge}
                    </span>
                  )}
                </div>
                <div className="card-footer">
                  <div>
                    <div className="card-price-label">À partir de</div>
                    <div className="card-price-value">{fmt(s.basePrice)}</div>
                  </div>
                  <div className="card-see-link" style={{ color: tpl.primaryColor }}>
                    Voir le template <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA bas */}
        <div className="bottom-cta">
          <p>Vous avez trouvé votre template ? Configurez votre commande et obtenez un devis instantané.</p>
          <Link href={`/templates/commander?secteur=${s.id}`} className="bottom-cta-btn">
            Commander un template {s.label} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
