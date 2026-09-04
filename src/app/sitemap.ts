import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

const base = SITE.url

const staticRoutes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/',                          priority: 1.0,  changeFrequency: 'weekly' },
  { url: '/services',                  priority: 0.9,  changeFrequency: 'weekly' },
  { url: '/produits',                  priority: 0.9,  changeFrequency: 'weekly' },
  { url: '/packs',                     priority: 0.85, changeFrequency: 'weekly' },
  { url: '/devis',                     priority: 0.85, changeFrequency: 'monthly' },
  { url: '/contact',                   priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/realisations',              priority: 0.8,  changeFrequency: 'weekly' },
  { url: '/a-propos',                  priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/blog',                      priority: 0.75, changeFrequency: 'weekly' },
  { url: '/packs/pack-visibilite',             priority: 0.75, changeFrequency: 'monthly' },
  { url: '/packs/pack-lancement-entreprise',   priority: 0.75, changeFrequency: 'monthly' },
  { url: '/packs/pack-commerce-en-ligne',      priority: 0.75, changeFrequency: 'monthly' },
  { url: '/packs/pack-mobile-pro',             priority: 0.75, changeFrequency: 'monthly' },
  { url: '/packs/pack-digital-360',            priority: 0.75, changeFrequency: 'monthly' },
  { url: '/mentions-legales',          priority: 0.3,  changeFrequency: 'yearly' },
  { url: '/politique-confidentialite', priority: 0.3,  changeFrequency: 'yearly' },
  { url: '/cgv',                       priority: 0.3,  changeFrequency: 'yearly' },
  { url: '/cgu',                       priority: 0.3,  changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
