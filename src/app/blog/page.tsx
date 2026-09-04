import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, BookOpen, Zap } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Blog & Ressources – IBIG DIGITAL',
  description: 'Conseils, stratégies et ressources pour la transformation digitale des entreprises africaines. Marketing digital, e-commerce, IA, cybersécurité.',
}

const CATEGORIES = ['Tous', 'Stratégie digitale', 'Branding', 'E-commerce', 'Marketing', 'Technologie', 'Sécurité', 'IA & Innovation']

export default function BlogPage() {
  const featured = BLOG_POSTS[0]
  const rest = BLOG_POSTS.slice(1)

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }

        .post-card {
          border-radius:1.25rem; overflow:hidden;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          text-decoration:none; display:flex; flex-direction:column;
          transition:background .2s, border-color .2s, transform .2s;
        }
        .post-card:hover { background:rgba(255,255,255,.07); border-color:rgba(255,107,0,.2); transform:translateY(-4px); }

        .cat-badge {
          display:inline-flex; align-items:center;
          padding:.22rem .7rem; border-radius:9999px;
          font-size:.62rem; font-weight:700; letter-spacing:.06em;
          color:#FF9A4D; background:rgba(255,107,0,.12); border:1px solid rgba(255,107,0,.25);
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:'relative', overflow:'hidden', padding:'9rem 0 4rem', textAlign:'center' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-5%', left:'15%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.18) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', top:'10%', right:'10%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.1) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .8s' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        </div>
        <div style={{ position:'relative', maxWidth:'700px', margin:'0 auto', padding:'0 1.5rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.4rem 1.1rem', borderRadius:'9999px', marginBottom:'1.5rem', background:'rgba(255,107,0,.1)', border:'1px solid rgba(255,107,0,.25)' }}>
            <BookOpen size={12} style={{ color:'#FF9A4D' }} />
            <span style={{ fontSize:'.7rem', fontWeight:700, color:'#FF9A4D', letterSpacing:'.08em' }}>{BLOG_POSTS.length} ARTICLES — DIGITAL, MARKETING, IA, AFRIQUE</span>
          </div>
          <h1 style={{ fontSize:'clamp(2.2rem,5.5vw,3.8rem)', fontWeight:900, color:'white', marginBottom:'1rem', letterSpacing:'-.03em', lineHeight:1.1 }}>
            Blog &{' '}
            <span style={{ background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Ressources
            </span>
          </h1>
          <p style={{ fontSize:'1rem', color:'rgba(255,255,255,.45)', lineHeight:1.8 }}>
            Conseils concrets, stratégies éprouvées et insights pour accélérer la transformation digitale de votre entreprise en Afrique.
          </p>
        </div>
      </section>

      {/* ── ARTICLE FEATURED ── */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 3rem' }}>
        <Link href={`/blog/${featured.slug}`} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0', borderRadius:'1.75rem', overflow:'hidden', textDecoration:'none', border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.04)', transition:'border-color .2s, transform .2s' }}>
          {/* Emoji side */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'280px', background:'linear-gradient(135deg,rgba(255,107,0,.1) 0%,rgba(0,59,122,.15) 100%)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'30px 30px' }} />
            <div style={{ fontSize:'7rem', animation:'float 3s ease-in-out infinite', position:'relative' }}>{featured.emoji}</div>
          </div>
          {/* Content side */}
          <div style={{ padding:'2.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'.625rem', marginBottom:'1rem' }}>
              <span className="cat-badge">{featured.category}</span>
              <span style={{ display:'inline-flex', alignItems:'center', gap:'.3rem', fontSize:'.65rem', color:'rgba(255,255,255,.3)', fontWeight:500 }}>
                <Zap size={10} style={{ color:'#FF9A4D' }} /> À LA UNE
              </span>
            </div>
            <h2 style={{ fontSize:'1.5rem', fontWeight:900, color:'white', lineHeight:1.3, marginBottom:'1rem', letterSpacing:'-.02em' }}>
              {featured.title}
            </h2>
            <p style={{ fontSize:'.85rem', color:'rgba(255,255,255,.45)', lineHeight:1.75, marginBottom:'1.5rem' }}>
              {featured.excerpt}
            </p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.375rem', fontSize:'.72rem', color:'rgba(255,255,255,.28)' }}>
                <Clock size={11} /> {featured.readTime} min de lecture
                <span style={{ margin:'0 .25rem' }}>·</span>
                {new Date(featured.date).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'.35rem', fontSize:'.78rem', fontWeight:700, color:'#FF9A4D' }}>
                Lire l&apos;article <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ── GRILLE ARTICLES ── */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 1.5rem 7rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'2rem' }}>
          <div style={{ height:'3px', width:'2.5rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>
            Tous les articles
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'1.25rem' }}>
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              {/* Emoji banner */}
              <div style={{ height:'140px', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,rgba(255,255,255,.03) 0%,rgba(255,107,0,.06) 100%)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
                <div style={{ fontSize:'4rem', animation:'float 3.5s ease-in-out infinite', position:'relative' }}>{post.emoji}</div>
              </div>

              <div style={{ padding:'1.5rem', flex:1, display:'flex', flexDirection:'column' }}>
                <span className="cat-badge" style={{ alignSelf:'flex-start', marginBottom:'.875rem' }}>{post.category}</span>
                <h3 style={{ fontSize:'1rem', fontWeight:800, color:'white', lineHeight:1.4, marginBottom:'.75rem', flex:1 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize:'.78rem', color:'rgba(255,255,255,.38)', lineHeight:1.65, marginBottom:'1.25rem' }}>
                  {post.excerpt.slice(0, 120)}…
                </p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'.875rem', borderTop:'1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.68rem', color:'rgba(255,255,255,.25)' }}>
                    <Clock size={10} /> {post.readTime} min
                    <span style={{ margin:'0 .2rem' }}>·</span>
                    {new Date(post.date).toLocaleDateString('fr-FR', { month:'short', year:'numeric' })}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.72rem', fontWeight:700, color:'#FF9A4D' }}>
                    Lire <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
