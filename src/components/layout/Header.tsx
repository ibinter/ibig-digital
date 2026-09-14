'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo-icon.png"
              alt="IBIG DIGITAL"
              width={40}
              height={40}
              priority
              style={{ height: '36px', width: 'auto' }}
            />
            <div>
              <div className="font-black text-[18px] leading-none tracking-tight"
                style={{ color: dark ? '#fff' : 'var(--blue)' }}>
                IBIG <span style={{ color: 'var(--orange)' }}>DIGITAL</span>
              </div>
              <div className="text-[8px] font-semibold tracking-[0.18em] mt-0.5"
                style={{ color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,59,122,0.45)' }}>
                SOLUTIONS DIGITALES
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-[13px] font-medium transition-all whitespace-nowrap',
                  dark
                    ? 'text-blue-100 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-blue-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA zone ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">

            {/* WhatsApp rapide */}
            <a
              href="https://wa.me/2250778882592"
              target="_blank"
              rel="noopener noreferrer"
              title="Nous écrire sur WhatsApp"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-semibold transition-all hover:scale-105"
              style={{
                background: dark ? 'rgba(37,211,102,0.15)' : 'rgba(37,211,102,0.1)',
                color: '#25D366',
                border: '1px solid rgba(37,211,102,0.3)',
              }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>

            {/* Kits */}
            <a
              href="https://kits.intermark-business.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-semibold transition-all"
              style={{
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,59,122,0.06)',
                color: dark ? '#fff' : 'var(--blue)',
                border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,59,122,0.15)',
              }}
            >
              <span style={{ fontSize: '13px' }}>📦</span>
              Kits
            </a>

            {/* Devis CTA */}
            <Link
              href="/devis"
              className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold text-white rounded-md transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-px"
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
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl font-medium transition-colors text-[14px]"
              >
                {link.label}
              </Link>
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
              <a
                href="https://kits.intermark-business.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl border text-[14px]"
                style={{ color: 'var(--blue)', borderColor: 'rgba(0,59,122,0.2)', background: 'rgba(0,59,122,0.04)' }}
              >
                📦 Kits IBIG
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
