import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Globe, Smartphone, ShoppingBag, Settings, Users, Award, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nos Réalisations – Projets & Portfolio | IBIG DIGITAL',
  description: 'Découvrez les projets réalisés par IBIG DIGITAL : sites web, applications, logiciels, e-commerce, branding et solutions digitales pour l\'écosystème IBIG GROUP.',
}

export const dynamic = 'force-dynamic'

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const STATS = [
  { n: '20+', label: 'Projets livrés' },
  { n: '15+', label: 'Clients actifs' },
  { n: '14', label: 'Logiciels créés' },
  { n: '7', label: 'Marques du groupe' },
]

type Tag = 'Tous' | 'Sites web' | 'Applications' | 'Logiciels' | 'E-commerce' | 'Affiliation' | 'Réseaux sociaux'

interface Projet {
  id: string
  nom: string
  client: string
  tag: Tag
  annee: number
  description: string
  url?: string
  gradient: string
  accent: string
  icon: string
  featured?: boolean
  tech?: string[]
}

const PROJETS: Projet[] = [
  {
    id: 'ibig-digital',
    nom: 'IBIG DIGITAL',
    client: 'IBIG GROUP',
    tag: 'Sites web',
    annee: 2025,
    description: 'Site officiel de la branche digitale d\'INTERMARK BUSINESS INTERNATIONAL GROUP. Catalogue de 77+ services, gestion de devis, blog, partenaires et back-office complet.',
    url: 'https://ibig-digital.com',
    gradient: 'linear-gradient(135deg,#001D3D 0%,#003B7A 50%,#0056CC 100%)',
    accent: '#4D9FFF',
    icon: '💻',
    featured: true,
    tech: ['Next.js 15', 'Supabase', 'Vercel', 'TypeScript'],
  },
  {
    id: 'intermark-business',
    nom: 'INTERMARK BUSINESS',
    client: 'IBIG GROUP',
    tag: 'Sites web',
    annee: 2024,
    description: 'Site corporate du groupe INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL. Présentation institutionnelle, activités, équipe et contact.',
    url: 'https://intermark-business.com',
    gradient: 'linear-gradient(135deg,#1A0533 0%,#3B0764 50%,#6D28D9 100%)',
    accent: '#A78BFA',
    icon: '🏢',
    featured: true,
    tech: ['Next.js', 'Tailwind CSS'],
  },
  {
    id: 'ibig-market',
    nom: 'IBIG MARKET',
    client: 'IBIG GROUP',
    tag: 'E-commerce',
    annee: 2024,
    description: 'Marketplace e-commerce multi-vendeurs pour l\'achat et la vente en ligne de produits variés en Côte d\'Ivoire et en Afrique de l\'Ouest.',
    gradient: 'linear-gradient(135deg,#1A2E05 0%,#14532D 50%,#16A34A 100%)',
    accent: '#4ADE80',
    icon: '🛒',
    featured: true,
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    id: 'ibig-partners',
    nom: 'IBIG PARTNERS',
    client: 'IBIG GROUP',
    tag: 'Affiliation',
    annee: 2024,
    description: 'Plateforme d\'affiliation et de partenariat commercial. Système de parrainage, suivi des commissions, tableau de bord affiliés et intégration full e-commerce.',
    gradient: 'linear-gradient(135deg,#1A1205 0%,#78350F 50%,#F59E0B 100%)',
    accent: '#FCD34D',
    icon: '🤝',
    featured: true,
    tech: ['Next.js', 'Supabase', 'Stripe'],
  },
  {
    id: 'ibig-immo-trust',
    nom: 'IBIG IMMO TRUST',
    client: 'IBIG GROUP',
    tag: 'Sites web',
    annee: 2024,
    description: 'Plateforme immobilière de confiance pour l\'achat, la vente et la location de biens immobiliers en Côte d\'Ivoire. Annonces, visites virtuelles et accompagnement.',
    gradient: 'linear-gradient(135deg,#0C1A33 0%,#1E3A5F 50%,#2563EB 100%)',
    accent: '#60A5FA',
    icon: '🏠',
    tech: ['Next.js', 'Map API', 'PostgreSQL'],
  },
  {
    id: 'ibig-eduform',
    nom: 'IBIG EDUFORM',
    client: 'IBIG GROUP',
    tag: 'Applications',
    annee: 2024,
    description: 'Plateforme e-learning et de formation professionnelle. Cours en ligne, certifications, suivi des apprenants et espace entreprise pour la montée en compétences.',
    gradient: 'linear-gradient(135deg,#0A1628 0%,#0E3460 50%,#0EA5E9 100%)',
    accent: '#38BDF8',
    icon: '🎓',
    tech: ['Next.js', 'Video API', 'Supabase'],
  },
  {
    id: 'uajrp',
    nom: 'Site UAJRP',
    client: 'Union des Artisans et Jeunes',
    tag: 'Sites web',
    annee: 2024,
    description: 'Site institutionnel de l\'Union des Artisans et Jeunes Professionnels. Présentation de l\'association, actualités, adhésion et agenda des événements.',
    gradient: 'linear-gradient(135deg,#1A0A00 0%,#7C2D12 50%,#EA580C 100%)',
    accent: '#FB923C',
    icon: '⚒️',
    tech: ['Next.js', 'CMS'],
  },
  {
    id: 'ibig-soft',
    nom: 'IBIG SOFT',
    client: 'IBIG GROUP',
    tag: 'Logiciels',
    annee: 2023,
    description: 'Suite de 14 logiciels métier SaaS couvrant la gestion d\'entreprise, RH, comptabilité, stock, caisse, facturation, CRM, projet et plus encore.',
    gradient: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#334155 100%)',
    accent: '#94A3B8',
    icon: '⚙️',
    featured: true,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'logiciel-gestion-rh',
    nom: 'IBIG RH',
    client: 'IBIG SOFT',
    tag: 'Logiciels',
    annee: 2023,
    description: 'Logiciel de gestion des ressources humaines : paie, congés, recrutement, évaluation des performances et tableaux de bord RH.',
    gradient: 'linear-gradient(135deg,#1A103A 0%,#312E81 50%,#4F46E5 100%)',
    accent: '#818CF8',
    icon: '👥',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'logiciel-compta',
    nom: 'IBIG COMPTA',
    client: 'IBIG SOFT',
    tag: 'Logiciels',
    annee: 2023,
    description: 'Logiciel de comptabilité et de gestion financière : plan comptable SYSCOHADA, bilan, compte de résultat, déclarations fiscales.',
    gradient: 'linear-gradient(135deg,#042F2E 0%,#065F46 50%,#059669 100%)',
    accent: '#34D399',
    icon: '📊',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'logiciel-stock',
    nom: 'IBIG STOCK',
    client: 'IBIG SOFT',
    tag: 'Logiciels',
    annee: 2023,
    description: 'Logiciel de gestion de stock et d\'inventaire : entrées/sorties, alertes de rupture, codes-barres, fournisseurs et rapports.',
    gradient: 'linear-gradient(135deg,#1A1205 0%,#713F12 50%,#D97706 100%)',
    accent: '#FBB040',
    icon: '📦',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'logiciel-caisse',
    nom: 'IBIG CAISSE',
    client: 'IBIG SOFT',
    tag: 'Logiciels',
    annee: 2023,
    description: 'Logiciel de caisse et de point de vente (POS) : encaissement, tickets, remises, modes de paiement multiples et clôture journalière.',
    gradient: 'linear-gradient(135deg,#170A1F 0%,#581C87 50%,#9333EA 100%)',
    accent: '#C084FC',
    icon: '🏪',
    tech: ['React', 'Electron', 'SQLite'],
  },
  {
    id: 'logiciel-crm',
    nom: 'IBIG CRM',
    client: 'IBIG SOFT',
    tag: 'Logiciels',
    annee: 2023,
    description: 'Logiciel CRM de gestion de la relation client : pipeline commercial, suivi des leads, historique des interactions et rapports de performance.',
    gradient: 'linear-gradient(135deg,#0A1A2E 0%,#0C4A6E 50%,#0284C7 100%)',
    accent: '#38BDF8',
    icon: '🎯',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'logiciel-facturation',
    nom: 'IBIG FACTURE',
    client: 'IBIG SOFT',
    tag: 'Logiciels',
    annee: 2023,
    description: 'Logiciel de facturation et de devis : création de factures professionnelles, relances automatiques, suivi des paiements et exports PDF.',
    gradient: 'linear-gradient(135deg,#0F1F0A 0%,#166534 50%,#22C55E 100%)',
    accent: '#4ADE80',
    icon: '🧾',
    tech: ['React', 'Node.js', 'PDF.js'],
  },
  {
    id: 'reseaux-sociaux',
    nom: 'Présence Réseaux Sociaux',
    client: 'IBIG GROUP',
    tag: 'Réseaux sociaux',
    annee: 2023,
    description: 'Création et gestion des pages officielles des marques IBIG GROUP sur Facebook, Instagram, LinkedIn, TikTok et YouTube. Identité visuelle cohérente et stratégie de contenu.',
    gradient: 'linear-gradient(135deg,#1A0514 0%,#831843 50%,#EC4899 100%)',
    accent: '#F472B6',
    icon: '📱',
    tech: ['Canva Pro', 'Meta Ads', 'LinkedIn Ads'],
  },
]

const TAGS: Tag[] = ['Tous', 'Sites web', 'Applications', 'Logiciels', 'E-commerce', 'Affiliation', 'Réseaux sociaux']
const TAG_ICONS: Record<Tag, typeof Globe> = {
  'Tous': Award,
  'Sites web': Globe,
  'Applications': Smartphone,
  'Logiciels': Settings,
  'E-commerce': ShoppingBag,
  'Affiliation': Users,
  'Réseaux sociaux': MessageSquare,
}

const FEATURED = PROJETS.filter((p) => p.featured)
const NON_FEATURED = PROJETS.filter((p) => !p.featured)

/* ─── PAGE ──────────────────────────────────────────────────────────────── */

export default function RealisationsPage() {
  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.3} 50%{opacity:.7} }
        .proj-card { position:relative; border-radius:1.5rem; overflow:hidden; transition:transform .25s,box-shadow .25s; cursor:default; }
        .proj-card:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,.5); }
        .proj-card .overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.2) 60%,transparent 100%); }
        .proj-card:hover .overlay { background:linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.4) 70%,transparent 100%); }
        .tag-pill { display:inline-flex; align-items:center; gap:.35rem; padding:.35rem .875rem; border-radius:9999px; font-size:.72rem; font-weight:700; }
        .tech-badge { display:inline-block; padding:.2rem .6rem; border-radius:.375rem; font-size:.65rem; font-weight:600; background:rgba(255,255,255,.1); color:rgba(255,255,255,.6); }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position:'relative', paddingTop:'7rem', paddingBottom:'5rem', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-10%', left:'10%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.22) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', bottom:'-5%', right:'10%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .5s' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        </div>
        <div style={{ position:'relative', maxWidth:'1024px', margin:'0 auto', padding:'0 1.5rem', textAlign:'center' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.5rem 1.25rem', borderRadius:'9999px', marginBottom:'1.75rem', background:'rgba(255,107,0,.1)', border:'1px solid rgba(255,107,0,.25)' }}>
            <Award size={13} style={{ color:'#FF9A4D' }} />
            <span style={{ fontSize:'.75rem', fontWeight:700, color:'#FF9A4D' }}>PORTFOLIO — IBIG GROUP</span>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#FF6B00', display:'inline-block', animation:'pulse-glow 1.5s ease-in-out infinite' }} />
          </div>
          <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900, color:'white', marginBottom:'1.25rem', letterSpacing:'-.03em', lineHeight:1.05 }}>
            Nos{' '}
            <span style={{ background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              réalisations
            </span>
          </h1>
          <p style={{ fontSize:'1.1rem', color:'rgba(255,255,255,.5)', maxWidth:'560px', margin:'0 auto 2.5rem', lineHeight:1.7 }}>
            Des projets concrets qui témoignent de notre expertise. Chaque réalisation est la preuve de notre engagement pour la qualité et l&apos;innovation.
          </p>
          {/* Stats */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'3rem', flexWrap:'wrap' }}>
            {STATS.map(({ n, label }) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'2.25rem', fontWeight:900, background:'linear-gradient(135deg,#FF6B00,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{n}</div>
                <div style={{ fontSize:'.72rem', fontWeight:600, color:'rgba(255,255,255,.3)', marginTop:'2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJETS PHARES ═══ */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 4rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1.1rem', color:'white', letterSpacing:'.05em', textTransform:'uppercase' }}>Projets phares</h2>
        </div>

        {/* Grille featured : alternance grande carte + 2 petites */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem' }}>
          {FEATURED.map((projet, i) => (
            <div key={projet.id} className="proj-card" style={{ background: projet.gradient, height: i === 0 ? '480px' : '320px', gridColumn: i === 0 ? 'span 2' : undefined }}>
              {/* Icône flottante */}
              <div style={{ position:'absolute', top:'1.5rem', left:'1.75rem', fontSize:'3.5rem', animation:'float 3s ease-in-out infinite', animationDelay:`${i * .4}s`, zIndex:2 }}>
                {projet.icon}
              </div>
              {/* Glow orbe */}
              <div style={{ position:'absolute', top:0, right:0, width:'300px', height:'300px', borderRadius:'50%', background:`radial-gradient(circle,${projet.accent}22 0%,transparent 65%)`, transform:'translate(30%,-30%)', pointerEvents:'none' }} />
              <div className="overlay" />
              {/* Contenu */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.75rem', zIndex:2 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.625rem', marginBottom:'.75rem', flexWrap:'wrap' }}>
                  <span className="tag-pill" style={{ background:`${projet.accent}22`, color:projet.accent, border:`1px solid ${projet.accent}44` }}>
                    {projet.tag}
                  </span>
                  <span style={{ fontSize:'.7rem', color:'rgba(255,255,255,.35)', fontWeight:600 }}>{projet.annee}</span>
                  {projet.url && (
                    <a href={projet.url} target="_blank" rel="noopener noreferrer"
                      style={{ display:'inline-flex', alignItems:'center', gap:'.3rem', fontSize:'.7rem', color:'rgba(255,255,255,.5)', textDecoration:'none', transition:'color .15s' }}>
                      <ExternalLink size={11} /> Voir le site
                    </a>
                  )}
                </div>
                <h3 style={{ fontWeight:900, fontSize: i === 0 ? '1.75rem' : '1.25rem', color:'white', marginBottom:'.5rem', letterSpacing:'-.02em' }}>
                  {projet.nom}
                </h3>
                <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.6)', lineHeight:1.65, marginBottom:'.875rem', maxWidth: i === 0 ? '560px' : '360px' }}>
                  {projet.description}
                </p>
                {projet.tech && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'.375rem' }}>
                    {projet.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ AUTRES RÉALISATIONS ═══ */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 4rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1.1rem', color:'white', letterSpacing:'.05em', textTransform:'uppercase' }}>Toutes les réalisations</h2>
        </div>

        {/* Filtres par catégorie */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.625rem', marginBottom:'2.5rem' }}>
          {TAGS.map((tag) => {
            const Icon = TAG_ICONS[tag]
            const count = tag === 'Tous' ? PROJETS.length : PROJETS.filter(p => p.tag === tag).length
            return (
              <div key={tag} style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.5rem 1rem', borderRadius:'9999px', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', color:'rgba(255,255,255,.6)', fontSize:'.8rem', fontWeight:600 }}>
                <Icon size={12} />{tag}
                <span style={{ fontSize:'.65rem', padding:'.1rem .4rem', borderRadius:'9999px', background:'rgba(255,255,255,.1)', color:'rgba(255,255,255,.4)' }}>{count}</span>
              </div>
            )
          })}
        </div>

        {/* Grille complète */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.25rem' }}>
          {NON_FEATURED.map((projet) => (
            <div key={projet.id} className="proj-card" style={{ background: projet.gradient, height:'260px' }}>
              <div style={{ position:'absolute', top:'1.25rem', left:'1.25rem', fontSize:'2.5rem', animation:'float 3s ease-in-out infinite' }}>{projet.icon}</div>
              <div style={{ position:'absolute', top:0, right:0, width:'200px', height:'200px', borderRadius:'50%', background:`radial-gradient(circle,${projet.accent}18 0%,transparent 65%)`, transform:'translate(30%,-30%)' }} />
              <div className="overlay" />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.25rem', zIndex:2 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.5rem' }}>
                  <span className="tag-pill" style={{ background:`${projet.accent}22`, color:projet.accent, border:`1px solid ${projet.accent}44` }}>{projet.tag}</span>
                  <span style={{ fontSize:'.65rem', color:'rgba(255,255,255,.3)', fontWeight:600 }}>{projet.annee}</span>
                </div>
                <h3 style={{ fontWeight:900, fontSize:'1rem', color:'white', marginBottom:'.375rem' }}>{projet.nom}</h3>
                <p style={{ fontSize:'.75rem', color:'rgba(255,255,255,.5)', lineHeight:1.6, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' } as React.CSSProperties}>
                  {projet.description}
                </p>
                {projet.tech && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'.3rem', marginTop:'.625rem' }}>
                    {projet.tech.slice(0, 3).map((t) => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RÉSEAUX SOCIAUX ═══ */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ background:'linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.02))', border:'1px solid rgba(255,255,255,.08)', borderRadius:'2rem', padding:'3rem', textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem', display:'inline-block', animation:'float 3s ease-in-out infinite' }}>📱</div>
          <h2 style={{ fontWeight:900, fontSize:'1.5rem', color:'white', marginBottom:'.75rem' }}>Présence sur les réseaux sociaux</h2>
          <p style={{ color:'rgba(255,255,255,.5)', fontSize:'.9rem', maxWidth:'520px', margin:'0 auto 2rem', lineHeight:1.7 }}>
            IBIG GROUP est actif sur les principales plateformes sociales avec des pages officielles, des contenus réguliers et une communauté grandissante.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.75rem', justifyContent:'center', marginBottom:'2rem' }}>
            {[
              { name: 'Facebook', color: '#1877F2', icon: 'f' },
              { name: 'Instagram', color: '#E1306C', icon: '📸' },
              { name: 'LinkedIn', color: '#0A66C2', icon: 'in' },
              { name: 'TikTok', color: '#010101', icon: '▶' },
              { name: 'YouTube', color: '#FF0000', icon: '▶' },
              { name: 'Twitter/X', color: '#000000', icon: '✕' },
            ].map(({ name, color, icon }) => (
              <div key={name} style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.5rem 1.125rem', borderRadius:'9999px', background:`${color}18`, border:`1px solid ${color}33`, color:'white', fontSize:'.8rem', fontWeight:700 }}>
                <span style={{ color }}>{icon}</span> {name}
              </div>
            ))}
          </div>
          <p style={{ fontSize:'.8rem', color:'rgba(255,255,255,.3)' }}>
            Community Management · Création de contenus · Publicités Meta & LinkedIn · Stratégie de croissance
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 6rem', textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(1.75rem,4vw,2.75rem)', fontWeight:900, color:'white', marginBottom:'.75rem', letterSpacing:'-.025em' }}>
          Un projet similaire en tête ?
        </h2>
        <p style={{ color:'rgba(255,255,255,.45)', fontSize:'.95rem', marginBottom:'2rem' }}>
          Discutons de votre projet. Notre équipe vous propose une solution sur mesure.
        </p>
        <Link href="/devis"
          style={{ display:'inline-flex', alignItems:'center', gap:'.625rem', padding:'1rem 2.25rem', borderRadius:'1rem', fontWeight:800, fontSize:'1rem', color:'white', background:'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow:'0 10px 30px rgba(255,107,0,.35)', textDecoration:'none' }}>
          Demander un devis gratuit <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
