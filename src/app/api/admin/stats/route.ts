import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const [clients, orders, tickets, revenue] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM clients`,
    sql`SELECT COUNT(*)::int AS n FROM client_orders`,
    sql`SELECT COUNT(*)::int AS n FROM client_tickets WHERE status IN ('open','in_progress')`,
    sql`SELECT COALESCE(SUM(total_initial),0)::bigint AS n FROM client_orders`,
  ])

  const ordersByStatus = await sql`
    SELECT status, COUNT(*)::int AS n FROM client_orders GROUP BY status
  `
  const recentOrders = await sql`
    SELECT o.id, o.reference, o.template_label, o.formule, o.total_initial, o.status, o.created_at,
           c.name AS client_name, c.email AS client_email
    FROM client_orders o
    JOIN clients c ON c.id = o.client_id
    ORDER BY o.created_at DESC LIMIT 8
  `

  return NextResponse.json({
    clients: clients[0].n,
    orders: orders[0].n,
    openTickets: tickets[0].n,
    revenue: Number(revenue[0].n),
    ordersByStatus,
    recentOrders,
  })
}
