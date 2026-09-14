import type { ReactNode } from 'react'

/* Pas de header/footer sur les pages démo — layout vide */
export default function DemoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
