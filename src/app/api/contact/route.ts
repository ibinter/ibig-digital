import { NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'E-mail invalide.' }, { status: 400 })
    }

    await sql`
      INSERT INTO contact_messages (name, email, phone, subject, message, source)
      VALUES (
        ${body.name}, ${body.email}, ${body.phone || null},
        ${body.subject || null}, ${body.message}, 'contact_form'
      )
    `

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Erreur serveur. Réessayez.' }, { status: 500 })
  }
}
