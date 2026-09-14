import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

const SERVICES = [
  { label: 'Sites web & présence digitale',  href: '/services#sites-web' },
  { label: 'Applications web & mobiles',      href: '/services#applications' },
  { label: 'E-commerce',                      href: '/services#ecommerce' },
  { label: 'Design & identité visuelle',      href: '/services#design' },
  { label: 'Marketing digital',               href: '/services#marketing-digital' },
  { label: 'IA & Automatisation',             href: '/services#ia-automatisation' },
  { label: 'Cybersécurité',                   href: '/services#cybersecurite' },
]

const NAV = [
  { label: 'Accueil',        href: '/' },
  { label: 'Services',       href: '/services' },
  { label: 'Templates',      href: '/templates' },
  { label: 'Réalisations',   href: '/realisations' },
  { label: 'À propos',       href: '/a-propos' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Espace Client',  href: '/espace-client' },
]

const PACKS = [
  { label: 'Pack Visibilité',           href: '/packs/pack-visibilite' },
  { label: 'Pack Lancement Entreprise', href: '/packs/pack-lancement-entreprise' },
  { label: 'Pack Commerce en Ligne',    href: '/packs/pack-commerce-en-ligne' },
  { label: 'Pack Mobile Pro',           href: '/packs/pack-mobile-pro' },
  { label: 'Pack Digital 360',          href: '/packs/pack-digital-360' },
]

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ibigdigital',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ibigdigital',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ibig-digital',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: 'X',
    href: 'https://x.com/ibigdigital',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#040E1C' }} className="text-white">

      {/* ── CTA Banner ── */}
      <div style={{ background: 'linear-gradient(135deg, #002a5c 0%, #003B7A 60%, #004fa8 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,107,0,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '10%', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div className="max-w-4xl mx-auto px-4 py-16 text-center" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)', borderRadius: '999px', padding: '6px 16px', fontSize: '12px', fontWeight: 700, color: '#FF9A4D', marginBottom: '1.5rem', letterSpacing: '0.08em' }}>
            ⚡ LANCEMENT RAPIDE — DEVIS EN 24H
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1rem' }}>
            Prêt à lancer votre projet digital ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Décrivez-nous votre besoin — nous vous proposons une solution adaptée et un devis personnalisé sous 48h.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link
              href="/devis"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'var(--orange)', color: 'white', fontWeight: 700, borderRadius: '12px', fontSize: '15px', textDecoration: 'none', transition: 'opacity .2s' }}
            >
              Demander un devis <ArrowRight size={17} />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Bonjour IBIG DIGITAL, je souhaite discuter de mon projet.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'rgba(255,255,255,0.08)', color: 'white', fontWeight: 700, borderRadius: '12px', fontSize: '15px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', transition: 'background .2s' }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Orange accent line ── */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, var(--orange), transparent)' }} />

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <Image
                src="/logo-full.png"
                alt="IBIG DIGITAL"
                width={160}
                height={48}
                style={{ height: '44px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              La branche digitale d&apos;INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL. Transformation numérique en Côte d&apos;Ivoire &amp; en Afrique.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
              {SOCIAL.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', transition: 'all .2s', textDecoration: 'none' }}
                >
                  {svg}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={`mailto:${SITE.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                <Mail size={13} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                <Phone size={13} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                {SITE.phone}
              </a>
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                <MapPin size={13} style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '2px' }} />
                Abidjan, Côte d&apos;Ivoire
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color .15s' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://kits.intermark-business.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13.5px', color: '#FF9A4D', textDecoration: 'none', fontWeight: 600 }}>
                  📦 Kits IBIG
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>Nos services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color .15s' }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offres */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>Nos offres</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
              {PACKS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color .15s' }}>
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/packs" style={{ fontSize: '13.5px', color: 'var(--orange)', fontWeight: 700, textDecoration: 'none' }}>
                  Voir tous les packs →
                </Link>
              </li>
            </ul>

            {/* Mini CTA */}
            <Link
              href="/devis"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 20px', background: 'var(--orange)', color: 'white', fontWeight: 700, borderRadius: '10px', fontSize: '13px', textDecoration: 'none' }}
            >
              Devis gratuit <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              © {year} IBIG DIGITAL – IBIG SARL. Tous droits réservés.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
              🌍 Made in Africa
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { label: 'Mentions légales', href: '/mentions-legales' },
              { label: 'Confidentialité',  href: '/politique-confidentialite' },
              { label: 'CGV',              href: '/cgv' },
              { label: 'CGU',              href: '/cgu' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color .15s' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
