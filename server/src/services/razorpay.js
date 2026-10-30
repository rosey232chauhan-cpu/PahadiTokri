import crypto from 'node:crypto'
import Razorpay from 'razorpay'

let client = null

export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    return null
  }
  if (!client) {
    client = new Razorpay({ key_id: keyId, key_secret: keySecret })
  }
  return client
}

export function getRazorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID ?? null
}

export function isOnlinePaymentsConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
}

export async function createRazorpayOrder({ amountPaise, receipt, notes }) {
  const razorpay = getRazorpayClient()
  if (!razorpay) {
    throw new Error('Razorpay is not configured on the server')
  }
  return razorpay.orders.create({
    amount: amountPaise,
    currency: 'INR',
    receipt,
    notes,
  })
}

export function verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return false
  }
  const payload = `${razorpayOrderId}|${razorpayPaymentId}`
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return expected === razorpaySignature
}

export function verifyWebhookSignature(rawBody, signature) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret || !signature) {
    return false
  }
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  return expected === signature
}
