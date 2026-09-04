import { SITE } from '@/lib/constants'

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: 'IBIG DIGITAL',
    url: SITE.url,
    logo: `${SITE.url}/logo-full.png`,
    image: `${SITE.url}/logo-full.png`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: '2020',
    legalName: SITE.company,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CI',
      addressLocality: 'Abidjan',
      addressRegion: 'Lagunes',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        contactType: 'customer service',
        availableLanguage: 'French',
      },
      {
        '@type': 'ContactPoint',
        telephone: SITE.whatsapp,
        contactType: 'sales',
        availableLanguage: 'French',
      },
    ],
    sameAs: [
      'https://www.facebook.com/ibigdigital',
      'https://www.linkedin.com/company/ibig-digital',
    ],
    areaServed: ['CI', 'SN', 'ML', 'BF', 'TG', 'BJ', 'CM', 'GN'],
    serviceType: [
      'Création de sites web',
      'Applications mobiles',
      'E-commerce',
      'Marketing digital',
      'Design graphique',
      'Cybersécurité',
      'Intelligence artificielle',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'fr-CI',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    image: `${SITE.url}/logo-full.png`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Abidjan',
      addressLocality: 'Abidjan',
      addressRegion: 'Lagunes',
      addressCountry: 'CI',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.3599517,
      longitude: -4.0082563,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'XOF',
    paymentAccepted: 'Mobile Money, Virement bancaire, Espèces',
    areaServed: 'Afrique de l\'Ouest',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
