import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import contactRouter from './routes/contact.js'
import ordersRouter from './routes/orders.js'
import paymentsRouter from './routes/payments.js'
import productsRouter from './routes/products.js'

const app = express()
const allowedOrigins = (process.env.CLIENT_ORIGIN || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins.includes('*') ? true : allowedOrigins }))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'pahaditokri-api' })
})
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/contact', contactRouter)

app.use((error, _req, res, next) => {
  void next
  console.error(error)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

export default app
