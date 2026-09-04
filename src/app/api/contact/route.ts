import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

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

    const supabase = await createServiceClient()
    const { error } = await supabase.from('contact_messages').insert({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      subject: body.subject || null,
      message: body.message,
      source: 'contact_form',
    })

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Erreur serveur. Réessayez.' }, { status: 500 })
  }
}
