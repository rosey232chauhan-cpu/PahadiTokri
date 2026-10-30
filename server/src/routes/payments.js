import { Router } from 'express'
import { getOrderById, updateOrder } from '../store/orders.js'
import { verifyPaymentSignature } from '../services/razorpay.js'

const router = Router()

router.post('/verify', async (req, res) => {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body ?? {}
  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({ error: 'Payment verification details are required.' })
  }
  let existingOrder
  try {
    existingOrder = await getOrderById(orderId)
  } catch {
    return res.status(500).json({ error: 'Order could not be loaded.' })
  }
  if (!existingOrder || existingOrder.razorpayOrderId !== razorpayOrderId) {
    return res.status(400).json({ error: 'Payment does not match this order.' })
  }
  if (existingOrder.status === 'paid') {
    return res.status(409).json({ error: 'This order has already been paid.' })
  }
  if (!verifyPaymentSignature({ razorpayOrderId: existingOrder.razorpayOrderId, razorpayPaymentId, razorpaySignature })) {
    return res.status(400).json({ error: 'Invalid payment signature.' })
  }
  let order
  try {
    order = await updateOrder(orderId, {
      status: 'paid',
      razorpayPaymentId,
      razorpayOrderId,
    })
  } catch {
    return res.status(500).json({ error: 'Payment status could not be saved.' })
  }
  if (!order) {
    return res.status(404).json({ error: 'Order not found.' })
  }
  res.json({ success: true, order })
})

export default router
