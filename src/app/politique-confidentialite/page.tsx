import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | IBIG DIGITAL',
  description: 'Politique de confidentialité et protection des données personnelles — IBIG DIGITAL.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#001D3D', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #FF6B00', display: 'inline-block' }}>{title}</h2>
    <div style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </section>
)

export default function PolitiqueConfidentialitePage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '6rem' }}>
      <div style={{ background: 'linear-gradient(135deg, #001D3D 0%, #003B7A 100%)', padding: '3rem 1rem', textAlign: 'center' }}>
        <p style={{ color: '#FF9A4D', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DOCUMENTS JURIDIQUES</p>
        <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, margin: 0 }}>Politique de confidentialité</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Dernière mise à jour : septembre 2026</p>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '1.5rem', padding: 'clamp(1.5rem,5vw,3rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          <Section title="1. Responsable du traitement">
            <p><strong>Entité :</strong> INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL (IBIG DIGITAL)</p>
            <p><strong>Adresse :</strong> Abidjan, Côte d'Ivoire</p>
            <p><strong>Contact :</strong> <a href={`mailto:${SITE.email}`} style={{ color: '#FF6B00' }}>{SITE.email}</a></p>
          </Section>

          <Section title="2. Données collectées">
            <p>Dans le cadre de notre activité, nous collectons les catégories de données suivantes :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><strong>Données d'identification :</strong> nom, prénom, nom de l'entreprise</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Coordonnées :</strong> adresse e-mail, numéro de téléphone, WhatsApp</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Données de projet :</strong> type de projet, budget, délais, description du besoin</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Données de navigation :</strong> adresse IP, cookies de session, données d'analytics anonymisées</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Données de communication :</strong> messages échangés via le formulaire de contact ou WhatsApp</li>
            </ul>
          </Section>

          <Section title="3. Finalités du traitement">
            <p>Vos données sont collectées et traitées pour les finalités suivantes :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Traitement de vos demandes de devis et de contact</li>
              <li style={{ marginBottom: '0.4rem' }}>Gestion de la relation client et suivi de projet</li>
              <li style={{ marginBottom: '0.4rem' }}>Envoi de communications commerciales (avec votre consentement)</li>
              <li style={{ marginBottom: '0.4rem' }}>Amélioration de nos services et du site web</li>
              <li style={{ marginBottom: '0.4rem' }}>Statistiques d'audience anonymes</li>
              <li style={{ marginBottom: '0.4rem' }}>Respect de nos obligations légales et contractuelles</li>
            </ul>
          </Section>

          <Section title="4. Base légale du traitement">
            <p>Selon les cas, le traitement de vos données repose sur :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><strong>L'exécution d'un contrat</strong> : traitement de votre devis ou projet</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Votre consentement</strong> : newsletter, communications marketing</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>L'intérêt légitime</strong> : amélioration de nos services, sécurité</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>L'obligation légale</strong> : conservation des données comptables</li>
            </ul>
          </Section>

          <Section title="5. Destinataires des données">
            <p>Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Les membres de l'équipe IBIG DIGITAL dans le cadre de la gestion de votre projet</li>
              <li style={{ marginBottom: '0.4rem' }}>Nos prestataires techniques (hébergement Vercel, outils de gestion de projet) soumis à des obligations de confidentialité</li>
              <li style={{ marginBottom: '0.4rem' }}>Les autorités compétentes en cas d'obligation légale</li>
            </ul>
          </Section>

          <Section title="6. Durée de conservation">
            <ul style={{ paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><strong>Prospects (sans suite) :</strong> 1 an à compter du dernier contact</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Clients actifs :</strong> durée de la relation commerciale + 3 ans</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Données comptables :</strong> 10 ans (obligation légale)</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Cookies analytics :</strong> 13 mois maximum</li>
            </ul>
          </Section>

          <Section title="7. Vos droits">
            <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Droit d'opposition :</strong> vous opposer à certains traitements</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Droit au retrait du consentement :</strong> à tout moment pour les traitements basés sur le consentement</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>Pour exercer vos droits : <a href={`mailto:${SITE.email}`} style={{ color: '#FF6B00' }}>{SITE.email}</a> — Nous répondons sous 30 jours.</p>
          </Section>

          <Section title="8. Cookies">
            <p>Nous utilisons les types de cookies suivants :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><strong>Cookies essentiels :</strong> fonctionnement du site (session, sécurité)</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Cookies analytics :</strong> mesure d'audience anonyme (Google Analytics)</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Cookies de préférence :</strong> sauvegarde de vos préférences de navigation</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>Vous pouvez gérer vos préférences cookies depuis les paramètres de votre navigateur.</p>
          </Section>

          <Section title="9. Sécurité">
            <p>IBIG DIGITAL met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : connexion HTTPS/SSL, accès restreint aux données, hébergement sécurisé chez Vercel.</p>
          </Section>

          <Section title="10. Contact">
            <p>Pour toute question relative à cette politique ou à vos données personnelles :</p>
            <p style={{ marginTop: '0.5rem' }}>📧 <a href={`mailto:${SITE.email}`} style={{ color: '#FF6B00' }}>{SITE.email}</a></p>
            <p>📞 <a href={`tel:${SITE.phone}`} style={{ color: '#FF6B00' }}>{SITE.phone}</a></p>
          </Section>

          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <Link href="/mentions-legales" style={{ color: '#FF6B00', fontWeight: 600 }}>Mentions légales</Link>
            <Link href="/cgv" style={{ color: '#FF6B00', fontWeight: 600 }}>CGV</Link>
            <Link href="/cgu" style={{ color: '#FF6B00', fontWeight: 600 }}>CGU</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
