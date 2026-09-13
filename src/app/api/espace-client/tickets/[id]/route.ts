import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const { id } = await params

  const tickets = await sql`
    SELECT t.id, t.subject, t.priority, t.status, t.created_at,
           o.reference AS order_reference, o.template_label
    FROM client_tickets t
    LEFT JOIN client_orders o ON o.id = t.order_id
    WHERE t.id = ${id} AND t.client_id = ${session.clientId}
    LIMIT 1
  `
  if (!tickets[0]) return NextResponse.json({ error: 'Ticket introuvable.' }, { status: 404 })

  const messages = await sql`
    SELECT id, sender_type, message, created_at
    FROM ticket_messages
    WHERE ticket_id = ${id}
    ORDER BY created_at ASC
  `

  return NextResponse.json({ ticket: tickets[0], messages })
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const { id } = await params
  const { message } = await req.json()
  if (!message?.trim()) return NextResponse.json({ error: 'Message vide.' }, { status: 400 })

  const tickets = await sql`SELECT id FROM client_tickets WHERE id = ${id} AND client_id = ${session.clientId} LIMIT 1`
  if (!tickets[0]) return NextResponse.json({ error: 'Ticket introuvable.' }, { status: 404 })

  await sql`INSERT INTO ticket_messages (ticket_id, sender_type, message) VALUES (${id}, 'client', ${message.trim()})`
  await sql`UPDATE client_tickets SET updated_at = NOW() WHERE id = ${id}`

  return NextResponse.json({ success: true })
}
