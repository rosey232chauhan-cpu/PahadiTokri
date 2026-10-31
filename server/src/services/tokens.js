import crypto from 'node:crypto'

const customerTokenLifetimeMs = 1000 * 60 * 60 * 24 * 30
const adminTokenLifetimeMs = 1000 * 60 * 60 * 12

export function isTokenSecretConfigured() {
  return Boolean(process.env.AUTH_TOKEN_SECRET && Buffer.byteLength(process.env.AUTH_TOKEN_SECRET) >= 32)
}

export function createToken({ id, email, role }) {
  if (!isTokenSecretConfigured()) {
    throw new Error('AUTH_TOKEN_SECRET must be at least 32 characters.')
  }
  const payload = Buffer.from(JSON.stringify({
    sub: id,
    email,
    role,
    exp: Date.now() + (role === 'admin' ? adminTokenLifetimeMs : customerTokenLifetimeMs),
  })).toString('base64url')
  const signature = crypto.createHmac('sha256', process.env.AUTH_TOKEN_SECRET).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

export function verifyToken(token) {
  if (!isTokenSecretConfigured()) return null
  const [payload, signature, extra] = String(token ?? '').split('.')
  if (!payload || !signature || extra) return null

  const expected = crypto.createHmac('sha256', process.env.AUTH_TOKEN_SECRET).update(payload).digest()
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
