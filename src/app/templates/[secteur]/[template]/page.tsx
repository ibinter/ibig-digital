import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle, Star, Zap } from 'lucide-react'
import { SECTORS_MAP } from '../../templates-data'
import TemplatePreviewClient from './TemplatePreviewClient'
import { getDemoFile } from '@/lib/demo-files'

/* ── Démo par template (ID exact: secteur-templateId) ── */
const DEMO_FILES: Record<string, string> = {
  /* ── Restaurant ── */
  'restaurant-le-gourmet':       'restaurant-le-gourmet.html',
  'restaurant-street-food':      'restaurant-street-food.html',
  'restaurant-traiteur':         'restaurant-traiteur.html',
  'restaurant-brasserie':        'restaurant-brasserie.html',
  'restaurant-pizza-express':    'restaurant-pizza-express.html',
  'restaurant-afro-cuisine':     'restaurant-afro-cuisine.html',
  'restaurant-cafe-bistro':      'restaurant-cafe-bistro.html',
  'restaurant-food-delivery':    'restaurant-food-delivery.html',
  /* ── Immobilier ── */
  'immobilier-premium-realty':   'immobilier-prestige-habitat.html',
  'immobilier-urban-habitat':    'immobilier-urban-habitat.html',
  'immobilier-villa-prestige':   'immobilier-villa-prestige.html',
  'immobilier-agence-locale':    'immobilier-agence-locale.html',
  'immobilier-invest-immo':      'immobilier-invest-immo.html',
  'immobilier-location-vacances':'immobilier-location-vacances.html',
  /* ── Santé ── */
  'sante-clinique-sante':        'sante-clinique-sante-plus.html',
  'sante-dentaire-pro':          'sante-dentaire-pro.html',
  'sante-pharmacie-plus':        'sante-pharmacie-plus.html',
  'sante-kine-sport':            'sante-kine-sport.html',
  'sante-maternite':             'sante-maternite.html',
  'sante-labo-analyse':          'sante-labo-analyse.html',
  'sante-medecine-naturelle':    'sante-medecine-naturelle.html',
  /* ── Formation ── */
  'formation-formation-digitale':'formation-academie-digital.html',
  'formation-ecole-business':    'formation-ecole-business.html',
  'formation-formation-pro':     'formation-formation-pro.html',
  'formation-auto-ecole':        'formation-auto-ecole.html',
  'formation-universite-privee': 'formation-universite-privee.html',
  'formation-tutorat-scolaire':  'formation-tutorat-scolaire.html',
  'formation-academie-langues':  'formation-academie-langues.html',
  'formation-ecole-art':         'formation-ecole-art.html',
  'formation-coaching-carriere': 'formation-coaching-carriere.html',
  /* ── E-commerce ── */
  'ecommerce-boutique-mode':     'ecommerce-boutique-mode.html',
  'ecommerce-tech-store':        'ecommerce-tech-store.html',
  'ecommerce-cosmetique-shop':   'ecommerce-cosmetique-shop.html',
  'ecommerce-alimentaire':       'ecommerce-alimentaire.html',
  'ecommerce-artisanat':         'ecommerce-artisanat.html',
  'ecommerce-sport-fitness':     'ecommerce-sport-fitness.html',
  'ecommerce-maison-deco':       'ecommerce-maison-deco.html',
  'ecommerce-fleuriste':         'ecommerce-fleuriste.html',
  'ecommerce-livres-culture':    'ecommerce-livres-culture.html',
  'ecommerce-multi-boutique':    'ecommerce-multi-boutique.html',
  /* ── BTP ── */
  'btp-construction-elite':      'btp-construction-pro.html',
  'btp-renovation-habitat':      'btp-renovation-habitat.html',
  'btp-architecture':            'btp-architecture.html',
  'btp-electricite-plomberie':   'btp-electricite-plomberie.html',
  'btp-paysagiste':              'btp-paysagiste.html',
  /* ── Cabinet ── */
  'cabinet-cabinet-avocat':      'cabinet-avocat-expert.html',
  'cabinet-expert-comptable':    'cabinet-expert-comptable.html',
  'cabinet-consultant-rh':       'cabinet-consultant-rh.html',
  'cabinet-agence-com':          'cabinet-agence-com.html',
  'cabinet-bureau-etudes':       'cabinet-bureau-etudes.html',
  'cabinet-notariat':            'cabinet-notariat.html',
  /* ── Hôtel ── */
  'hotel-hotel-prestige':        'hotel-prestige.html',
  'hotel-boutique-hotel':        'hotel-boutique-hotel.html',
  'hotel-resort-tropical':       'hotel-resort-tropical.html',
  'hotel-residence-affaires':    'hotel-residence-affaires.html',
  'hotel-agence-voyage':         'hotel-agence-voyage.html',
  'hotel-gite-auberge':          'hotel-gite-auberge.html',
  'hotel-safari-lodge':          'hotel-safari-lodge.html',
  /* ── Beauté ── */
  'beaute-salon-coiffure':       'beaute-salon-coiffure.html',
  'beaute-institut-beaute':      'beaute-salon-luxe.html',
  'beaute-spa-luxe':             'beaute-spa-luxe.html',
  'beaute-barbershop':           'beaute-barbershop.html',
  'beaute-nail-art':             'beaute-nail-art.html',
  'beaute-make-up-studio':       'beaute-make-up-studio.html',
  'beaute-centre-bien-etre':     'beaute-centre-bien-etre.html',
  'beaute-parfumerie':           'beaute-parfumerie.html',
  /* ── Auto ── */
  'auto-concessionnaire':        'auto-garage-elite.html',
  'auto-garage-mecanique':       'auto-garage-mecanique.html',
  'auto-location-vehicules':     'auto-location-vehicules.html',
  'auto-transport-taxi':         'auto-transport-taxi.html',
  'auto-pieces-auto':            'auto-pieces-auto.html',
  /* ── Agriculture ── */
  'agriculture-ferme-bio':       'agriculture-ferme-bio.html',
  'agriculture-cooperative':     'agriculture-cooperative.html',
  'agriculture-agro-industrie':  'agriculture-agro-industrie.html',
  'agriculture-pepiniere':       'agriculture-pepiniere.html',
  /* ── Corporate ── */
  'corporate-holding-finance':   'corporate-groupe-excellence.html',
  'corporate-banque-microfinance':'corporate-banque-microfinance.html',
  'corporate-assurance':         'corporate-assurance.html',
  'corporate-audit-conseil':     'corporate-audit-conseil.html',
  'corporate-startup-tech':      'corporate-startup-tech.html',
  'corporate-ong-association':   'corporate-ong-association.html',
  'corporate-media-presse':      'corporate-media-presse.html',
  'corporate-institution-pub':   'corporate-institution-pub.html',
  'corporate-industrie':         'corporate-industrie.html',
}

const SECTOR_DEMOS: Record<string, string> = {
  restaurant:  'restaurant-le-gourmet.html',
  immobilier:  'immobilier-prestige-habitat.html',
  sante:       'sante-clinique-sante-plus.html',
  formation:   'formation-academie-digital.html',
  ecommerce:   'ecommerce-boutique-mode.html',
  btp:         'btp-construction-pro.html',
  cabinet:     'cabinet-avocat-expert.html',
  hotel:       'hotel-prestige.html',
  beaute:      'beaute-salon-luxe.html',
  auto:        'auto-garage-elite.html',
  agriculture: 'agriculture-ferme-bio.html',
  corporate:   'corporate-groupe-excellence.html',
}

const FORMULES = [
  { id: 'standard', name: 'Standard', desc: 'Besoins essentiels', supplement: 0,     color: '#64748B', gradient: 'linear-gradient(135deg,rgba(30,41,59,.9),rgba(51,65,85,.9))',        features: ['Template de base complet', 'Design responsive mobile', 'Contenu administrable', '5 pages incluses', 'Formulaire de contact', 'SEO de base'] },
  { id: 'premium',  name: 'Premium',  desc: 'Besoins plus complets', supplement: 35000, color: '#FF6B00', gradient: 'linear-gradient(135deg,rgba(124,29,6,.9),rgba(194,65,12,.9))',  popular: true, features: ['Tout Standard inclus', 'Personnalisation avancée', 'Domaine + hébergement 1 an', '10 pages incluses', 'Blog & galerie', 'Réseaux sociaux', 'Analytics'] },
  { id: 'elite',    name: 'Elite',    desc: 'Entreprises exigeantes', supplement: 99900, color: '#7C3AED', gradient: 'linear-gradient(135deg,rgba(30,27,75,.9),rgba(79,70,229,.9))', features: ['Tout Premium inclus', 'Modules au choix', 'Espace client/membre', 'Paiement en ligne', 'Maintenance 3 mois offerte', 'Support prioritaire 7j/7'] },
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
        @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }

        /* ── Composants ── */
        .formule-card {
          border-radius: 1.5rem;
          overflow: hidden;
          position: relative;
          transition: transform .25s, box-shadow .25s;
        }
        .formule-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,.5); }
        .feature-row {
          display: flex; align-items: center; gap: .75rem;
          padding: .625rem 0; border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .feature-row:last-child { border-bottom: none; }
        .page-tag {
          display: inline-flex; align-items: center;
          padding: .35rem .875rem; border-radius: 9999px;
          font-size: .68rem; font-weight: 700;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.55);
        }

        /* ── Hero ── */
        .hero-tpl { position: relative; padding-top: 7rem; padding-bottom: 4rem; overflow: clip; }
        .hero-tpl-inner { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; box-sizing: border-box; width: 100%; }
        .breadcrumb {
          display: flex; align-items: center; gap: .5rem;
          margin-bottom: 2rem; font-size: .72rem; color: rgba(255,255,255,.3);
          flex-wrap: wrap;
        }
        .breadcrumb a { color: rgba(255,255,255,.3); text-decoration: none; }
        .hero-tpl-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-badges { display: flex; align-items: center; gap: .75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .tpl-title { font-size: clamp(2rem,4.5vw,3.25rem); font-weight: 900; color: white; margin-bottom: .75rem; letter-spacing: -.03em; line-height: 1.1; }
        .tpl-tagline { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; }
        .tpl-desc { font-size: .9rem; color: rgba(255,255,255,.4); line-height: 1.8; margin-bottom: 2rem; }
        .price-box {
          display: flex; align-items: flex-start; gap: .5rem;
          padding: 1.25rem 1.5rem; border-radius: 1.25rem;
          margin-bottom: 2rem; box-sizing: border-box; width: 100%;
        }
        .price-label { font-size: .6rem; color: rgba(255,255,255,.3); font-weight: 600; letter-spacing: .05em; margin-bottom: .2rem; }
        .price-value { font-size: 2.25rem; font-weight: 900; color: white; }
        .price-note  { font-size: .65rem; color: rgba(255,255,255,.28); margin-top: .15rem; }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: .6rem;
          padding: .9rem 2rem; border-radius: 1rem;
          font-weight: 800; font-size: .9rem; color: white;
          background: linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow: 0 10px 30px rgba(255,107,0,.3); text-decoration: none;
          white-space: nowrap;
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .9rem 1.5rem; border-radius: 1rem;
          font-weight: 700; font-size: .82rem;
          color: rgba(255,255,255,.5);
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.04); text-decoration: none;
          white-space: nowrap;
        }
        .delivery-badge {
          margin-top: 1rem; display: flex; align-items: center; gap: .5rem;
          padding: .625rem 1rem; border-radius: .75rem;
          background: rgba(74,222,128,.06); border: 1px solid rgba(74,222,128,.15);
          width: fit-content;
        }

        /* ── Features / Pages section ── */
        .feat-section { max-width: 1200px; margin: 0 auto; padding: 3rem 1.5rem 4rem; }
        .feat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .section-label { font-size: .68rem; font-weight: 800; letter-spacing: .08em; margin-bottom: 1rem; }
        .section-h2 { font-size: 1.5rem; font-weight: 900; color: white; margin-bottom: 1.5rem; letter-spacing: -.025em; }
        .pages-wrap { display: flex; flex-wrap: wrap; gap: .5rem; }
        .other-tpl-link {
          display: flex; align-items: center; gap: .75rem;
          padding: .75rem 1rem; border-radius: .875rem;
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06);
          text-decoration: none; transition: border-color .15s;
        }
        .other-tpl-name { font-size: .78rem; font-weight: 700; color: white; }
        .other-tpl-tag  { font-size: .62rem; color: rgba(255,255,255,.3); }

        /* ── Formules ── */
        .formules-section { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem 5rem; }
        .formules-header  { text-align: center; margin-bottom: 2.5rem; }
        .formules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        /* ── CTA final ── */
        .cta-final { max-width: 720px; margin: 0 auto; padding: 0 1.5rem 7rem; text-align: center; }
        .cta-final-box { padding: 3rem 2rem; border-radius: 2rem; }
        .cta-final-btns { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        /* ════════════════════════════
           RESPONSIVE — tablette ≤ 768px
        ════════════════════════════ */
        @media (max-width: 768px) {
          .hero-tpl { padding-top: 5rem; padding-bottom: 3rem; }
          .hero-tpl-inner { padding: 0 1.125rem; }
          .hero-tpl-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .tpl-title { font-size: clamp(1.75rem, 5.5vw, 2.5rem); }
          .tpl-tagline { font-size: .95rem; }
          .feat-section { padding: 2.5rem 1.125rem 3rem; }
          .feat-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .formules-section { padding: 0 1.125rem 4rem; }
          .formules-grid { grid-template-columns: 1fr; }
          .cta-final { padding: 0 1.125rem 4rem; }
          .cta-final-box { padding: 2rem 1.25rem; }
        }

        /* ════════════════════════════
           RESPONSIVE — mobile ≤ 480px
        ════════════════════════════ */
        @media (max-width: 480px) {
          .hero-tpl { padding-top: 4.5rem; padding-bottom: 2rem; }
          .hero-tpl-inner { padding: 0 .875rem; }
          .tpl-title { font-size: clamp(1.4rem, 7vw, 2rem); }
          .tpl-tagline { font-size: .88rem; }
          .tpl-desc { font-size: .82rem; }
          .breadcrumb { font-size: .65rem; gap: .3rem; }
          .price-box { padding: 1rem 1.1rem; }
          .price-value { font-size: 1.75rem; }
          .hero-btns { flex-direction: column; align-items: stretch; }
          .btn-primary, .btn-secondary {
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            white-space: normal;
            text-align: center;
            padding: .85rem 1rem;
            font-size: .85rem;
          }
          .delivery-badge { width: 100%; justify-content: center; }
          .feat-section { padding: 2rem .875rem 2.5rem; }
          .section-h2 { font-size: 1.25rem; }
          .formules-section { padding: 0 .875rem 3rem; }
          .cta-final { padding: 0 .875rem 3rem; }
          .cta-final-box { padding: 1.75rem .875rem; border-radius: 1.25rem; }
          .cta-final-btns { flex-direction: column; align-items: stretch; }
          .cta-final-btns a { justify-content: center; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="hero-tpl">
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle,${tpl.primaryColor}22 0%,transparent 65%)`, animation: 'pulse-glow 5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>

        <div className="hero-tpl-inner">
          <div className="breadcrumb">
            <Link href="/templates">Templates</Link>
            <span>/</span>
            <Link href={`/templates/${s.id}`}>{s.icon} {s.label}</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,.6)' }}>{tpl.name}</span>
          </div>

          <div className="hero-tpl-grid">
            {/* Colonne gauche : infos */}
            <div>
              <div className="hero-badges">
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '.3rem .8rem', borderRadius: '9999px', background: `${tpl.primaryColor}18`, border: `1px solid ${tpl.primaryColor}35`, fontSize: '.65rem', fontWeight: 800, color: tpl.primaryColor, letterSpacing: '.07em' }}>
                  {s.icon} {s.label.toUpperCase()}
                </span>
                {tpl.badge && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', padding: '.3rem .7rem', borderRadius: '9999px', background: 'rgba(245,158,11,.12)', border: '1px solid rgba(245,158,11,.3)', fontSize: '.62rem', fontWeight: 800, color: '#F59E0B' }}>
                    <Star size={9} /> {tpl.badge}
                  </span>
                )}
              </div>

              <h1 className="tpl-title">{tpl.name}</h1>
              <p className="tpl-tagline" style={{ color: tpl.accentColor }}>{tpl.tagline}</p>
              <p className="tpl-desc">{tpl.description}</p>

              <div className="price-box" style={{ background: `${tpl.primaryColor}10`, border: `1px solid ${tpl.primaryColor}25` }}>
                <div>
                  <div className="price-label">TEMPLATE — À PARTIR DE</div>
                  <div className="price-value">{fmt(s.basePrice)}</div>
                  <div className="price-note">Formule Standard · domaine &amp; hébergement en option</div>
                </div>
              </div>

              <div className="hero-btns">
                <Link href={`/templates/commander?secteur=${s.id}&template=${tpl.id}&formule=premium`} className="btn-primary">
                  Commander ce template <ArrowRight size={16} />
                </Link>
                <Link href={`/templates/${s.id}/${tpl.id}/demo`} className="btn-secondary">
                  <span style={{ fontSize: '13px' }}>▶</span> Voir la démo live
                </Link>
              </div>
            </div>

            {/* Colonne droite : aperçu live */}
            <div>
              <TemplatePreviewClient
                demoFile={DEMO_FILES[`${s.id}-${tpl.id}`] ?? SECTOR_DEMOS[s.id]}
                primaryColor={tpl.primaryColor}
                tplName={tpl.name}
                sectorId={s.id}
                tplId={tpl.id}
              />
              <div className="delivery-badge">
                <Zap size={13} style={{ color: '#4ADE80' }} />
                <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#4ADE80' }}>Livré en 3-7 jours · Personnalisé à votre image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FONCTIONNALITÉS + PAGES ═══ */}
      <section className="feat-section">
        <div className="feat-grid">
          {/* Features */}
          <div>
            <div className="section-label" style={{ color: tpl.primaryColor }}>FONCTIONNALITÉS INCLUSES</div>
            <h2 className="section-h2">Ce template contient</h2>
            <div>
              {tpl.features.map((f) => (
                <div key={f} className="feature-row">
                  <CheckCircle size={15} style={{ color: '#4ADE80', flexShrink: 0 }} />
                  <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pages + autres templates */}
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="section-label" style={{ color: 'rgba(255,255,255,.3)' }}>PAGES INCLUSES</div>
              <div className="pages-wrap">
                {tpl.pages.map((p) => (
                  <span key={p} className="page-tag">{p}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="section-label" style={{ color: 'rgba(255,255,255,.3)' }}>AUTRES TEMPLATES {s.label.toUpperCase()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {s.templates.filter((t) => t.id !== tpl.id).slice(0, 4).map((t) => (
                  <Link key={t.id} href={`/templates/${s.id}/${t.id}`} className="other-tpl-link">
                    <div style={{ width: '32px', height: '32px', borderRadius: '.5rem', background: `${t.primaryColor}25`, flexShrink: 0, border: `1px solid ${t.primaryColor}30` }} />
                    <div style={{ flex: 1 }}>
                      <div className="other-tpl-name">{t.name}</div>
                      <div className="other-tpl-tag">{t.tagline}</div>
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
      <section className="formules-section">
        <div className="formules-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '.875rem' }}>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,transparent,#FF6B00)' }} />
            <span style={{ fontSize: '.68rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.08em' }}>NOS FORMULES POUR CE TEMPLATE</span>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900, color: 'white', letterSpacing: '-.025em' }}>
            Choisissez votre formule
          </h2>
        </div>

        <div className="formules-grid">
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
      <section className="cta-final">
        <div className="cta-final-box" style={{ background: `linear-gradient(135deg,${tpl.primaryColor}12,rgba(0,0,0,.1))`, border: `1px solid ${tpl.primaryColor}22` }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>{s.icon}</div>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: 'white', marginBottom: '.75rem', letterSpacing: '-.025em' }}>
            Prêt à lancer votre site avec {tpl.name} ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', maxWidth: '450px', margin: '0 auto 1.75rem', lineHeight: 1.8 }}>
            Configurez votre commande en quelques minutes. Notre équipe prend en charge la personnalisation et la mise en ligne.
          </p>
          <div className="cta-final-btns">
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
