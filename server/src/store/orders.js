import fs from 'node:fs'
import path from 'node:path'
import { getStore } from '@netlify/blobs'

const dataDir = process.env.DATA_DIR || path.join('/tmp', 'pahaditokri-data')
const ordersFile = path.join(dataDir, 'orders.json')
const contactsFile = path.join(dataDir, 'contacts.json')
const useNetlifyBlobs = process.env.NETLIFY === 'true'

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

async function readJson(file, fallback, storeName, key) {
  if (useNetlifyBlobs) {
    const store = getStore({ name: storeName, consistency: 'strong' })
    return (await store.get(key, { type: 'json' })) ?? fallback
  }
  ensureDataDir()
  if (!fs.existsSync(file)) {
    return fallback
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

async function writeJson(file, data, storeName, key) {
  if (useNetlifyBlobs) {
    const store = getStore({ name: storeName, consistency: 'strong' })
    await store.setJSON(key, data)
    return
  }
  ensureDataDir()
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

export async function saveOrder(order) {
  const orders = await readJson(ordersFile, [], 'pahaditokri-orders', 'orders')
  orders.unshift(order)
  await writeJson(ordersFile, orders.slice(0, 500), 'pahaditokri-orders', 'orders')
  return order
}

export async function updateOrder(orderId, patch) {
  const orders = await readJson(ordersFile, [], 'pahaditokri-orders', 'orders')
  const index = orders.findIndex((entry) => entry.orderId === orderId)
  if (index === -1) {
    return null
  }
  orders[index] = { ...orders[index], ...patch, updatedAt: new Date().toISOString() }
  await writeJson(ordersFile, orders, 'pahaditokri-orders', 'orders')
  return orders[index]
}

export async function getOrderById(orderId) {
  const orders = await readJson(ordersFile, [], 'pahaditokri-orders', 'orders')
  return orders.find((entry) => entry.orderId === orderId) ?? null
}

export async function getOrderByRazorpayOrderId(razorpayOrderId) {
  const orders = await readJson(ordersFile, [], 'pahaditokri-orders', 'orders')
  return orders.find((entry) => entry.razorpayOrderId === razorpayOrderId) ?? null
}

export async function listOrdersByPhone(phone) {
  const orders = await readJson(ordersFile, [], 'pahaditokri-orders', 'orders')
  const normalized = String(phone).replace(/\D/g, '')
  return orders.filter((entry) => String(entry.phone).replace(/\D/g, '') === normalized)
}

export async function saveContactMessage(message) {
  const contacts = await readJson(contactsFile, [], 'pahaditokri-contacts', 'messages')
  contacts.unshift(message)
  await writeJson(contactsFile, contacts.slice(0, 200), 'pahaditokri-contacts', 'messages')
  return message
}
