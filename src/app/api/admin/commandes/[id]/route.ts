import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  const rows = await sql`
    SELECT o.*, c.name AS client_name, c.email AS client_email, c.phone AS client_phone, c.company AS client_company
    FROM client_orders o JOIN clients c ON c.id = o.client_id
    WHERE o.id = ${id} LIMIT 1
  `
  if (!rows[0]) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  const tickets = await sql`SELECT id, subject, status, priority, updated_at FROM client_tickets WHERE order_id = ${id} ORDER BY updated_at DESC`
  return NextResponse.json({ order: rows[0], tickets })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const { status, site_url, admin_url, delivery_date, notes } = body

  await sql`
    UPDATE client_orders SET
      status = COALESCE(${status ?? null}, status),
      site_url = COALESCE(${site_url ?? null}, site_url),
      admin_url = COALESCE(${admin_url ?? null}, admin_url),
      delivery_date = COALESCE(${delivery_date ?? null}::date, delivery_date),
      notes = COALESCE(${notes ?? null}, notes),
      updated_at = NOW()
    WHERE id = ${id}
  `
  return NextResponse.json({ ok: true })
}
