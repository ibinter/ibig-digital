import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('q')

  const rows = await sql`
    SELECT c.id, c.email, c.name, c.phone, c.company, c.country, c.is_active, c.created_at,
           COUNT(DISTINCT o.id)::int AS order_count,
           COALESCE(SUM(o.total_initial),0)::bigint AS total_spent
    FROM clients c
    LEFT JOIN client_orders o ON o.client_id = c.id
    WHERE (${search ?? null}::text IS NULL OR c.name ILIKE ${'%' + (search ?? '') + '%'} OR c.email ILIKE ${'%' + (search ?? '') + '%'})
    GROUP BY c.id
    ORDER BY c.created_at DESC
    LIMIT 100
  `
  return NextResponse.json(rows)
}
