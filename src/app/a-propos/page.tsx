import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'À propos d\'IBIG DIGITAL',
  description: 'Découvrez IBIG DIGITAL, la branche digitale d\'INTERMARK BUSINESS INTERNATIONAL GROUP, et notre mission d\'accompagner la transformation numérique des entreprises.',
}

export default function AboutPage() {
  const waUrl = `https://wa.me/${SITE.whatsappNumber}`

  return (
    <div className="pt-24">
      <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">À propos d&apos;IBIG DIGITAL</h1>
          <p className="text-blue-200 text-lg">
            La branche digitale d&apos;INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Notre mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                IBIG DIGITAL est la branche digitale d&apos;INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL. Nous accompagnons les entreprises, entrepreneurs, commerçants, professionnels, associations et organisations dans la conception et la mise en place de leurs outils numériques.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre approche est simple : comprendre d&apos;abord votre métier et vos enjeux, puis proposer des solutions digitales adaptées à votre réalité, votre budget et vos objectifs de croissance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Nos domaines d&apos;expertise</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Création de sites internet',
                  'Applications web & mobiles',
                  'Solutions e-commerce',
                  'Réseaux sociaux',
                  'Cartes professionnelles digitales',
                  'Identité visuelle & branding',
                  'Community management',
                  'Hébergement & sécurité',
                  'Maintenance & accompagnement',
                  'IA & Automatisation',
                  'Marketing digital',
                  'Cybersécurité',
                ].map((domain) => (
                  <div key={domain} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--orange)' }} />
                    {domain}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark)' }}>Notre vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Être le partenaire digital de référence pour les entreprises en Côte d&apos;Ivoire et en Afrique. Nous croyons que chaque entreprise, quelle que soit sa taille, mérite des outils numériques professionnels qui lui permettent de se développer et de rester compétitive.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Entité */}
            <div className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--dark)' }}>Informations légales</h3>
              <dl className="space-y-3 text-sm">
                {[
                  { label: 'Entreprise', value: 'INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL' },
                  { label: 'Branche', value: 'IBIG DIGITAL' },
                  { label: 'Domaine', value: 'ibig-digital.com' },
                  { label: 'E-mail', value: SITE.email },
                  { label: 'Téléphone', value: SITE.phone },
                  { label: 'WhatsApp', value: SITE.whatsapp },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <dt className="text-gray-400 w-28 shrink-0">{label}</dt>
                    <dd className="font-medium text-gray-700">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* IBIG PARTNERS */}
            <div
              className="p-8 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%)' }}
            >
              <h3 className="font-bold text-lg mb-3">IBIG PARTNERS</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-5">
                IBIG PARTNERS est le programme d&apos;affiliation et de distribution de l&apos;écosystème IBIG. Il permet aux partenaires de distribuer les produits et services IBIG DIGITAL et de bénéficier de commissions sur les ventes générées.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--orange)' }}
              >
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>

            <div className="text-center p-8 rounded-2xl" style={{ background: 'var(--gray-50)' }}>
              <h3 className="font-bold mb-3" style={{ color: 'var(--dark)' }}>Discutons de votre projet</h3>
              <p className="text-gray-500 text-sm mb-5">Premier échange gratuit et sans engagement.</p>
              <div className="flex flex-col gap-3">
                <Link href="/devis" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: 'var(--orange)' }}>
                  Demander un devis <ArrowRight size={15} />
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: '#25D366' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
