import { NextResponse } from 'next/server'
import { STATIC_PRODUCTS } from '@/lib/services-data'

export const dynamic = 'force-dynamic'

// Taux de commission IBIG DIGITAL : 10% N1 · 5% N2 · 2% N3
const COMMISSION_RATE = 10

function toIbigPartnersFormat(p: typeof STATIC_PRODUCTS[number]) {
  const price = p.price ?? 0
  return {
    slug: p.slug,
    name: p.name,
    pricingType: 'SERVICE' as const,
    price,
    rate: COMMISSION_RATE,
    siteUrl: `https://ibig-digital.com/produits/${p.slug}`,
    description: p.short_description ?? undefined,
  }
}

export async function GET() {
  const products = STATIC_PRODUCTS
    .filter((p) => p.is_active && p.is_affiliate_enabled)
    .map(toIbigPartnersFormat)

  return NextResponse.json(
    { products },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': 'https://ibigpartners.com',
      },
    }
  )
}
