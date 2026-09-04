import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Globe, Smartphone, ShoppingCart, BarChart3,
  Palette, Shield, Zap, Users, Target, Award, TrendingUp,
  CheckCircle, MessageSquare, Star, MapPin, Mail, Phone,
  Building2, Handshake, Lightbulb, Rocket,
} from 'lucide-react'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'À propos – IBIG DIGITAL | Transformation Digitale en Côte d\'Ivoire',
  description: 'IBIG DIGITAL, branche digitale d\'INTERMARK BUSINESS INTERNATIONAL GROUP. Notre mission : accompagner la transformation numérique des entreprises en Afrique.',
}

const STATS = [
  { value: '200+', label: 'Clients accompagnés', icon: Users },
  { value: '5+', label: 'Années d\'expertise', icon: Award },
  { value: '15+', label: 'Pays clients', icon: Globe },
  { value: '98%', label: 'Satisfaction client', icon: Star },
]

const DOMAINS = [
  { icon: Globe, label: 'Création de sites internet', desc: 'Vitrine, blog, institutionnel — moderne & performant' },
  { icon: Smartphone, label: 'Applications mobiles', desc: 'iOS, Android, PWA — pour toucher vos clients partout' },
  { icon: ShoppingCart, label: 'E-commerce', desc: 'Boutiques en ligne clé en main, paiement intégré' },
  { icon: BarChart3, label: 'Marketing digital', desc: 'SEO, publicité, emailing — visibilité et conversions' },
  { icon: Palette, label: 'Identité visuelle', desc: 'Logo, charte graphique, branding professionnel' },
  { icon: Users, label: 'Community management', desc: 'Gestion réseaux sociaux, création de contenu' },
  { icon: Shield, label: 'Hébergement & sécurité', desc: 'Serveurs rapides, SSL, sauvegardes automatiques' },
  { icon: Zap, label: 'IA & Automatisation', desc: 'Chatbots, workflows automatisés, gain de temps' },
]

const VALUES = [
  { icon: Target, title: 'Proximité', desc: 'Nous comprenons le marché africain. Nos solutions sont adaptées à vos réalités économiques et culturelles, pas copiées-collées depuis l\'Occident.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Les technologies évoluent vite. Nous nous formons en continu pour vous apporter des outils modernes, efficaces et durables.' },
  { icon: Handshake, title: 'Partenariat', desc: 'Nous ne sommes pas des prestataires. Nous devenons vos partenaires digitaux à long terme, investis dans votre succès.' },
  { icon: Rocket, title: 'Excellence', desc: 'Chaque projet est livré avec le même niveau d\'exigence, qu\'il s\'agisse d\'un site vitrine ou d\'une plateforme SaaS complexe.' },
]

const TIMELINE = [
  { year: '2019', title: 'Fondation IBIG SARL', desc: 'Création d\'INTERMARK BUSINESS INTERNATIONAL GROUP à Abidjan, spécialisé dans le conseil aux entreprises.' },
  { year: '2020', title: 'Naissance d\'IBIG DIGITAL', desc: 'Lancement de la branche digitale pour répondre à la demande croissante de transformation numérique des PME africaines.' },
  { year: '2021', title: 'Expansion des services', desc: 'Intégration des services IA, e-commerce et community management. Premier pack commercial lancé.' },
  { year: '2023', title: 'IBIG PARTNERS', desc: 'Lancement du programme d\'affiliation pour permettre aux partenaires de distribuer les services IBIG DIGITAL.' },
  { year: '2024', title: '200+ clients', desc: 'Franchissement du cap de 200 clients accompagnés, présence dans 15+ pays africains et Europe.' },
  { year: '2025', title: 'Plateforme ibig-digital.com', desc: 'Lancement de la nouvelle plateforme digitale avec système de packs, devis en ligne et espace partenaires.' },
]

export default function AboutPage() {
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Bonjour IBIG DIGITAL, je souhaite en savoir plus sur vos services.')}`

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .domain-card {
          padding:1.25rem; border-radius:1.125rem;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          transition:background .2s, border-color .2s, transform .2s;
        }
        .domain-card:hover { background:rgba(255,255,255,.07); border-color:rgba(255,107,0,.2); transform:translateY(-3px); }

        .value-card {
          padding:1.75rem; border-radius:1.25rem;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          transition:background .2s, border-color .2s, transform .2s;
        }
        .value-card:hover { background:rgba(255,255,255,.07); border-color:rgba(255,107,0,.18); transform:translateY(-4px); }

        .stat-card {
          padding:2rem 1.5rem; border-radius:1.5rem; text-align:center;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          transition:border-color .2s, transform .2s;
        }
        .stat-card:hover { border-color:rgba(255,107,0,.25); transform:translateY(-3px); }

        .btn-main {
          display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1rem 2rem; border-radius:1rem; font-weight:800; font-size:.875rem;
          color:#fff; text-decoration:none;
          background:linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow:0 8px 24px rgba(255,107,0,.3);
          transition:opacity .15s, transform .15s;
        }
        .btn-main:hover { opacity:.9; transform:translateY(-2px); }

        .btn-wa {
          display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1rem 2rem; border-radius:1rem; font-weight:700; font-size:.875rem;
          color:#fff; text-decoration:none; background:#25D366;
          box-shadow:0 6px 18px rgba(37,211,102,.2);
          transition:opacity .15s;
        }
        .btn-wa:hover { opacity:.88; }

        .timeline-dot {
          width:36px; height:36px; border-radius:50%; flex-shrink:0;
          background:rgba(255,107,0,.15); border:2px solid rgba(255,107,0,.4);
          display:flex; align-items:center; justify-content:center;
          font-size:.6rem; font-weight:900; color:#FF9A4D; letter-spacing:.04em;
        }
      `}</style>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{ position:'relative', overflow:'hidden', padding:'9rem 0 5rem', textAlign:'center' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-10%', left:'10%', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.2) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', top:'5%', right:'5%', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.1) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .8s' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        </div>

        <div style={{ position:'relative', maxWidth:'860px', margin:'0 auto', padding:'0 1.5rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.4rem 1.1rem', borderRadius:'9999px', marginBottom:'1.5rem', background:'rgba(255,107,0,.1)', border:'1px solid rgba(255,107,0,.25)' }}>
            <Building2 size={12} style={{ color:'#FF9A4D' }} />
            <span style={{ fontSize:'.7rem', fontWeight:700, color:'#FF9A4D', letterSpacing:'.08em' }}>INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL</span>
          </div>

          <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900, color:'white', marginBottom:'1.25rem', letterSpacing:'-.035em', lineHeight:1.1 }}>
            À propos d&apos;{' '}
            <span style={{ background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              IBIG DIGITAL
            </span>
          </h1>
          <p style={{ fontSize:'1.1rem', color:'rgba(255,255,255,.5)', lineHeight:1.8, maxWidth:'640px', margin:'0 auto 2.5rem' }}>
            Nous accompagnons les entreprises, entrepreneurs et organisations africains dans leur transformation digitale — avec des solutions concrètes, adaptées et durables.
          </p>

          <div style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
            <Link href="/devis" className="btn-main">
              Démarrer un projet <ArrowRight size={16} />
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <MessageSquare size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem' }}>
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="stat-card">
              <div style={{ width:'48px', height:'48px', borderRadius:'1rem', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.22)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>
                <Icon size={22} style={{ color:'#FF9A4D' }} />
              </div>
              <div style={{ fontSize:'2.75rem', fontWeight:900, color:'white', letterSpacing:'-.04em', lineHeight:1 }}>{value}</div>
              <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.4)', marginTop:'.5rem', fontWeight:500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MISSION + VISION
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', alignItems:'start' }}>

        <div style={{ padding:'2.5rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'150px', height:'150px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%)' }} />
          <div style={{ fontSize:'2.5rem', marginBottom:'1.25rem', animation:'float 3.5s ease-in-out infinite' }}>🎯</div>
          <h2 style={{ fontSize:'1.4rem', fontWeight:900, color:'white', marginBottom:'1rem', letterSpacing:'-.02em' }}>Notre mission</h2>
          <p style={{ fontSize:'.875rem', color:'rgba(255,255,255,.55)', lineHeight:1.85, marginBottom:'1rem' }}>
            IBIG DIGITAL est la branche digitale d&apos;INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL. Nous accompagnons les entreprises, entrepreneurs, commerçants, professionnels, associations et organisations dans la conception et la mise en place de leurs outils numériques.
          </p>
          <p style={{ fontSize:'.875rem', color:'rgba(255,255,255,.45)', lineHeight:1.85 }}>
            Notre approche est simple : comprendre d&apos;abord votre métier et vos enjeux, puis proposer des solutions digitales adaptées à votre réalité, votre budget et vos objectifs de croissance.
          </p>
        </div>

        <div style={{ padding:'2.5rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,#003B7A,#005BCC)' }} />
          <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'150px', height:'150px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.08) 0%,transparent 70%)' }} />
          <div style={{ fontSize:'2.5rem', marginBottom:'1.25rem', animation:'float 4s ease-in-out infinite .5s' }}>🌍</div>
          <h2 style={{ fontSize:'1.4rem', fontWeight:900, color:'white', marginBottom:'1rem', letterSpacing:'-.02em' }}>Notre vision</h2>
          <p style={{ fontSize:'.875rem', color:'rgba(255,255,255,.55)', lineHeight:1.85, marginBottom:'1rem' }}>
            Être le partenaire digital de référence pour les entreprises en Côte d&apos;Ivoire et en Afrique. Nous croyons que chaque entreprise, quelle que soit sa taille, mérite des outils numériques professionnels.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'.625rem', marginTop:'1.25rem' }}>
            {['Démocratiser le digital en Afrique', 'Créer de la valeur économique locale', 'Former les entrepreneurs aux outils numériques'].map(v => (
              <div key={v} style={{ display:'flex', alignItems:'center', gap:'.625rem' }}>
                <CheckCircle size={14} style={{ color:'#FF9A4D', flexShrink:0 }} />
                <span style={{ fontSize:'.82rem', color:'rgba(255,255,255,.6)', fontWeight:500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOMAINES D'EXPERTISE
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Nos domaines d&apos;expertise</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'.875rem' }}>
          {DOMAINS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="domain-card">
              <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'.625rem' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'.875rem', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.22)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon size={16} style={{ color:'#FF9A4D' }} />
                </div>
                <div style={{ fontWeight:700, color:'white', fontSize:'.88rem' }}>{label}</div>
              </div>
              <div style={{ fontSize:'.76rem', color:'rgba(255,255,255,.38)', lineHeight:1.6, paddingLeft:'3rem' }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALEURS
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Nos valeurs</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1rem' }}>
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="value-card">
              <div style={{ width:'48px', height:'48px', borderRadius:'1rem', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.22)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                <Icon size={22} style={{ color:'#FF9A4D' }} />
              </div>
              <div style={{ fontWeight:800, color:'white', fontSize:'.95rem', marginBottom:'.5rem' }}>{title}</div>
              <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.4)', lineHeight:1.75 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'860px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Notre parcours</h2>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {TIMELINE.map((item, i) => (
            <div key={item.year} style={{ display:'flex', gap:'1.25rem', alignItems:'flex-start', paddingBottom: i < TIMELINE.length - 1 ? '0' : '0' }}>
              {/* Left: year dot + line */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                <div className="timeline-dot">{item.year}</div>
                {i < TIMELINE.length - 1 && (
                  <div style={{ width:'2px', flex:1, minHeight:'2rem', background:'rgba(255,107,0,.15)', margin:'.25rem 0' }} />
                )}
              </div>
              {/* Right: content */}
              <div style={{ paddingBottom: i < TIMELINE.length - 1 ? '1.75rem' : '0' }}>
                <div style={{ fontWeight:800, color:'white', fontSize:'.92rem', marginBottom:'.35rem', marginTop:'.5rem' }}>{item.title}</div>
                <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.4)', lineHeight:1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IBIG PARTNERS + INFOS LÉGALES
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', alignItems:'start' }}>

        {/* IBIG PARTNERS */}
        <div style={{ padding:'2.5rem', borderRadius:'1.5rem', position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#0d1a33 0%,#102040 50%,#0a1628 100%)', border:'2px solid rgba(0,91,204,.4)' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#003B7A,#005BCC,#003B7A)' }} />
          <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.15) 0%,transparent 70%)' }} />
          <div style={{ position:'relative' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', padding:'.3rem .875rem', borderRadius:'9999px', background:'rgba(0,91,204,.2)', border:'1px solid rgba(0,91,204,.4)', marginBottom:'1.25rem' }}>
              <Handshake size={11} style={{ color:'#4D9FFF' }} />
              <span style={{ fontSize:'.65rem', fontWeight:800, color:'#4D9FFF', letterSpacing:'.08em' }}>PROGRAMME D'AFFILIATION</span>
            </div>
            <h3 style={{ fontSize:'1.5rem', fontWeight:900, color:'white', marginBottom:'.75rem', letterSpacing:'-.02em' }}>IBIG PARTNERS</h3>
            <p style={{ fontSize:'.85rem', color:'rgba(255,255,255,.5)', lineHeight:1.8, marginBottom:'1.5rem' }}>
              IBIG PARTNERS est le programme d&apos;affiliation et de distribution de l&apos;écosystème IBIG. Il permet aux partenaires de distribuer les produits et services IBIG DIGITAL et de bénéficier de <strong style={{ color:'rgba(255,255,255,.75)' }}>commissions attractives</strong> sur les ventes générées.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'.5rem', marginBottom:'1.75rem' }}>
              {['Commissions sur chaque vente', 'Matériaux marketing fournis', 'Formation et accompagnement', 'Tableau de bord partenaire'].map(v => (
                <div key={v} style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                  <CheckCircle size={13} style={{ color:'#4D9FFF', flexShrink:0 }} />
                  <span style={{ fontSize:'.8rem', color:'rgba(255,255,255,.55)', fontWeight:500 }}>{v}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-main" style={{ background:'linear-gradient(135deg,#003B7A,#005BCC)', boxShadow:'0 8px 24px rgba(0,91,204,.3)' }}>
              Devenir partenaire <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Infos légales + contact */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div style={{ padding:'2rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontWeight:800, color:'white', fontSize:'.95rem', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
              <Building2 size={16} style={{ color:'#FF9A4D' }} /> Informations légales
            </div>
            <dl style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
              {[
                { label: 'Entreprise', value: 'INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL' },
                { label: 'Branche', value: 'IBIG DIGITAL' },
                { label: 'Domaine', value: 'ibig-digital.com' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                  <dt style={{ fontSize:'.72rem', color:'rgba(255,255,255,.3)', fontWeight:600, width:'72px', flexShrink:0, marginTop:'2px', textTransform:'uppercase', letterSpacing:'.04em' }}>{label}</dt>
                  <dd style={{ fontSize:'.82rem', color:'rgba(255,255,255,.65)', fontWeight:600, lineHeight:1.5 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div style={{ padding:'2rem', borderRadius:'1.5rem', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontWeight:800, color:'white', fontSize:'.95rem', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
              <MapPin size={16} style={{ color:'#FF9A4D' }} /> Nous contacter
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.875rem' }}>
              {[
                { icon: Mail, label: SITE.email },
                { icon: Phone, label: SITE.phone },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                  <div style={{ width:'32px', height:'32px', borderRadius:'.75rem', background:'rgba(255,107,0,.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={14} style={{ color:'#FF9A4D' }} />
                  </div>
                  <span style={{ fontSize:'.85rem', color:'rgba(255,255,255,.6)', fontWeight:600 }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.625rem', marginTop:'1.5rem' }}>
              <Link href="/devis" className="btn-main" style={{ fontSize:'.82rem', padding:'.875rem 1.5rem' }}>
                Demander un devis <ArrowRight size={15} />
              </Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize:'.82rem', padding:'.875rem 1.5rem' }}>
                <MessageSquare size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:'860px', margin:'0 auto', padding:'0 1.5rem 7rem', textAlign:'center' }}>
        <div style={{ padding:'3.5rem 2.5rem', borderRadius:'2rem', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.09) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1.25rem', animation:'float 3s ease-in-out infinite' }}>🚀</div>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.5rem)', fontWeight:900, color:'white', marginBottom:'.75rem', letterSpacing:'-.025em', lineHeight:1.15 }}>
              Prêt à transformer votre présence digitale ?
            </h2>
            <p style={{ color:'rgba(255,255,255,.4)', fontSize:'.9rem', marginBottom:'2.25rem', lineHeight:1.75 }}>
              Premier échange gratuit et sans engagement. Notre équipe répond sous 24h.
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
              <Link href="/devis" className="btn-main" style={{ fontSize:'.95rem', padding:'1.1rem 2.25rem' }}>
                Démarrer un projet <ArrowRight size={18} />
              </Link>
              <Link href="/services" style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'1.1rem 2rem', borderRadius:'1rem', fontWeight:600, fontSize:'.9rem', color:'rgba(255,255,255,.55)', textDecoration:'none', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', transition:'background .15s' }}>
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
