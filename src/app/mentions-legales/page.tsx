import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = { title: 'Mentions légales' }

export default function MentionsLegalesPage() {
  return (
    <div className="pt-24">
      <section className="py-16" style={{ background: 'var(--gray-50)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--dark)' }}>Mentions légales</h1>
          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Éditeur du site</h2>
              <p><strong>Nom :</strong> {SITE.company}</p>
              <p><strong>Branche :</strong> {SITE.name}</p>
              <p><strong>Site web :</strong> {SITE.url}</p>
              <p><strong>E-mail :</strong> {SITE.email}</p>
              <p><strong>Téléphone :</strong> {SITE.phone}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Hébergement</h2>
              <p>Ce site est hébergé par Vercel, Inc., 340 Pine Street, Suite 500, San Francisco, CA 94104, USA.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Propriété intellectuelle</h2>
              <p>Tous les contenus de ce site (textes, images, logos, graphiques) sont la propriété exclusive de {SITE.company} ou de ses partenaires et sont protégés par les lois en vigueur sur la propriété intellectuelle.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Responsabilité</h2>
              <p>{SITE.name} s&apos;efforce de maintenir les informations de ce site à jour. Toutefois, elle ne saurait être tenue responsable des erreurs ou omissions éventuelles ni des résultats qui pourraient être obtenus par l&apos;usage de ces informations.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
