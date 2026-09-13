/* ─── DONNÉES DU CONFIGURATEUR DE COMMANDE ─────────────────────────────── */

export const TEMPLATE_CATEGORIES = [
  { id: 'restaurant',  icon: '🍽️', label: 'Restaurant & Food',     basePrice: 49900 },
  { id: 'immobilier',  icon: '🏠', label: 'Immobilier',              basePrice: 79900 },
  { id: 'sante',       icon: '🏥', label: 'Santé & Clinique',        basePrice: 59900 },
  { id: 'formation',   icon: '🎓', label: 'Formation & École',       basePrice: 59900 },
  { id: 'ecommerce',   icon: '🛒', label: 'E-commerce',              basePrice: 99900 },
  { id: 'btp',         icon: '🏗️', label: 'BTP & Construction',      basePrice: 69900 },
  { id: 'cabinet',     icon: '⚖️', label: 'Cabinet & Conseil',       basePrice: 59900 },
  { id: 'hotel',       icon: '🏨', label: 'Hôtel & Tourisme',        basePrice: 79900 },
  { id: 'beaute',      icon: '💄', label: 'Beauté & Spa',            basePrice: 49900 },
  { id: 'auto',        icon: '🚗', label: 'Auto & Transport',        basePrice: 59900 },
  { id: 'agriculture', icon: '🌾', label: 'Agriculture',             basePrice: 49900 },
  { id: 'corporate',   icon: '💼', label: 'Corporate & Finance',     basePrice: 69900 },
]

export const FORMULES = [
  {
    id: 'standard' as const,
    name: 'Standard',
    desc: 'Besoins essentiels',
    supplement: 0,
    color: '#64748B',
    features: ['Template de base complet', 'Design responsive mobile', 'Contenu administrable', '5 pages incluses', 'Formulaire de contact', 'SEO de base'],
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    desc: 'Besoins plus complets',
    supplement: 50000,
    color: '#FF6B00',
    popular: true,
    features: ['Tout Standard inclus', 'Personnalisation avancée', '10 pages incluses', 'Blog & galerie', 'Réseaux sociaux', 'Analytics'],
  },
  {
    id: 'elite' as const,
    name: 'Elite',
    desc: 'Entreprises exigeantes',
    supplement: 150000,
    color: '#7C3AED',
    features: ['Tout Premium inclus', 'Modules au choix', 'Espace client/membre', 'Paiement en ligne', 'Maintenance 3 mois offerte', 'Support prioritaire 7j/7'],
  },
]

export const DOMAIN_EXTENSIONS = [
  { ext: '.com',    price: 15000 },
  { ext: '.net',    price: 12000 },
  { ext: '.org',    price: 12000 },
  { ext: '.africa', price: 18000 },
  { ext: '.ci',     price: 20000 },
  { ext: '.sn',     price: 20000 },
  { ext: '.bj',     price: 20000 },
  { ext: '.tg',     price: 20000 },
  { ext: '.fr',     price: 15000 },
  { ext: '.co.uk',  price: 18000 },
]

export const HOSTING_PLANS = [
  { id: 'none'    as const, name: 'Sans hébergement', desc: 'Je gère moi-même',                              priceYear: 0,      specs: [] },
  { id: 'basic'   as const, name: 'Basic',            desc: 'Sites vitrines, trafic faible',                 priceYear: 30000,  specs: ['5 Go SSD', '10 Go bande passante', '2 comptes email'] },
  { id: 'business'as const, name: 'Business',         desc: 'Sites actifs, trafic modéré',                   priceYear: 60000,  specs: ['20 Go SSD', 'Bande passante illimitée', '10 comptes email', 'SSL inclus'] },
  { id: 'premium' as const, name: 'Premium',          desc: 'E-commerce, fort trafic',                       priceYear: 120000, specs: ['50 Go SSD NVMe', 'CDN inclus', 'Comptes email illimités', 'SSL + Backups'] },
]

export const MAINTENANCE_PLANS = [
  { id: 'none'  as const, name: 'Sans maintenance',  desc: 'Je gère moi-même',                    priceMonth: 0,     services: [] },
  { id: 'basic' as const, name: 'Basic',             desc: 'Mises à jour essentielles',            priceMonth: 10000, services: ['Mises à jour CMS', 'Surveillance uptime', '1 modification/mois'] },
  { id: 'pro'   as const, name: 'Pro',               desc: 'Suivi actif + modifications',          priceMonth: 25000, services: ['Tout Basic inclus', '5 modifications/mois', 'Rapport mensuel', 'Support prioritaire'] },
  { id: 'elite' as const, name: 'Elite',             desc: 'Gestion complète déléguée',            priceMonth: 50000, services: ['Tout Pro inclus', 'Modifications illimitées', 'Optimisation SEO', 'Sauvegarde quotidienne'] },
]

export const PERSONALIZATION_OPTIONS = [
  { id: 'logo',      label: 'Remplacement du logo',          price: 15000,  icon: '🎨' },
  { id: 'colors',    label: 'Couleurs personnalisées',        price: 10000,  icon: '🎭' },
  { id: 'fonts',     label: 'Typographies au choix',          price: 8000,   icon: '🔤' },
  { id: 'texts',     label: 'Rédaction des textes',           price: 30000,  icon: '✍️' },
  { id: 'images',    label: 'Pack images professionnelles',   price: 25000,  icon: '📸' },
  { id: 'favicon',   label: 'Favicon personnalisé',           price: 5000,   icon: '⭐' },
  { id: 'menu',      label: 'Menu personnalisé',              price: 15000,  icon: '📋' },
  { id: 'pages',     label: '3 pages supplémentaires',        price: 30000,  icon: '📄' },
  { id: 'social',    label: 'Intégration réseaux sociaux',    price: 12000,  icon: '📣' },
  { id: 'maps',      label: 'Google Maps intégré',            price: 8000,   icon: '📍' },
]

export const MODULE_OPTIONS = [
  { id: 'ecommerce',  label: 'E-commerce & paiement',        price: 75000,  icon: '🛒', desc: 'Boutique en ligne avec paiement Mobile Money et carte' },
  { id: 'booking',    label: 'Réservation en ligne',          price: 40000,  icon: '📅', desc: 'Système de réservation avec calendrier et confirmations' },
  { id: 'rdv',        label: 'Prise de rendez-vous',          price: 35000,  icon: '🗓️', desc: 'Agenda en ligne, rappels automatiques, gestion des créneaux' },
  { id: 'member',     label: 'Espace client / membre',        price: 60000,  icon: '👤', desc: 'Inscription, connexion, tableau de bord client privé' },
  { id: 'lms',        label: 'LMS & formations',              price: 80000,  icon: '🎓', desc: 'Cours en ligne, quiz, certificats, suivi des apprenants' },
  { id: 'crm',        label: 'CRM intégré',                   price: 50000,  icon: '📊', desc: 'Gestion des leads, relances, pipeline commercial' },
  { id: 'chat',       label: 'Chat & WhatsApp',               price: 25000,  icon: '💬', desc: 'Bouton WhatsApp, chat en direct, chatbot simple' },
  { id: 'blog',       label: 'Blog avancé',                   price: 30000,  icon: '📝', desc: 'Catégories, auteurs multiples, commentaires, newsletter' },
  { id: 'newsletter', label: 'Newsletter',                    price: 20000,  icon: '📧', desc: 'Collecte emails, envoi de campagnes, statistiques' },
  { id: 'catalogue',  label: 'Catalogue produits',            price: 35000,  icon: '📦', desc: 'Catalogue avec filtres, fiches produits, devis en ligne' },
  { id: 'events',     label: 'Gestion d\'événements',         price: 40000,  icon: '🎟️', desc: 'Agenda, inscriptions, billets, rappels participants' },
  { id: 'reviews',    label: 'Avis clients',                  price: 15000,  icon: '⭐', desc: 'Système de notation, modération, affichage Google' },
  { id: 'multilang',  label: 'Multilingue',                   price: 45000,  icon: '🌍', desc: 'Site en 2 langues ou plus, sélecteur de langue' },
  { id: 'analytics',  label: 'Analytics avancés',             price: 20000,  icon: '📈', desc: 'Tableau de bord statistiques, heatmaps, rapports automatiques' },
  { id: 'devis',      label: 'Système de devis en ligne',     price: 30000,  icon: '🧾', desc: 'Formulaire de devis, calcul automatique, envoi PDF' },
]

export const COUNTRIES = [
  "Côte d'Ivoire", 'Sénégal', 'Mali', 'Burkina Faso', 'Guinée', 'Togo', 'Bénin',
  'Cameroun', 'Ghana', 'Nigeria', 'France', 'Belgique', 'Suisse', 'Autre',
]
