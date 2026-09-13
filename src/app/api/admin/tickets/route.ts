import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const rows = await sql`
    SELECT t.id, t.subject, t.priority, t.status, t.created_at, t.updated_at,
           o.reference AS order_reference, o.template_label,
           c.name AS client_name, c.email AS client_email,
           (SELECT COUNT(*)::int FROM ticket_messages tm WHERE tm.ticket_id = t.id) AS message_count
    FROM client_tickets t
    JOIN clients c ON c.id = t.client_id
    LEFT JOIN client_orders o ON o.id = t.order_id
    WHERE (${status ?? null}::text IS NULL OR t.status = ${status ?? ''})
    ORDER BY
      CASE t.priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END,
      t.updated_at DESC
    LIMIT 100
  `
  return NextResponse.json(rows)
}
