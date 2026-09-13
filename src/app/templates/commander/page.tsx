import type { Metadata } from 'next'
import Configurateur from '@/components/configurateur/Configurateur'

export const metadata: Metadata = {
  title: 'Configurer ma commande | IBIG DIGITAL Templates',
  description: 'Configurez votre site web professionnel étape par étape : choisissez votre template, votre formule, votre domaine, votre hébergement et vos modules. Devis instantané.',
}

export default function CommanderPage() {
  return <Configurateur />
}
