import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle, Star, Zap } from 'lucide-react'

/* ─── DONNÉES PAR SECTEUR ──────────────────────────────────────────────────── */
const SECTORS: Record<string, {
  id: string
  icon: string
  label: string
  tagline: string
  description: string
  color: string
  basePrice: number
  features: string[]
  pages: string[]
  recommendedModules: string[]
  mockSections: string[]
  seoTitle: string
  seoDesc: string
}> = {
  restaurant: {
    id: 'restaurant',
    icon: '🍽️',
    label: 'Restaurant & Food',
    tagline: 'Un site web qui donne faim',
    description: 'Template conçu pour les restaurants, snacks, traiteurs et services de livraison. Présentez votre carte, vos spécialités et recevez des réservations en ligne.',
    color: '#F97316',
    basePrice: 49900,
    features: [
      'Affichage de la carte avec catégories et prix',
      'Galerie photo de plats appétissante',
      'Formulaire de réservation de table',
      'Section "À propos" et histoire du chef',
      'Intégration Google Maps & horaires',
      'Bouton commande WhatsApp / livraison',
      'Design warm & appétissant',
      'Responsive mobile (70% des commandes)',
    ],
    pages: ['Accueil', 'Notre carte', 'Galerie', 'Réservation', 'Contact'],
    recommendedModules: ['Réservation en ligne', 'Système de devis en ligne', 'Chat & WhatsApp', 'Avis clients', 'Newsletter'],
    mockSections: ['🏠 Accueil & Ambiance', '🍴 Notre Carte', '📸 Galerie', '📅 Réservation', '📍 Nous Trouver'],
    seoTitle: 'Template Restaurant & Food | Site Web Professionnel',
    seoDesc: 'Créez votre site web de restaurant professionnel avec notre template spécialisé. Carte en ligne, réservations, galerie photo. Dès 49 900 FCFA.',
  },
  immobilier: {
    id: 'immobilier',
    icon: '🏠',
    label: 'Immobilier',
    tagline: 'Vendez et louez plus vite en ligne',
    description: 'Template professionnel pour les agences immobilières, promoteurs et agents independants. Publiez vos annonces, qualifiez vos prospects et boostez vos ventes.',
    color: '#3B82F6',
    basePrice: 79900,
    features: [
      'Catalogue de biens avec photos et prix',
      'Filtres de recherche (type, zone, budget)',
      'Fiches détaillées par bien immobilier',
      'Formulaire de contact par bien',
      'Section équipe et expertise',
      'Témoignages clients',
      'Intégration Google Maps par propriété',
      'Estimation en ligne',
    ],
    pages: ['Accueil', 'Nos biens', 'Vendre / Louer', 'Notre équipe', 'Contact'],
    recommendedModules: ['Catalogue produits', 'Système de devis en ligne', 'Chat & WhatsApp', 'CRM intégré', 'Newsletter'],
    mockSections: ['🏠 Accueil Premium', '🔍 Recherche de Biens', '🏡 Fiche Propriété', '👥 Notre Équipe', '📞 Contact'],
    seoTitle: 'Template Agence Immobilière | Site Web Professionnel',
    seoDesc: 'Template site immobilier avec catalogue de biens, filtres de recherche et prise de contact. Agences et promoteurs. Dès 79 900 FCFA.',
  },
  sante: {
    id: 'sante',
    icon: '🏥',
    label: 'Santé & Clinique',
    tagline: 'La confiance commence sur votre site',
    description: 'Template rassurant pour cliniques, cabinets médicaux, pharmacies et laboratoires. Gérez les prises de rendez-vous et informez vos patients efficacement.',
    color: '#10B981',
    basePrice: 59900,
    features: [
      'Présentation des spécialités médicales',
      'Trombinoscope de l\'équipe soignante',
      'Prise de rendez-vous en ligne',
      'Horaires d\'ouverture et urgences',
      'Informations patients et préparation',
      'Formulaire de contact sécurisé',
      'Design rassurant et professionnel',
      'Certifications et accréditations',
    ],
    pages: ['Accueil', 'Nos spécialités', 'Notre équipe', 'Rendez-vous', 'Contact'],
    recommendedModules: ['Prise de rendez-vous', 'Chat & WhatsApp', 'Avis clients', 'Newsletter'],
    mockSections: ['🏥 Accueil Clinique', '👨‍⚕️ Nos Médecins', '📋 Spécialités', '📅 Prendre RDV', '📞 Contact'],
    seoTitle: 'Template Clinique & Santé | Site Web Médical Professionnel',
    seoDesc: 'Créez votre site médical professionnel avec prise de rendez-vous en ligne. Pour cliniques, cabinets et pharmacies. Dès 59 900 FCFA.',
  },
  formation: {
    id: 'formation',
    icon: '🎓',
    label: 'Formation & École',
    tagline: 'Attirez plus d\'apprenants en ligne',
    description: 'Template conçu pour centres de formation, écoles privées, auto-écoles et organismes de certification. Présentez vos programmes et recevez des inscriptions.',
    color: '#8B5CF6',
    basePrice: 59900,
    features: [
      'Catalogue de formations avec programmes détaillés',
      'Calendrier des sessions et planning',
      'Formulaires d\'inscription en ligne',
      'Témoignages et résultats d\'apprenants',
      'Section équipe pédagogique',
      'Accès à l\'espace élève (optionnel)',
      'Certifications et partenariats',
      'Blog et ressources gratuites',
    ],
    pages: ['Accueil', 'Nos formations', 'Calendrier', 'Inscription', 'Blog', 'Contact'],
    recommendedModules: ['LMS & formations', 'Espace client / membre', 'Blog avancé', 'Newsletter', 'Gestion d\'événements'],
    mockSections: ['🎓 Accueil École', '📚 Nos Programmes', '👩‍🏫 Formateurs', '📅 Calendrier', '✍️ Inscription'],
    seoTitle: 'Template Centre de Formation & École | Site Web Professionnel',
    seoDesc: 'Template site de formation avec catalogue de cours, inscription en ligne et espace apprenant. Dès 59 900 FCFA.',
  },
  ecommerce: {
    id: 'ecommerce',
    icon: '🛒',
    label: 'E-commerce',
    tagline: 'Vendez partout, 24h/24',
    description: 'Template e-commerce complet pour boutiques en ligne, revendeurs et créateurs. Gérez votre catalogue, recevez des paiements Mobile Money et développez vos ventes.',
    color: '#EF4444',
    basePrice: 99900,
    features: [
      'Catalogue produits avec fiches détaillées',
      'Panier d\'achat et checkout sécurisé',
      'Paiement Mobile Money (Orange, MTN, Wave)',
      'Gestion des stocks et variantes',
      'Promotions et codes de réduction',
      'Suivi de commandes pour les clients',
      'Avis et notes produits',
      'Tableau de bord vendeur',
    ],
    pages: ['Accueil', 'Boutique', 'Catégories', 'Panier', 'Mon compte', 'Contact'],
    recommendedModules: ['E-commerce & paiement', 'Catalogue produits', 'Newsletter', 'Avis clients', 'Analytics avancés'],
    mockSections: ['🛒 Accueil Boutique', '📦 Catalogue Produits', '🛍️ Fiche Produit', '💳 Panier / Paiement', '📊 Mon Compte'],
    seoTitle: 'Template E-commerce | Boutique en Ligne Professionnelle',
    seoDesc: 'Créez votre boutique en ligne avec paiement Mobile Money. Template e-commerce complet pour l\'Afrique. Dès 99 900 FCFA.',
  },
  btp: {
    id: 'btp',
    icon: '🏗️',
    label: 'BTP & Construction',
    tagline: 'Montrez vos réalisations, décrochez des chantiers',
    description: 'Template solide pour entreprises BTP, architectes, promoteurs et artisans du bâtiment. Valorisez vos chantiers et recevez des demandes de devis qualifiées.',
    color: '#F59E0B',
    basePrice: 69900,
    features: [
      'Portfolio de réalisations en photos',
      'Présentation des services et corps de métier',
      'Formulaire de demande de devis',
      'Section références et partenaires',
      'Équipe et certifications professionnelles',
      'Blog technique et conseils',
      'Carte des zones d\'intervention',
      'Témoignages clients chantiers',
    ],
    pages: ['Accueil', 'Nos services', 'Réalisations', 'Devis gratuit', 'Contact'],
    recommendedModules: ['Système de devis en ligne', 'Catalogue produits', 'Chat & WhatsApp', 'Blog avancé', 'Avis clients'],
    mockSections: ['🏗️ Accueil BTP', '🔨 Nos Services', '🏛️ Réalisations', '📋 Demander un Devis', '📞 Contact'],
    seoTitle: 'Template BTP & Construction | Site Web Professionnel',
    seoDesc: 'Site web pour entreprises BTP avec portfolio chantiers et devis en ligne. Artisans et promoteurs. Dès 69 900 FCFA.',
  },
  cabinet: {
    id: 'cabinet',
    icon: '⚖️',
    label: 'Cabinet & Conseil',
    tagline: 'La crédibilité en ligne dès le premier clic',
    description: 'Template sobre et professionnel pour cabinets d\'avocats, experts-comptables, consultants et conseillers. Générez de la confiance et convertissez vos prospects.',
    color: '#06B6D4',
    basePrice: 59900,
    features: [
      'Présentation des domaines d\'expertise',
      'Profils et parcours des associés',
      'Formulaire de prise de contact confidentiel',
      'Blog juridique ou sectoriel',
      'Témoignages et cas clients',
      'Publications et actualités',
      'Agenda de rendez-vous',
      'Design sobre, crédible et élégant',
    ],
    pages: ['Accueil', 'Expertises', 'Notre équipe', 'Publications', 'Contact'],
    recommendedModules: ['Prise de rendez-vous', 'Blog avancé', 'Newsletter', 'Chat & WhatsApp', 'CRM intégré'],
    mockSections: ['⚖️ Accueil Cabinet', '📋 Nos Expertises', '👔 L\'Équipe', '📰 Publications', '📞 Prendre RDV'],
    seoTitle: 'Template Cabinet & Conseil | Site Web Professionnel',
    seoDesc: 'Template site de cabinet d\'avocats, experts-comptables et consultants. Prise de RDV et blog intégrés. Dès 59 900 FCFA.',
  },
  hotel: {
    id: 'hotel',
    icon: '🏨',
    label: 'Hôtel & Tourisme',
    tagline: 'Réservations directes, zéro commission',
    description: 'Template élégant pour hôtels, résidences, agences de voyage et prestataires touristiques. Augmentez vos réservations directes sans payer de commission.',
    color: '#EC4899',
    basePrice: 79900,
    features: [
      'Présentation des chambres et suites avec galerie',
      'Système de réservation en ligne',
      'Tarifs et disponibilités en temps réel',
      'Activités, excursions et services',
      'Section "Pourquoi nous choisir"',
      'Témoignages et avis voyageurs',
      'Blog voyage et destination',
      'Packages et offres spéciales',
    ],
    pages: ['Accueil', 'Nos chambres', 'Services', 'Réservation', 'Blog', 'Contact'],
    recommendedModules: ['Réservation en ligne', 'Blog avancé', 'Newsletter', 'Avis clients', 'Gestion d\'événements'],
    mockSections: ['🏨 Accueil Hôtel', '🛏️ Nos Chambres', '🌟 Services & Spa', '📅 Réservation', '📸 Galerie'],
    seoTitle: 'Template Hôtel & Tourisme | Site Web Professionnel',
    seoDesc: 'Créez votre site d\'hôtel avec réservations directes en ligne. Template tourisme sans commission. Dès 79 900 FCFA.',
  },
  beaute: {
    id: 'beaute',
    icon: '💄',
    label: 'Beauté & Spa',
    tagline: 'Sublimez votre image, développez votre clientèle',
    description: 'Template élégant pour salons de beauté, instituts, spas et coiffeurs. Présentez vos prestations, gérez vos rendez-vous et fidélisez votre clientèle.',
    color: '#A855F7',
    basePrice: 49900,
    features: [
      'Menu de prestations avec tarifs et durées',
      'Galerie avant/après et ambiance salon',
      'Prise de rendez-vous en ligne 24h/24',
      'Présentation de l\'équipe et spécialités',
      'Vente de produits en ligne (option)',
      'Programme fidélité et bons cadeaux',
      'Témoignages et avis clients',
      'Design luxe et féminin/neutre',
    ],
    pages: ['Accueil', 'Nos prestations', 'Galerie', 'Prendre RDV', 'Contact'],
    recommendedModules: ['Prise de rendez-vous', 'E-commerce & paiement', 'Newsletter', 'Avis clients', 'Chat & WhatsApp'],
    mockSections: ['💄 Accueil Spa', '✨ Nos Prestations', '📸 Galerie', '📅 Prendre RDV', '🎁 Bons Cadeaux'],
    seoTitle: 'Template Salon de Beauté & Spa | Site Web Professionnel',
    seoDesc: 'Template site de beauté avec prise de RDV en ligne. Pour salons, instituts et spas. Dès 49 900 FCFA.',
  },
  auto: {
    id: 'auto',
    icon: '🚗',
    label: 'Auto & Transport',
    tagline: 'Votre parc auto en ligne, clients en confiance',
    description: 'Template dynamique pour concessionnaires, garages, agences de location et transporteurs. Publiez votre parc, recevez des demandes et développez votre activité.',
    color: '#14B8A6',
    basePrice: 59900,
    features: [
      'Catalogue véhicules avec fiches techniques',
      'Galerie photo par véhicule',
      'Filtres recherche (marque, prix, carburant)',
      'Formulaire de devis et demande d\'essai',
      'Section services et ateliers',
      'Financement et conditions',
      'Actualités et bons plans auto',
      'Calcul estimatif en ligne',
    ],
    pages: ['Accueil', 'Notre parc', 'Occasions', 'Services', 'Financement', 'Contact'],
    recommendedModules: ['Catalogue produits', 'Système de devis en ligne', 'Chat & WhatsApp', 'Blog avancé', 'Avis clients'],
    mockSections: ['🚗 Accueil Concession', '🚙 Notre Parc', '🔧 Services', '💰 Financement', '📋 Demander un Devis'],
    seoTitle: 'Template Auto & Transport | Site Web Professionnel',
    seoDesc: 'Template site automobile avec catalogue véhicules et devis en ligne. Pour garages et concessionnaires. Dès 59 900 FCFA.',
  },
  agriculture: {
    id: 'agriculture',
    icon: '🌾',
    label: 'Agriculture',
    tagline: 'Connectez vos produits aux marchés',
    description: 'Template professionnel pour agriculteurs, coopératives, agro-industries et fournisseurs d\'intrants. Présentez vos produits et développez vos débouchés commerciaux.',
    color: '#84CC16',
    basePrice: 49900,
    features: [
      'Catalogue de produits agricoles avec photos',
      'Présentation de l\'exploitation ou coopérative',
      'Formulaire de commande et devis',
      'Section actualités et saisons',
      'Informations nutritionnelles et labels',
      'Zone de livraison et partenaires',
      'Blog et conseils agricoles',
      'Design naturel et de confiance',
    ],
    pages: ['Accueil', 'Nos produits', 'Notre ferme', 'Commander', 'Actualités', 'Contact'],
    recommendedModules: ['Catalogue produits', 'Système de devis en ligne', 'Newsletter', 'Blog avancé', 'Chat & WhatsApp'],
    mockSections: ['🌾 Accueil Ferme', '🥬 Nos Produits', '🚜 Notre Exploitation', '📦 Commander', '📰 Actualités'],
    seoTitle: 'Template Agriculture | Site Web Professionnel',
    seoDesc: 'Template site agricole avec catalogue produits et vente en ligne. Pour fermes et coopératives. Dès 49 900 FCFA.',
  },
  corporate: {
    id: 'corporate',
    icon: '💼',
    label: 'Corporate & Finance',
    tagline: 'L\'image de marque qui inspire confiance',
    description: 'Template haut de gamme pour grandes entreprises, banques, assurances et institutions financières. Communiquez votre vision et attirez partenaires et investisseurs.',
    color: '#64748B',
    basePrice: 69900,
    features: [
      'Présentation corporate premium',
      'Rapport annuel et chiffres clés',
      'Équipe dirigeante et gouvernance',
      'Actualités, communiqués de presse',
      'Espace investisseurs',
      'Carrières et recrutement',
      'Responsabilité sociale (RSE)',
      'Multilingue et multidevise',
    ],
    pages: ['Accueil', 'À propos', 'Activités', 'Actualités', 'Carrières', 'Investisseurs', 'Contact'],
    recommendedModules: ['Blog avancé', 'Newsletter', 'Multilingue', 'Analytics avancés', 'CRM intégré'],
    mockSections: ['💼 Accueil Corporate', '🏢 À Propos', '📊 Nos Activités', '📰 Actualités', '👥 Carrières'],
    seoTitle: 'Template Corporate & Finance | Site Web Professionnel',
    seoDesc: 'Template site corporate et financier haut de gamme. Pour entreprises, banques et institutions. Dès 69 900 FCFA.',
  },
}

const FORMULES = [
  {
    id: 'standard',
    name: 'Standard',
    desc: 'Besoins essentiels',
    supplement: 0,
    color: '#64748B',
    gradient: 'linear-gradient(135deg,rgba(30,41,59,.9),rgba(51,65,85,.9))',
    features: ['Template de base complet', 'Design responsive mobile', 'Contenu administrable', '5 pages incluses', 'Formulaire de contact', 'SEO de base'],
  },
  {
    id: 'premium',
    name: 'Premium',
    desc: 'Besoins plus complets',
    supplement: 50000,
    color: '#FF6B00',
    gradient: 'linear-gradient(135deg,rgba(124,29,6,.9),rgba(194,65,12,.9),rgba(234,88,12,.9))',
    popular: true,
    features: ['Tout Standard inclus', 'Personnalisation avancée', 'Domaine + hébergement 1 an', '10 pages incluses', 'Blog & galerie', 'Réseaux sociaux', 'Analytics'],
  },
  {
    id: 'elite',
    name: 'Elite',
    desc: 'Entreprises exigeantes',
    supplement: 150000,
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg,rgba(30,27,75,.9),rgba(55,48,163,.9),rgba(79,70,229,.9))',
    features: ['Tout Premium inclus', 'Modules au choix', 'Espace client/membre', 'Paiement en ligne', 'Maintenance 3 mois offerte', 'Support prioritaire 7j/7'],
  },
]

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

/* ─── METADATA DYNAMIQUE ───────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ secteur: string }> }): Promise<Metadata> {
  const { secteur } = await params
  const s = SECTORS[secteur]
  if (!s) return { title: 'Template | IBIG DIGITAL' }
  return { title: `${s.seoTitle} | IBIG DIGITAL`, description: s.seoDesc }
}

export function generateStaticParams() {
  return Object.keys(SECTORS).map((id) => ({ secteur: id }))
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default async function TemplateSecteurPage({ params }: { params: Promise<{ secteur: string }> }) {
  const { secteur } = await params
  const s = SECTORS[secteur]
  if (!s) notFound()

  return (
    <div style={{ background: '#06091A', minHeight: '100vh' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.2} 50%{opacity:.5} }
        .feature-item { display:flex; align-items:flex-start; gap:.75rem; padding:.75rem 0; border-bottom:1px solid rgba(255,255,255,.05); }
        .feature-item:last-child { border-bottom:none; }
        .formule-card { border-radius:1.5rem; overflow:hidden; position:relative; transition:transform .25s,box-shadow .25s; }
        .formule-card:hover { transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,.5); }
        .module-chip { display:inline-block; padding:.4rem .9rem; border-radius:9999px; font-size:.72rem; font-weight:600; border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.55); background:rgba(255,255,255,.04); transition:all .15s; }
        .module-chip:hover { color:#FF9A4D; border-color:rgba(255,107,0,.3); background:rgba(255,107,0,.08); }
        .page-tag { display:inline-flex; align-items:center; gap:.4rem; padding:.4rem 1rem; border-radius:9999px; font-size:.72rem; font-weight:700; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.55); }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', paddingTop: '7rem', paddingBottom: '4rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle,${s.color}22 0%,transparent 65%)`, animation: 'pulse-glow 5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,.3)', fontSize: '.78rem', textDecoration: 'none', marginBottom: '2rem' }}>
            <ArrowLeft size={13} /> Retour aux templates
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left: Text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.4rem 1rem', borderRadius: '9999px', marginBottom: '1.5rem', background: `${s.color}18`, border: `1px solid ${s.color}35` }}>
                <span style={{ fontSize: '1rem', animation: 'float 3s ease-in-out infinite' }}>{s.icon}</span>
                <span style={{ fontSize: '.68rem', fontWeight: 800, color: s.color, letterSpacing: '.07em' }}>{s.label.toUpperCase()}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 900, color: 'white', marginBottom: '1rem', letterSpacing: '-.03em', lineHeight: 1.1 }}>
                {s.tagline}
              </h1>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {s.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '.75rem', marginBottom: '2rem', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
                <div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.3)', fontWeight: 600, letterSpacing: '.05em', marginBottom: '.2rem' }}>À PARTIR DE</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'white' }}>{fmt(s.basePrice)}</div>
                  <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)', marginTop: '.1rem' }}>Template Standard · domaine & hébergement en option</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={`/templates/commander?secteur=${s.id}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '.9rem 2rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 10px 30px rgba(255,107,0,.3)', textDecoration: 'none' }}>
                  Commander ce template <ArrowRight size={16} />
                </Link>
                <Link href="/templates/commander"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.9rem 1.75rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.85rem', color: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)', textDecoration: 'none' }}>
                  Calculer mon prix
                </Link>
              </div>
            </div>

            {/* Right: Mock Browser */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 30px 80px rgba(0,0,0,.6)', background: '#0F1729' }}>
                {/* Browser chrome */}
                <div style={{ padding: '.75rem 1rem', background: '#1A2035', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                  <div style={{ display: 'flex', gap: '.35rem' }}>
                    {['#EF4444', '#F59E0B', '#22C55E'].map((c) => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: .7 }} />)}
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: '.4rem', padding: '.25rem .75rem', fontSize: '.6rem', color: 'rgba(255,255,255,.25)', fontFamily: 'monospace' }}>
                    www.votre-site.com
                  </div>
                </div>

                {/* Mock website */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {/* Nav */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '.75rem', borderBottom: `2px solid ${s.color}30` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                      <span style={{ fontSize: '.85rem' }}>{s.icon}</span>
                      <div style={{ width: '50px', height: '6px', borderRadius: '3px', background: `${s.color}60` }} />
                    </div>
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      {[30, 40, 35, 45].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '5px', borderRadius: '2px', background: 'rgba(255,255,255,.15)' }} />)}
                    </div>
                    <div style={{ width: '55px', height: '20px', borderRadius: '4px', background: s.color, opacity: .8 }} />
                  </div>

                  {/* Hero section */}
                  <div style={{ background: `linear-gradient(135deg,${s.color}18,transparent)`, borderRadius: '.75rem', padding: '1.25rem', border: `1px solid ${s.color}20` }}>
                    <div style={{ width: '70%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.5)', marginBottom: '.5rem' }} />
                    <div style={{ width: '50%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.25)', marginBottom: '.75rem' }} />
                    <div style={{ width: '90%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.12)', marginBottom: '.25rem' }} />
                    <div style={{ width: '75%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.08)', marginBottom: '.875rem' }} />
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      <div style={{ width: '80px', height: '22px', borderRadius: '4px', background: s.color }} />
                      <div style={{ width: '70px', height: '22px', borderRadius: '4px', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)' }} />
                    </div>
                  </div>

                  {/* Sections grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.5rem' }}>
                    {s.mockSections.slice(0, 3).map((section, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,.04)', borderRadius: '.5rem', padding: '.75rem .5rem', border: '1px solid rgba(255,255,255,.07)', textAlign: 'center' }}>
                        <div style={{ fontSize: '.6rem', marginBottom: '.3rem' }}>{section.split(' ')[0]}</div>
                        <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: `${s.color}40`, marginBottom: '.2rem' }} />
                        <div style={{ width: '80%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,.1)', margin: '0 auto' }} />
                      </div>
                    ))}
                  </div>

                  {/* Content row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                    {[0, 1].map((i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,.03)', borderRadius: '.5rem', padding: '.75rem', border: '1px solid rgba(255,255,255,.06)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '.4rem', background: `${s.color}25`, marginBottom: '.5rem' }} />
                        <div style={{ width: '75%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.3)', marginBottom: '.25rem' }} />
                        <div style={{ width: '90%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,.1)', marginBottom: '.15rem' }} />
                        <div style={{ width: '60%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,.07)' }} />
                      </div>
                    ))}
                  </div>

                  {/* CTA bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.75rem', background: `${s.color}15`, borderRadius: '.625rem', border: `1px solid ${s.color}25` }}>
                    <div>
                      <div style={{ width: '80px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.4)', marginBottom: '.25rem' }} />
                      <div style={{ width: '55px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,.18)' }} />
                    </div>
                    <div style={{ width: '70px', height: '22px', borderRadius: '4px', background: s.color }} />
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <div style={{ position: 'absolute', bottom: '-1rem', left: '-1rem', padding: '.75rem 1.25rem', borderRadius: '1rem', background: '#0B1120', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Zap size={14} style={{ color: '#4ADE80' }} />
                  <div>
                    <div style={{ fontSize: '.7rem', fontWeight: 800, color: 'white' }}>Livré en 3-7 jours</div>
                    <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.3)' }}>Personnalisé selon vos besoins</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FONCTIONNALITÉS ═══ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Features */}
          <div>
            <div style={{ fontSize: '.72rem', fontWeight: 800, color: s.color, letterSpacing: '.08em', marginBottom: '1rem' }}>FONCTIONNALITÉS INCLUSES</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', marginBottom: '1.75rem', letterSpacing: '-.025em' }}>
              Tout ce dont vous avez besoin
            </h2>
            <div>
              {s.features.map((f) => (
                <div key={f} className="feature-item">
                  <CheckCircle size={16} style={{ color: '#4ADE80', flexShrink: 0, marginTop: '1px' }} />
                  <span style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pages & Modules */}
          <div>
            {/* Pages */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '.72rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', marginBottom: '1rem' }}>PAGES INCLUSES (STANDARD)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {s.pages.map((p) => (
                  <span key={p} className="page-tag">{p}</span>
                ))}
              </div>
            </div>

            {/* Modules recommandés */}
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 800, color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', marginBottom: '1rem' }}>MODULES RECOMMANDÉS POUR CE SECTEUR</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {s.recommendedModules.map((m) => (
                  <span key={m} className="module-chip">{m}</span>
                ))}
              </div>
              <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.2)', marginTop: '.875rem', lineHeight: 1.6 }}>
                Modules optionnels ajoutables lors de la commande. Chaque module a un tarif distinct.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FORMULES ═══ */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,transparent,#FF6B00)' }} />
            <span style={{ fontSize: '.72rem', fontWeight: 800, color: '#FF9A4D', letterSpacing: '.08em' }}>NOS FORMULES</span>
            <div style={{ height: '2px', width: '2rem', borderRadius: '9999px', background: 'linear-gradient(90deg,#FF6B00,transparent)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, color: 'white', letterSpacing: '-.025em', marginBottom: '.5rem' }}>
            Choisissez votre formule
          </h2>
          <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.85rem' }}>
            Template {s.label} — à partir de <strong style={{ color: 'white' }}>{fmt(s.basePrice)}</strong>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.25rem' }}>
          {FORMULES.map((f) => {
            const price = s.basePrice + f.supplement
            return (
              <div key={f.name} className="formule-card" style={{ background: f.gradient }}>
                {f.popular && (
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '.3rem', padding: '.3rem .8rem', borderRadius: '9999px', fontSize: '.65rem', fontWeight: 800, background: 'rgba(255,107,0,.15)', color: '#FF9A4D', border: '1px solid rgba(255,107,0,.35)' }}>
                    <Star size={10} /> Le plus choisi
                  </div>
                )}
                <div style={{ padding: '2rem' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '.68rem', fontWeight: 700, color: f.color, letterSpacing: '.06em', marginBottom: '.4rem' }}>{f.desc.toUpperCase()}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', marginBottom: '.5rem' }}>{f.name}</div>
                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white' }}>{fmt(price)}</div>
                    {f.supplement > 0 && <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.3)', marginTop: '.15rem' }}>Base {fmt(s.basePrice)} + {fmt(f.supplement)} formule</div>}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', borderBottom: '1px solid rgba(255,255,255,.1)', padding: '1.25rem 0', marginBottom: '1.5rem' }}>
                    {f.features.map((feat) => (
                      <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', marginBottom: '.6rem' }}>
                        <CheckCircle size={13} style={{ color: '#4ADE80', flexShrink: 0, marginTop: '1px' }} />
                        <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/templates/commander?secteur=${s.id}&formule=${f.id}`}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: '.875rem', borderRadius: '.875rem', fontWeight: 800, fontSize: '.85rem', color: 'white', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', textDecoration: 'none' }}>
                    Choisir {f.name} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', fontSize: '.72rem', color: 'rgba(255,255,255,.2)', marginTop: '1.5rem' }}>
          Domaine, hébergement et modules configurables séparément lors de la commande
        </p>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem 7rem', textAlign: 'center' }}>
        <div style={{ padding: '3.5rem 2rem', borderRadius: '2rem', background: `linear-gradient(135deg,${s.color}12,rgba(0,0,0,.1))`, border: `1px solid ${s.color}25` }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>{s.icon}</div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', fontWeight: 900, color: 'white', marginBottom: '.75rem', letterSpacing: '-.025em' }}>
            Prêt à lancer votre site {s.label} ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.88rem', marginBottom: '2rem', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            Configurez votre commande en ligne en quelques minutes. Notre équipe prend en charge la personnalisation et la mise en ligne.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href={`/templates/commander?secteur=${s.id}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '1rem 2.25rem', borderRadius: '1rem', fontWeight: 800, fontSize: '.9rem', color: 'white', background: 'linear-gradient(135deg,#FF6B00,#FF4500)', boxShadow: '0 10px 30px rgba(255,107,0,.3)', textDecoration: 'none' }}>
              Commander ce template <ArrowRight size={17} />
            </Link>
            <Link href="/templates"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '1rem 1.75rem', borderRadius: '1rem', fontWeight: 700, fontSize: '.85rem', color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Voir d&apos;autres secteurs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
