import type { ReactNode } from 'react'

export const metadata = { title: 'IBIG Admin' }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      overflowY: 'auto',
      background: '#06091A',
    }}>
      {children}
    </div>
  )
}
