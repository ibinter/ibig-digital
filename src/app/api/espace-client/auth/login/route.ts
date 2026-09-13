import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import sql from '@/lib/db'
import { verifyPassword, createSession, SESSION_COOKIE } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email?.trim() || !password) {
      return NextResponse.json({ error: 'Email et mot de passe obligatoires.' }, { status: 400 })
    }

    const rows = await sql`SELECT id, email, name, password_hash, is_active FROM clients WHERE email = ${email.toLowerCase().trim()} LIMIT 1`
    const client = rows[0] as { id: string; email: string; name: string; password_hash: string; is_active: boolean } | undefined

    if (!client || !client.is_active) {
      return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 })
    }

    const valid = await verifyPassword(password, client.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 })
    }

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
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Erreur lors de la connexion.' }, { status: 500 })
  }
}
