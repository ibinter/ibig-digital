'use client'

import { Phone, Mail } from 'lucide-react'

/* Icônes SVG réseaux sociaux inline */
const IconFacebook = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
)
const IconInstagram = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
)
const IconLinkedin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
)
const IconTwitter = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
)
const IconYoutube = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
)

const TICKER_ITEMS = [
  '🚀 Bienvenue sur le site officiel d\'IBIG DIGITAL',
  '💡 Votre transformation digitale commence ici',
  '📞 +225 27 22 27 60 14',
  '📱 WhatsApp : +225 07 78 88 25 92',
  '✉️ contact@ibig-digital.com',
  '🌍 Sites web · Applications · E-commerce · Branding · IA',
  '🎯 Devis gratuit — Réponse sous 24h',
  '🏆 La branche digitale d\'INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL',
  '📦 Découvrez nos packs clé en main à partir de 75 000 FCFA',
  '🤝 Programme IBIG PARTNERS — Devenez partenaire et gagnez des commissions',
  '⚡ Solutions digitales adaptées aux réalités africaines',
  '🔐 Sites sécurisés · Hébergement professionnel · Support 30 jours inclus',
]

const TICKER_TEXT = TICKER_ITEMS.join('   ✦   ')

const SOCIAL_LINKS = [
  { icon: IconFacebook,  href: 'https://www.facebook.com/ibigdigital',        label: 'Facebook' },
  { icon: IconInstagram, href: 'https://www.instagram.com/ibigdigital',       label: 'Instagram' },
  { icon: IconLinkedin,  href: 'https://www.linkedin.com/company/ibigdigital',label: 'LinkedIn' },
  { icon: IconTwitter,   href: 'https://twitter.com/ibigdigital',             label: 'Twitter/X' },
  { icon: IconYoutube,   href: 'https://www.youtube.com/@ibigdigital',        label: 'YouTube' },
]

export default function TopBar() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      height: '36px',
      background: 'linear-gradient(90deg, #0a0f1e 0%, #0d1535 40%, #0a0f1e 100%)',
      borderBottom: '1px solid rgba(255,107,0,.25)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: ticker 60s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .topbar-social:hover { opacity: 1 !important; }
      `}</style>

      {/* ── GRADIENT LEFT (fade) ── */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(90deg,#0a0f1e,transparent)', zIndex:2, pointerEvents:'none' }} />

      {/* ── TICKER ── */}
      <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
        <div className="ticker-track">
          {/* Repeat twice for seamless loop */}
          {[0, 1].map(n => (
            <span key={n} style={{ paddingRight:'4rem', fontSize:'.68rem', fontWeight:600, color:'rgba(255,255,255,.65)', letterSpacing:'.03em', display:'inline-block' }}>
              {TICKER_TEXT}
              <span style={{ color:'#FF9A4D', marginLeft:'2rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── GRADIENT RIGHT (fade) ── */}
      <div style={{ position:'absolute', right:'200px', top:0, bottom:0, width:'60px', background:'linear-gradient(270deg,#0a0f1e,transparent)', zIndex:2, pointerEvents:'none' }} />

      {/* ── CONTACTS + RÉSEAUX ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        paddingLeft: '1rem',
        paddingRight: '.75rem',
        borderLeft: '1px solid rgba(255,255,255,.08)',
        height: '100%',
        flexShrink: 0,
        background: 'rgba(0,0,0,.2)',
      }}>
        {/* Contacts */}
        <a href="tel:+2252722276014" style={{ display:'flex', alignItems:'center', gap:'.3rem', padding:'0 .625rem', height:'100%', fontSize:'.62rem', fontWeight:700, color:'rgba(255,255,255,.5)', textDecoration:'none', borderRight:'1px solid rgba(255,255,255,.07)', transition:'color .15s', whiteSpace:'nowrap' }}>
          <Phone size={10} style={{ color:'#FF9A4D' }} />
          <span style={{ display:'none' }} className="md:inline">+225 27 22 27 60 14</span>
        </a>
        <a href="mailto:contact@ibig-digital.com" style={{ display:'flex', alignItems:'center', gap:'.3rem', padding:'0 .625rem', height:'100%', fontSize:'.62rem', fontWeight:700, color:'rgba(255,255,255,.5)', textDecoration:'none', borderRight:'1px solid rgba(255,255,255,.07)', transition:'color .15s', whiteSpace:'nowrap' }}>
          <Mail size={10} style={{ color:'#FF9A4D' }} />
          <span>contact@ibig-digital.com</span>
        </a>

        {/* Séparateur */}
        <div style={{ width:'1px', height:'18px', background:'rgba(255,255,255,.08)', margin:'0 .25rem' }} />

        {/* Réseaux sociaux */}
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="topbar-social"
            style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'28px', height:'100%', color:'rgba(255,255,255,.4)', transition:'color .15s', opacity:.8 }}
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  )
}
