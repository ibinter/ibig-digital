import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = { title: 'Politique de confidentialité' }

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-24">
      <section className="py-16" style={{ background: 'var(--gray-50)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--dark)' }}>Politique de confidentialité</h1>
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Collecte de données</h2>
              <p>{SITE.name} collecte les données personnelles que vous fournissez volontairement via nos formulaires de contact et de devis (nom, e-mail, téléphone, description du projet).</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Utilisation des données</h2>
              <p>Ces données sont utilisées exclusivement pour traiter vos demandes, vous contacter et vous proposer nos services. Elles ne sont jamais vendues ni transmises à des tiers non autorisés.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Vos droits</h2>
              <p>Conformément à la législation applicable, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à {SITE.email}.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--dark)' }}>Conservation</h2>
              <p>Vos données sont conservées pendant la durée nécessaire au traitement de votre demande et pour une période maximale de 3 ans après le dernier contact.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
