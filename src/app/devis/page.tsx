import type { Metadata } from 'next'
import QuoteForm from '@/components/forms/QuoteForm'

export const metadata: Metadata = {
  title: 'Demander un devis',
  description: 'Décrivez votre projet digital et recevez une proposition personnalisée d\'IBIG DIGITAL sous 48h. Premier échange gratuit et sans engagement.',
  alternates: { canonical: 'https://ibig-digital.com/devis' },
}

export default function DevisPage() {
  return (
    <div className="pt-24">
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Demandez votre devis</h1>
          <p className="text-blue-200 text-lg">
            Remplissez ce formulaire et notre équipe vous contacte sous 48h avec une proposition adaptée à votre budget et vos objectifs.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-8 md:p-12">
          <QuoteForm />
        </div>
      </section>
    </div>
  )
}
