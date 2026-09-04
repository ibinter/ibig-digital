'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-[#003B7A]'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'var(--blue)' }}
            >
              ID
            </div>
            <div>
              <div
                className={cn('font-bold text-lg leading-tight transition-colors',
                  scrolled ? 'text-blue-900' : 'text-white'
                )}
                style={{ color: scrolled ? 'var(--blue)' : undefined }}
              >
                IBIG DIGITAL
              </div>
              <div
                className={cn('text-xs leading-tight hidden sm:block transition-colors',
                  scrolled ? 'text-gray-500' : 'text-blue-100'
                )}
              >
                Solutions Digitales
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  scrolled
                    ? 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                    : 'text-blue-50 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                'px-4 py-2 text-sm rounded-lg border transition-all',
                scrolled
                  ? 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-blue-900'
              )}
              style={{ borderColor: scrolled ? 'var(--blue)' : undefined, color: scrolled ? 'var(--blue)' : undefined }}
            >
              Contact
            </Link>
            <Link
              href="/devis"
              className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: 'var(--orange)' }}
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn('lg:hidden p-2 rounded-lg', scrolled ? 'text-gray-700' : 'text-white')}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Link
                href="/devis"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-center text-white font-semibold rounded-lg"
                style={{ background: 'var(--orange)' }}
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
