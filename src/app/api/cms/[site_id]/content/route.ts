import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/auth'
import { getAdminSession } from '@/lib/admin-auth'
import sql from '@/lib/db'

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ site_id: string }> }

/* ── GET : lecture du contenu (public via ?public=1, ou authentifié) ── */
export async function GET(req: NextRequest, { params }: Ctx) {
  const { site_id } = await params
  const isPublic = req.nextUrl.searchParams.get('public') === '1'

  if (!isPublic) {
    const client = await getClient()
    const admin  = await getAdminSession()
    if (!client && !admin) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    if (client) {
      const own = await sql`SELECT id FROM client_orders WHERE id = ${site_id} AND client_id = ${client.id} LIMIT 1`
      if (!own[0]) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }
  }

  const rows = await sql`
    SELECT section, content, updated_by, updated_at
    FROM site_content
    WHERE order_id = ${site_id}
    ORDER BY section
  `

  const content: Record<string, unknown> = {}
  for (const r of rows as Array<{ section: string; content: unknown; updated_by: string; updated_at: string }>) {
    content[r.section] = { data: r.content, updated_by: r.updated_by, updated_at: r.updated_at }
  }

  return NextResponse.json({ ok: true, site_id, content })
}

/* ── PATCH : mise à jour d'une ou plusieurs sections ── */
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { site_id } = await params

  const client = await getClient()
  const admin  = await getAdminSession()
  if (!client && !admin) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  if (client) {
    const own = await sql`SELECT id, status FROM client_orders WHERE id = ${site_id} AND client_id = ${client.id} LIMIT 1`
    if (!own[0]) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    if ((own[0] as { status: string }).status !== 'delivered') {
      return NextResponse.json({ error: 'Votre site n\'est pas encore livré.' }, { status: 400 })
    }
  }

  const body = await req.json() as Record<string, unknown>
  const { sections } = body as { sections: Record<string, unknown> }

  if (!sections || typeof sections !== 'object') {
    return NextResponse.json({ error: 'Format invalide — attendu: { sections: { hero: {...}, ... } }' }, { status: 400 })
  }

  const author = admin ? 'ibig' : 'client'
  const updated: string[] = []

  for (const [section, data] of Object.entries(sections)) {
    const existing = await sql`SELECT content FROM site_content WHERE order_id = ${site_id} AND section = ${section} LIMIT 1`

    if (existing[0]) {
      await sql`
        INSERT INTO cms_history (order_id, section, old_content, new_content, changed_by)
        VALUES (${site_id}, ${section}, ${JSON.stringify((existing[0] as { content: unknown }).content)}, ${JSON.stringify(data)}, ${author})
      `
      await sql`
        UPDATE site_content SET content = ${JSON.stringify(data)}, updated_by = ${author}, updated_at = NOW()
        WHERE order_id = ${site_id} AND section = ${section}
      `
    } else {
      await sql`
        INSERT INTO site_content (order_id, section, content, updated_by)
        VALUES (${site_id}, ${section}, ${JSON.stringify(data)}, ${author})
      `
    }
    updated.push(section)
  }

  return NextResponse.json({ ok: true, updated })
}
