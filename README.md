# IBIG DIGITAL – Site officiel

Site web commercial officiel d'IBIG DIGITAL, branche numérique d'INTERMARK BUSINESS INTERNATIONAL GROUP – IBIG SARL.

## Stack technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript strict
- **Style** : Tailwind CSS v4
- **Base de données** : Supabase (PostgreSQL)
- **Déploiement** : Vercel
- **Domaine** : ibig-digital.com

## Architecture

```
src/
├── app/                  # Pages et API routes (Next.js App Router)
│   ├── (public)/         # Pages publiques
│   ├── admin/            # Back-office (à implémenter Phase 6)
│   └── api/              # API routes
│       ├── devis/        # Enregistrement demandes de devis
│       ├── contact/      # Messages de contact
│       └── affiliate/    # Tracking affiliation
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Sections de la page d'accueil
│   ├── ui/               # Composants réutilisables
│   └── forms/            # Formulaires
├── lib/
│   ├── supabase/         # Clients Supabase (browser + server)
│   ├── queries.ts        # Requêtes Supabase centralisées
│   ├── utils.ts          # Utilitaires (formatPrice, slugify...)
│   └── constants.ts      # Coordonnées, navigation, constantes
└── types/                # Types TypeScript
```

## Variables d'environnement

Copier `.env.local.example` → `.env.local` et remplir :

```
NEXT_PUBLIC_SUPABASE_URL=       # URL du projet Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Clé anonyme Supabase
SUPABASE_SERVICE_ROLE_KEY=      # Clé service role (côté serveur uniquement)
NEXT_PUBLIC_SITE_URL=           # https://ibig-digital.com
```

## Installation & développement

```bash
npm install
npm run dev          # Serveur de développement sur http://localhost:3000
npm run build        # Build de production
npm run lint         # Linting ESLint
npx tsc --noEmit     # Vérification TypeScript
```

## Base de données Supabase

1. Créer un projet Supabase sur supabase.com
2. Exécuter le fichier `../supabase-schema.sql` dans l'éditeur SQL Supabase
3. Ce schéma crée toutes les tables, index, triggers, politiques RLS et données initiales

## Déploiement Vercel

1. Connecter le repository GitHub à Vercel
2. Ajouter les variables d'environnement dans les settings Vercel
3. Configurer le domaine ibig-digital.com dans Vercel
4. Les déploiements se font automatiquement depuis la branche `main`

## Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Accueil (Hero, Réalisations, Services, Packs, Process) |
| `/services` | Catalogue complet des services |
| `/produits/[slug]` | Fiche détaillée d'un produit/service |
| `/packs` | Tous les packs commerciaux |
| `/packs/[slug]` | Détail d'un pack |
| `/realisations` | Portfolio complet |
| `/realisations/[slug]` | Étude de cas détaillée |
| `/devis` | Formulaire de demande de devis |
| `/contact` | Page de contact |
| `/a-propos` | À propos d'IBIG DIGITAL |
| `/faq` | Questions fréquentes |
| `/blog` | Blog et ressources |
| `/mentions-legales` | Mentions légales |
| `/politique-confidentialite` | Politique de confidentialité |

## API Routes

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/devis` | POST | Enregistrer une demande de devis |
| `/api/contact` | POST | Enregistrer un message de contact |
| `/api/affiliate/track` | POST | Tracker un clic affilié |

## Phases de développement restantes

- **Phase 6** : Back-office admin (/admin)
- **Phase 7** : Synchronisation IBIG PARTNERS complète
- **Phase 8** : SEO avancé + Analytics GA4 + optimisations
- **Phase 9** : Tests, recette, corrections
- **Phase 10** : Déploiement domaine + documentation finale

## Contacts IBIG DIGITAL

- E-mail : contact@ibig-digital.com
- Tél : +225 27 22 27 60 14
- WhatsApp : +225 07 78 88 25 92
