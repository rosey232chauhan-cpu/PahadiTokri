import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import contactRouter from './routes/contact.js'
import mediaRouter from './routes/media.js'
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
app.use('/api/admin', adminRouter)
app.use('/api/media', mediaRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/contact', contactRouter)

app.use((error, _req, res, next) => {
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Images must be 2 MB or smaller.' })
  }
  if (res.headersSent) return next(error)
  console.error(error)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

export default app
