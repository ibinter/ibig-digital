import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  const rows = await sql`
    SELECT t.*, c.name AS client_name, c.email AS client_email,
           o.reference AS order_reference, o.template_label
    FROM client_tickets t
    JOIN clients c ON c.id = t.client_id
    LEFT JOIN client_orders o ON o.id = t.order_id
    WHERE t.id = ${id} LIMIT 1
  `
  if (!rows[0]) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  const messages = await sql`SELECT * FROM ticket_messages WHERE ticket_id = ${id} ORDER BY created_at ASC`
  return NextResponse.json({ ticket: rows[0], messages })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  const { message, status } = await req.json()

  if (message?.trim()) {
    await sql`INSERT INTO ticket_messages (ticket_id, sender_type, message) VALUES (${id}, 'ibig', ${message.trim()})`
    await sql`UPDATE client_tickets SET updated_at = NOW(), status = COALESCE(${status ?? null}, status) WHERE id = ${id}`
  } else if (status) {
    await sql`UPDATE client_tickets SET status = ${status}, updated_at = NOW() WHERE id = ${id}`
  }
  return NextResponse.json({ ok: true })
}
