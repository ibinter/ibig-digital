'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, MessageSquare, User, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import type { ClientRow } from '@/lib/auth'

const NAV = [
  { href: '/espace-client/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { href: '/espace-client/commandes', icon: <ShoppingBag size={18} />, label: 'Mes commandes' },
  { href: '/espace-client/tickets',   icon: <MessageSquare size={18} />, label: 'Support & tickets' },
  { href: '/espace-client/profil',    icon: <User size={18} />,          label: 'Mon profil' },
]

export default function EspaceClientNav({ client }: { client: ClientRow }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const logout = async () => {
    await fetch('/api/espace-client/auth/logout', { method: 'POST' })
    router.push('/espace-client')
    router.refresh()
  }

  const NavContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white' }}>
            IBIG <span style={{ color: '#FF6B00' }}>DIGITAL</span>
          </div>
          <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', fontWeight: 600, marginTop: '2px' }}>ESPACE CLIENT</div>
        </Link>
      </div>

      {/* Profil rapide */}
      <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B00,#FF9A4D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1rem', color: 'white', marginBottom: '.625rem' }}>
          {client.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ fontSize: '.88rem', fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</div>
        <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</div>
      </div>

      {/* Liens */}
      <nav style={{ padding: '.75rem', flex: 1 }}>
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.75rem 1rem', borderRadius: '.875rem', marginBottom: '.25rem', textDecoration: 'none', transition: 'all .15s',
                background: active ? 'rgba(255,107,0,.12)' : 'transparent',
                color: active ? '#FF9A4D' : 'rgba(255,255,255,.5)',
                borderLeft: active ? '2px solid #FF6B00' : '2px solid transparent' }}>
              {item.icon}
              <span style={{ fontSize: '.85rem', fontWeight: active ? 700 : 500 }}>{item.label}</span>
              {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </Link>
          )
        })}
      </nav>

      {/* Déconnexion */}
      <div style={{ padding: '.75rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <button onClick={logout}
          style={{ display: 'flex', alignItems: 'center', gap: '.75rem', width: '100%', padding: '.75rem 1rem', borderRadius: '.875rem', border: 'none', background: 'rgba(239,68,68,.08)', color: 'rgba(239,68,68,.7)', cursor: 'pointer', fontSize: '.85rem', fontWeight: 600, transition: 'all .15s' }}>
          <LogOut size={17} /> Se déconnecter
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Sidebar desktop */}
      <aside style={{ width: '240px', flexShrink: 0, background: 'rgba(255,255,255,.025)', borderRight: '1px solid rgba(255,255,255,.06)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}
        className="ec-sidebar-desktop">
        <NavContent />
      </aside>

      {/* Top bar mobile */}
      <div className="ec-sidebar-mobile" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(11,15,30,.95)', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.875rem 1.25rem', backdropFilter: 'blur(12px)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 900, color: 'white' }}>IBIG <span style={{ color: '#FF6B00' }}>DIGITAL</span></div>
        <button onClick={() => setOpen((v) => !v)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '.25rem' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)' }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '260px', background: '#0B0F1E', borderRight: '1px solid rgba(255,255,255,.08)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <NavContent />
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .ec-sidebar-mobile { display: none !important; } }
        @media (max-width: 767px) { .ec-sidebar-desktop { display: none !important; } }
      `}</style>
    </>
  )
}
