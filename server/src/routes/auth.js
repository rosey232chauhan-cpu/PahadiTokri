import { Router } from 'express'
import crypto from 'node:crypto'
import { promisify } from 'node:util'
import { createUser, findUserByEmail } from '../store/users.js'
import { createToken } from '../services/tokens.js'

const router = Router()
const scrypt = promisify(crypto.scrypt)

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = await scrypt(password, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

async function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) return false
  const derivedKey = await scrypt(password, salt, 64)
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), derivedKey)
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body ?? {}
  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' })
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' })
  }
  if (await findUserByEmail(email)) {
    return res.status(409).json({ error: 'An account with this email already exists.' })
  }
  const user = await createUser({ name, email, passwordHash: await hashPassword(password) })
  res.status(201).json({ user: publicUser(user), token: createToken({ ...user, role: 'customer' }) })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  const user = email ? await findUserByEmail(email) : null
  if (!user || !password || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Email or password is incorrect.' })
  }
  res.json({ user: publicUser(user), token: createToken({ ...user, role: 'customer' }) })
})

export default router
