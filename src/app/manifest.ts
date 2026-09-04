import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IBIG DIGITAL — Solutions Digitales',
    short_name: 'IBIG DIGITAL',
    description: 'Votre Partenaire Digital de Confiance – Côte d\'Ivoire & Afrique. 115+ services digitaux.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06091A',
    theme_color: '#003B7A',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'fr',
    categories: ['business', 'productivity', 'utilities'],
    icons: [
      {
        src: '/logo-icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Demander un devis',
        short_name: 'Devis',
        description: 'Demander un devis gratuit en 24h',
        url: '/devis',
        icons: [{ src: '/logo-icon.png', sizes: '96x96' }],
      },
      {
        name: 'Nos Services',
        short_name: 'Services',
        description: 'Découvrir nos 115+ services digitaux',
        url: '/services',
        icons: [{ src: '/logo-icon.png', sizes: '96x96' }],
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Nous contacter',
        url: '/contact',
        icons: [{ src: '/logo-icon.png', sizes: '96x96' }],
      },
    ],
    screenshots: [
      {
        src: '/logo-full.png',
        sizes: '1060x60',
        type: 'image/png',
      },
    ],
  }
}
