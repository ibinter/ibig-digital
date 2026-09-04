import type { Metadata } from 'next'
import { getFAQs } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'FAQ – Questions fréquentes',
  description: 'Toutes les réponses à vos questions sur les prestations, délais, hébergement et maintenance IBIG DIGITAL.',
}

export const revalidate = 3600

export default async function FAQPage() {
  const faqs = await getFAQs().catch(() => [])

  return (
    <div className="pt-24">
      <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Questions fréquentes</h1>
          <p className="text-blue-200 text-lg">Tout ce que vous devez savoir sur nos services et notre façon de travailler.</p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {faqs.length === 0 ? (
          <p className="text-center text-gray-500 py-12">La FAQ sera disponible prochainement.</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm open:shadow-md transition-all">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-800 list-none">
                  {faq.question}
                  <span className="ml-4 text-xl text-gray-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-gray-600 leading-relaxed text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
