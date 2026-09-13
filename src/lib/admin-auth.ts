import crypto from 'crypto'
import { cookies } from 'next/headers'

const SECRET = process.env.ADMIN_SECRET ?? 'ibig-admin-secret-change-in-prod'
const COOKIE = 'ibig_admin_session'
const TTL_MS = 8 * 60 * 60 * 1000 // 8 heures

/* Identifiants admin depuis les variables d'environnement */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@ibig-digital.com'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'IbigAdmin2026!'

function signToken(adminId: string): string {
  const ts = Date.now().toString()
  const payload = `${adminId}|${ts}`
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}|${sig}`).toString('base64url')
}

function verifyToken(token: string): { adminId: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const parts = decoded.split('|')
    if (parts.length !== 3) return null
    const [adminId, ts, sig] = parts
    const payload = `${adminId}|${ts}`
    const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return null
    if (Date.now() - Number(ts) > TTL_MS) return null
    return { adminId }
  } catch {
    return null
  }
}

export function createAdminSession(): string {
  return signToken('ibig-admin')
}

export async function getAdminSession(): Promise<{ adminId: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

export const ADMIN_COOKIE = COOKIE
