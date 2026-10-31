import { Router } from 'express'
import { findManagedImageById } from '../store/images.js'

const router = Router()

router.get('/:imageId', async (req, res) => {
  try {
    const image = await findManagedImageById(req.params.imageId)
    if (!image) return res.status(404).json({ error: 'Image not found.' })
    res.set({
      'Content-Type': image.mimeType,
      'Content-Length': image.data.length,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    })
    res.end(image.data)
  } catch (error) {
    console.error('Unable to load image:', error)
    res.status(500).json({ error: 'Image could not be loaded.' })
  }
})

export default router
