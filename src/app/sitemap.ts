import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

const base = SITE.url

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

const staticRoutes: { url: string; priority: number; freq: Freq }[] = [
  /* ── Pages principales ── */
  { url: '/',                          priority: 1.0,  freq: 'weekly' },
  { url: '/services',                  priority: 0.95, freq: 'weekly' },
  { url: '/templates',                 priority: 0.95, freq: 'weekly' },
  { url: '/devis',                     priority: 0.9,  freq: 'monthly' },
  { url: '/contact',                   priority: 0.85, freq: 'monthly' },
  { url: '/realisations',              priority: 0.85, freq: 'weekly' },
  { url: '/packs',                     priority: 0.85, freq: 'weekly' },
  { url: '/produits',                  priority: 0.8,  freq: 'weekly' },
  { url: '/a-propos',                  priority: 0.75, freq: 'monthly' },
  { url: '/blog',                      priority: 0.8,  freq: 'daily' },
  { url: '/faq',                       priority: 0.7,  freq: 'monthly' },

  /* ── Packs ── */
  { url: '/packs/pack-visibilite',              priority: 0.8, freq: 'monthly' },
  { url: '/packs/pack-lancement-entreprise',    priority: 0.8, freq: 'monthly' },
  { url: '/packs/pack-commerce-en-ligne',       priority: 0.8, freq: 'monthly' },
  { url: '/packs/pack-mobile-pro',              priority: 0.8, freq: 'monthly' },
  { url: '/packs/pack-digital-360',             priority: 0.8, freq: 'monthly' },

  /* ── Templates par secteur ── */
  { url: '/templates/restaurant',   priority: 0.85, freq: 'weekly' },
  { url: '/templates/immobilier',   priority: 0.85, freq: 'weekly' },
  { url: '/templates/sante',        priority: 0.85, freq: 'weekly' },
  { url: '/templates/formation',    priority: 0.85, freq: 'weekly' },
  { url: '/templates/ecommerce',    priority: 0.85, freq: 'weekly' },
  { url: '/templates/btp',          priority: 0.8,  freq: 'weekly' },
  { url: '/templates/cabinet',      priority: 0.8,  freq: 'weekly' },
  { url: '/templates/hotel',        priority: 0.8,  freq: 'weekly' },
  { url: '/templates/beaute',       priority: 0.8,  freq: 'weekly' },
  { url: '/templates/auto',         priority: 0.75, freq: 'weekly' },
  { url: '/templates/agriculture',  priority: 0.75, freq: 'weekly' },
  { url: '/templates/corporate',    priority: 0.8,  freq: 'weekly' },
  { url: '/templates/commander',    priority: 0.9,  freq: 'weekly' },

  /* ── Services détaillés ── */
  { url: '/services/sites-web',            priority: 0.85, freq: 'monthly' },
  { url: '/services/ecommerce',            priority: 0.85, freq: 'monthly' },
  { url: '/services/applications',         priority: 0.85, freq: 'monthly' },
  { url: '/services/design',               priority: 0.8,  freq: 'monthly' },
  { url: '/services/marketing-digital',    priority: 0.8,  freq: 'monthly' },
  { url: '/services/seo',                  priority: 0.8,  freq: 'monthly' },
  { url: '/services/community-management', priority: 0.75, freq: 'monthly' },
  { url: '/services/ia-automatisation',    priority: 0.75, freq: 'monthly' },

  /* ── Légal ── */
  { url: '/mentions-legales',          priority: 0.2, freq: 'yearly' },
  { url: '/politique-confidentialite', priority: 0.2, freq: 'yearly' },
  { url: '/cgv',                       priority: 0.2, freq: 'yearly' },
  { url: '/cgu',                       priority: 0.2, freq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return staticRoutes.map(({ url, priority, freq }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))
}
