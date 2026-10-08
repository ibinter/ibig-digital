import { SITE } from '@/lib/constants'

/* ─── ORGANISATION ──────────────────────────────────────────────────────────── */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: ['IBIG', 'IBIG SARL', 'INTERMARK BUSINESS INTERNATIONAL GROUP'],
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/logo-full.png`,
      width: 1060,
      height: 60,
    },
    image: `${SITE.url}/icon-512x512.png`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: '2020',
    legalName: SITE.company,
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Abidjan',
      addressLocality: 'Abidjan',
      addressRegion: 'Lagunes',
      postalCode: '00225',
      addressCountry: 'CI',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.3599517,
      longitude: -4.0082563,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' },
    ],
    priceRange: '$$',
    currenciesAccepted: 'XOF, EUR',
    paymentAccepted: 'Mobile Money, Orange Money, MTN Money, Wave, Virement bancaire, Carte bancaire',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'customer service', areaServed: 'CI', availableLanguage: 'French' },
      { '@type': 'ContactPoint', telephone: SITE.whatsapp, contactType: 'sales', areaServed: ['CI','SN','ML','BF','TG','BJ','CM','GN'], availableLanguage: 'French' },
      { '@type': 'ContactPoint', email: SITE.email, contactType: 'technical support', availableLanguage: 'French' },
    ],
    areaServed: [
      { '@type': 'Country', name: "Côte d'Ivoire" },
      { '@type': 'Country', name: 'Sénégal' },
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'Burkina Faso' },
      { '@type': 'Country', name: 'Togo' },
      { '@type': 'Country', name: 'Bénin' },
      { '@type': 'Country', name: 'Cameroun' },
      { '@type': 'Country', name: 'Guinée' },
      { '@type': 'Country', name: 'France' },
    ],
    sameAs: [
      'https://www.facebook.com/ibigdigital',
      'https://www.linkedin.com/company/ibig-digital',
      'https://www.instagram.com/ibig.digital',
      'https://twitter.com/ibigdigital',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Digitaux IBIG DIGITAL',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Création de site web professionnel' }, price: '19900', priceCurrency: 'XOF' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Boutique e-commerce' }, price: '120000', priceCurrency: 'XOF' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Application mobile' }, price: '299000', priceCurrency: 'XOF' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logo & identité visuelle' }, price: '25000', priceCurrency: 'XOF' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marketing digital & SEO' }, price: '35000', priceCurrency: 'XOF' },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '40',
      bestRating: '5',
      worstRating: '1',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── WEBSITE ───────────────────────────────────────────────────────────────── */
export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'fr-CI',
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/services?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── LOCAL BUSINESS (homepage) ─────────────────────────────────────────────── */
export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'WebDesign'],
    '@id': `${SITE.url}/#localbusiness`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/icon-512x512.png`,
    logo: `${SITE.url}/logo-full.png`,
    priceRange: '$$',
    currenciesAccepted: 'XOF',
    paymentAccepted: 'Mobile Money, Wave, Orange Money, MTN Money, Virement',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cocody, Abidjan',
      addressLocality: 'Abidjan',
      addressRegion: 'Lagunes',
      addressCountry: 'CI',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 5.3599517, longitude: -4.0082563 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' },
    ],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '40', bestRating: '5' },
    areaServed: "Côte d'Ivoire, Afrique de l'Ouest",
    slogan: 'Votre transformation digitale commence ici',
    foundingDate: '2020',
    knowsAbout: ['Création de sites web','E-commerce','Applications mobiles','Marketing digital','SEO','Intelligence artificielle','Design graphique','Community management'],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── SERVICES (page /services) ─────────────────────────────────────────────── */
export function ServicesJsonLd() {
  const services = [
    { name: 'Création de site web professionnel', desc: 'Sites vitrine, corporate, landing page et portails web modernes, rapides et optimisés SEO.', price: '45000', url: '/services' },
    { name: 'Boutique e-commerce clé en main', desc: 'Boutiques en ligne avec paiement Mobile Money et carte bancaire.', price: '120000', url: '/services' },
    { name: 'Application mobile iOS & Android', desc: 'Applications natives ou hybrides pour iOS et Android.', price: '299000', url: '/services' },
    { name: 'Design & identité visuelle', desc: 'Logo, charte graphique et supports qui font rayonner votre marque.', price: '25000', url: '/services' },
    { name: 'Marketing digital & publicité', desc: 'Google Ads, Meta Ads et stratégies pour générer des leads qualifiés.', price: '65000', url: '/services' },
    { name: 'SEO & référencement naturel', desc: 'Positionnement Google durable pour attirer des clients en continu.', price: '35000', url: '/services' },
    { name: 'Community management', desc: 'Gestion professionnelle de vos réseaux sociaux et création de contenu.', price: '50000', url: '/services' },
    { name: 'Intelligence artificielle & automatisation', desc: 'Chatbots IA, automatisation et intégrations API pour gagner du temps.', price: '90000', url: '/services' },
  ]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services digitaux IBIG DIGITAL',
    description: 'Catalogue complet des services digitaux proposés par IBIG DIGITAL en Côte d\'Ivoire et en Afrique.',
    url: `${SITE.url}/services`,
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.desc,
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: "Afrique de l'Ouest",
        offers: {
          '@type': 'Offer',
          price: s.price,
          priceCurrency: 'XOF',
          availability: 'https://schema.org/InStock',
          url: `${SITE.url}${s.url}`,
        },
      },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── FAQ (page /faq) ───────────────────────────────────────────────────────── */
export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs?.length) return null
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── BREADCRUMB ────────────────────────────────────────────────────────────── */
export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${SITE.url}${item.href}`,
      })),
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── TEMPLATES (page /templates) ───────────────────────────────────────────── */
export function TemplatesJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Templates de sites web professionnels — IBIG DIGITAL',
    description: '100+ templates de sites web prêts à l\'emploi pour tous les secteurs d\'activité. Dès 19 900 FCFA.',
    url: `${SITE.url}/templates`,
    numberOfItems: 100,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Templates Restaurant & Food', item: `${SITE.url}/templates/restaurant` },
      { '@type': 'ListItem', position: 2, name: 'Templates Immobilier', item: `${SITE.url}/templates/immobilier` },
      { '@type': 'ListItem', position: 3, name: 'Templates Santé & Clinique', item: `${SITE.url}/templates/sante` },
      { '@type': 'ListItem', position: 4, name: 'Templates Formation & École', item: `${SITE.url}/templates/formation` },
      { '@type': 'ListItem', position: 5, name: 'Templates E-commerce', item: `${SITE.url}/templates/ecommerce` },
      { '@type': 'ListItem', position: 6, name: 'Templates BTP & Construction', item: `${SITE.url}/templates/btp` },
      { '@type': 'ListItem', position: 7, name: 'Templates Cabinet & Conseil', item: `${SITE.url}/templates/cabinet` },
      { '@type': 'ListItem', position: 8, name: 'Templates Hôtel & Tourisme', item: `${SITE.url}/templates/hotel` },
      { '@type': 'ListItem', position: 9, name: 'Templates Beauté & Spa', item: `${SITE.url}/templates/beaute` },
      { '@type': 'ListItem', position: 10, name: 'Templates Auto & Transport', item: `${SITE.url}/templates/auto` },
      { '@type': 'ListItem', position: 11, name: 'Templates Agriculture', item: `${SITE.url}/templates/agriculture` },
      { '@type': 'ListItem', position: 12, name: 'Templates Corporate & Finance', item: `${SITE.url}/templates/corporate` },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ─── ARTICLE (blog posts) ───────────────────────────────────────────────────── */
export function ArticleJsonLd({ title, description, datePublished, dateModified, image, slug }: {
  title: string; description: string; datePublished: string; dateModified?: string; image?: string; slug: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${SITE.url}/logo-full.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `${SITE.url}/blog/${slug}`,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-full.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${slug}` },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
