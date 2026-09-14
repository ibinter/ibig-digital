import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { generateReference } from '@/lib/utils'

const CINETPAY_API = 'https://api-checkout.cinetpay.com/v2/payment'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { nom, prenom, email, telephone, montant, description, template_id, secteur_id, formule } = body

    if (!nom || !email || !telephone || !montant) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 })
    }

    const transaction_id = `IBIG-${generateReference()}`
    const amount = Number(montant)

    if (isNaN(amount) || amount < 100) {
      return NextResponse.json({ error: 'Montant invalide.' }, { status: 400 })
    }

    /* Enregistrement en BDD avant paiement */
    await sql`
      INSERT INTO commandes (
        reference, template_id, secteur_id, formule,
        client_nom, client_prenom, client_email, client_telephone,
        montant, statut, transaction_cinetpay
      ) VALUES (
        ${transaction_id}, ${template_id || null}, ${secteur_id || null}, ${formule || null},
        ${nom}, ${prenom || null}, ${email}, ${telephone},
        ${amount}, 'en_attente', ${transaction_id}
      )
    `

    /* Appel CinetPay */
    const payload = {
      apikey:          process.env.CINETPAY_API_KEY,
      site_id:         process.env.CINETPAY_SITE_ID,
      transaction_id,
      amount,
      currency:        'XOF',
      description:     description || `Commande template ${template_id}`,
      return_url:      `${process.env.NEXT_PUBLIC_SITE_URL}/paiement/succes?ref=${transaction_id}`,
      notify_url:      `${process.env.NEXT_PUBLIC_SITE_URL}/api/paiement/webhook`,
      cancel_url:      `${process.env.NEXT_PUBLIC_SITE_URL}/paiement/annule?ref=${transaction_id}`,
      customer_name:   nom,
      customer_surname: prenom || '',
      customer_email:  email,
      customer_phone_number: telephone,
      customer_address: 'Abidjan',
      customer_city:   'Abidjan',
      customer_country: 'CI',
      customer_state:  'CI',
      customer_zip_code: '00225',
      channels:        'ALL',
      lang:            'FR',
      metadata:        JSON.stringify({ template_id, secteur_id, formule }),
    }

    const res = await fetch(CINETPAY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (data.code !== '201') {
      console.error('CinetPay error:', data)
      return NextResponse.json({ error: data.message || 'Erreur CinetPay.' }, { status: 502 })
    }

    return NextResponse.json({
      success: true,
      payment_url: data.data.payment_url,
      transaction_id,
    })
  } catch (err) {
    console.error('Paiement initier error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
