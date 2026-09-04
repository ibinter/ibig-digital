import { MetadataRoute } from 'next'
import { getProducts, getProjects, getPacks, getBlogPosts } from '@/lib/queries'
import { SITE } from '@/lib/constants'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url

  const [products, projects, packs, posts] = await Promise.all([
    getProducts().catch(() => []),
    getProjects().catch(() => []),
    getPacks().catch(() => []),
    getBlogPosts().catch(() => []),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/produits`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/packs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/realisations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/devis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/politique-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/produits/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/realisations/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const packRoutes: MetadataRoute.Sitemap = packs.map((p) => ({
    url: `${base}/packs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.published_at ?? p.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...projectRoutes, ...packRoutes, ...blogRoutes]
}
