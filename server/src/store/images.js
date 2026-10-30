import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { getStore } from '@netlify/blobs'

const dataDir = process.env.DATA_DIR || path.join('/tmp', 'pahaditokri-data')
const imagesFile = path.join(dataDir, 'images.json')
const useNetlifyBlobs = process.env.NETLIFY === 'true'
const blobStoreName = 'pahaditokri-images'
const blobKey = 'catalog-images'

function readLocalImages() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(imagesFile)) return []
  return JSON.parse(fs.readFileSync(imagesFile, 'utf8'))
}

function writeLocalImages(images) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(imagesFile, JSON.stringify(images), 'utf8')
}

async function readImages() {
  if (!useNetlifyBlobs) return readLocalImages()
  const store = getStore({ name: blobStoreName, consistency: 'strong' })
  return (await store.get(blobKey, { type: 'json' })) ?? []
}

async function writeImages(images) {
  if (!useNetlifyBlobs) {
    writeLocalImages(images)
    return
  }
  const store = getStore({ name: blobStoreName, consistency: 'strong' })
  await store.setJSON(blobKey, images)
}

export async function listManagedImages() {
  const images = await readImages()
  return images.map((image) => ({
    id: image.id,
    target: image.target,
    filename: image.filename,
    mimeType: image.mimeType,
    createdAt: image.createdAt,
  }))
}

export async function findManagedImageById(id) {
  const images = await readImages()
  return images.find((image) => image.id === id) ?? null
}

export async function saveManagedImage({ target, filename, mimeType, data }) {
  const images = await readImages()
  const image = {
    id: crypto.randomUUID(),
    target,
    filename,
    mimeType,
    data: data.toString('base64'),
    createdAt: new Date().toISOString(),
  }
  await writeImages([...images.filter((entry) => entry.target !== target), image])
  return image
}

export async function deleteManagedImage(target) {
  const images = await readImages()
  const nextImages = images.filter((image) => image.target !== target)
  if (nextImages.length === images.length) return false
  await writeImages(nextImages)
  return true
}
