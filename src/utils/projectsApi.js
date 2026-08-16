import { projects as fallbackProjects, galleryProjects as fallbackGalleryProjects } from '../data/projectsData'

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/contact$/, '') : '/api'

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`)
    if (!res.ok) throw new Error('Projects API unavailable')
    const data = await res.json()
    return { projects: data.projects || [], galleryProjects: data.galleryProjects || [] }
  } catch {
    return { projects: fallbackProjects, galleryProjects: fallbackGalleryProjects }
  }
}

export function getProjectsApiBase() { return API_BASE }
