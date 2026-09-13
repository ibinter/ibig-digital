import crypto from 'crypto'
import { cookies } from 'next/headers'
import sql from './db'

const SECRET = process.env.SESSION_SECRET ?? 'ibig-digital-secret-key-change-in-prod'
const COOKIE = 'ibig_client_session'
const TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 jours

/* ─── Mot de passe ──────────────────────────────────────────────────────── */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex')
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err)
      else resolve(`${salt}:${key.toString('hex')}`)
    })
  })
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err)
      else resolve(crypto.timingSafeEqual(Buffer.from(hash, 'hex'), key))
    })
  })
}

/* ─── Token de session ──────────────────────────────────────────────────── */
function signToken(clientId: string): string {
  const ts = Date.now().toString()
  const payload = `${clientId}|${ts}`
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}|${sig}`).toString('base64url')
}

function verifyToken(token: string): { clientId: string; ts: number } | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const parts = decoded.split('|')
    if (parts.length !== 3) return null
    const [clientId, ts, sig] = parts
    const payload = `${clientId}|${ts}`
    const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return null
    if (Date.now() - Number(ts) > TTL_MS) return null
    return { clientId, ts: Number(ts) }
  } catch {
    return null
  }
}

/* ─── Session ───────────────────────────────────────────────────────────── */
export async function createSession(clientId: string): Promise<string> {
  return signToken(clientId)
}

export async function getSession(): Promise<{ clientId: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE)?.value
  if (!token) return null
  const result = verifyToken(token)
  if (!result) return null
  return { clientId: result.clientId }
}

export async function getClient() {
  const session = await getSession()
  if (!session) return null
  const rows = await sql`SELECT id, email, name, phone, company, country, created_at FROM clients WHERE id = ${session.clientId} AND is_active = true LIMIT 1`
  return (rows[0] as ClientRow) ?? null
}

export const SESSION_COOKIE = COOKIE

export interface ClientRow {
  id: string
  email: string
  name: string
  phone?: string
  company?: string
  country?: string
  created_at: string
}
