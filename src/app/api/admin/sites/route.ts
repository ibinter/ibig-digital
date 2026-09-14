import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const rows = await sql`
    SELECT
      o.id, o.reference, o.template_label, o.site_url, o.status, o.delivery_date,
      c.name AS client_name, c.email AS client_email,
      EXISTS(SELECT 1 FROM site_content sc WHERE sc.order_id = o.id) AS has_cms,
      (SELECT MAX(sc2.updated_at) FROM site_content sc2 WHERE sc2.order_id = o.id) AS cms_last_update
    FROM client_orders o
    JOIN clients c ON c.id = o.client_id
    ORDER BY o.delivery_date DESC NULLS LAST, o.created_at DESC
    LIMIT 100
  `

  return NextResponse.json(rows)
}
