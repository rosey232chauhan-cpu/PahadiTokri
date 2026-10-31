import crypto from 'node:crypto'
import fs from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { getStore } from '@netlify/blobs'

const dataDir = process.env.DATA_DIR || path.join(tmpdir(), 'pahaditokri-data')
const imageDirectory = path.join(dataDir, 'images')
const imageIndexFile = path.join(dataDir, 'images-index.json')
const legacyImagesFile = path.join(dataDir, 'images.json')
const useNetlifyBlobs = process.env.NETLIFY === 'true'
const blobStoreName = 'pahaditokri-images'
const imageIndexKey = 'catalog-image-index'
const legacyImageIndexKey = 'catalog-images'
const imageIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function assertImageId(id) {
  if (!imageIdPattern.test(id)) throw new Error('Invalid image ID in image index.')
}

function localImagePath(id) {
  assertImageId(id)
  return path.join(imageDirectory, `${id}.bin`)
}

function getBlobStore() {
  return getStore({ name: blobStoreName, consistency: 'strong' })
}

async function writeImageData(id, data) {
  if (useNetlifyBlobs) {
    await getBlobStore().set(`image:${id}`, data)
    return
  }
  fs.mkdirSync(imageDirectory, { recursive: true })
  fs.writeFileSync(localImagePath(id), data)
}

async function readImageData(id) {
  assertImageId(id)
  if (useNetlifyBlobs) {
    const data = await getBlobStore().get(`image:${id}`, { type: 'arrayBuffer' })
    return data ? Buffer.from(data) : null
  }
  const file = localImagePath(id)
  return fs.existsSync(file) ? fs.readFileSync(file) : null
}

async function deleteImageData(id) {
  assertImageId(id)
  if (useNetlifyBlobs) {
    await getBlobStore().delete(`image:${id}`)
    return
  }
  const file = localImagePath(id)
  if (fs.existsSync(file)) fs.unlinkSync(file)
}

function imageMetadata(image) {
  return {
    id: image.id,
    target: image.target,
    filename: image.filename,
    mimeType: image.mimeType,
    createdAt: image.createdAt,
  }
}

async function readImageIndex() {
  if (useNetlifyBlobs) {
    const store = getBlobStore()
    const currentIndex = await store.get(imageIndexKey, { type: 'json' })
    if (Array.isArray(currentIndex)) return currentIndex
    const legacyImages = await store.get(legacyImageIndexKey, { type: 'json' })
    if (!Array.isArray(legacyImages)) return []
    const migratedIndex = []
    for (const image of legacyImages) {
      if (!image.id || typeof image.data !== 'string') throw new Error('Stored legacy image data is invalid.')
      await writeImageData(image.id, Buffer.from(image.data, 'base64'))
      migratedIndex.push(imageMetadata(image))
    }
    await store.setJSON(imageIndexKey, migratedIndex)
    return migratedIndex
  }

  if (fs.existsSync(imageIndexFile)) {
    const images = JSON.parse(fs.readFileSync(imageIndexFile, 'utf8'))
    if (!Array.isArray(images)) throw new Error('Stored image index is invalid.')
    return images
  }
  if (!fs.existsSync(legacyImagesFile)) return []

  const legacyImages = JSON.parse(fs.readFileSync(legacyImagesFile, 'utf8'))
  if (!Array.isArray(legacyImages)) throw new Error('Stored legacy image data is invalid.')
  const migratedIndex = []
  for (const image of legacyImages) {
    if (!image.id || typeof image.data !== 'string') throw new Error('Stored legacy image data is invalid.')
    await writeImageData(image.id, Buffer.from(image.data, 'base64'))
    migratedIndex.push(imageMetadata(image))
  }
  await writeImageIndex(migratedIndex)
  return migratedIndex
}

async function writeImageIndex(images) {
  if (useNetlifyBlobs) {
    await getBlobStore().setJSON(imageIndexKey, images)
    return
  }
  fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(imageIndexFile, JSON.stringify(images, null, 2), 'utf8')
}

export async function listManagedImages() {
  return (await readImageIndex()).map(imageMetadata)
}

export async function findManagedImageById(id) {
  const image = (await readImageIndex()).find((entry) => entry.id === id)
  if (!image) return null
  const data = await readImageData(image.id)
  return data ? { ...image, data } : null
}

export async function saveManagedImage({ target, filename, mimeType, data }) {
  const images = await readImageIndex()
  const image = {
    id: crypto.randomUUID(),
    target,
    filename,
    mimeType,
    createdAt: new Date().toISOString(),
  }
  await writeImageData(image.id, data)
  try {
    await writeImageIndex([...images.filter((entry) => entry.target !== target), image])
  } catch (error) {
    try {
      await deleteImageData(image.id)
    } catch (cleanupError) {
      console.error('Unable to clean up an unsaved image:', cleanupError)
    }
    throw error
  }

  for (const previous of images.filter((entry) => entry.target === target)) {
    try {
      await deleteImageData(previous.id)
    } catch (error) {
      console.error('Unable to clean up a replaced image:', error)
    }
  }
  return image
}

export async function deleteManagedImage(target) {
  const images = await readImageIndex()
  const removed = images.filter((image) => image.target === target)
  if (removed.length === 0) return false
  await writeImageIndex(images.filter((image) => image.target !== target))
  for (const image of removed) await deleteImageData(image.id)
  return true
}
