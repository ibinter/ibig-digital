import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { generateReference } from '@/lib/utils'

const MONEROO_API = 'https://api.moneroo.io/v1/payments/initialize'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom, prenom, email, telephone, montant, description, template_id, secteur_id, formule } = body

    if (!nom || !email || !montant) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    const amount = Number(montant)
    if (isNaN(amount) || amount < 100) {
      return NextResponse.json({ error: 'Montant invalide.' }, { status: 400 })
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

    /* Appel Moneroo */
    const payload = {
      amount,
      currency:    'XOF',
      description: description || `Template ${template_id} — Formule ${formule}`,
      return_url:  `${siteUrl}/paiement/succes?ref=${transaction_id}`,
      customer: {
        email,
        first_name: nom,
        last_name:  prenom || '',
        phone:      telephone || undefined,
        country:    'CI',
      },
      metadata: {
        transaction_id,
        template_id: template_id || '',
        secteur_id:  secteur_id  || '',
        formule:     formule      || '',
      },
    }

    const res = await fetch(MONEROO_API, {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${process.env.MONEROO_SECRET_KEY}`,
        'Content-Type':   'application/json',
        'Accept':         'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!data.success || !data.data?.checkout_url) {
      console.error('Moneroo error:', data)
      return NextResponse.json({ error: data.message || 'Erreur Moneroo.' }, { status: 502 })
    }

    return NextResponse.json({
      success:      true,
      payment_url:  data.data.checkout_url,
      payment_id:   data.data.id,
      transaction_id,
    })
  } catch (err) {
    console.error('Paiement initier error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
