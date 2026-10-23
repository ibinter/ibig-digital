import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import sql from '@/lib/db'
import { sendEmail } from '@/lib/email'

const GENIUSPAY_PAYMENTS = 'https://geniuspay.ci/api/v1/merchant/payments'

/* Signature GeniusPay = HMAC-SHA256(X-Webhook-Timestamp + "." + corps brut), en hex */
function signatureValide(rawBody: string, timestamp: string, signature: string, secret: string) {
  const expected = Buffer.from(createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex'))
  const received = Buffer.from(signature)
  return expected.length === received.length && timingSafeEqual(expected, received)
}

export async function POST(request: Request) {
  try {
    const rawBody   = await request.text()
    const signature = request.headers.get('x-webhook-signature') ?? ''
    const timestamp = request.headers.get('x-webhook-timestamp') ?? ''

    /* ── Vérification signature HMAC-SHA256 (obligatoire) + anti-rejeu 5 min ── */
    const webhookSecret = process.env.GENIUSPAY_WEBHOOK_SECRET
    if (!webhookSecret || !signatureValide(rawBody, timestamp, signature, webhookSecret)) {
      console.warn('Webhook GeniusPay: signature invalide')
      return NextResponse.json({ error: 'Signature invalide.' }, { status: 403 })
    }
    if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
      return NextResponse.json({ error: 'Webhook expiré.' }, { status: 400 })
    }

    const body  = JSON.parse(rawBody)
    const event = String(request.headers.get('x-webhook-event') ?? body.event ?? '')
    const payment = body.data ?? {}
    const transactionId: string | undefined = payment.metadata?.transaction_id

    /* Le compte GeniusPay est partagé avec d'autres sites : on ignore ce qui ne vient pas d'ici */
    if (!transactionId || payment.metadata?.site !== 'ibig-digital') {
      return NextResponse.json({ received: true, ignored: true })
    }

    /* ── Re-vérification auprès de GeniusPay ── */
    const verifyRes = await fetch(`${GENIUSPAY_PAYMENTS}/${encodeURIComponent(payment.reference)}`, {
      headers: {
        'X-API-Key':    process.env.GENIUSPAY_API_KEY ?? '',
        'X-API-Secret': process.env.GENIUSPAY_API_SECRET ?? '',
        'Accept':       'application/json',
      },
    })
    const verified = (await verifyRes.json().catch(() => ({})))?.data

    if (!verified) {
      return NextResponse.json({ error: 'Impossible de vérifier le paiement.' }, { status: 502 })
    }

    const statut =
      verified.status === 'completed' ? 'paye'
      : ['failed', 'cancelled', 'expired'].includes(verified.status) ? 'echec'
      : null
    if (!statut) {
      return NextResponse.json({ received: true, statut: verified.status, event })
    }

    const [commande] = await sql`
      UPDATE commandes
      SET
        statut          = ${statut},
        moyen_paiement  = ${verified.payment_provider ?? verified.payment_method ?? null},
        cinetpay_status = ${verified.status ?? null},
        date_paiement   = ${statut === 'paye' ? new Date().toISOString() : null},
        updated_at      = NOW()
      WHERE (reference = ${transactionId} OR transaction_cinetpay = ${transactionId})
        AND statut <> 'paye'
      RETURNING reference
    `

    /* Notification admin uniquement au premier passage en "payé" (GeniusPay peut réémettre) */
    if (statut === 'paye' && commande) {
      notifyAdmin(transactionId, verified).catch(console.error)
    }

    return NextResponse.json({ success: true, statut })
  } catch (err) {
    console.error('Webhook GeniusPay error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

async function notifyAdmin(transactionId: string, payment: Record<string, unknown>) {
  const customer = payment.customer as Record<string, string> | undefined

  await sendEmail(
    process.env.ADMIN_EMAIL ?? 'contact@ibig-digital.com',
    `✅ Paiement reçu — ${transactionId}`,
    `<h2>Nouveau paiement confirmé</h2>
      <p><strong>Référence :</strong> ${transactionId}</p>
      <p><strong>Référence GeniusPay :</strong> ${payment.reference}</p>
      <p><strong>Montant :</strong> ${payment.amount} XOF</p>
      <p><strong>Méthode :</strong> ${payment.payment_provider ?? payment.payment_method ?? 'N/A'}</p>
      <p><strong>Client :</strong> ${customer?.name ?? 'N/A'}</p>
      <p><strong>Email :</strong> ${customer?.email ?? 'N/A'}</p>
      <p><strong>Téléphone :</strong> ${customer?.phone ?? 'N/A'}</p>`,
  )
}

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
