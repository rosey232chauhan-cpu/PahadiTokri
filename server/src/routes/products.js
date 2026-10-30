import { Router } from 'express'
import { productCategories, findProductBySku } from '../data/products.js'
import { listManagedImages } from '../store/images.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const managedImages = new Map((await listManagedImages()).map((image) => [image.target, image]))
    const categories = productCategories.map((category) => {
      const managedCategoryImage = managedImages.get(`category:${category.slug}`)
      const items = category.items.map((item) => {
        const managedProductImage = managedImages.get(`product:${item.sku}`)
        return { ...item, image: managedProductImage ? `/api/media/${managedProductImage.id}` : item.image }
      })
      return {
        ...category,
        image: managedCategoryImage ? `/api/media/${managedCategoryImage.id}` : category.image,
        items,
      }
    })
    res.json({ categories })
  } catch (error) {
    console.error('Unable to load product catalog images:', error)
    res.status(500).json({ error: 'Product catalog could not be loaded.' })
  }
})

router.get('/:sku', (req, res) => {
  const product = findProductBySku(req.params.sku)
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' })
  }
  res.json({ product })
})

export default router
