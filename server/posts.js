import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, 'data')
const dataFile = path.join(dataDir, 'posts.json')

function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]\n', 'utf8')
}

function readPosts() {
  ensureStore()
  try {
    const raw = fs.readFileSync(dataFile, 'utf8')
    const posts = JSON.parse(raw)
    return Array.isArray(posts) ? posts : []
  } catch {
    return []
  }
}

function writePosts(posts) {
  ensureStore()
  const temp = `${dataFile}.tmp`
  fs.writeFileSync(temp, JSON.stringify(posts, null, 2) + '\n', 'utf8')
  fs.renameSync(temp, dataFile)
}

export function getPosts() {
  return readPosts().sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
}

export function createPost(post) {
  const posts = readPosts()
  const now = new Date().toISOString()
  const created = {
    id: crypto.randomUUID(),
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    date: post.date || now.slice(0, 10),
    author: post.author,
    authorBio: post.authorBio || '',
    category: post.category,
    readTime: post.readTime || '',
    content: post.content,
    createdAt: now,
    updatedAt: now,
  }
  posts.push(created)
  writePosts(posts)
  return created
}

export function updatePost(id, patch) {
  const posts = readPosts()
  const index = posts.findIndex((post) => String(post.id) === String(id))
  if (index === -1) return null
  posts[index] = {
    ...posts[index],
    ...patch,
    id: posts[index].id,
    updatedAt: new Date().toISOString(),
  }
  writePosts(posts)
  return posts[index]
}

export function deletePost(id) {
  const posts = readPosts()
  const next = posts.filter((post) => String(post.id) !== String(id))
  if (next.length === posts.length) return false
  writePosts(next)
  return true
}
