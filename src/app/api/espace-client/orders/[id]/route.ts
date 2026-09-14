import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const client = await getClient()
  if (!client) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const rows = await sql`
    SELECT id, reference, template_label, template_sector, formule, status, site_url, admin_url, delivery_date
    FROM client_orders
    WHERE id = ${id} AND client_id = ${client.id}
    LIMIT 1
  `
  if (!rows[0]) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(rows[0])
}
