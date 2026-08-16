export function scoreMatch(project, query) {
  const q = query.trim().toLowerCase()
  if (!q) return 0
  const haystack = [project.name, project.description, project.location, project.category, project.status, ...(project.amenities || [])].join(' ').toLowerCase()
  if (haystack.includes(q)) return 100
  return q.split(/\s+/).filter(Boolean).reduce((score, token) => score + (haystack.includes(token) ? 10 : 0), 0)
}

export function searchProjects(projects, query) {
  if (!query.trim()) return projects
  return projects.map(project => ({ project, score: scoreMatch(project, query) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.project)
}
