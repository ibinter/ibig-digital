import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { generateReference } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation basique
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Récupérer la provenance depuis les cookies/headers
    const referer = request.headers.get('referer') ?? ''
    const url = new URL(referer || 'http://localhost')
    const utmSource = url.searchParams.get('utm_source') ?? ''
    const utmMedium = url.searchParams.get('utm_medium') ?? ''
    const utmCampaign = url.searchParams.get('utm_campaign') ?? ''

    const reference = generateReference()

    const { error } = await supabase.from('quote_requests').insert({
      reference,
      name: body.name,
      company: body.company || null,
      role: body.role || null,
      email: body.email,
      phone: body.phone || null,
      whatsapp: body.whatsapp || null,
      country: body.country || null,
      city: body.city || null,
      project_type: body.project_type || null,
      budget: body.budget || null,
      deadline: body.deadline || null,
      message: body.message,
      source: body.source || 'organic',
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
      affiliate_id: body.affiliate_id || null,
      affiliate_code: body.affiliate_code || null,
      tracking_token: body.tracking_token || null,
    })

    if (error) throw error

    // TODO: Envoyer notification email (Resend/Nodemailer)

    return NextResponse.json({ success: true, reference })
  } catch (err: unknown) {
    console.error('Quote request error:', err)
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' }, { status: 500 })
  }
}
