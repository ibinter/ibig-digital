import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { generateReference } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 })
    }

    const referer = request.headers.get('referer') ?? ''
    const url = new URL(referer || 'http://localhost')
    const utmSource = url.searchParams.get('utm_source') ?? ''
    const utmMedium = url.searchParams.get('utm_medium') ?? ''
    const utmCampaign = url.searchParams.get('utm_campaign') ?? ''

    const reference = generateReference()

    await sql`
      INSERT INTO quote_requests (
        reference, name, company, role, email, phone, whatsapp, country, city,
        project_type, budget, deadline, message, source,
        utm_source, utm_medium, utm_campaign,
        affiliate_id, affiliate_code, tracking_token
      ) VALUES (
        ${reference}, ${body.name}, ${body.company || null}, ${body.role || null},
        ${body.email}, ${body.phone || null}, ${body.whatsapp || null},
        ${body.country || null}, ${body.city || null},
        ${body.project_type || null}, ${body.budget || null}, ${body.deadline || null},
        ${body.message}, ${body.source || 'organic'},
        ${utmSource || null}, ${utmMedium || null}, ${utmCampaign || null},
        ${body.affiliate_id || null}, ${body.affiliate_code || null}, ${body.tracking_token || null}
      )
    `

    // Notify ibig-partners affiliate system if an affiliate code was passed
    if (body.affiliate_code) {
      const apiKey = process.env.IBIG_PARTNERS_API_KEY
      if (apiKey) {
        // Best-effort: don't block the response on this
        fetch('https://ibigpartners.com/api/partners/report-sale', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-partner-api-key': apiKey },
          body: JSON.stringify({
            partnerCode: body.affiliate_code,
            productSlug: 'ibig-digital',
            externalRef: reference,
            amount: 0,
            customerName: body.name,
            customerEmail: body.email,
            customerPhone: body.phone || body.whatsapp || '',
          }),
        }).catch((err) => console.error('ibig-partners report-sale failed:', err))
      }
    }

    return NextResponse.json({ success: true, reference })
  } catch (err: unknown) {
    console.error('Quote request error:', err)
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' }, { status: 500 })
  }
}
