import crypto from 'node:crypto'
import express, { Router } from 'express'
import { productCategories } from '../data/products.js'
import { createToken, verifyToken } from '../services/tokens.js'
import { deleteManagedImage, listManagedImages, saveManagedImage } from '../store/images.js'

const router = Router()
const maxImageSize = 2 * 1024 * 1024
const supportedImageTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
])

function equalSecret(left, right) {
  const leftBuffer = Buffer.from(String(left))
  const rightBuffer = Buffer.from(String(right))
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function requireAdmin(req, res, next) {
  if (!process.env.AUTH_TOKEN_SECRET || Buffer.byteLength(process.env.AUTH_TOKEN_SECRET) < 32) {
    return res.status(503).json({ error: 'Admin authentication is not configured. Set a random AUTH_TOKEN_SECRET of at least 32 characters.' })
  }
  const authorization = req.get('authorization') ?? ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
  const user = verifyToken(token)
  if (!user || user.role !== 'admin') {
    return res.status(401).json({ error: 'Admin login is required.' })
  }
  req.admin = user
  next()
}

function listImageTargets() {
  return productCategories.flatMap((category) => [
    { target: `category:${category.slug}`, label: `${category.name} — category image`, image: category.image },
    ...category.items.map((item) => ({
      target: `product:${item.sku}`,
      label: `${item.name} — product image`,
      image: item.image,
    })),
  ])
}

function matchesImageSignature(buffer, mimeType) {
  if (mimeType === 'image/jpeg') return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  if (mimeType === 'image/png') return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  if (mimeType === 'image/webp') return buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP'
  if (mimeType === 'image/gif') return ['GIF87a', 'GIF89a'].includes(buffer.toString('ascii', 0, 6))
  return false
}

router.post('/login', (req, res) => {
  const { email, password } = req.body ?? {}
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword || !process.env.AUTH_TOKEN_SECRET || Buffer.byteLength(process.env.AUTH_TOKEN_SECRET) < 32) {
    return res.status(503).json({ error: 'Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and a random AUTH_TOKEN_SECRET of at least 32 characters.' })
  }
  if (!equalSecret(String(email ?? '').trim().toLowerCase(), adminEmail) || !equalSecret(password ?? '', adminPassword)) {
    return res.status(401).json({ error: 'Email or password is incorrect.' })
  }

  const user = { id: 'admin', email: adminEmail, name: 'Admin', role: 'admin' }
  res.json({ user, token: createToken(user) })
})

router.get('/images', requireAdmin, async (_req, res) => {
  try {
    const managedImages = await listManagedImages()
    const byTarget = new Map(managedImages.map((image) => [image.target, image]))
    const images = listImageTargets().map((entry) => {
      const managed = byTarget.get(entry.target)
      return {
        ...entry,
        image: managed ? `/api/media/${managed.id}` : entry.image,
        customized: Boolean(managed),
      }
    })
    res.json({ images })
  } catch (error) {
    console.error('Unable to load admin image list:', error)
    res.status(500).json({ error: 'Images could not be loaded.' })
  }
})

router.post('/images', requireAdmin, express.raw({ type: [...supportedImageTypes.keys()], limit: maxImageSize }), async (req, res) => {
  const target = String(req.query.target ?? '')
  const targetInfo = listImageTargets().find((entry) => entry.target === target)
  const mimeType = req.get('content-type')?.split(';')[0].trim().toLowerCase()
  const extension = supportedImageTypes.get(mimeType)
  if (!targetInfo) return res.status(400).json({ error: 'Choose a valid product or category image.' })
  if (!extension) return res.status(415).json({ error: 'Upload a JPEG, PNG, WebP, or GIF image.' })
  if (!Buffer.isBuffer(req.body) || req.body.length === 0) return res.status(400).json({ error: 'Select an image to upload.' })
  if (req.body.length > maxImageSize) return res.status(413).json({ error: 'Images must be 2 MB or smaller.' })
  if (!matchesImageSignature(req.body, mimeType)) return res.status(400).json({ error: 'The uploaded file is not a valid image of the selected type.' })

  try {
    const image = await saveManagedImage({
      target,
      filename: `${target.replace(/[^a-z0-9-]/gi, '-')}.${extension}`,
      mimeType,
      data: req.body,
    })
    res.status(201).json({ image: { target, label: targetInfo.label, image: `/api/media/${image.id}`, customized: true } })
  } catch (error) {
    console.error('Unable to save admin image:', error)
    res.status(500).json({ error: 'Image could not be saved.' })
  }
})

router.delete('/images/:target', requireAdmin, async (req, res) => {
  const target = String(req.params.target ?? '')
  if (!listImageTargets().some((entry) => entry.target === target)) {
    return res.status(400).json({ error: 'Choose a valid product or category image.' })
  }
  try {
    const removed = await deleteManagedImage(target)
    if (!removed) return res.status(404).json({ error: 'No custom image is set for this item.' })
    res.json({ success: true })
  } catch (error) {
    console.error('Unable to remove admin image:', error)
    res.status(500).json({ error: 'Image could not be removed.' })
  }
})

export default router
