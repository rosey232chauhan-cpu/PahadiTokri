import { Router } from 'express'
import { productCategories, findProductBySku } from '../data/products.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ categories: productCategories })
})

router.get('/:sku', (req, res) => {
  const product = findProductBySku(req.params.sku)
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' })
  }
  res.json({ product })
})

export default router
