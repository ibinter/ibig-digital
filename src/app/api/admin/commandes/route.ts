import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('q')

  const rows = await sql`
    SELECT o.id, o.reference, o.template_sector, o.template_label, o.formule,
           o.domain, o.hosting, o.maintenance, o.total_initial, o.total_annual, o.total_monthly,
           o.status, o.site_url, o.admin_url, o.delivery_date, o.notes, o.created_at,
           c.id AS client_id, c.name AS client_name, c.email AS client_email, c.phone AS client_phone, c.company AS client_company
    FROM client_orders o
    JOIN clients c ON c.id = o.client_id
    WHERE (${status ?? null}::text IS NULL OR o.status = ${status ?? ''})
      AND (${search ?? null}::text IS NULL OR o.reference ILIKE ${'%' + (search ?? '') + '%'} OR c.name ILIKE ${'%' + (search ?? '') + '%'} OR c.email ILIKE ${'%' + (search ?? '') + '%'})
    ORDER BY o.created_at DESC
    LIMIT 100
  `
  return NextResponse.json(rows)
}
