import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Globe, Smartphone, ShoppingBag, Settings, Users, Award, MessageSquare, Building2, Truck, Heart, Wheat, Wallet, GraduationCap, Home, Package, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nos Réalisations – Projets & Portfolio | IBIG DIGITAL',
  description: 'Portfolio complet IBIG GROUP : sites web, applications, 11 logiciels SaaS/ERP en ligne (CONSTRUIRO, SANTAREX, AGRIFRIK, Scolaby, Zelivry, Lokativo…), e-commerce et réseaux sociaux.',
}

export const dynamic = 'force-dynamic'

/* ─── STATS ─────────────────────────────────────────────────────────────── */
const STATS = [
  { n: '25+', label: 'Projets livrés' },
  { n: '11', label: 'Logiciels SaaS en ligne' },
  { n: '7', label: 'Marques du groupe' },
  { n: '17+', label: 'Secteurs couverts' },
]

/* ─── PROJETS PHARES (sites & plateformes) ───────────────────────────────── */
const PROJETS_PHARES = [
  {
    id: 'ibig-digital',
    nom: 'IBIG DIGITAL',
    tag: 'Site web',
    annee: 2025,
    description: 'Site officiel de la branche digitale d\'IBIG GROUP. Catalogue de 100+ services, gestion de devis en ligne, blog, espace partenaires et back-office complet.',
    url: 'https://www.ibig-digital.com',
    gradient: 'linear-gradient(135deg,#001D3D 0%,#003B7A 55%,#0056CC 100%)',
    accent: '#4D9FFF',
    icon: '💻',
    tech: ['Next.js 15', 'PostgreSQL', 'Vercel'],
  },
  {
    id: 'intermark-business',
    nom: 'INTERMARK BUSINESS',
    tag: 'Site corporate',
    annee: 2024,
    description: 'Site institutionnel du groupe INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL. Présentation du groupe, de ses activités, filiales et contacts.',
    url: 'https://intermark-business.com',
    gradient: 'linear-gradient(135deg,#1A0533 0%,#3B0764 55%,#6D28D9 100%)',
    accent: '#A78BFA',
    icon: '🏢',
    tech: ['Next.js', 'Tailwind CSS'],
  },
  {
    id: 'ibig-soft',
    nom: 'IBIG SOFT',
    tag: 'Plateforme SaaS',
    annee: 2023,
    description: 'Plateforme centrale de 11 logiciels SaaS et ERP métiers : BTP, santé, agriculture, Mobile Money, associations, flotte, école, livraison, immobilier, commerce.',
    url: 'https://ibigsoft.com',
    gradient: 'linear-gradient(135deg,#0F172A 0%,#1E293B 55%,#334155 100%)',
    accent: '#94A3B8',
    icon: '⚙️',
    tech: ['SaaS', 'ERP', 'Multi-tenant', 'Cloud'],
  },
  {
    id: 'ibig-market',
    nom: 'IBIG MARKET',
    tag: 'E-commerce',
    annee: 2024,
    description: 'Marketplace e-commerce multi-vendeurs pour l\'achat et la vente en ligne de produits variés en Côte d\'Ivoire et en Afrique de l\'Ouest.',
    url: 'https://ibig-market.com',
    gradient: 'linear-gradient(135deg,#1A2E05 0%,#14532D 55%,#16A34A 100%)',
    accent: '#4ADE80',
    icon: '🛒',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    id: 'ibig-partners',
    nom: 'IBIG PARTNERS',
    tag: 'Affiliation',
    annee: 2024,
    description: 'Plateforme d\'affiliation et de partenariat commercial. Système de parrainage, suivi des commissions en temps réel et tableau de bord affiliés.',
    url: 'https://ibigpartners.com',
    gradient: 'linear-gradient(135deg,#1A1205 0%,#78350F 55%,#F59E0B 100%)',
    accent: '#FCD34D',
    icon: '🤝',
    tech: ['Next.js', 'Supabase'],
  },
  {
    id: 'ibig-immo-trust',
    nom: 'IBIG IMMO TRUST',
    tag: 'Immobilier',
    annee: 2024,
    description: 'Plateforme immobilière pour l\'achat, la vente et la location de biens en Côte d\'Ivoire. Annonces, visites et accompagnement personnalisé.',
    url: 'https://ibigimmotrust.com',
    gradient: 'linear-gradient(135deg,#0C1A33 0%,#1E3A5F 55%,#2563EB 100%)',
    accent: '#60A5FA',
    icon: '🏠',
    tech: ['Next.js', 'Maps API'],
  },
  {
    id: 'ibig-eduform',
    nom: 'IBIG EDUFORM',
    tag: 'E-learning',
    annee: 2024,
    description: 'Plateforme de formation professionnelle en ligne. Cours, certifications, suivi des apprenants et espace entreprise pour la montée en compétences.',
    url: 'https://ibig-eduform.com',
    gradient: 'linear-gradient(135deg,#0A1628 0%,#0E3460 55%,#0EA5E9 100%)',
    accent: '#38BDF8',
    icon: '🎓',
    tech: ['Next.js', 'Video API'],
  },
  {
    id: 'uajrp',
    nom: 'Site UAJRP',
    tag: 'Site institutionnel',
    annee: 2024,
    description: 'Site institutionnel de l\'Union des Associations des Jeunes de la Riviera Palmeraie (UAJRP). Présentation, adhésion, actualités et agenda des événements.',
    url: 'https://uajrp.com',
    gradient: 'linear-gradient(135deg,#1A0A00 0%,#7C2D12 55%,#EA580C 100%)',
    accent: '#FB923C',
    icon: '⚒️',
    tech: ['Next.js', 'CMS'],
  },
]

/* ─── LOGICIELS IBIG SOFT (données réelles depuis ibigsoft.com) ─────────── */
const LOGICIELS = [
  {
    id: 'construiro',
    nom: 'CONSTRUIRO ERP',
    tag: 'ERP BTP & Construction',
    description: 'L\'ERP BTP conçu pour l\'Afrique. Centralise tous les processus des entreprises du bâtiment : projets, chantiers, devis, facturation, stocks et comptabilité.',
    url: 'https://construiro.com',
    gradient: 'linear-gradient(135deg,#1A0A00,#92400E,#D97706)',
    accent: '#FBB040',
    icon: <Building2 size={22} />,
  },
  {
    id: 'santarex',
    nom: 'SANTAREX ERP',
    tag: 'Gestion hospitalière',
    description: 'Plateforme SaaS de gestion hospitalière pour l\'Afrique : dossiers patients (DME), consultations, pharmacie, laboratoire, facturation et urgences.',
    url: 'https://santarex.ibigsoft.com',
    gradient: 'linear-gradient(135deg,#042F2E,#065F46,#10B981)',
    accent: '#34D399',
    icon: <Heart size={22} />,
  },
  {
    id: 'agrifrik',
    nom: 'AGRIFRIK',
    tag: 'ERP Agricole',
    description: 'L\'ERP agricole conçu pour l\'Afrique subsaharienne : cultures, élevage, pisciculture, stocks, intrants, exportation et comptabilité SYSCOHADA.',
    url: 'https://agrifrik.ibigsoft.com',
    gradient: 'linear-gradient(135deg,#0F1F0A,#166534,#22C55E)',
    accent: '#4ADE80',
    icon: <Wheat size={22} />,
  },
  {
    id: 'gestmoney',
    nom: 'GESTMONEY',
    tag: 'Mobile Money SaaS',
    description: 'Plateforme Cloud SaaS de gestion des réseaux Mobile Money (Orange Money, MTN MoMo, Wave, Moov…) : transactions, float, commissions et KYC.',
    url: 'https://gestmoney.ibigsoft.com',
    gradient: 'linear-gradient(135deg,#1A1205,#713F12,#F59E0B)',
    accent: '#FCD34D',
    icon: <Wallet size={22} />,
  },
  {
    id: 'anouanze',
    nom: 'ANOUANZÊ ERP',
    tag: 'Associations & ONG',
    description: 'ERP dédié aux associations, ONG et organisations à but non lucratif : membres, cotisations, dons, projets, partenaires et comptabilité SYCEBNL.',
    url: 'https://anouanze.ibigsoft.com',
    gradient: 'linear-gradient(135deg,#1A103A,#312E81,#4F46E5)',
    accent: '#818CF8',
    icon: <Users size={22} />,
  },
  {
    id: 'ibig-fleet360',
    nom: 'IBIG Fleet 360',
    tag: 'Gestion de flotte',
    description: 'ERP tout-en-un de gestion de flotte et parc automobile pour l\'Afrique : véhicules, conducteurs, entretien, carburant, assurances et rapports.',
    url: 'https://ibigfleet360.com',
    gradient: 'linear-gradient(135deg,#0A1A2E,#0C4A6E,#0284C7)',
    accent: '#38BDF8',
    icon: <Truck size={22} />,
  },
  {
    id: 'scolaby',
    nom: 'Scolaby',
    tag: 'Gestion scolaire',
    description: 'Plateforme de gestion scolaire nouvelle génération pour l\'Afrique. De la maternelle au supérieur : inscriptions, notes, paiements, emplois du temps.',
    url: 'https://scolaby.com',
    gradient: 'linear-gradient(135deg,#0A1628,#0E3460,#2563EB)',
    accent: '#60A5FA',
    icon: <GraduationCap size={22} />,
  },
  {
    id: 'zelivry',
    nom: 'Zelivry',
    tag: 'Gestion de livraisons',
    description: 'Application web tout-en-un pour gérer une activité de livraison : commandes, clients, livreurs, stocks et encaissements réunis sur une plateforme.',
    url: 'https://zelivry.com',
    gradient: 'linear-gradient(135deg,#170A1F,#581C87,#9333EA)',
    accent: '#C084FC',
    icon: <Package size={22} />,
  },
  {
    id: 'lokativo',
    nom: 'Lokativo',
    tag: 'Immobilier SaaS',
    description: 'SaaS panafricain de gestion immobilière pour agences, propriétaires et syndics : biens, contrats, loyers, charges, quittances et reporting.',
    url: 'https://lokativo.com',
    gradient: 'linear-gradient(135deg,#0C1A33,#1E3A5F,#1D4ED8)',
    accent: '#93C5FD',
    icon: <Home size={22} />,
  },
  {
    id: 'gescomxel',
    nom: 'GESCOMXEL',
    tag: 'Gestion commerciale / CRM',
    description: 'Solution de gestion commerciale intelligente pour PME, commerces et boutiques : ventes, achats, stock, CRM, facturation et tableaux de bord.',
    url: 'https://ibigsoft.com/gescomxel.php',
    gradient: 'linear-gradient(135deg,#042F2E,#0F766E,#14B8A6)',
    accent: '#2DD4BF',
    icon: <BarChart3 size={22} />,
  },
  {
    id: 'stockflow',
    nom: 'STOCKFLOW ERP',
    tag: 'ERP commercial multi-tenant',
    description: 'ERP commercial 100% SaaS multi-tenant conçu pour PME, boutiques, distributeurs : stock, ventes, achats, caisse, facturation et comptabilité.',
    url: 'https://stockflow.ibigsoft.com',
    gradient: 'linear-gradient(135deg,#0F172A,#1E293B,#475569)',
    accent: '#CBD5E1',
    icon: <ShoppingBag size={22} />,
  },
]

/* ─── PAGE ──────────────────────────────────────────────────────────────── */
export default function RealisationsPage() {
  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.3} 50%{opacity:.7} }
        .proj-card { border-radius:1.5rem; overflow:hidden; position:relative; transition:transform .25s,box-shadow .25s; }
        .proj-card:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,.5); }
        .overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.25) 55%,transparent 100%); transition:background .25s; }
        .proj-card:hover .overlay { background:linear-gradient(to top,rgba(0,0,0,.94) 0%,rgba(0,0,0,.45) 65%,transparent 100%); }
        .logiciel-card { border-radius:1.25rem; overflow:hidden; position:relative; transition:transform .2s,box-shadow .2s; }
        .logiciel-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,.45); }
        .tag-badge { display:inline-flex; align-items:center; padding:.3rem .75rem; border-radius:9999px; font-size:.68rem; font-weight:700; }
        .tech-chip { display:inline-block; padding:.18rem .55rem; border-radius:.375rem; font-size:.62rem; font-weight:600; background:rgba(255,255,255,.1); color:rgba(255,255,255,.55); }
        .ext-link { display:inline-flex; align-items:center; gap:.3rem; font-size:.68rem; color:rgba(255,255,255,.45); text-decoration:none; transition:color .15s; }
        .ext-link:hover { color:rgba(255,255,255,.8); }
        .social-card { display:flex; align-items:center; gap:1rem; padding:1.1rem 1.25rem; border-radius:1rem; text-decoration:none; transition:transform .15s, box-shadow .15s; }
        .social-card:hover { transform:translateY(-3px); }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position:'relative', paddingTop:'7rem', paddingBottom:'5rem', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-10%', left:'15%', width:'550px', height:'550px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.22) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', bottom:0, right:'10%', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.12) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .6s' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        </div>
        <div style={{ position:'relative', maxWidth:'960px', margin:'0 auto', padding:'0 1.5rem', textAlign:'center' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.45rem 1.2rem', borderRadius:'9999px', marginBottom:'1.75rem', background:'rgba(255,107,0,.1)', border:'1px solid rgba(255,107,0,.25)' }}>
            <Award size={13} style={{ color:'#FF9A4D' }} />
            <span style={{ fontSize:'.72rem', fontWeight:700, color:'#FF9A4D', letterSpacing:'.06em' }}>PORTFOLIO — IBIG GROUP</span>
          </div>
          <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900, color:'white', marginBottom:'1rem', letterSpacing:'-.03em', lineHeight:1.05 }}>
            Nos{' '}
            <span style={{ background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              réalisations
            </span>
          </h1>
          <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,.5)', maxWidth:'540px', margin:'0 auto 2.5rem', lineHeight:1.75 }}>
            Sites, plateformes, logiciels SaaS et ERP — un écosystème digital complet conçu et déployé par IBIG GROUP.
          </p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'2.5rem', flexWrap:'wrap' }}>
            {STATS.map(({ n, label }) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'2.1rem', fontWeight:900, background:'linear-gradient(135deg,#FF6B00,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{n}</div>
                <div style={{ fontSize:'.7rem', fontWeight:600, color:'rgba(255,255,255,.3)', marginTop:'2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SITES & PLATEFORMES ═══ */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 4rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Sites web & Plateformes</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1.25rem' }}>
          {PROJETS_PHARES.map((p, i) => (
            <div key={p.id} className="proj-card" style={{ background: p.gradient, height: i < 2 ? '360px' : '280px' }}>
              <div style={{ position:'absolute', top:'1.25rem', left:'1.25rem', fontSize: i < 2 ? '3rem' : '2.25rem', animation:'float 3s ease-in-out infinite', animationDelay:`${i * .35}s`, zIndex:2 }}>
                {p.icon}
              </div>
              <div style={{ position:'absolute', top:0, right:0, width:'250px', height:'250px', borderRadius:'50%', background:`radial-gradient(circle,${p.accent}1A 0%,transparent 65%)`, transform:'translate(35%,-35%)' }} />
              <div className="overlay" />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.5rem', zIndex:2 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.6rem', flexWrap:'wrap' }}>
                  <span className="tag-badge" style={{ background:`${p.accent}1A`, color:p.accent, border:`1px solid ${p.accent}33` }}>{p.tag}</span>
                  <span style={{ fontSize:'.65rem', color:'rgba(255,255,255,.3)', fontWeight:600 }}>{p.annee}</span>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="ext-link">
                      <ExternalLink size={10} /> {p.url.replace('https://','').replace(/\/$/,'')}
                    </a>
                  )}
                </div>
                <h3 style={{ fontWeight:900, fontSize: i < 2 ? '1.35rem' : '1.05rem', color:'white', marginBottom:'.45rem', letterSpacing:'-.015em' }}>{p.nom}</h3>
                <p style={{ fontSize:'.78rem', color:'rgba(255,255,255,.55)', lineHeight:1.65, marginBottom:'.75rem' }}>{p.description}</p>
                {p.tech && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'.3rem' }}>
                    {p.tech.map((t) => <span key={t} className="tech-chip">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LOGICIELS IBIG SOFT ═══ */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 4rem' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
            <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Logiciels SaaS & ERP — IBIG SOFT</h2>
          </div>
          <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.45rem 1rem', borderRadius:'9999px', fontSize:'.75rem', fontWeight:700, color:'rgba(255,255,255,.6)', border:'1px solid rgba(255,255,255,.15)', textDecoration:'none' }}>
            <Globe size={12} /> ibigsoft.com <ExternalLink size={10} />
          </a>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1rem' }}>
          {LOGICIELS.map((log) => (
            <div key={log.id} className="logiciel-card" style={{ background: log.gradient }}>
              <div style={{ position:'absolute', top:0, right:0, width:'180px', height:'180px', borderRadius:'50%', background:`radial-gradient(circle,${log.accent}15 0%,transparent 65%)`, transform:'translate(30%,-30%)' }} />
              <div style={{ position:'relative', padding:'1.5rem' }}>
                {/* Icône + titre */}
                <div style={{ display:'flex', alignItems:'center', gap:'.875rem', marginBottom:'1rem' }}>
                  <div style={{ width:'2.75rem', height:'2.75rem', borderRadius:'1rem', background:`${log.accent}22`, border:`1px solid ${log.accent}33`, display:'flex', alignItems:'center', justifyContent:'center', color:log.accent, flexShrink:0 }}>
                    {log.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight:900, color:'white', fontSize:'.95rem', lineHeight:1.2 }}>{log.nom}</div>
                    <div style={{ fontSize:'.65rem', fontWeight:700, color:log.accent, marginTop:'2px' }}>{log.tag}</div>
                  </div>
                </div>
                <p style={{ fontSize:'.78rem', color:'rgba(255,255,255,.55)', lineHeight:1.65, marginBottom:'1rem' }}>
                  {log.description}
                </p>
                <a href={log.url} target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.45rem 1rem', borderRadius:'.625rem', fontSize:'.72rem', fontWeight:700, color:log.accent, background:`${log.accent}15`, border:`1px solid ${log.accent}33`, textDecoration:'none', transition:'background .15s' }}>
                  <ExternalLink size={11} /> Visiter le site
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RÉSEAUX SOCIAUX ═══ */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Réseaux sociaux & communautés</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1rem' }}>
          {[
            {
              platform: 'Facebook',
              label: 'IB International Group',
              url: 'https://www.facebook.com/IBInterOfficiel',
              color: '#1877F2',
              icon: 'f',
            },
            {
              platform: 'Facebook',
              label: 'IBIG IMMO TRUST',
              url: 'https://www.facebook.com/ibigimmotrust',
              color: '#1877F2',
              icon: 'f',
            },
            {
              platform: 'Facebook',
              label: 'IBIG SOFT',
              url: 'https://www.facebook.com/ibigsoft',
              color: '#1877F2',
              icon: 'f',
            },
            {
              platform: 'Instagram',
              label: 'ib_inter_officiel',
              url: 'https://www.instagram.com/ib_inter_officiel/',
              color: '#E1306C',
              icon: '◉',
            },
            {
              platform: 'TikTok',
              label: '@ibigroupsarl',
              url: 'https://www.tiktok.com/@ibigroupsarl',
              color: '#69C9D0',
              icon: '▶',
            },
            {
              platform: 'YouTube',
              label: '@ibigroupsarl',
              url: 'https://www.youtube.com/@ibigroupsarl',
              color: '#FF0000',
              icon: '▶',
            },
            {
              platform: 'LinkedIn',
              label: 'Intermark Business International',
              url: 'https://www.linkedin.com/company/intermark-business-international/',
              color: '#0A66C2',
              icon: 'in',
            },
            {
              platform: 'Google Business',
              label: 'IBIG GROUP',
              url: 'https://g.co/kgs/7trJhsU',
              color: '#4285F4',
              icon: 'G',
            },
            {
              platform: 'WhatsApp Channel',
              label: 'IBIG GROUP',
              url: 'https://whatsapp.com/channel/0029VaBcM3n2f3EIjk98nl0y',
              color: '#25D366',
              icon: '●',
            },
            {
              platform: 'WhatsApp Channel',
              label: 'IBIG IMMO TRUST',
              url: 'https://whatsapp.com/channel/0029Vb69Y3G4Y9lwodJ7xE2V',
              color: '#25D366',
              icon: '●',
            },
            {
              platform: 'Communauté WhatsApp',
              label: 'IBIG GROUP',
              url: 'https://chat.whatsapp.com/FXGHl8q45rxDJROlozRFq1',
              color: '#128C7E',
              icon: '👥',
            },
          ].map(({ platform, label, url, color, icon }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer"
              className="social-card"
              style={{ background:`${color}10`, border:`1px solid ${color}28` }}>
              <div style={{ width:'2.5rem', height:'2.5rem', borderRadius:'.75rem', background:`${color}20`, display:'flex', alignItems:'center', justifyContent:'center', color, fontWeight:900, fontSize:'1rem', flexShrink:0 }}>
                {icon}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:'.7rem', fontWeight:700, color, letterSpacing:'.04em', textTransform:'uppercase' }}>{platform}</div>
                <div style={{ fontSize:'.85rem', fontWeight:700, color:'white', marginTop:'1px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</div>
              </div>
              <ExternalLink size={13} style={{ color:'rgba(255,255,255,.25)', flexShrink:0, marginLeft:'auto' }} />
            </a>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ maxWidth:'860px', margin:'0 auto', padding:'0 1.5rem 6rem', textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(1.75rem,4vw,2.5rem)', fontWeight:900, color:'white', marginBottom:'.75rem', letterSpacing:'-.025em' }}>
          Un projet similaire en tête ?
        </h2>
        <p style={{ color:'rgba(255,255,255,.4)', fontSize:'.9rem', marginBottom:'2rem' }}>
          Discutons de votre idée. Notre équipe vous propose une solution sur mesure, adaptée à votre secteur et votre budget.
        </p>
        <Link href="/devis"
          style={{ display:'inline-flex', alignItems:'center', gap:'.625rem', padding:'1rem 2.25rem', borderRadius:'1rem', fontWeight:800, fontSize:'.95rem', color:'white', background:'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow:'0 10px 30px rgba(255,107,0,.35)', textDecoration:'none' }}>
          Demander un devis gratuit <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
