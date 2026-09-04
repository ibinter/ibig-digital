import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--gray-50)' }}>
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black mb-4" style={{ color: 'var(--blue)', opacity: 0.15 }}>404</div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Page introuvable</h1>
        <p className="text-gray-500 mb-8">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'var(--blue)' }}>
            Retour à l&apos;accueil <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2" style={{ borderColor: 'var(--blue)', color: 'var(--blue)' }}>
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  )
}
