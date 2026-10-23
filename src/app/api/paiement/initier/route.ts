import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { generateReference } from '@/lib/utils'

/* GeniusPay — checkout hébergé (Wave, Orange Money, MTN, Moov, carte) */
const GENIUSPAY_API = 'https://geniuspay.ci/api/v1/merchant/payments'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom, prenom, email, telephone, montant, description, template_id, secteur_id, formule } = body

    if (!nom || !email || !montant) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    const amount = Number(montant)
    if (isNaN(amount) || amount < 200) {
      return NextResponse.json({ error: 'Montant invalide.' }, { status: 400 })
    }

    const apiKey    = process.env.GENIUSPAY_API_KEY
    const apiSecret = process.env.GENIUSPAY_API_SECRET
    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Paiement en ligne non configuré.' }, { status: 503 })
    }

    const transaction_id = `IBIG-${generateReference()}`

    /* Enregistrement en BDD avant paiement */
    await sql`
      INSERT INTO commandes (
        reference, template_id, secteur_id, formule,
        client_nom, client_prenom, client_email, client_telephone,
        montant, statut, transaction_cinetpay
      ) VALUES (
        ${transaction_id}, ${template_id || null}, ${secteur_id || null}, ${formule || null},
        ${nom}, ${prenom || null}, ${email}, ${telephone || null},
        ${amount}, 'en_attente', ${transaction_id}
      )
    `

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ibig-digital.com'

    /* Appel GeniusPay (sans payment_method → page de checkout GeniusPay) */
    const payload = {
      amount,
      currency:    'XOF',
      description: description || `Template ${template_id} — Formule ${formule}`,
      success_url: `${siteUrl}/paiement/succes?ref=${transaction_id}`,
      error_url:   `${siteUrl}/paiement/annule?ref=${transaction_id}`,
      customer: {
        name:    [nom, prenom].filter(Boolean).join(' '),
        email,
        phone:   telephone || undefined,
        country: 'CI',
      },
      metadata: {
        site:        'ibig-digital',
        transaction_id,
        template_id: template_id || '',
        secteur_id:  secteur_id  || '',
        formule:     formule      || '',
      },
    }

    const res = await fetch(GENIUSPAY_API, {
      method: 'POST',
      headers: {
        'X-API-Key':    apiKey,
        'X-API-Secret': apiSecret,
        'Content-Type': 'application/json',
        'Accept':       'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({}))
    const checkoutUrl = data?.data?.checkout_url ?? data?.data?.payment_url

    if (!res.ok || !data.success || !checkoutUrl) {
      console.error('GeniusPay error:', data)
      return NextResponse.json({ error: data?.error?.message || 'Erreur GeniusPay.' }, { status: 502 })
    }

    return NextResponse.json({
      success:      true,
      payment_url:  checkoutUrl,
      payment_id:   data.data.reference,
      transaction_id,
    })
  } catch (err) {
    console.error('Paiement initier error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
