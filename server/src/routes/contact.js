import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { saveContactMessage } from '../store/orders.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body ?? {}
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  let entry
  try {
    entry = await saveContactMessage({
      id: uuidv4(),
      name: String(name).trim().slice(0, 120),
      email: String(email).trim().slice(0, 200),
      message: String(message).trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
    })
  } catch {
    return res.status(500).json({ error: 'Message could not be saved.' })
  }
  res.status(201).json({ success: true, id: entry.id })
})

export default router
