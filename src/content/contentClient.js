import { projects } from '../data/projectsData'

const CMS_API_URL = import.meta.env.VITE_CMS_API_URL

/**
 * Headless CMS adapter. Set VITE_CMS_API_URL to a read-only API that returns
 * { projects, posts }. With no CMS configured, the existing local dataset is
 * used, so the site remains deployable without a third-party service.
 */
export async function getSiteContent() {
  if (!CMS_API_URL) return { projects, posts: [] }
  try {
    const response = await fetch(`${CMS_API_URL.replace(/\/$/, '')}/site-content`)
    if (!response.ok) throw new Error(`CMS responded with ${response.status}`)
    const data = await response.json()
    return { projects: data.projects || projects, posts: data.posts || [] }
  } catch (error) {
    console.warn('CMS unavailable; using local content.', error)
    return { projects, posts: [] }
  }
}
