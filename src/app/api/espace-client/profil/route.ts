import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getSession, hashPassword, verifyPassword } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const rows = await sql`SELECT id, email, name, phone, company, country, created_at FROM clients WHERE id = ${session.clientId} LIMIT 1`
  return NextResponse.json(rows[0] ?? null)
}

export async function PATCH(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const body = await req.json()

  if (body.currentPassword && body.newPassword) {
    if (body.newPassword.length < 8) return NextResponse.json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' }, { status: 400 })
    const rows = await sql`SELECT password_hash FROM clients WHERE id = ${session.clientId} LIMIT 1`
    const stored = (rows[0] as { password_hash: string })?.password_hash
    if (!stored || !(await verifyPassword(body.currentPassword, stored))) {
      return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 400 })
    }
    const newHash = await hashPassword(body.newPassword)
    await sql`UPDATE clients SET password_hash = ${newHash}, updated_at = NOW() WHERE id = ${session.clientId}`
    return NextResponse.json({ success: true, message: 'Mot de passe mis à jour.' })
  }

  const { name, phone, company, country } = body
  if (!name?.trim()) return NextResponse.json({ error: 'Le nom est obligatoire.' }, { status: 400 })

  await sql`UPDATE clients SET name = ${name.trim()}, phone = ${phone || null}, company = ${company || null}, country = ${country || null}, updated_at = NOW() WHERE id = ${session.clientId}`
  return NextResponse.json({ success: true })
}
