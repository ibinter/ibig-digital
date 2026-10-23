import nodemailer from 'nodemailer'

/* Envoi via la messagerie LWS (SMTP mail.ibig-digital.com) */
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465)

const smtp = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth:   { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null

export async function sendEmail(to: string, subject: string, html: string) {
  if (!smtp) {
    console.warn('[email] SMTP non configuré — e-mail ignoré :', subject)
    return { ok: false }
  }
  try {
    await smtp.sendMail({
      from: process.env.EMAIL_FROM ?? 'IBIG DIGITAL <support@ibig-digital.com>',
      to,
      subject,
      html,
    })
    return { ok: true }
  } catch (err) {
    console.error('[email] SMTP :', err instanceof Error ? err.message : err)
    return { ok: false }
  }
}
