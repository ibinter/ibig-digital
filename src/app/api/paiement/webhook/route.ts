import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import sql from '@/lib/db'

const MONEROO_VERIFY = 'https://api.moneroo.io/v1/payments'

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-moneroo-signature') ?? ''

    /* ── Vérification signature HMAC-SHA256 ── */
    const webhookSecret = process.env.MONEROO_WEBHOOK_SECRET
    if (webhookSecret) {
      const expected = createHmac('sha256', webhookSecret).update(rawBody).digest('hex')
      if (expected !== signature) {
        console.warn('Webhook Moneroo: signature invalide')
        return NextResponse.json({ error: 'Signature invalide.' }, { status: 403 })
      }
    }

    const body = JSON.parse(rawBody)
    const { event, data: payment } = body

    if (!payment?.id) {
      return NextResponse.json({ error: 'Payload invalide.' }, { status: 400 })
    }

    /* ── Re-vérification auprès de Moneroo ── */
    const verifyRes = await fetch(`${MONEROO_VERIFY}/${payment.id}/verify`, {
      headers: {
        'Authorization': `Bearer ${process.env.MONEROO_SECRET_KEY}`,
        'Accept':        'application/json',
      },
    })
    const verifyData = await verifyRes.json()
    const verified = verifyData?.data

    if (!verified) {
      return NextResponse.json({ error: 'Impossible de vérifier le paiement.' }, { status: 502 })
    }

    const statut = verified.status === 'success' ? 'paye' : 'echec'
    const transactionId = verified.metadata?.transaction_id ?? payment.id

    await sql`
      UPDATE commandes
      SET
        statut          = ${statut},
        moyen_paiement  = ${verified.capture?.gateway ?? null},
        cinetpay_status = ${verified.status ?? null},
        date_paiement   = ${statut === 'paye' ? new Date().toISOString() : null},
        updated_at      = NOW()
      WHERE reference = ${transactionId}
         OR transaction_cinetpay = ${transactionId}
    `

    if (statut === 'paye') {
      notifyAdmin(transactionId, verified).catch(console.error)
    }

    return NextResponse.json({ success: true, statut })
  } catch (err) {
    console.error('Webhook Moneroo error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

async function notifyAdmin(transactionId: string, payment: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const customer = payment.customer as Record<string, string> | undefined

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from:    'IBIG DIGITAL <noreply@ibig-digital.com>',
      to:      ['contact@ibig-digital.com'],
      subject: `✅ Paiement reçu — ${transactionId}`,
      html: `<h2>Nouveau paiement confirmé</h2>
        <p><strong>Référence :</strong> ${transactionId}</p>
        <p><strong>Montant :</strong> ${payment.amount} XOF</p>
        <p><strong>Méthode :</strong> ${(payment.capture as Record<string, unknown>)?.gateway ?? 'N/A'}</p>
        <p><strong>Client :</strong> ${customer?.first_name} ${customer?.last_name}</p>
        <p><strong>Email :</strong> ${customer?.email}</p>
        <p><strong>Téléphone :</strong> ${customer?.phone ?? 'N/A'}</p>`,
    }),
  })
}

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
