import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const tickets = await sql`
    SELECT t.id, t.subject, t.priority, t.status, t.created_at, t.updated_at,
           o.reference AS order_reference, o.template_label,
           (SELECT COUNT(*) FROM ticket_messages tm WHERE tm.ticket_id = t.id)::int AS message_count,
           (SELECT tm.created_at FROM ticket_messages tm WHERE tm.ticket_id = t.id ORDER BY tm.created_at DESC LIMIT 1) AS last_message_at
    FROM client_tickets t
    LEFT JOIN client_orders o ON o.id = t.order_id
    WHERE t.client_id = ${session.clientId}
    ORDER BY t.updated_at DESC
  `
  return NextResponse.json(tickets)
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const { subject, message, order_id, priority } = await req.json()
  if (!subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Sujet et message obligatoires.' }, { status: 400 })
  }

  const ticketRows = await sql`
    INSERT INTO client_tickets (client_id, order_id, subject, priority)
    VALUES (${session.clientId}, ${order_id || null}, ${subject.trim()}, ${priority || 'normal'})
    RETURNING id
  `
  const ticketId = (ticketRows[0] as { id: string }).id

  await sql`
    INSERT INTO ticket_messages (ticket_id, sender_type, message)
    VALUES (${ticketId}, 'client', ${message.trim()})
  `

  return NextResponse.json({ success: true, ticketId })
}
