import fs from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { getStore } from '@netlify/blobs'

const dataDir = process.env.DATA_DIR || path.join(tmpdir(), 'pahaditokri-data')
const storiesFile = path.join(dataDir, 'photo-stories.json')
const useNetlifyBlobs = process.env.NETLIFY === 'true'
const blobStoreName = 'pahaditokri-photo-stories'
const blobKey = 'stories'

async function readStories() {
  if (useNetlifyBlobs) {
    const store = getStore({ name: blobStoreName, consistency: 'strong' })
    return (await store.get(blobKey, { type: 'json' })) ?? []
  }
  if (!fs.existsSync(storiesFile)) return []
  return JSON.parse(fs.readFileSync(storiesFile, 'utf8'))
}

async function writeStories(stories) {
  if (useNetlifyBlobs) {
    const store = getStore({ name: blobStoreName, consistency: 'strong' })
    await store.setJSON(blobKey, stories)
    return
  }
  fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2), 'utf8')
}

export async function listPhotoStories() {
  return readStories()
}

export async function savePhotoStory(story) {
  const stories = await readStories()
  await writeStories([story, ...stories])
  return story
}

export async function deletePhotoStory(id) {
  const stories = await readStories()
  const story = stories.find((entry) => entry.id === id)
  if (!story) return null
  await writeStories(stories.filter((entry) => entry.id !== id))
  return story
}
