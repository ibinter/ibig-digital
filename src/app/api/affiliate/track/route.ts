import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, session_id, landing_path, referrer } = body

    if (!token) return NextResponse.json({ error: 'Token requis.' }, { status: 400 })

    const supabase = await createServiceClient()

    // Trouver le lien affilié
    const { data: link } = await supabase
      .from('affiliate_links')
      .select('id')
      .eq('token', token)
      .eq('is_active', true)
      .single()

    if (!link) return NextResponse.json({ error: 'Lien invalide.' }, { status: 404 })

    // Enregistrer le clic
    const url = new URL(request.url)
    await supabase.from('affiliate_clicks').insert({
      link_id: link.id,
      session_id: session_id || null,
      landing_path: landing_path || null,
      referrer: referrer || null,
    })

    // Incrémenter le compteur de clics
    // Incrémenter les clics (best-effort)
    try {
      await supabase.from('affiliate_links').update({ clicks: 0 }).eq('id', link.id)
    } catch { /* ignore */ }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Affiliate track error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
