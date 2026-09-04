import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mentions légales | IBIG DIGITAL',
  description: 'Mentions légales du site ibig-digital.com — éditeur, hébergement, propriété intellectuelle, responsabilité.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#001D3D', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #FF6B00', display: 'inline-block' }}>{title}</h2>
    <div style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </section>
)

export default function MentionsLegalesPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '6rem' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #001D3D 0%, #003B7A 100%)', padding: '3rem 1rem', textAlign: 'center' }}>
        <p style={{ color: '#FF9A4D', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DOCUMENTS JURIDIQUES</p>
        <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, margin: 0 }}>Mentions légales</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Dernière mise à jour : septembre 2026</p>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '1.5rem', padding: 'clamp(1.5rem,5vw,3rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          <Section title="1. Éditeur du site">
            <p><strong>Raison sociale :</strong> INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL</p>
            <p><strong>Branche digitale :</strong> IBIG DIGITAL</p>
            <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</p>
            <p><strong>Année de création :</strong> 2023</p>
            <p><strong>Siège social :</strong> Abidjan, Côte d'Ivoire</p>
            <p><strong>Site web :</strong> <a href={SITE.url} style={{ color: '#FF6B00' }}>{SITE.url}</a></p>
            <p><strong>E-mail :</strong> <a href={`mailto:${SITE.email}`} style={{ color: '#FF6B00' }}>{SITE.email}</a></p>
            <p><strong>Téléphone :</strong> <a href={`tel:${SITE.phone}`} style={{ color: '#FF6B00' }}>{SITE.phone}</a></p>
            <p><strong>WhatsApp :</strong> <a href={`https://wa.me/${SITE.whatsappNumber}`} style={{ color: '#FF6B00' }}>{SITE.whatsapp}</a></p>
          </Section>

          <Section title="2. Directeur de la publication">
            <p>Le directeur de la publication est le représentant légal d'INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL.</p>
            <p>Pour toute question relative au contenu du site : <a href={`mailto:${SITE.email}`} style={{ color: '#FF6B00' }}>{SITE.email}</a></p>
          </Section>

          <Section title="3. Hébergement">
            <p><strong>Hébergeur :</strong> Vercel, Inc.</p>
            <p><strong>Adresse :</strong> 340 Pine Street, Suite 500, San Francisco, CA 94104, États-Unis</p>
            <p><strong>Site :</strong> <a href="https://vercel.com" style={{ color: '#FF6B00' }} target="_blank" rel="noopener noreferrer">vercel.com</a></p>
            <p>Le service d'hébergement est fourni par Vercel, plateforme cloud soumise à la législation américaine et aux standards internationaux de sécurité des données.</p>
          </Section>

          <Section title="4. Propriété intellectuelle">
            <p>L'ensemble des éléments constituant le site <strong>ibig-digital.com</strong> (textes, photographies, illustrations, logos, icônes, sons, logiciels, base de données, etc.) est la propriété exclusive d'IBIG SARL ou de ses partenaires.</p>
            <p style={{ marginTop: '0.75rem' }}>Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable d'IBIG SARL.</p>
            <p style={{ marginTop: '0.75rem' }}>Le logo, la charte graphique et la dénomination « IBIG DIGITAL » sont des éléments protégés. Toute utilisation non autorisée expose son auteur à des poursuites judiciaires.</p>
          </Section>

          <Section title="5. Responsabilité">
            <p>IBIG DIGITAL s'efforce de maintenir les informations de ce site exactes et à jour. Cependant, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations diffusées.</p>
            <p style={{ marginTop: '0.75rem' }}>IBIG DIGITAL décline toute responsabilité pour les dommages directs ou indirects résultant de l'utilisation du site, d'erreurs ou d'omissions dans les informations fournies, ou d'une interruption de service.</p>
            <p style={{ marginTop: '0.75rem' }}>Les liens hypertextes présents sur le site pointant vers d'autres ressources internet n'engagent pas la responsabilité d'IBIG DIGITAL quant au contenu de ces sites.</p>
          </Section>

          <Section title="6. Cookies">
            <p>Le site ibig-digital.com peut utiliser des cookies à des fins d'analyse d'audience et d'amélioration de l'expérience utilisateur (Google Analytics, cookies de session).</p>
            <p style={{ marginTop: '0.75rem' }}>Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur. Cela peut affecter certaines fonctionnalités du site.</p>
            <p style={{ marginTop: '0.75rem' }}>Pour plus d'informations, consultez notre <Link href="/politique-confidentialite" style={{ color: '#FF6B00' }}>Politique de confidentialité</Link>.</p>
          </Section>

          <Section title="7. Droit applicable">
            <p>Le présent site et les présentes mentions légales sont soumis au droit ivoirien. En cas de litige, les tribunaux compétents d'Abidjan (Côte d'Ivoire) seront seuls compétents.</p>
          </Section>

          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <Link href="/politique-confidentialite" style={{ color: '#FF6B00', fontWeight: 600 }}>Politique de confidentialité</Link>
            <Link href="/cgv" style={{ color: '#FF6B00', fontWeight: 600 }}>Conditions Générales de Vente</Link>
            <Link href="/cgu" style={{ color: '#FF6B00', fontWeight: 600 }}>Conditions Générales d'Utilisation</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
