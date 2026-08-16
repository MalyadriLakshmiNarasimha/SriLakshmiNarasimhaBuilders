import { useCallback, useEffect, useMemo, useState } from 'react'
import { Edit3, Plus, Trash2, RefreshCw, LogIn, LogOut, Save, X, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { fetchProjects, getProjectsApiBase } from '../utils/projectsApi'

const TOKEN_KEY = 'slnb_admin_jwt'
const emptyProject = {
  name: '', description: '', location: '', image: '', units: 0, status: 'ongoing',
  completionDate: '', category: 'residential', amenities: [], unitAvailability: [], mapEmbedUrl: ''
}

function normalizeProject(project) {
  return {
    ...emptyProject,
    ...project,
    units: Number(project.units || 0),
    amenities: Array.isArray(project.amenities) ? project.amenities : [],
    unitAvailability: Array.isArray(project.unitAvailability) ? project.unitAvailability : [],
  }
}

export default function AdminProjects() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(emptyProject)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const API = getProjectsApiBase()

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const data = await fetchProjects()
      setProjects(data.projects || [])
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [])

  useEffect(() => { if (token) load() }, [token, load])

  const login = async (e) => {
    e.preventDefault(); setError('')
    try {
      const res = await fetch(`${API}/admin/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed.')
      sessionStorage.setItem(TOKEN_KEY, data.token); setToken(data.token); setPassword('')
    } catch (e) { setError(e.message) }
  }

  const logout = () => { sessionStorage.removeItem(TOKEN_KEY); setToken(''); setProjects([]) }
  const startNew = () => { setEditing(null); setForm({...emptyProject, amenities: [], unitAvailability: []}); setFormOpen(true); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const startEdit = (project) => { setEditing(project.id); setForm(normalizeProject(project)); setFormOpen(true); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const cancel = () => { setEditing(null); setForm(emptyProject); setFormOpen(false) }

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError('')
    try {
      const url = editing ? `${API}/admin/projects/${editing}` : `${API}/admin/projects`
      const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: {'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.status === 401) return logout()
      if (!res.ok) throw new Error(data.message || 'Failed to save project.')
      await load(); cancel()
    } catch (e) { setError(e.message) } finally { setSaving(false) }
  }

  const remove = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    const res = await fetch(`${API}/admin/projects/${id}`, { method:'DELETE', headers:{Authorization:`Bearer ${token}`} })
    if (res.status === 401) return logout()
    if (!res.ok) { const d = await res.json().catch(()=>({})); return setError(d.message || 'Failed to delete project.') }
    load()
  }

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const amenityText = useMemo(() => form.amenities.join('\n'), [form.amenities])
  const unitsText = useMemo(() => form.unitAvailability.map(u => `${u.type || ''} | ${u.size || ''} | ${u.price || ''} | ${u.status || ''}`).join('\n'), [form.unitAvailability])
  const parseAmenities = value => value.split('\n').map(x=>x.trim()).filter(Boolean)
  const parseUnits = value => value.split('\n').map(line=>line.split('|').map(x=>x.trim())).filter(x=>x[0]).map(x=>({type:x[0],size:x[1]||'',price:x[2]||'',status:x[3]||'Available'}))

  if (!token) return <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center px-4"><motion.form onSubmit={login} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"><div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4"><LogIn className="text-primary-500" size={28}/></div><h1 className="text-2xl font-bold font-heading mb-2">Admin Projects</h1><p className="text-gray-600 mb-6">Sign in to manage public projects.</p>{error&&<div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">{error}</div>}<input value={username} onChange={e=>setUsername(e.target.value)} className="input-field mb-3" placeholder="Username" required/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input-field mb-4" placeholder="Password" required/><button className="w-full btn-primary">Sign In</button></motion.form></div>

  return <div className="min-h-screen bg-gray-50 pt-28 pb-16"><div className="container-custom">
    <div className="flex flex-wrap justify-between items-center gap-4 mb-8"><div><h1 className="text-4xl font-bold font-heading mb-2">Manage Projects</h1><p className="text-gray-600">Create, edit and manage the projects shown publicly.</p></div><div className="flex gap-3"><button onClick={load} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg"><RefreshCw size={18} className={loading?'animate-spin':''}/>Refresh</button><button onClick={startNew} className="btn-primary flex items-center gap-2"><Plus size={18}/>New Project</button><button onClick={logout} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg"><LogOut size={18}/>Logout</button></div></div>
    {error&&<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">{error}</div>}
    {formOpen ? <form onSubmit={save} className="bg-white rounded-xl shadow-md p-6 mb-8"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold">{editing ? 'Edit Project' : 'New Project'}</h2><button type="button" onClick={cancel}><X/></button></div><div className="grid md:grid-cols-2 gap-4"><Field label="Project name" value={form.name} onChange={v=>setField('name',v)} required/><Field label="Location" value={form.location} onChange={v=>setField('location',v)} required/><Field label="Image path/URL" value={form.image} onChange={v=>setField('image',v)} required/><Field label="Units" type="number" value={form.units} onChange={v=>setField('units',v)}/><Field label="Completion date" value={form.completionDate} onChange={v=>setField('completionDate',v)}/><label className="block"><span className="text-sm font-semibold text-gray-700">Category</span><select className="input-field mt-1" value={form.category} onChange={e=>setField('category',e.target.value)}><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label><label className="block"><span className="text-sm font-semibold text-gray-700">Status</span><select className="input-field mt-1" value={form.status} onChange={e=>setField('status',e.target.value)}><option value="ongoing">Ongoing</option><option value="completed">Completed</option></select></label><Field label="Map embed URL" value={form.mapEmbedUrl} onChange={v=>setField('mapEmbedUrl',v)}/></div><label className="block mt-4"><span className="text-sm font-semibold text-gray-700">Description</span><textarea className="textarea-field mt-1" rows="4" value={form.description} onChange={e=>setField('description',e.target.value)} required/></label><label className="block mt-4"><span className="text-sm font-semibold text-gray-700">Amenities (one per line)</span><textarea className="textarea-field mt-1" rows="5" value={amenityText} onChange={e=>setField('amenities',parseAmenities(e.target.value))}/></label><label className="block mt-4"><span className="text-sm font-semibold text-gray-700">Unit availability (one per line: Type | Size | Price | Status)</span><textarea className="textarea-field mt-1" rows="5" value={unitsText} onChange={e=>setField('unitAvailability',parseUnits(e.target.value))}/></label><div className="flex gap-3 mt-6"><button disabled={saving} className="btn-primary flex items-center gap-2"><Save size={18}/>{saving?'Saving...':'Save Project'}</button><button type="button" onClick={cancel} className="btn-outline">Cancel</button></div></form> : null}
    <div className="space-y-4">{projects.map(p=><div key={p.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-5"><img src={p.image} alt={p.name} className="w-full md:w-48 h-32 object-cover rounded-lg"/><div className="flex-1"><div className="flex flex-wrap gap-3 items-center"><h3 className="text-xl font-bold">{p.name}</h3><span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${p.status==='completed'?'bg-green-100 text-green-700':'bg-blue-100 text-blue-700'}`}>{p.status==='completed'?<CheckCircle size={15}/>:<Clock size={15}/>} {p.status==='completed'?'Completed':'Ongoing'}</span></div><p className="text-gray-600 mt-1">{p.location}</p><p className="text-sm text-gray-500 mt-2">{p.units} units · {p.category} · {p.completionDate || 'No completion date'}</p></div><div className="flex md:flex-col gap-2 justify-center"><button onClick={()=>startEdit(p)} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg"><Edit3 size={17}/>Edit</button><button onClick={()=>remove(p.id,p.name)} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg"><Trash2 size={17}/>Delete</button></div></div>)}</div>
  </div></div>
}
function Field({label,value,onChange,type='text',required=false}) { return <label className="block"><span className="text-sm font-semibold text-gray-700">{label}</span><input type={type} required={required} className="input-field mt-1" value={value ?? ''} onChange={e=>onChange(type==='number'?Number(e.target.value):e.target.value)}/></label> }
