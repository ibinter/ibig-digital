import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import sql from '@/lib/db'
import { hashPassword, createSession, SESSION_COOKIE } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, company, country } = await req.json()

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: 'Nom, email et mot de passe obligatoires.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 })
    }

    const existing = await sql`SELECT id FROM clients WHERE email = ${email.toLowerCase().trim()} LIMIT 1`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Un compte existe déjà avec cet email.' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const rows = await sql`
      INSERT INTO clients (email, password_hash, name, phone, company, country)
      VALUES (${email.toLowerCase().trim()}, ${passwordHash}, ${name.trim()}, ${phone || null}, ${company || null}, ${country || "Côte d'Ivoire"})
      RETURNING id, email, name
    `
    const client = rows[0] as { id: string; email: string; name: string }
    const token = await createSession(client.id)

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    return NextResponse.json({ success: true, client: { id: client.id, email: client.email, name: client.name } })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Erreur lors de la création du compte.' }, { status: 500 })
  }
}
