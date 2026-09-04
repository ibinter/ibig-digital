import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | IBIG DIGITAL',
  description: 'Conditions générales de vente des services IBIG DIGITAL — prestations, paiement, livraison, garanties.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#001D3D', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #FF6B00', display: 'inline-block' }}>{title}</h2>
    <div style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </section>
)

export default function CGVPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '6rem' }}>
      <div style={{ background: 'linear-gradient(135deg, #001D3D 0%, #003B7A 100%)', padding: '3rem 1rem', textAlign: 'center' }}>
        <p style={{ color: '#FF9A4D', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DOCUMENTS JURIDIQUES</p>
        <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, margin: 0 }}>Conditions Générales de Vente</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Dernière mise à jour : septembre 2026</p>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '1.5rem', padding: 'clamp(1.5rem,5vw,3rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          <Section title="1. Objet et champ d'application">
            <p>Les présentes Conditions Générales de Vente (CGV) régissent les relations commerciales entre <strong>INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL</strong>, ci-après « IBIG DIGITAL », et tout client (personne physique ou morale) qui passe commande d'une prestation de services digitaux.</p>
            <p style={{ marginTop: '0.75rem' }}>Toute commande implique l'acceptation pleine et entière des présentes CGV. Ces CGV prévalent sur tout autre document du client.</p>
          </Section>

          <Section title="2. Services proposés">
            <p>IBIG DIGITAL propose des services digitaux incluant, sans s'y limiter :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Création et refonte de sites web (vitrine, corporate, e-commerce)</li>
              <li style={{ marginBottom: '0.4rem' }}>Développement d'applications web et mobiles</li>
              <li style={{ marginBottom: '0.4rem' }}>Design graphique et identité visuelle</li>
              <li style={{ marginBottom: '0.4rem' }}>Marketing digital et community management</li>
              <li style={{ marginBottom: '0.4rem' }}>SEO, hébergement, cybersécurité</li>
              <li style={{ marginBottom: '0.4rem' }}>Solutions IA et automatisation</li>
              <li style={{ marginBottom: '0.4rem' }}>Formation aux outils digitaux</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>Le détail des prestations est précisé dans le devis accepté par le client.</p>
          </Section>

          <Section title="3. Commande et devis">
            <p>Toute commande débute par une demande de devis soumise via le formulaire en ligne, par e-mail ou par WhatsApp. IBIG DIGITAL s'engage à répondre sous <strong>24 heures ouvrées</strong>.</p>
            <p style={{ marginTop: '0.75rem' }}>Le devis est valable <strong>30 jours</strong> à compter de sa date d'émission. La commande est ferme à compter de :</p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>La signature ou validation écrite du devis par le client</li>
              <li style={{ marginBottom: '0.4rem' }}>ET le versement de l'acompte prévu</li>
            </ul>
          </Section>

          <Section title="4. Tarifs et modalités de paiement">
            <p>Les tarifs sont exprimés en <strong>Francs CFA (XOF)</strong> et sont indiqués hors taxes (IBIG SARL est soumise au régime fiscal ivoirien en vigueur).</p>
            <p style={{ marginTop: '0.75rem' }}><strong>Modalités de paiement :</strong></p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><strong>Acompte de 50 %</strong> à la validation de la commande</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Solde de 50 %</strong> à la livraison finale, avant mise en ligne</li>
              <li style={{ marginBottom: '0.4rem' }}>Pour les prestations mensuelles (abonnements) : paiement en début de mois</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}><strong>Moyens de paiement acceptés :</strong> Orange Money, MTN MoMo, Wave, Moov Money, virement bancaire, espèces (en agence).</p>
            <p style={{ marginTop: '0.75rem' }}>Tout retard de paiement entraîne la suspension des travaux jusqu'à régularisation.</p>
          </Section>

          <Section title="5. Délais de livraison">
            <p>Les délais indicatifs sont précisés dans le devis. Ils courent à compter de la réception de l'acompte ET de tous les éléments nécessaires fournis par le client (textes, images, accès, etc.).</p>
            <p style={{ marginTop: '0.75rem' }}>IBIG DIGITAL ne saurait être tenu responsable d'un retard causé par :</p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Des retards dans la fourniture des éléments par le client</li>
              <li style={{ marginBottom: '0.4rem' }}>Des modifications en cours de projet dépassant le périmètre initial</li>
              <li style={{ marginBottom: '0.4rem' }}>Des cas de force majeure</li>
            </ul>
          </Section>

          <Section title="6. Obligations du client">
            <p>Le client s'engage à :</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Fournir des informations exactes et complètes lors de la commande</li>
              <li style={{ marginBottom: '0.4rem' }}>Transmettre tous les éléments nécessaires dans les délais convenus</li>
              <li style={{ marginBottom: '0.4rem' }}>Valider les étapes de livraison dans un délai de 7 jours ouvrés</li>
              <li style={{ marginBottom: '0.4rem' }}>S'assurer de disposer des droits sur les contenus qu'il fournit</li>
              <li style={{ marginBottom: '0.4rem' }}>Régler les factures selon les échéances convenues</li>
            </ul>
          </Section>

          <Section title="7. Révisions et modifications">
            <p>Chaque prestation inclut un nombre de révisions précisé dans le devis (généralement 2 à 3 aller-retours). Au-delà, des modifications supplémentaires sont facturées au tarif horaire en vigueur.</p>
            <p style={{ marginTop: '0.75rem' }}>Toute modification substantielle du cahier des charges initial fera l'objet d'un avenant au devis.</p>
          </Section>

          <Section title="8. Propriété intellectuelle et transfert de droits">
            <p>Les créations livrées par IBIG DIGITAL (site web, logo, visuels, contenus) deviennent la propriété du client après <strong>paiement intégral</strong> de la prestation.</p>
            <p style={{ marginTop: '0.75rem' }}>IBIG DIGITAL se réserve le droit de mentionner la réalisation dans son portfolio et ses supports de communication, sauf demande expresse de confidentialité du client.</p>
            <p style={{ marginTop: '0.75rem' }}>Les outils, frameworks et librairies open-source utilisés restent soumis à leurs licences respectives.</p>
          </Section>

          <Section title="9. Garantie et maintenance">
            <p>IBIG DIGITAL garantit la conformité des livrables avec les spécifications du devis. En cas de non-conformité constatée dans les <strong>30 jours suivant la livraison</strong>, IBIG DIGITAL s'engage à corriger gratuitement.</p>
            <p style={{ marginTop: '0.75rem' }}>Cette garantie ne couvre pas :</p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Les modifications effectuées par le client après livraison</li>
              <li style={{ marginBottom: '0.4rem' }}>Les pannes dues à l'hébergeur ou aux services tiers</li>
              <li style={{ marginBottom: '0.4rem' }}>Les mises à jour non commandées</li>
            </ul>
          </Section>

          <Section title="10. Résiliation">
            <p>En cas de résiliation à l'initiative du client après validation du devis, l'acompte versé reste acquis à IBIG DIGITAL au titre des travaux déjà réalisés.</p>
            <p style={{ marginTop: '0.75rem' }}>Si la résiliation est de la faute d'IBIG DIGITAL, le client sera remboursé des sommes versées pour les travaux non exécutés.</p>
          </Section>

          <Section title="11. Confidentialité">
            <p>Les parties s'engagent à la confidentialité des informations échangées dans le cadre du projet. IBIG DIGITAL ne divulgue aucune information client à des tiers sans autorisation préalable.</p>
          </Section>

          <Section title="12. Force majeure">
            <p>IBIG DIGITAL ne saurait être tenu responsable d'un manquement à ses obligations en cas de force majeure (catastrophe naturelle, coupure d'électricité prolongée, cyberattaque massive, pandémie, conflit, etc.).</p>
          </Section>

          <Section title="13. Droit applicable et litiges">
            <p>Les présentes CGV sont soumises au <strong>droit ivoirien</strong>. En cas de litige, les parties s'engagent à rechercher une solution amiable dans un délai de 30 jours avant toute action judiciaire.</p>
            <p style={{ marginTop: '0.75rem' }}>À défaut, le litige sera soumis à la compétence exclusive des tribunaux d'<strong>Abidjan (Côte d'Ivoire)</strong>.</p>
          </Section>

          <Section title="14. Contact">
            <p>Pour toute question relative aux présentes CGV :</p>
            <p style={{ marginTop: '0.5rem' }}>📧 <a href={`mailto:${SITE.email}`} style={{ color: '#FF6B00' }}>{SITE.email}</a></p>
            <p>📞 <a href={`tel:${SITE.phone}`} style={{ color: '#FF6B00' }}>{SITE.phone}</a></p>
            <p>💬 WhatsApp : <a href={`https://wa.me/${SITE.whatsappNumber}`} style={{ color: '#FF6B00' }}>{SITE.whatsapp}</a></p>
          </Section>

          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <Link href="/mentions-legales" style={{ color: '#FF6B00', fontWeight: 600 }}>Mentions légales</Link>
            <Link href="/politique-confidentialite" style={{ color: '#FF6B00', fontWeight: 600 }}>Politique de confidentialité</Link>
            <Link href="/cgu" style={{ color: '#FF6B00', fontWeight: 600 }}>CGU</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
