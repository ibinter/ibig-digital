import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react'
import { SITE } from '@/lib/constants'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez IBIG DIGITAL par e-mail, téléphone ou WhatsApp. Notre équipe répond sous 48h.',
}

export default function ContactPage() {
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent('Bonjour IBIG DIGITAL, je souhaite vous contacter.')}`

  return (
    <div className="pt-24">
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-blue-200 text-lg">
            Une question, un projet ou simplement envie d&apos;en savoir plus ? Nous sommes disponibles.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Coordonnées */}
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--dark)' }}>Nos coordonnées</h2>
            <div className="space-y-6">
              <ContactItem icon={<Mail size={22} />} title="E-mail commercial" value={SITE.email} href={`mailto:${SITE.email}`} />
              <ContactItem icon={<Mail size={22} />} title="E-mail institutionnel" value={SITE.emailDigital} href={`mailto:${SITE.emailDigital}`} />
              <ContactItem icon={<Phone size={22} />} title="Téléphone" value={SITE.phone} href={`tel:${SITE.phone}`} />
              <ContactItem icon={<MessageSquare size={22} />} title="WhatsApp" value={SITE.whatsapp} href={waUrl} external />
            </div>

            <div className="mt-10 p-6 rounded-2xl" style={{ background: 'var(--gray-50)' }}>
              <h3 className="font-bold mb-2" style={{ color: 'var(--dark)' }}>IBIG DIGITAL</h3>
              <p className="text-sm text-gray-500">
                Branche digitale d&apos;INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL<br />
                Côte d&apos;Ivoire
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--dark)' }}>Envoyer un message</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactItem({ icon, title, value, href, external = false }: {
  icon: React.ReactNode; title: string; value: string; href: string; external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group"
      style={{ background: 'var(--gray-50)' }}
    >
      <div className="p-3 rounded-xl text-white shrink-0" style={{ background: 'var(--blue)' }}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{title}</div>
        <div className="font-semibold group-hover:text-blue-800 transition-colors" style={{ color: 'var(--dark)' }}>{value}</div>
      </div>
    </a>
  )
}
