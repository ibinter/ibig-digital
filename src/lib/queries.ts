import { createClient } from './supabase/server'
import type { Category, Product, Pack, Project, FAQ, BlogPost } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  return data ?? []
}

export async function getProducts(opts?: {
  categorySlug?: string
  featured?: boolean
  limit?: number
}): Promise<Product[]> {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*)')
    .eq('is_active', true)
    .order('sort_order')

  if (opts?.featured) query = query.eq('is_featured', true)
  if (opts?.limit) query = query.limit(opts.limit)
  if (opts?.categorySlug) {
    query = query.eq('category.slug', opts.categorySlug)
  }

  const { data } = await query
  return (data ?? []) as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data as Product | null
}

export async function getPacks(): Promise<Pack[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('packs')
    .select('*, items:pack_items(*, product:products(*))')
    .eq('is_active', true)
    .order('sort_order')
  return (data ?? []) as Pack[]
}

export async function getPackBySlug(slug: string): Promise<Pack | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('packs')
    .select('*, items:pack_items(*, product:products(*))')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data as Pack | null
}

export async function getProjects(opts?: {
  featured?: boolean
  type?: string
  limit?: number
}): Promise<Project[]> {
  const supabase = await createClient()
  let query = supabase
    .from('projects')
    .select('*, images:project_images(*)')
    .eq('is_published', true)
    .order('sort_order')

  if (opts?.featured) query = query.eq('is_featured', true)
  if (opts?.type) query = query.eq('type', opts.type)
  if (opts?.limit) query = query.limit(opts.limit)

  const { data } = await query
  return (data ?? []) as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*, images:project_images(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data as Project | null
}

export async function getFAQs(): Promise<FAQ[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  return data ?? []
}

export async function getBlogPosts(opts?: { limit?: number }): Promise<BlogPost[]> {
  const supabase = await createClient()
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (opts?.limit) query = query.limit(opts.limit)

  const { data } = await query
  return data ?? []
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('key, value')
  const settings: Record<string, string> = {}
  for (const row of data ?? []) {
    if (row.key && row.value !== null) settings[row.key] = row.value
  }
  return settings
}

export async function getAffiliateLink(token: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('affiliate_links')
    .select('*, product:products(*)')
    .eq('token', token)
    .eq('is_active', true)
    .single()
  return data
}
