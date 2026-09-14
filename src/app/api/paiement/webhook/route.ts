import { NextResponse } from 'next/server'
import sql from '@/lib/db'

const CINETPAY_VERIFY = 'https://api-checkout.cinetpay.com/v2/payment/check'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cpm_trans_id } = body

    if (!cpm_trans_id) {
      return NextResponse.json({ error: 'transaction_id manquant' }, { status: 400 })
    }

    /* Vérification auprès de CinetPay */
    const res = await fetch(CINETPAY_VERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apikey:         process.env.CINETPAY_API_KEY,
        site_id:        process.env.CINETPAY_SITE_ID,
        transaction_id: cpm_trans_id,
      }),
    })

    const data = await res.json()
    const payment = data?.data

    if (!payment) {
      return NextResponse.json({ error: 'Impossible de vérifier le paiement.' }, { status: 502 })
    }

    const statut = payment.status === 'ACCEPTED' ? 'paye' : 'echec'

    await sql`
      UPDATE commandes
      SET
        statut              = ${statut},
        moyen_paiement      = ${payment.payment_method || null},
        cinetpay_status     = ${payment.status || null},
        date_paiement       = ${statut === 'paye' ? new Date().toISOString() : null},
        updated_at          = NOW()
      WHERE transaction_cinetpay = ${cpm_trans_id}
    `

    if (statut === 'paye') {
      /* Notifier par email (best-effort) */
      notifyAdmin(cpm_trans_id, payment).catch(console.error)
    }

    return NextResponse.json({ success: true, statut })
  } catch (err) {
    console.error('Webhook CinetPay error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

async function notifyAdmin(transactionId: string, payment: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'IBIG DIGITAL <noreply@ibig-digital.com>',
      to:   ['contact@ibig-digital.com'],
      subject: `✅ Paiement reçu — ${transactionId}`,
      html: `<h2>Nouveau paiement confirmé</h2>
        <p><strong>Référence :</strong> ${transactionId}</p>
        <p><strong>Montant :</strong> ${payment.amount} XOF</p>
        <p><strong>Méthode :</strong> ${payment.payment_method}</p>
        <p><strong>Client :</strong> ${payment.customer_name} ${payment.customer_surname}</p>
        <p><strong>Email :</strong> ${payment.customer_email}</p>
        <p><strong>Téléphone :</strong> ${payment.customer_phone_number}</p>`,
    }),
  })
}

/* CinetPay peut aussi envoyer un GET pour vérifier que le endpoint existe */
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
