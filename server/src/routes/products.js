import { Router } from 'express'
import { findProductBySku } from '../data/products.js'
import { storefrontImageTargets } from '../data/storefront-images.js'
import { listManagedImages } from '../store/images.js'
import { getProductCatalog } from '../store/catalog.js'
import { listPhotoStories } from '../store/photo-stories.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const productCategories = await getProductCatalog()
    const managedImages = new Map((await listManagedImages()).map((image) => [image.target, image]))
    const photoStories = (await listPhotoStories()).flatMap((story) => {
      const managedImage = managedImages.get(`photo-story:${story.id}`)
      return managedImage ? [{ ...story, image: `/api/media/${managedImage.id}` }] : []
    })
    const storefrontImages = Object.fromEntries(storefrontImageTargets.flatMap(({ target }) => {
      const managed = managedImages.get(target)
      return managed ? [[target, `/api/media/${managed.id}`]] : []
    }))
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
    res.json({ categories, storefrontImages, photoStories })
  } catch (error) {
    console.error('Unable to load product catalog images:', error)
    res.status(500).json({ error: 'Product catalog could not be loaded.' })
  }
})

router.get('/:sku', async (req, res) => {
  try {
    const categories = await getProductCatalog()
    const product = findProductBySku(req.params.sku, categories)
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }
    res.json({ product })
  } catch (error) {
    console.error('Unable to load product:', error)
    res.status(500).json({ error: 'Product could not be loaded.' })
  }
})

export default router
