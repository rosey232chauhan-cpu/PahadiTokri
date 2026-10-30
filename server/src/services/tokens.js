import crypto from 'node:crypto'

const tokenSecret = process.env.AUTH_TOKEN_SECRET || 'change-this-pahaditokri-secret'
const tokenLifetimeMs = 1000 * 60 * 60 * 24 * 30

export function createToken({ id, email, role }) {
  const payload = Buffer.from(JSON.stringify({
    sub: id,
    email,
    role,
    exp: Date.now() + tokenLifetimeMs,
  })).toString('base64url')
  const signature = crypto.createHmac('sha256', tokenSecret).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

export function verifyToken(token) {
  const [payload, signature, extra] = String(token ?? '').split('.')
  if (!payload || !signature || extra) return null

  const expected = crypto.createHmac('sha256', tokenSecret).update(payload).digest()
  let actual
  try {
    actual = Buffer.from(signature, 'base64url')
  } catch {
    return null
  }
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null

  try {
    const user = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!user.sub || !user.email || !user.role || !Number.isFinite(user.exp) || user.exp <= Date.now()) return null
    return user
  } catch {
    return null
  }
}
