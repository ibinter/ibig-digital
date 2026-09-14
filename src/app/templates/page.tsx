import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Zap, Globe, Settings, ShoppingCart, Users, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Templates de Sites Web Professionnels | IBIG DIGITAL',
  description: 'Choisissez votre template de site web professionnel parmi 100+ modèles prêts à l\'emploi, personnalisables et administrables. Restaurant, immobilier, e-commerce, clinique, formation… Lancez-vous dès aujourd\'hui.',
}

/* ─── CATÉGORIES DE TEMPLATES ──────────────────────────────────────────────── */
const CATEGORIES = [
  { icon: '🍽️', label: 'Restaurant & Food', count: 8, color: '#F97316', from: '49 900', href: '/templates/restaurant' },
  { icon: '🏠', label: 'Immobilier', count: 6, color: '#3B82F6', from: '79 900', href: '/templates/immobilier' },
  { icon: '🏥', label: 'Santé & Clinique', count: 7, color: '#10B981', from: '59 900', href: '/templates/sante' },
  { icon: '🎓', label: 'Formation & École', count: 9, color: '#8B5CF6', from: '59 900', href: '/templates/formation' },
  { icon: '🛒', label: 'E-commerce', count: 10, color: '#EF4444', from: '99 900', href: '/templates/ecommerce' },
  { icon: '🏗️', label: 'BTP & Construction', count: 5, color: '#F59E0B', from: '69 900', href: '/templates/btp' },
  { icon: '⚖️', label: 'Cabinet & Conseil', count: 6, color: '#06B6D4', from: '59 900', href: '/templates/cabinet' },
  { icon: '🏨', label: 'Hôtel & Tourisme', count: 7, color: '#EC4899', from: '79 900', href: '/templates/hotel' },
  { icon: '💄', label: 'Beauté & Spa', count: 8, color: '#A855F7', from: '49 900', href: '/templates/beaute' },
  { icon: '🚗', label: 'Auto & Transport', count: 5, color: '#14B8A6', from: '59 900', href: '/templates/auto' },
  { icon: '🌾', label: 'Agriculture', count: 4, color: '#84CC16', from: '49 900', href: '/templates/agriculture' },
  { icon: '💼', label: 'Corporate & Finance', count: 9, color: '#64748B', from: '69 900', href: '/templates/corporate' },
]

/* ─── FORMULES ──────────────────────────────────────────────────────────────── */
const FORMULES = [
  {
    name: 'Standard',
    desc: 'Besoins essentiels',
    color: '#64748B',
    gradient: 'linear-gradient(135deg,#1E293B,#334155)',
    features: [
      'Template de base complet',
      'Design responsive mobile',
      'Contenu administrable',
      '5 pages incluses',
      'Formulaire de contact',
      'Optimisation SEO de base',
    ],
    notIncluded: ['Domaine & hébergement', 'Modules avancés'],
  },
  {
    name: 'Premium',
    desc: 'Besoins plus complets',
    color: '#FF6B00',
    gradient: 'linear-gradient(135deg,#7C1D06,#C2410C,#EA580C)',
    popular: true,
    features: [
      'Tout le Standard inclus',
      'Personnalisation avancée',
      'Domaine + hébergement 1 an',
      '10 pages incluses',
      'Blog & galerie',
      'Intégration réseaux sociaux',
      'Analytics & statistiques',
    ],
    notIncluded: ['Modules e-commerce'],
  },
  {
    name: 'Elite',
    desc: 'Entreprises exigeantes',
    color: '#6D28D9',
    gradient: 'linear-gradient(135deg,#1E1B4B,#3730A3,#4F46E5)',
    features: [
      'Tout le Premium inclus',
      'Modules au choix (e-commerce, résa…)',
      'Espace client / membre',
      'Paiement en ligne intégré',
      'Maintenance 3 mois offerte',
      'Formation à l\'administration',
      'Support prioritaire 7j/7',
    ],
    notIncluded: [],
  },
]

/* ─── PROCESS ───────────────────────────────────────────────────────────────── */
const STEPS = [
  { n: '01', title: 'Choisissez votre template', desc: 'Parcourez le catalogue, visualisez la démo live et sélectionnez le modèle qui correspond à votre secteur.', icon: <Globe size={20} /> },
  { n: '02', title: 'Configurez votre commande', desc: 'Choisissez votre formule, vos options, votre domaine, hébergement et modules. Le total se calcule en temps réel.', icon: <Settings size={20} /> },
  { n: '03', title: 'Réglez en ligne', desc: 'Paiement sécurisé par Mobile Money, carte bancaire ou virement. Votre projet démarre immédiatement après confirmation.', icon: <ShoppingCart size={20} /> },
  { n: '04', title: 'Votre site est en ligne', desc: 'IBIG DIGITAL configure, personnalise et met en ligne votre site. Vous recevez l\'accès à votre espace d\'administration.', icon: <Zap size={20} /> },
]

/* ─── MODULES ───────────────────────────────────────────────────────────────── */
const MODULES = [
  'E-commerce & paiement en ligne', 'Prise de rendez-vous', 'Réservation en ligne',
  'Espace client / membre', 'LMS & formations', 'CRM intégré',
  'Chat & WhatsApp', 'Blog avancé', 'Newsletter',
  'Catalogue produits', 'Système de devis', 'Gestion d\'événements',
  'Avis clients', 'Multilingue', 'Analytics avancés',
]

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default function TemplatesPage() {
  return (
    <div style={{ background: '#06091A', minHeight: '100vh', fontFamily: 'inherit' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.25} 50%{opacity:.6} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .tpl-cat-card { border-radius:1.25rem; border:1px solid rgba(255,255,255,.07); transition:transform .2s,border-color .2s,box-shadow .2s; cursor:pointer; background:rgba(255,255,255,.03); }
        .tpl-cat-card:hover { transform:translateY(-4px); border-color:rgba(255,255,255,.15); box-shadow:0 16px 40px rgba(0,0,0,.4); }
        .formule-card { border-radius:1.5rem; overflow:hidden; position:relative; transition:transform .25s,box-shadow .25s; }
        .formule-card:hover { transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,.5); }
        .step-card { border-radius:1.25rem; border:1px solid rgba(255,255,255,.07); padding:2rem; background:rgba(255,255,255,.025); position:relative; transition:border-color .2s; }
        .step-card:hover { border-color:rgba(255,107,0,.3); }
        .module-chip { display:inline-block; padding:.4rem .9rem; border-radius:9999px; font-size:.72rem; font-weight:600; border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.55); background:rgba(255,255,255,.04); transition:background .15s,color .15s; cursor:default; }
        .module-chip:hover { background:rgba(255,107,0,.12); color:#FF9A4D; border-color:rgba(255,107,0,.3); }
        .popular-badge { display:inline-flex; align-items:center; gap:.3rem; padding:.3rem .8rem; border-radius:9999px; font-size:.65rem; font-weight:800; background:rgba(255,107,0,.15); color:#FF9A4D; border:1px solid rgba(255,107,0,.35); }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .step-card { padding:1.25rem !important; }
          .formule-card > div { padding:1.25rem !important; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-5%', left: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,91,204,.18) 0%,transparent 65%)', animation: 'pulse-glow 5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,0,.1) 0%,transparent 65%)', animation: 'pulse-glow 6s ease-in-out infinite 1s' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.45rem 1.2rem', borderRadius: '9999px', marginBottom: '2rem', background: 'rgba(255,107,0,.1)', border: '1px solid rgba(255,107,0,.25)' }}>
            <Star size={12} style={{ color: '#FF9A4D' }} />
            <span style={{ fontSize: '.7rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.07em' }}>NOUVEAU — IBIG DIGITAL TEMPLATES</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4.5rem)', fontWeight: 900, color: 'white', marginBottom: '1.25rem', letterSpacing: '-.03em', lineHeight: 1.05 }}>
            Votre site web professionnel{' '}
            <span style={{ background: 'linear-gradient(90deg,#FF6B00,#FF9A4D,#FFD4A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              prêt à l&apos;emploi
            </span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.5)', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.8 }}>
            Choisissez un template professionnel parmi <strong style={{ color: 'rgba(255,255,255,.75)' }}>100+ modèles</strong> spécialisés par secteur,
            personnalisez-le, et soyez en ligne en quelques jours — sans compétences techniques.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {['Design professionnel', 'Responsive mobile', 'Administrable', 'SEO optimisé'].map((t) => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.75rem', fontWeight: 600, color: 'rgba(255,255,255,.45)' }}>
                <CheckCircle size={13} style={{ color: '#4ADE80' }} /> {t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/templates/commander"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '.9rem 2rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.95rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 12px 35px rgba(255,107,0,.35)', textDecoration: 'none' }}>
              Configurer mon site <ArrowRight size={17} />
            </Link>
            <a href="#categories"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.9rem 2rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.9rem', color: 'rgba(255,255,255,.65)', border: '1px solid rgba(255,255,255,.12)', textDecoration: 'none', background: 'rgba(255,255,255,.04)' }}>
              Voir les catégories
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            {[
              { n: '100+', l: 'Templates disponibles' },
              { n: '12', l: 'Secteurs couverts' },
              { n: '3', l: 'Formules au choix' },
              { n: '15+', l: 'Modules optionnels' },
            ].map(({ n, l }) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg,#FF6B00,#FFD4A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
                <div style={{ fontSize: '.68rem', fontWeight: 600, color: 'rgba(255,255,255,.28)', marginTop: '2px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATÉGORIES ═══ */}
      <section id="categories" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,transparent,#FF6B00)' }} />
            <span style={{ fontSize: '.72rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.08em', textTransform: 'uppercase' }}>Catalogue de templates</span>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'white', letterSpacing: '-.025em', marginBottom: '.75rem' }}>
            Un template pour chaque secteur
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.9rem', maxWidth: '480px', margin: '0 auto' }}>
            Tous nos modèles sont conçus spécifiquement pour votre métier, avec les fonctionnalités dont vous avez réellement besoin.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1rem' }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} href={cat.href} className="tpl-cat-card" style={{ padding: '1.5rem', display: 'block', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', animation: 'float 3s ease-in-out infinite' }}>{cat.icon}</div>
                <span style={{ fontSize: '.62rem', fontWeight: 700, color: cat.color, background: `${cat.color}18`, padding: '.2rem .6rem', borderRadius: '9999px', border: `1px solid ${cat.color}30` }}>{cat.count} modèles</span>
              </div>
              <div style={{ fontWeight: 800, color: 'white', fontSize: '.95rem', marginBottom: '.3rem' }}>{cat.label}</div>
              <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)', marginBottom: '1rem' }}>À partir de <span style={{ color: cat.color, fontWeight: 700 }}>{cat.from} FCFA</span></div>
              <div style={{ height: '2px', borderRadius: '9999px', background: `linear-gradient(90deg,${cat.color}60,transparent)` }} />
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/templates/commander"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.75rem 1.75rem', borderRadius: '.875rem', fontWeight: 700, fontSize: '.85rem', color: '#FF9A4D', border: '1px solid rgba(255,107,0,.3)', background: 'rgba(255,107,0,.06)', textDecoration: 'none' }}>
            Configurer mon site maintenant <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ═══ COMMENT ÇA MARCHE ═══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,transparent,#FF6B00)' }} />
            <span style={{ fontSize: '.72rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.08em', textTransform: 'uppercase' }}>Comment ça marche</span>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'white', letterSpacing: '-.025em' }}>
            En ligne en 4 étapes simples
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1.25rem' }}>
          {STEPS.map((s, i) => (
            <div key={s.n} className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '.65rem', fontWeight: 900, color: 'rgba(255,107,0,.5)', letterSpacing: '.05em' }}>{s.n}</div>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.875rem', background: 'rgba(255,107,0,.1)', border: '1px solid rgba(255,107,0,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9A4D' }}>{s.icon}</div>
              </div>
              <div style={{ fontWeight: 800, color: 'white', fontSize: '1rem', marginBottom: '.6rem' }}>{s.title}</div>
              <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.7 }}>{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div style={{ position: 'absolute', top: '50%', right: '-1.5rem', transform: 'translateY(-50%)', color: 'rgba(255,107,0,.25)', fontSize: '1.25rem', display: 'none' }}>→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FORMULES ═══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,transparent,#FF6B00)' }} />
            <span style={{ fontSize: '.72rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.08em', textTransform: 'uppercase' }}>Nos formules</span>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900, color: 'white', letterSpacing: '-.025em', marginBottom: '.75rem' }}>
            Choisissez votre formule
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.9rem' }}>
            Des tarifs accessibles pensés pour l&apos;Afrique, avec des options modulables selon vos besoins.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.25rem' }}>
          {FORMULES.map((f) => (
            <div key={f.name} className="formule-card" style={{ background: f.gradient }}>
              {f.popular && (
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                  <span className="popular-badge"><Star size={10} /> Le plus choisi</span>
                </div>
              )}
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, color: f.color, letterSpacing: '.06em', marginBottom: '.4rem' }}>{f.desc.toUpperCase()}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white' }}>{f.name}</div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', borderBottom: '1px solid rgba(255,255,255,.1)', padding: '1.25rem 0', marginBottom: '1.5rem' }}>
                  {f.features.map((feat) => (
                    <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', marginBottom: '.6rem' }}>
                      <CheckCircle size={14} style={{ color: '#4ADE80', flexShrink: 0, marginTop: '1px' }} />
                      <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.5 }}>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link href="/devis"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: '.875rem', borderRadius: '.875rem', fontWeight: 800, fontSize: '.85rem', color: 'white', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', textDecoration: 'none', transition: 'background .15s' }}>
                  Choisir {f.name} <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'rgba(255,255,255,.25)', marginTop: '1.5rem' }}>
          Les prix varient selon le template choisi · Domaine, hébergement et modules sont configurables séparément
        </p>
      </section>

      {/* ═══ MODULES ═══ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem 5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,transparent,#FF6B00)' }} />
          <span style={{ fontSize: '.72rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.08em', textTransform: 'uppercase' }}>Modules optionnels</span>
          <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,transparent)' }} />
        </div>
        <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, color: 'white', letterSpacing: '-.025em', marginBottom: '.75rem' }}>
          Ajoutez les fonctionnalités dont vous avez besoin
        </h2>
        <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.85rem', marginBottom: '2.5rem' }}>
          Chaque module est une option payante que vous activez à la commande ou plus tard.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', justifyContent: 'center' }}>
          {MODULES.map((m) => (
            <span key={m} className="module-chip">{m}</span>
          ))}
        </div>
      </section>

      {/* ═══ AVANTAGES ═══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
          {[
            { icon: '⚡', title: 'Livraison rapide', desc: 'Votre site est opérationnel en 3 à 7 jours ouvrés, pas en plusieurs semaines comme une création sur mesure.' },
            { icon: '💰', title: 'Prix accessibles', desc: 'Dès 49 900 FCFA pour un site professionnel complet. Pensé pour les entrepreneurs et PME africains.' },
            { icon: '🔧', title: 'Administrable sans coder', desc: 'Modifiez vos textes, images, produits et services vous-même depuis un back-office simple et intuitif.' },
            { icon: '🌍', title: 'Pensé pour l\'Afrique', desc: 'Mobile Money intégré, adapté aux réseaux locaux, multidevise et multilingue dès la conception.' },
            { icon: '📈', title: 'Évolutif dans le temps', desc: 'Ajoutez des modules, des pages ou des fonctionnalités à tout moment selon l\'évolution de votre activité.' },
            { icon: '🛡️', title: 'Hébergement & maintenance', desc: 'Options d\'hébergement performant et de maintenance mensuelle pour que votre site reste toujours en ligne.' },
          ].map((a) => (
            <div key={a.title} style={{ padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.025)' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{a.icon}</div>
              <div style={{ fontWeight: 800, color: 'white', fontSize: '1rem', marginBottom: '.5rem' }}>{a.title}</div>
              <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.7 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem 7rem', textAlign: 'center' }}>
        <div style={{ padding: '3.5rem 2rem', borderRadius: '2rem', background: 'linear-gradient(135deg,rgba(255,107,0,.08),rgba(0,91,204,.08))', border: '1px solid rgba(255,107,0,.15)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, color: 'white', marginBottom: '.75rem', letterSpacing: '-.025em' }}>
            Prêt à lancer votre site ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.9rem', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.75 }}>
            Décrivez votre projet, choisissez votre secteur et notre équipe vous propose le template idéal avec un devis personnalisé.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/templates/commander"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.625rem', padding: '1rem 2.25rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.95rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 10px 30px rgba(255,107,0,.35)', textDecoration: 'none' }}>
              Configurer mon site web <ArrowRight size={17} />
            </Link>
            <Link href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '1rem 2rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.9rem', color: 'rgba(255,255,255,.6)', border: '1px solid rgba(255,255,255,.12)', textDecoration: 'none', background: 'rgba(255,255,255,.04)' }}>
              Nous contacter <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
