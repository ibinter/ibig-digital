import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const orders = await sql`
    SELECT id, reference, quote_reference, template_sector, template_label, formule,
           domain_option, domain, hosting, maintenance,
           total_initial, total_annual, total_monthly,
           status, notes, delivery_date, site_url, admin_url, created_at, updated_at
    FROM client_orders
    WHERE client_id = ${session.clientId}
    ORDER BY created_at DESC
  `
  return NextResponse.json(orders)
}
