import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, ArrowRight, MessageSquare } from 'lucide-react'
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog-data'
import { SITE } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article introuvable' }
  return {
    title: `${post.title} – Blog IBIG DIGITAL`,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

/* Markdown-like renderer — converts our simple content format */
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontSize:'1.5rem', fontWeight:900, color:'white', marginTop:'2.5rem', marginBottom:'1rem', letterSpacing:'-.02em', lineHeight:1.25 }}>
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{ fontSize:'1.1rem', fontWeight:800, color:'rgba(255,255,255,.85)', marginTop:'1.75rem', marginBottom:'.625rem', letterSpacing:'-.01em' }}>
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ display:'flex', flexDirection:'column', gap:'.5rem', marginBottom:'1.25rem', paddingLeft:0 }}>
          {items.map((item, j) => (
            <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:'.625rem', fontSize:'.9rem', color:'rgba(255,255,255,.6)', lineHeight:1.7, listStyle:'none' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#FF9A4D', flexShrink:0, marginTop:'.55rem' }} />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong style="color:rgba(255,255,255,.85);font-weight:700">$1</strong>') }} />
            </li>
          ))}
        </ul>
      )
      continue
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      const html = line
        .replace(/\*\*(.+?)\*\*/g, '<strong style="color:rgba(255,255,255,.8);font-weight:700">$1</strong>')
      elements.push(
        <p key={i} style={{ fontSize:'.9rem', color:'rgba(255,255,255,.5)', lineHeight:1.85, marginBottom:'.875rem' }}
          dangerouslySetInnerHTML={{ __html: html }} />
      )
    }
    i++
  }
  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Bonjour, j'ai lu votre article "${post.title}" et j'aimerais en savoir plus sur vos services.`)}`
  const related = BLOG_POSTS.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 2)

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .btn-main {
          display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
          padding:1rem 2rem; border-radius:1rem; font-weight:800; font-size:.875rem;
          color:#fff; text-decoration:none; background:linear-gradient(135deg,#FF6B00,#FF4500);
          box-shadow:0 8px 24px rgba(255,107,0,.3); transition:opacity .15s, transform .15s;
        }
        .btn-main:hover { opacity:.9; transform:translateY(-2px); }
        .related-card {
          padding:1.5rem; border-radius:1.25rem; text-decoration:none;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          display:flex; flex-direction:column; gap:.75rem;
          transition:background .2s, border-color .2s, transform .2s;
        }
        .related-card:hover { background:rgba(255,255,255,.07); border-color:rgba(255,107,0,.2); transform:translateY(-3px); }
      `}</style>

      {/* ── BREADCRUMB ── */}
      <div style={{ maxWidth:'800px', margin:'0 auto', padding:'7rem 1.5rem 0' }}>
        <Link href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', fontSize:'.78rem', fontWeight:600, color:'rgba(255,255,255,.3)', textDecoration:'none' }}>
          <ArrowLeft size={13} /> Retour au blog
        </Link>
      </div>

      {/* ── HERO ARTICLE ── */}
      <section style={{ maxWidth:'800px', margin:'0 auto', padding:'2rem 1.5rem 3rem', position:'relative' }}>
        <div style={{ position:'absolute', top:0, right:0, width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.07) 0%,transparent 70%)', pointerEvents:'none' }} />

        {/* Category + meta */}
        <div style={{ display:'flex', alignItems:'center', gap:'.75rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
          <span style={{ display:'inline-flex', padding:'.3rem .875rem', borderRadius:'9999px', fontSize:'.65rem', fontWeight:800, color:'#FF9A4D', background:'rgba(255,107,0,.12)', border:'1px solid rgba(255,107,0,.25)', letterSpacing:'.06em' }}>
            {post.category}
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.72rem', color:'rgba(255,255,255,.28)' }}>
            <Clock size={11} /> {post.readTime} min de lecture
            <span style={{ margin:'0 .25rem' }}>·</span>
            {new Date(post.date).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}
          </div>
        </div>

        {/* Emoji + title */}
        <div style={{ display:'flex', alignItems:'flex-start', gap:'1.5rem', marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'4rem', animation:'float 3s ease-in-out infinite', flexShrink:0 }}>{post.emoji}</div>
          <h1 style={{ fontSize:'clamp(1.75rem,4vw,2.5rem)', fontWeight:900, color:'white', letterSpacing:'-.03em', lineHeight:1.2, margin:0 }}>
            {post.title}
          </h1>
        </div>

        {/* Excerpt */}
        <p style={{ fontSize:'1rem', color:'rgba(255,255,255,.45)', lineHeight:1.85, borderLeft:'3px solid rgba(255,107,0,.4)', paddingLeft:'1.25rem', fontStyle:'italic' }}>
          {post.excerpt}
        </p>
      </section>

      {/* ── CONTENU ── */}
      <article style={{ maxWidth:'800px', margin:'0 auto', padding:'0 1.5rem 4rem' }}>
        <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:'2.5rem' }}>
          {renderContent(post.content)}
        </div>
      </article>

      {/* ── CTA CONTACT ── */}
      <section style={{ maxWidth:'800px', margin:'0 auto', padding:'0 1.5rem 4rem' }}>
        <div style={{ padding:'2.5rem', borderRadius:'1.75rem', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.08) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:'1rem', animation:'float 3s ease-in-out infinite' }}>💬</div>
            <h2 style={{ fontSize:'1.4rem', fontWeight:900, color:'white', marginBottom:'.625rem', letterSpacing:'-.02em' }}>
              Cet article vous a donné des idées ?
            </h2>
            <p style={{ color:'rgba(255,255,255,.4)', fontSize:'.875rem', marginBottom:'1.75rem', lineHeight:1.7 }}>
              IBIG DIGITAL vous accompagne dans la mise en place de ces stratégies.<br />Premier échange gratuit et sans engagement.
            </p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
              <Link href="/devis" className="btn-main">
                Démarrer un projet <ArrowRight size={16} />
              </Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'1rem 2rem', borderRadius:'1rem', fontWeight:700, fontSize:'.875rem', color:'#fff', textDecoration:'none', background:'#25D366', boxShadow:'0 6px 18px rgba(37,211,102,.2)', transition:'opacity .15s' }}>
                <MessageSquare size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES LIÉS ── */}
      {related.length > 0 && (
        <section style={{ maxWidth:'800px', margin:'0 auto', padding:'0 1.5rem 6rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.5rem' }}>
            <div style={{ height:'3px', width:'2rem', borderRadius:'9999px', background:'linear-gradient(90deg,#FF6B00,#FF9A4D)' }} />
            <h2 style={{ fontWeight:900, fontSize:'.9rem', color:'white', letterSpacing:'.08em', textTransform:'uppercase' }}>Sur le même thème</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1rem' }}>
            {related.map(r => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="related-card">
                <div style={{ fontSize:'2.5rem' }}>{r.emoji}</div>
                <div style={{ fontWeight:800, color:'white', fontSize:'.9rem', lineHeight:1.4 }}>{r.title}</div>
                <div style={{ display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.68rem', color:'rgba(255,255,255,.28)' }}>
                  <Clock size={10} /> {r.readTime} min
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
