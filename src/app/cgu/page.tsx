import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | IBIG DIGITAL",
  description: "Conditions générales d'utilisation du site ibig-digital.com — accès, navigation, responsabilités.",
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#001D3D', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #FF6B00', display: 'inline-block' }}>{title}</h2>
    <div style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </section>
)

export default function CGUPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '6rem' }}>
      <div style={{ background: 'linear-gradient(135deg, #001D3D 0%, #003B7A 100%)', padding: '3rem 1rem', textAlign: 'center' }}>
        <p style={{ color: '#FF9A4D', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DOCUMENTS JURIDIQUES</p>
        <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, margin: 0 }}>{"Conditions Générales d'Utilisation"}</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Dernière mise à jour : septembre 2026</p>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '1.5rem', padding: 'clamp(1.5rem,5vw,3rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          <Section title="1. Présentation du site">
            <p>Le site <strong>ibig-digital.com</strong> est édité par INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL, sous la marque commerciale <strong>IBIG DIGITAL</strong>.</p>
            <p style={{ marginTop: '0.75rem' }}>Ce site présente les services digitaux d'IBIG DIGITAL et permet aux utilisateurs de :</p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Consulter le catalogue de services et produits digitaux</li>
              <li style={{ marginBottom: '0.4rem' }}>Soumettre des demandes de devis en ligne</li>
              <li style={{ marginBottom: '0.4rem' }}>Accéder aux ressources du blog et articles</li>
              <li style={{ marginBottom: '0.4rem' }}>Contacter l'équipe IBIG DIGITAL</li>
            </ul>
          </Section>

          <Section title="2. Acceptation des CGU">
            <p>L'accès et l'utilisation du site ibig-digital.com impliquent l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous devez cesser d'utiliser le site.</p>
            <p style={{ marginTop: '0.75rem' }}>IBIG DIGITAL se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur le site.</p>
          </Section>

          <Section title="3. Accès au site">
            <p>Le site est accessible gratuitement à tout utilisateur disposant d'un accès internet. IBIG DIGITAL ne saurait être tenu responsable des coûts liés à l'accès internet.</p>
            <p style={{ marginTop: '0.75rem' }}>IBIG DIGITAL se réserve le droit de suspendre, restreindre ou interrompre l'accès au site à tout moment, notamment pour maintenance, mise à jour ou raisons techniques, sans préavis ni indemnité.</p>
          </Section>

          <Section title="4. Utilisation du site">
            <p>L'utilisateur s'engage à utiliser le site de manière conforme à sa destination et aux lois et réglementations en vigueur. Il est notamment interdit de :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Utiliser le site à des fins illicites ou contraires à l'ordre public</li>
              <li style={{ marginBottom: '0.4rem' }}>Tenter d'accéder à des parties du site non accessibles au public</li>
              <li style={{ marginBottom: '0.4rem' }}>Introduire des virus ou tout autre programme malveillant</li>
              <li style={{ marginBottom: '0.4rem' }}>Reproduire, copier ou extraire tout contenu sans autorisation</li>
              <li style={{ marginBottom: '0.4rem' }}>Usurper l'identité d'un tiers ou d'IBIG DIGITAL</li>
              <li style={{ marginBottom: '0.4rem' }}>Envoyer des messages non sollicités (spam)</li>
            </ul>
          </Section>

          <Section title="5. Contenu du site">
            <p>Les informations et contenus disponibles sur ibig-digital.com (descriptions de services, tarifs indicatifs, articles de blog) sont fournis à titre informatif et peuvent être modifiés à tout moment sans préavis.</p>
            <p style={{ marginTop: '0.75rem' }}>IBIG DIGITAL s'efforce d'assurer l'exactitude des informations publiées mais ne garantit pas leur complétude ni leur adéquation à des besoins spécifiques.</p>
          </Section>

          <Section title="6. Propriété intellectuelle">
            <p>L'ensemble du contenu du site (textes, images, logos, vidéos, base de données, architecture) est protégé par le droit de la propriété intellectuelle et appartient à IBIG SARL ou à ses partenaires.</p>
            <p style={{ marginTop: '0.75rem' }}>Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite et susceptible de poursuites judiciaires.</p>
          </Section>

          <Section title="7. Liens hypertextes">
            <p><strong>Liens sortants :</strong> Le site peut contenir des liens vers des sites tiers. IBIG DIGITAL n'est pas responsable du contenu de ces sites et ne les cautionne pas nécessairement.</p>
            <p style={{ marginTop: '0.75rem' }}><strong>Liens entrants :</strong> Tout lien vers ibig-digital.com depuis un site tiers doit faire l'objet d'une autorisation préalable d'IBIG DIGITAL. Les liens en deep linking (vers des pages internes) sont interdits sans accord.</p>
          </Section>

          <Section title="8. Données personnelles">
            <p>La collecte et le traitement des données personnelles sont régis par notre <Link href="/politique-confidentialite" style={{ color: '#FF6B00' }}>Politique de confidentialité</Link>, qui fait partie intégrante des présentes CGU.</p>
          </Section>

          <Section title="9. Cookies">
            <p>Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à naviguer sur le site, vous acceptez l'utilisation de cookies conformément à notre <Link href="/politique-confidentialite" style={{ color: '#FF6B00' }}>Politique de confidentialité</Link>.</p>
          </Section>

          <Section title="10. Limitation de responsabilité">
            <p>IBIG DIGITAL ne saurait être tenu responsable :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le site</li>
              <li style={{ marginBottom: '0.4rem' }}>Des pertes de données survenant lors de la navigation</li>
              <li style={{ marginBottom: '0.4rem' }}>Des interruptions de service dues à des causes extérieures</li>
              <li style={{ marginBottom: '0.4rem' }}>Du contenu des sites tiers accessibles via des liens</li>
            </ul>
          </Section>

          <Section title="11. Droit applicable">
            <p>Les présentes CGU sont régies par le <strong>droit ivoirien</strong>. Tout litige relatif à l'utilisation du site sera soumis à la compétence des tribunaux d'Abidjan (Côte d'Ivoire).</p>
          </Section>

          <Section title="12. Contact">
            <p>Pour toute question ou signalement relatif au site :</p>
            <p style={{ marginTop: '0.5rem' }}>📧 <a href={`mailto:${SITE.email}`} style={{ color: '#FF6B00' }}>{SITE.email}</a></p>
            <p>📞 <a href={`tel:${SITE.phone}`} style={{ color: '#FF6B00' }}>{SITE.phone}</a></p>
          </Section>

          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <Link href="/mentions-legales" style={{ color: '#FF6B00', fontWeight: 600 }}>Mentions légales</Link>
            <Link href="/politique-confidentialite" style={{ color: '#FF6B00', fontWeight: 600 }}>Politique de confidentialité</Link>
            <Link href="/cgv" style={{ color: '#FF6B00', fontWeight: 600 }}>CGV</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
