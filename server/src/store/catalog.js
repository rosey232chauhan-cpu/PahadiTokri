import fs from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { getStore } from '@netlify/blobs'
import { productCategories } from '../data/products.js'

const dataDir = process.env.DATA_DIR || path.join(tmpdir(), 'pahaditokri-data')
const catalogFile = path.join(dataDir, 'catalog.json')
const useNetlifyBlobs = process.env.NETLIFY === 'true'
const blobStoreName = 'pahaditokri-catalog'
const blobKey = 'product-overrides'

async function readOverrides() {
  if (useNetlifyBlobs) {
    const store = getStore({ name: blobStoreName, consistency: 'strong' })
    return (await store.get(blobKey, { type: 'json' })) ?? {}
  }
  if (!fs.existsSync(catalogFile)) return {}
  return JSON.parse(fs.readFileSync(catalogFile, 'utf8'))
}

async function writeOverrides(overrides) {
  if (useNetlifyBlobs) {
    const store = getStore({ name: blobStoreName, consistency: 'strong' })
    await store.setJSON(blobKey, overrides)
    return
  }
  fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(catalogFile, JSON.stringify(overrides, null, 2), 'utf8')
}

function applyOverrides(overrides) {
  return productCategories.map((category) => ({
    ...category,
    items: category.items.map((item) => {
      const saved = overrides[item.sku] ?? {}
      const priceInRupees = saved.priceInRupees ?? item.priceInRupees
      return {
        ...item,
        ...saved,
        priceInRupees,
        price: `₹${priceInRupees}/kg`,
        isAvailable: saved.isAvailable ?? true,
      }
    }),
  }))
}

export async function getProductCatalog() {
  return applyOverrides(await readOverrides())
}

export async function updateCatalogProduct(sku, changes) {
  const overrides = await readOverrides()
  overrides[sku] = { ...overrides[sku], ...changes }
  await writeOverrides(overrides)
  const catalog = applyOverrides(overrides)
  return catalog.flatMap((category) => category.items).find((item) => item.sku === sku)
}
