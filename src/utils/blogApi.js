import { blogPosts as localPosts } from '../data/projectsData'

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : '/api'

export async function getBlogPosts() {
  try {
    const response = await fetch(`${API_BASE}/posts`)
    if (!response.ok) throw new Error(`Posts API responded with ${response.status}`)
    const data = await response.json()
    if (!Array.isArray(data.posts)) throw new Error('Invalid posts response')
    return data.posts
  } catch (error) {
    console.warn('Posts API unavailable; using local blog content.', error)
    return localPosts
  }
}
