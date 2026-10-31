import crypto from 'node:crypto'
import express, { Router } from 'express'
import { productCategories } from '../data/products.js'
import { storefrontImageTargets } from '../data/storefront-images.js'
import { createToken, isTokenSecretConfigured, verifyToken } from '../services/tokens.js'
import { addCatalogProduct, getProductCatalog, removeCatalogProduct, updateCatalogProduct } from '../store/catalog.js'
import { deleteManagedImage, listManagedImages, saveManagedImage } from '../store/images.js'
import { deletePhotoStory, listPhotoStories, savePhotoStory } from '../store/photo-stories.js'

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
  if (!isTokenSecretConfigured()) {
    return res.status(503).json({ error: 'Admin authentication is not configured. Set a random AUTH_TOKEN_SECRET of at least 32 characters.' })
  }
  const authorization = req.get('authorization') ?? ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
  const user = verifyToken(token)
  if (!user || user.role !== 'admin' || user.email !== getAdminEmail()) {
    return res.status(401).json({ error: 'Admin login is required.' })
  }
  req.admin = user
  next()
}

function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || 'rosey232chauhan@gmail.com').trim().toLowerCase()
}

function listImageTargets(categories = productCategories) {
  const catalogTargets = categories.flatMap((category) => [
    { target: `category:${category.slug}`, label: `${category.name} — category image`, image: category.image },
    ...category.items.map((item) => ({
      target: `product:${item.sku}`,
      label: `${item.name} — product image`,
      image: item.image,
    })),
  ])
  return [...catalogTargets, ...storefrontImageTargets]
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
  const adminEmail = getAdminEmail()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword || adminPassword.length < 12 || !isTokenSecretConfigured()) {
    return res.status(503).json({ error: 'Admin login is not configured. Set ADMIN_PASSWORD (at least 12 characters) and a random AUTH_TOKEN_SECRET of at least 32 characters.' })
  }
  if (typeof email !== 'string' || typeof password !== 'string' || password.length > 1024
    || !equalSecret(email.trim().toLowerCase(), adminEmail) || !equalSecret(password, adminPassword)) {
    return res.status(401).json({ error: 'Email or password is incorrect.' })
  }

  const user = { id: 'admin', email: adminEmail, name: 'Admin', role: 'admin' }
  res.json({ user, token: createToken(user) })
})

router.get('/images', requireAdmin, async (_req, res) => {
  try {
    const categories = await getProductCatalog()
    const managedImages = await listManagedImages()
    const byTarget = new Map(managedImages.map((image) => [image.target, image]))
    const images = listImageTargets(categories).map((entry) => {
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
  let targetInfo
  try {
    targetInfo = listImageTargets(await getProductCatalog()).find((entry) => entry.target === target)
  } catch (error) {
    console.error('Unable to load image targets:', error)
    return res.status(500).json({ error: 'Image targets could not be loaded.' })
  }
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
  let imageTargets
  try {
    imageTargets = listImageTargets(await getProductCatalog())
  } catch (error) {
    console.error('Unable to load image targets:', error)
    return res.status(500).json({ error: 'Image targets could not be loaded.' })
  }
  if (!imageTargets.some((entry) => entry.target === target)) {
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

router.get('/photo-stories', requireAdmin, async (_req, res) => {
  try {
    const stories = await listPhotoStories()
    const managedImages = new Map((await listManagedImages()).map((image) => [image.target, image]))
    res.json({
      stories: stories.flatMap((story) => {
        const image = managedImages.get(`photo-story:${story.id}`)
        return image ? [{ ...story, image: `/api/media/${image.id}` }] : []
      }),
    })
  } catch (error) {
    console.error('Unable to load admin photo stories:', error)
    res.status(500).json({ error: 'Photo stories could not be loaded.' })
  }
})

router.post('/photo-stories', requireAdmin, express.raw({ type: [...supportedImageTypes.keys()], limit: maxImageSize }), async (req, res) => {
  const { title, label, description } = req.query
  const mimeType = req.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (typeof title !== 'string' || !title.trim() || title.trim().length > 120) {
    return res.status(400).json({ error: 'Photo title must be between 1 and 120 characters.' })
  }
  if (typeof label !== 'string' || !label.trim() || label.trim().length > 60) {
    return res.status(400).json({ error: 'Photo label must be between 1 and 60 characters.' })
  }
  if (typeof description !== 'string' || description.trim().length > 240) {
    return res.status(400).json({ error: 'Photo description must be no more than 240 characters.' })
  }
  if (!supportedImageTypes.has(mimeType)) return res.status(415).json({ error: 'Upload a JPEG, PNG, WebP, or GIF image.' })
  if (!Buffer.isBuffer(req.body) || req.body.length === 0) return res.status(400).json({ error: 'Select an image to upload.' })
  if (!matchesImageSignature(req.body, mimeType)) return res.status(400).json({ error: 'The uploaded file is not a valid image of the selected type.' })

  const id = crypto.randomUUID()
  const target = `photo-story:${id}`
  try {
    const image = await saveManagedImage({
      target,
      filename: `${id}.${supportedImageTypes.get(mimeType)}`,
      mimeType,
      data: req.body,
    })
    const story = await savePhotoStory({
      id,
      title: title.trim(),
      label: label.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
    })
    res.status(201).json({ story: { ...story, image: `/api/media/${image.id}` } })
  } catch (error) {
    console.error('Unable to save admin photo story:', error)
    try {
      await deleteManagedImage(target)
    } catch (cleanupError) {
      console.error('Unable to clean up an incomplete photo story image:', cleanupError)
    }
    res.status(500).json({ error: 'Photo story could not be saved.' })
  }
})

router.delete('/photo-stories/:id', requireAdmin, async (req, res) => {
  try {
    const story = await deletePhotoStory(req.params.id)
    if (!story) return res.status(404).json({ error: 'Photo story not found.' })
    await deleteManagedImage(`photo-story:${story.id}`)
    res.json({ success: true })
  } catch (error) {
    console.error('Unable to remove admin photo story:', error)
    res.status(500).json({ error: 'Photo story could not be removed.' })
  }
})

router.get('/products', requireAdmin, async (_req, res) => {
  try {
    const categories = await getProductCatalog()
    res.json({ products: categories.flatMap((category) => category.items.map((item) => ({
      ...item,
      categoryName: category.name,
      categorySlug: category.slug,
    }))) })
  } catch (error) {
    console.error('Unable to load admin product list:', error)
    res.status(500).json({ error: 'Products could not be loaded.' })
  }
})

router.post('/products', requireAdmin, async (req, res) => {
  const { name, info, priceInRupees, categorySlug } = req.body ?? {}
  const price = Number(priceInRupees)
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
    return res.status(400).json({ error: 'Product name must be between 1 and 100 characters.' })
  }
  if (typeof info !== 'string' || !info.trim() || info.trim().length > 500) {
    return res.status(400).json({ error: 'Product description must be between 1 and 500 characters.' })
  }
  if (!Number.isFinite(price) || price <= 0 || price > 100000) {
    return res.status(400).json({ error: 'Price must be greater than ₹0 and no more than ₹100,000 per kg.' })
  }
  if (typeof categorySlug !== 'string' || !productCategories.some((category) => category.slug === categorySlug)) {
    return res.status(400).json({ error: 'Choose a valid product category.' })
  }
  try {
    const product = await addCatalogProduct({
      name: name.trim(),
      info: info.trim(),
      priceInRupees: Math.round(price * 100) / 100,
      categorySlug,
    })
    res.status(201).json({ product })
  } catch (error) {
    console.error('Unable to add admin product:', error)
    res.status(500).json({ error: 'Product could not be added.' })
  }
})

router.delete('/products/:sku', requireAdmin, async (req, res) => {
  try {
    const categories = await getProductCatalog()
    const exists = categories.some((category) => category.items.some((item) => item.sku === req.params.sku))
    if (!exists) return res.status(404).json({ error: 'Product not found.' })
    await deleteManagedImage(`product:${req.params.sku}`)
    const removed = await removeCatalogProduct(req.params.sku)
    if (!removed) return res.status(404).json({ error: 'Product not found.' })
    res.json({ success: true })
  } catch (error) {
    console.error('Unable to remove admin product:', error)
    res.status(500).json({ error: 'Product could not be removed.' })
  }
})

router.put('/products/:sku', requireAdmin, async (req, res) => {
  const categories = await getProductCatalog().catch((error) => {
    console.error('Unable to load product catalog for update:', error)
    return null
  })
  if (!categories) return res.status(500).json({ error: 'Product could not be updated.' })
  const product = categories.flatMap((category) => category.items).find((item) => item.sku === req.params.sku)
  if (!product) return res.status(404).json({ error: 'Product not found.' })

  const { name, info, priceInRupees, isAvailable } = req.body ?? {}
  const price = Number(priceInRupees)
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
    return res.status(400).json({ error: 'Product name must be between 1 and 100 characters.' })
  }
  if (typeof info !== 'string' || !info.trim() || info.trim().length > 500) {
    return res.status(400).json({ error: 'Product description must be between 1 and 500 characters.' })
  }
  if (!Number.isFinite(price) || price <= 0 || price > 100000) {
    return res.status(400).json({ error: 'Price must be greater than ₹0 and no more than ₹100,000 per kg.' })
  }
  if (typeof isAvailable !== 'boolean') {
    return res.status(400).json({ error: 'Choose whether this product is available for orders.' })
  }

  try {
    const updated = await updateCatalogProduct(req.params.sku, {
      name: name.trim(),
      info: info.trim(),
      priceInRupees: Math.round(price * 100) / 100,
      isAvailable,
    })
    res.json({ product: updated })
  } catch (error) {
    console.error('Unable to update admin product:', error)
    res.status(500).json({ error: 'Product could not be updated.' })
  }
})

export default router
