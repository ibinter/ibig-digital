import type { Metadata, ReactNode } from 'next'
import { redirect } from 'next/navigation'
import { getClient } from '@/lib/auth'
import EspaceClientNav from '@/components/espace-client/EspaceClientNav'

export const metadata: Metadata = {
  title: 'Espace Client | IBIG DIGITAL',
  description: 'Gérez vos commandes, suivez vos projets et contactez notre équipe depuis votre espace client IBIG DIGITAL.',
}

export default async function EspaceClientLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1E' }}>
      {children}
    </div>
  )
}

/* Layout protégé pour les sous-pages /espace-client/(dashboard|...) */
export async function ProtectedLayout({ children }: { children: ReactNode }) {
  const client = await getClient()
  if (!client) redirect('/espace-client')
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1E', display: 'flex' }}>
      <EspaceClientNav client={client} />
      <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  )
}
