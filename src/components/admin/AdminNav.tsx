'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, MessageSquare, Users, LogOut, Menu, X, ChevronRight } from 'lucide-react'

const LINKS = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/commandes',  label: 'Commandes',       icon: ShoppingBag },
  { href: '/admin/tickets',    label: 'Tickets',          icon: MessageSquare },
  { href: '/admin/clients',    label: 'Clients',          icon: Users },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const NavContent = () => (
    <>
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: '.75rem' }}>
        <div style={{ fontSize: '1rem', fontWeight: 900, color: 'white' }}>IBIG <span style={{ color: '#FF6B00' }}>ADMIN</span></div>
        <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.3)', marginTop: '.15rem' }}>Panneau d'administration</div>
      </div>
      <nav style={{ flex: 1, padding: '0 .75rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .875rem', borderRadius: '.875rem', textDecoration: 'none', color: active ? '#FF9A4D' : 'rgba(255,255,255,.5)', background: active ? 'rgba(255,107,0,.1)' : 'transparent', borderLeft: active ? '3px solid #FF6B00' : '3px solid transparent', fontWeight: active ? 700 : 500, fontSize: '.85rem', transition: 'all .15s' }}>
              <Icon size={16} /> {label}
              {active && <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: .5 }} />}
            </Link>
          )
        })}
      </nav>
      <div style={{ padding: '.75rem' }}>
        <button onClick={logout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .875rem', borderRadius: '.875rem', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.15)', color: '#FCA5A5', cursor: 'pointer', fontSize: '.82rem', fontWeight: 600 }}>
          <LogOut size={15} /> Déconnexion
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{ width: '220px', flexShrink: 0, background: '#0B0F1E', borderRight: '1px solid rgba(255,255,255,.06)', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'sticky', top: 0 }} className="admin-sidebar">
        <style>{`.admin-sidebar{display:flex}@media(max-width:767px){.admin-sidebar{display:none}}`}</style>
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#0B0F1E', borderBottom: '1px solid rgba(255,255,255,.06)', padding: '.875rem 1.25rem', alignItems: 'center', justifyContent: 'space-between' }} className="admin-topbar">
        <style>{`.admin-topbar{display:none}@media(max-width:767px){.admin-topbar{display:flex}}`}</style>
        <span style={{ fontWeight: 900, color: 'white', fontSize: '.95rem' }}>IBIG <span style={{ color: '#FF6B00' }}>ADMIN</span></span>
        <button onClick={() => setOpen((p) => !p)} style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: '.5rem', padding: '.45rem', cursor: 'pointer', color: 'white', display: 'flex' }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)' }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '240px', background: '#0B0F1E', borderRight: '1px solid rgba(255,255,255,.08)', display: 'flex', flexDirection: 'column', paddingTop: '4rem' }}>
            <NavContent />
          </div>
        </div>
      )}
    </>
  )
}
