import crypto from 'node:crypto'
import fs from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { getStore } from '@netlify/blobs'

const dataDir = process.env.DATA_DIR || path.join(tmpdir(), 'pahaditokri-data')
const usersFile = path.join(dataDir, 'users.json')
const useNetlifyBlobs = process.env.NETLIFY === 'true'

function normalizeEmail(email) {
  return String(email).trim().toLowerCase()
}

function userKey(email) {
  return `user:${encodeURIComponent(normalizeEmail(email))}`
}

function readUsers() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(usersFile)) return []
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf8'))
  } catch {
    return []
  }
}

function writeUsers(users) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8')
}

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email)
  if (useNetlifyBlobs) {
    const store = getStore({ name: 'pahaditokri-users', consistency: 'strong' })
    return store.get(userKey(normalizedEmail), { type: 'json' })
  }
  return readUsers().find((user) => user.email === normalizedEmail) ?? null
}

export async function createUser({ name, email, passwordHash }) {
  const user = {
    id: crypto.randomUUID(),
    name: String(name).trim().slice(0, 120),
    email: normalizeEmail(email).slice(0, 200),
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  if (useNetlifyBlobs) {
    const store = getStore({ name: 'pahaditokri-users', consistency: 'strong' })
    await store.setJSON(userKey(user.email), user)
    return user
  }
  const users = readUsers()
  users.push(user)
  writeUsers(users.slice(-10000))
  return user
}
