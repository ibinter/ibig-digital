import type { Metadata } from 'next'
import { ArrowRight, Zap } from 'lucide-react'
import { getCategories, getProducts } from '@/lib/queries'
import ServicesCatalog from './ServicesCatalog'

export const metadata: Metadata = {
  title: 'Nos Services – Solutions Digitales Premium | IBIG DIGITAL',
  description: "77+ services digitaux : sites web, applications, documents QR, e-commerce, design, marketing, IA. Devis gratuit en 24h.",
}

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ])

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:.35} 50%{opacity:.75} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>

      {/* HERO */}
      <section style={{ position:'relative', paddingTop:'7rem', paddingBottom:'5rem', overflow:'hidden' }}>
        {/* Orbes */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-10%', left:'20%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,91,204,.28) 0%,transparent 70%)', animation:'pulse-glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', bottom:'-10%', right:'20%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,0,.15) 0%,transparent 70%)', animation:'pulse-glow 5s ease-in-out infinite .5s' }} />
          <div style={{ position:'absolute', top:'40%', left:0, width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,.15) 0%,transparent 70%)' }} />
        </div>
        {/* Grille */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />

        <div style={{ position:'relative', maxWidth:'1024px', margin:'0 auto', padding:'0 1rem', textAlign:'center' }}>
          {/* Badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'.5rem 1.25rem', borderRadius:'9999px', marginBottom:'2rem', background:'rgba(255,107,0,0.1)', border:'1px solid rgba(255,107,0,0.25)', backdropFilter:'blur(10px)' }}>
            <Zap size={14} style={{ color:'#FF6B00' }} />
            <span style={{ fontSize:'.75rem', fontWeight:700, color:'#FF9A4D' }}>
              {products.length}+ SERVICES PROFESSIONNELS
            </span>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#FF6B00', display:'inline-block', animation:'pulse-glow 1.5s ease-in-out infinite' }} />
          </div>

          <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900, color:'white', marginBottom:'1.25rem', letterSpacing:'-.03em', lineHeight:1.05 }}>
            Solutions{' '}
            <span style={{ background:'linear-gradient(90deg,#FF6B00,#FF9A4D,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              digitales
            </span>
            <br />
            <span style={{ color:'rgba(255,255,255,.4)', fontSize:'.55em', fontWeight:700 }}>
              qui transforment votre business
            </span>
          </h1>

          {/* Stats */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'3rem', flexWrap:'wrap', marginTop:'2.5rem' }}>
            {[
              { n: `${products.length}+`, l: 'Services' },
              { n: `${categories.length}`, l: 'Catégories' },
              { n: '24h', l: 'Devis gratuit' },
              { n: '100%', l: 'Made in Africa' },
            ].map(({ n, l }) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'2rem', fontWeight:900, background:'linear-gradient(135deg,#FF6B00,#FFD4A0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{n}</div>
                <div style={{ fontSize:'.7rem', fontWeight:600, color:'rgba(255,255,255,.35)', marginTop:'2px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0 }}>
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L1440 50L1440 15C1200 48 900 4 600 25C300 46 100 10 0 30L0 50Z" fill="#06091A"/>
          </svg>
        </div>
      </section>

      {/* CLIENT CATALOG (categories + services + CTA) */}
      <ServicesCatalog categories={categories} products={products} />
    </div>
  )
}
