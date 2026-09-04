export type PriceType = 'fixed' | 'from' | 'on_quote' | 'free'
export type Currency = 'XOF' | 'EUR' | 'USD'
export type QuoteStatus = 'new' | 'contacted' | 'qualification' | 'quote_sent' | 'negotiation' | 'won' | 'lost' | 'archived'
export type BlogStatus = 'draft' | 'published' | 'archived'
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled'
export type SaleStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
}

export interface Product {
  id: string
  category_id?: string
  name: string
  slug: string
  type?: string
  short_description?: string
  description?: string
  problem_solved?: string
  included?: string[]
  not_included?: string[]
  features?: string[]
  delivery_time?: string
  price?: number
  price_type: PriceType
  currency: Currency
  old_price?: number
  promo_label?: string
  is_featured: boolean
  is_active: boolean
  is_partner_visible: boolean
  is_affiliate_enabled: boolean
  official_url?: string
  seo_title?: string
  seo_description?: string
  og_image?: string
  sort_order: number
  created_at: string
  updated_at: string
  category?: Category
  images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  storage_path: string
  alt_text?: string
  sort_order: number
}

export interface Pack {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  old_value?: number
  savings?: number
  is_featured: boolean
  is_active: boolean
  sort_order: number
  items?: PackItem[]
}

export interface PackItem {
  id: string
  pack_id: string
  product_id?: string
  quantity: number
  custom_label?: string
  sort_order: number
  product?: Product
}

export interface Project {
  id: string
  title: string
  slug: string
  client_name?: string
  show_client: boolean
  sector?: string
  type?: string
  summary?: string
  challenge?: string
  solution?: string
  services?: string[]
  technologies?: string[]
  results?: string
  year?: number
  project_url?: string
  show_url: boolean
  is_featured: boolean
  is_published: boolean
  sort_order: number
  seo_title?: string
  seo_description?: string
  og_image?: string
  created_at: string
  images?: ProjectImage[]
}

export interface ProjectImage {
  id: string
  project_id: string
  storage_path: string
  alt_text?: string
  is_cover: boolean
  is_before: boolean
  is_after: boolean
  sort_order: number
}

export interface QuoteRequest {
  name: string
  company?: string
  role?: string
  email: string
  phone?: string
  whatsapp?: string
  country?: string
  city?: string
  project_type?: string
  product_id?: string
  budget?: string
  deadline?: string
  message?: string
  source?: string
  affiliate_id?: string
  affiliate_code?: string
  tracking_token?: string
}

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  source?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  sort_order: number
  is_active: boolean
}

export interface BlogPost {
  id: string
  category_id?: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_image?: string
  author: string
  seo_title?: string
  seo_description?: string
  status: BlogStatus
  published_at?: string
  created_at: string
}

export interface SiteSettings {
  [key: string]: string
}

export interface AffiliateLink {
  id: string
  affiliate_id: string
  product_id: string
  code: string
  token: string
  target_url: string
  clicks: number
  is_active: boolean
}
