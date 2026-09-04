import { NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, session_id, landing_path, referrer } = body

    if (!token) return NextResponse.json({ error: 'Token requis.' }, { status: 400 })

    const links = await sql`
      SELECT id FROM affiliate_links WHERE token = ${token} AND is_active = true LIMIT 1
    `
    if (!links.length) return NextResponse.json({ error: 'Lien invalide.' }, { status: 404 })

    const link = links[0]

    await sql`
      INSERT INTO affiliate_clicks (link_id, session_id, landing_path, referrer)
      VALUES (${link.id}, ${session_id || null}, ${landing_path || null}, ${referrer || null})
    `

    try {
      await sql`
        UPDATE affiliate_links SET clicks = clicks + 1 WHERE id = ${link.id}
      `
    } catch { /* ignore */ }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Affiliate track error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
