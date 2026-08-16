import { useMemo, useState } from 'react'
import { Search as SearchIcon, BookOpen } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import ProjectCard from '../components/ProjectCard'
import { projects, galleryProjects, blogPosts } from '../data/projectsData'
import { searchProjects } from '../utils/projectSearch'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const allProjects = useMemo(() => [...projects, ...galleryProjects], [])
  const projectResults = useMemo(() => searchProjects(allProjects, query), [allProjects, query])
  const blogResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return blogPosts.filter(post => [post.title, post.excerpt, post.category, post.author, ...(post.content || [])].join(' ').toLowerCase().includes(q))
  }, [query])

  const submit = (e) => {
    e.preventDefault()
    const value = query.trim()
    setParams(value ? { q: value } : {})
  }

  return <>
    <SEO title="Search" description="Search SLNB projects and real estate insights." />
    <Hero title="Search SLNB" subtitle="Find projects, locations, amenities and real estate insights" image="/images/home_b.jpeg" height="h-[360px]" />
    <section className="py-14">
      <div className="container-custom">
        <form onSubmit={submit} className="max-w-3xl mx-auto flex gap-3 mb-14">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
            <input value={query} onChange={e => setQuery(e.target.value)} className="input-field pl-12" placeholder="Search projects, locations, amenities..." autoFocus />
          </div>
          <button className="btn-primary" type="submit">Search</button>
        </form>

        {!query.trim() ? <div className="text-center text-gray-500 py-12">Enter a search term to find matching SLNB content.</div> : <>
          <div className="mb-10"><h2 className="section-title text-2xl">Projects <span className="text-primary-500">({projectResults.length})</span></h2>
            {projectResults.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{projectResults.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}</div> : <p className="text-gray-500">No matching projects.</p>}
          </div>
          <div><h2 className="section-title text-2xl">Articles <span className="text-primary-500">({blogResults.length})</span></h2>
            {blogResults.length ? <div className="grid md:grid-cols-2 gap-6">{blogResults.map(post => <Link key={post.id} to={`/blog/${post.id}`} className="card p-6 hover:shadow-2xl"><div className="flex items-center gap-3 text-primary-500 mb-3"><BookOpen size={20}/><span>{post.category}</span></div><h3 className="text-xl font-bold mb-2">{post.title}</h3><p className="text-gray-600">{post.excerpt}</p></Link>)}</div> : <p className="text-gray-500">No matching articles.</p>}
          </div>
        </>}
      </div>
    </section>
  </>
}
