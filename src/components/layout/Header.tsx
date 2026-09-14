'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

const MAIN_LINKS = [
  { label: 'Services',     href: '/services' },
  { label: 'Templates',    href: '/templates' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Blog',         href: '/blog' },
  { label: 'À propos',     href: '/a-propos' },
]

const MORE_LINKS = [
  { label: '🛍️ Produits',      href: '/produits' },
  { label: '📦 Packs',         href: '/packs' },
  { label: '👤 Espace Client', href: '/espace-client' },
  { label: '🎁 Kits IBIG',     href: 'https://kits.intermark-business.com/', external: true },
]

export default function Header() {
  const [isOpen, setIsOpen]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [moreOpen, setMoreOpen]   = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const dark = !scrolled

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: '36px',
        background: scrolled ? 'rgba(255,255,255,0.98)' : '#001D3D',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.10)' : '0 1px 0 rgba(255,255,255,0.07)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo-icon.png"
              alt="IBIG DIGITAL"
              width={40}
              height={40}
              priority
              style={{ height: '34px', width: 'auto' }}
            />
            <div>
              <div className="font-black text-[17px] leading-none tracking-tight"
                style={{ color: dark ? '#fff' : 'var(--blue)' }}>
                IBIG <span style={{ color: 'var(--orange)' }}>DIGITAL</span>
              </div>
              <div className="text-[8px] font-semibold tracking-[0.18em] mt-0.5"
                style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,59,122,0.4)' }}>
                SOLUTIONS DIGITALES
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {MAIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap',
                  dark
                    ? 'text-blue-100/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-blue-50'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* ── Plus dropdown ── */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={cn(
                  'flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all',
                  dark
                    ? 'text-blue-100/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-blue-50'
                )}
              >
                Plus
                <ChevronDown size={13} className={cn('transition-transform', moreOpen && 'rotate-180')} />
              </button>

              {moreOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-48 rounded-xl py-1.5 shadow-xl border"
                  style={{
                    background: 'white',
                    borderColor: 'rgba(0,0,0,0.07)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  }}
                >
                  {MORE_LINKS.map((link) => (
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center px-4 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center px-4 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ── CTA zone ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/2250778882592"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:scale-105"
              style={{
                background: dark ? 'rgba(37,211,102,0.12)' : 'rgba(37,211,102,0.08)',
                color: '#25D366',
                border: '1px solid rgba(37,211,102,0.25)',
              }}
            >
              <MessageCircle size={16} />
            </a>

            <Link
              href="/devis"
              className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold text-white rounded-lg transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-px"
              style={{ background: 'var(--orange)' }}
            >
              Devis gratuit
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className={cn('lg:hidden p-2 rounded-lg transition-colors', dark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100')}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl">
          <div className="px-4 py-4 space-y-0.5">
            {[...MAIN_LINKS, ...MORE_LINKS].map((link) => (
              'external' in link && link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-colors text-[14px]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-colors text-[14px]"
                >
                  {link.label}
                </Link>
              )
            ))}

            <div className="pt-3 border-t border-gray-100 space-y-2 mt-2">
              <a
                href="https://wa.me/2250778882592"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl text-[14px]"
                style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366', border: '1px solid rgba(37,211,102,0.25)' }}
              >
                <MessageCircle size={16} /> Écrire sur WhatsApp
              </a>
              <Link
                href="/devis"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center px-4 py-3 text-white font-bold rounded-xl text-[14px]"
                style={{ background: 'var(--orange)' }}
              >
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
