import sql from './db'
import type { Category, Product, Pack, Project, FAQ, BlogPost } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const rows = await sql`
    SELECT * FROM categories WHERE is_active = true ORDER BY sort_order
  `
  return rows as Category[]
}

export async function getProducts(opts?: {
  categorySlug?: string
  featured?: boolean
  limit?: number
}): Promise<Product[]> {
  let rows
  if (opts?.categorySlug) {
    rows = await sql`
      SELECT p.*, row_to_json(c) AS category,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.is_active = true AND c.slug = ${opts.categorySlug}
      GROUP BY p.id, c.id
      ORDER BY p.sort_order
      ${opts?.limit ? sql`LIMIT ${opts.limit}` : sql``}
    `
  } else if (opts?.featured) {
    rows = await sql`
      SELECT p.*, row_to_json(c) AS category,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.is_active = true AND p.is_featured = true
      GROUP BY p.id, c.id
      ORDER BY p.sort_order
      ${opts?.limit ? sql`LIMIT ${opts.limit}` : sql``}
    `
  } else {
    rows = await sql`
      SELECT p.*, row_to_json(c) AS category,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.is_active = true
      GROUP BY p.id, c.id
      ORDER BY p.sort_order
      ${opts?.limit ? sql`LIMIT ${opts.limit}` : sql``}
    `
  }
  return rows as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await sql`
    SELECT p.*, row_to_json(c) AS category,
      COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE p.slug = ${slug} AND p.is_active = true
    GROUP BY p.id, c.id
    LIMIT 1
  `
  return (rows[0] as Product) ?? null
}

export async function getPacks(): Promise<Pack[]> {
  const rows = await sql`
    SELECT pk.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', pi.id, 'pack_id', pi.pack_id, 'product_id', pi.product_id,
            'label', pi.label, 'description', pi.description, 'is_included', pi.is_included,
            'sort_order', pi.sort_order,
            'product', (SELECT row_to_json(pr) FROM products pr WHERE pr.id = pi.product_id)
          ) ORDER BY pi.sort_order
        ) FILTER (WHERE pi.id IS NOT NULL), '[]'
      ) AS items
    FROM packs pk
    LEFT JOIN pack_items pi ON pi.pack_id = pk.id
    WHERE pk.is_active = true
    GROUP BY pk.id
    ORDER BY pk.sort_order
  `
  return rows as Pack[]
}

export async function getPackBySlug(slug: string): Promise<Pack | null> {
  const rows = await sql`
    SELECT pk.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', pi.id, 'pack_id', pi.pack_id, 'product_id', pi.product_id,
            'label', pi.label, 'description', pi.description, 'is_included', pi.is_included,
            'sort_order', pi.sort_order,
            'product', (SELECT row_to_json(pr) FROM products pr WHERE pr.id = pi.product_id)
          ) ORDER BY pi.sort_order
        ) FILTER (WHERE pi.id IS NOT NULL), '[]'
      ) AS items
    FROM packs pk
    LEFT JOIN pack_items pi ON pi.pack_id = pk.id
    WHERE pk.slug = ${slug} AND pk.is_active = true
    GROUP BY pk.id
    LIMIT 1
  `
  return (rows[0] as Pack) ?? null
}

export async function getProjects(opts?: {
  featured?: boolean
  type?: string
  limit?: number
}): Promise<Project[]> {
  let rows
  if (opts?.featured && opts?.type) {
    rows = await sql`
      SELECT p.*,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM projects p
      LEFT JOIN project_images pi ON pi.project_id = p.id
      WHERE p.is_published = true AND p.is_featured = true AND p.type = ${opts.type}
      GROUP BY p.id ORDER BY p.sort_order
      ${opts?.limit ? sql`LIMIT ${opts.limit}` : sql``}
    `
  } else if (opts?.featured) {
    rows = await sql`
      SELECT p.*,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM projects p
      LEFT JOIN project_images pi ON pi.project_id = p.id
      WHERE p.is_published = true AND p.is_featured = true
      GROUP BY p.id ORDER BY p.sort_order
      ${opts?.limit ? sql`LIMIT ${opts.limit}` : sql``}
    `
  } else if (opts?.type) {
    rows = await sql`
      SELECT p.*,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM projects p
      LEFT JOIN project_images pi ON pi.project_id = p.id
      WHERE p.is_published = true AND p.type = ${opts.type}
      GROUP BY p.id ORDER BY p.sort_order
      ${opts?.limit ? sql`LIMIT ${opts.limit}` : sql``}
    `
  } else {
    rows = await sql`
      SELECT p.*,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM projects p
      LEFT JOIN project_images pi ON pi.project_id = p.id
      WHERE p.is_published = true
      GROUP BY p.id ORDER BY p.sort_order
      ${opts?.limit ? sql`LIMIT ${opts.limit}` : sql``}
    `
  }
  return rows as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const rows = await sql`
    SELECT p.*,
      COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
    FROM projects p
    LEFT JOIN project_images pi ON pi.project_id = p.id
    WHERE p.slug = ${slug} AND p.is_published = true
    GROUP BY p.id
    LIMIT 1
  `
  return (rows[0] as Project) ?? null
}

export async function getFAQs(): Promise<FAQ[]> {
  const rows = await sql`
    SELECT * FROM faqs WHERE is_active = true ORDER BY sort_order
  `
  return rows as FAQ[]
}

export async function getBlogPosts(opts?: { limit?: number }): Promise<BlogPost[]> {
  const rows = opts?.limit
    ? await sql`
        SELECT * FROM blog_posts WHERE status = 'published'
        ORDER BY published_at DESC LIMIT ${opts.limit}
      `
    : await sql`
        SELECT * FROM blog_posts WHERE status = 'published'
        ORDER BY published_at DESC
      `
  return rows as BlogPost[]
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await sql`SELECT key, value FROM site_settings`
  const settings: Record<string, string> = {}
  for (const row of rows) {
    if (row.key && row.value !== null) settings[row.key as string] = row.value as string
  }
  return settings
}

export async function getAffiliateLink(token: string) {
  const rows = await sql`
    SELECT al.*, row_to_json(p) AS product
    FROM affiliate_links al
    LEFT JOIN products p ON p.id = al.product_id
    WHERE al.token = ${token} AND al.is_active = true
    LIMIT 1
  `
  return rows[0] ?? null
}
