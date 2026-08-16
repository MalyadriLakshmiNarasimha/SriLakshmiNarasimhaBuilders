import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Edit3, Eye, LogIn, LogOut, Plus, RefreshCw, Save, Trash2, X } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '/api'
const TOKEN_KEY = 'slnb_admin_jwt'

const emptyForm = {
  title: '', excerpt: '', image: '', date: new Date().toISOString().slice(0, 10), author: '', authorBio: '',
  category: '', readTime: '', content: '',
}

function normalizeForForm(post) {
  return {
    title: post.title || '', excerpt: post.excerpt || '', image: post.image || '', date: post.date || '',
    author: post.author || '', authorBio: post.authorBio || '', category: post.category || '',
    readTime: post.readTime || '', content: Array.isArray(post.content) ? post.content.join('\n\n') : (post.content || ''),
  }
}

export default function AdminPosts() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [preview, setPreview] = useState(false)

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setPosts([])
  }, [])

  const loadPosts = useCallback(async () => {
    if (!token) return
    setLoading(true); setError(''); setNotice('')
    try {
      const res = await fetch(`${API_BASE}/posts`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to load posts.')
      setPosts(data.posts || [])
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [token])

  useEffect(() => { loadPosts() }, [loadPosts])

  const handleLogin = async (e) => {
    e.preventDefault(); setError(''); setNotice('')
    try {
      const res = await fetch(`${API_BASE}/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed.')
      sessionStorage.setItem(TOKEN_KEY, data.token)
      setToken(data.token); setPassword('')
    } catch (err) { setError(err.message) }
  }

  const startNew = () => { setEditingId(null); setForm(emptyForm); setPreview(false); setNotice(''); setError('') }
  const startEdit = (post) => { setEditingId(post.id); setForm(normalizeForForm(post)); setPreview(false); setNotice(''); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const cancelEdit = () => startNew()

  const savePost = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setNotice('')
    const payload = { ...form, content: form.content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) }
    try {
      const url = editingId ? `${API_BASE}/posts/${encodeURIComponent(editingId)}` : `${API_BASE}/posts`
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.status === 401) return logout()
      if (!res.ok) throw new Error(data.message || Object.values(data.errors || {})[0] || 'Failed to save post.')
      setNotice(editingId ? 'Post updated successfully.' : 'Post published successfully.')
      setEditingId(null); setForm(emptyForm); setPreview(false)
      await loadPosts()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  const removePost = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return
    setError(''); setNotice('')
    try {
      const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(id)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (res.status === 401) return logout()
      if (!res.ok) throw new Error(data.message || 'Failed to delete post.')
      if (String(editingId) === String(id)) startNew()
      setNotice('Post deleted.')
      await loadPosts()
    } catch (err) { setError(err.message) }
  }

  const previewPost = useMemo(() => ({ ...form, content: form.content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) }), [form])

  if (!token) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4"><LogIn className="text-primary-500" size={28}/></div>
        <h1 className="text-2xl font-bold font-heading mb-2">Post Management</h1>
        <p className="text-gray-600 mb-6">Admin-only access. Sign in with the same JWT admin account.</p>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
        <input value={username} onChange={e => setUsername(e.target.value)} className="input-field mb-3" placeholder="Username" autoComplete="username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field mb-4" placeholder="Password" autoComplete="current-password" required />
        <button className="w-full btn-primary">Sign In</button>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container-custom">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div><h1 className="text-4xl font-bold font-heading mb-2">Manage Blog Posts</h1><p className="text-gray-600">Create, edit, preview and delete public blog posts.</p></div>
          <div className="flex gap-3"><button onClick={loadPosts} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg"><RefreshCw size={18} className={loading ? 'animate-spin' : ''}/>Refresh</button><button onClick={logout} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg"><LogOut size={18}/>Logout</button></div>
        </div>

        {error && <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6"><AlertTriangle size={20}/>{error}</div>}
        {notice && <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-6">{notice}</div>}

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
          <form onSubmit={savePost} className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="flex justify-between items-center"><h2 className="text-2xl font-bold">{editingId ? 'Edit Post' : 'New Post'}</h2>{editingId && <button type="button" onClick={cancelEdit} className="text-gray-500 flex items-center gap-1"><X size={17}/>Cancel edit</button>}</div>
            <Field label="Title" value={form.title} onChange={v => setForm({...form,title:v})} required />
            <Field label="Excerpt" value={form.excerpt} onChange={v => setForm({...form,excerpt:v})} required textarea />
            <Field label="Cover image URL/path" value={form.image} onChange={v => setForm({...form,image:v})} required placeholder="/images/my-post.jpg or https://..." />
            <div className="grid md:grid-cols-2 gap-4"><Field label="Date" value={form.date} onChange={v => setForm({...form,date:v})} placeholder="August 14, 2026" /><Field label="Category" value={form.category} onChange={v => setForm({...form,category:v})} required /></div>
            <div className="grid md:grid-cols-2 gap-4"><Field label="Author" value={form.author} onChange={v => setForm({...form,author:v})} required /><Field label="Read time" value={form.readTime} onChange={v => setForm({...form,readTime:v})} placeholder="5 min read" /></div>
            <Field label="Author bio" value={form.authorBio} onChange={v => setForm({...form,authorBio:v})} textarea />
            <div><label className="block font-semibold text-gray-800 mb-2">Content paragraphs</label><textarea value={form.content} onChange={e => setForm({...form,content:e.target.value})} className="input-field min-h-[280px]" placeholder="Write paragraph 1.\n\nWrite paragraph 2.\n\nWrite paragraph 3." required /><p className="text-xs text-gray-500 mt-1">Separate paragraphs with a blank line.</p></div>
            <div className="flex flex-wrap gap-3 pt-2"><button type="submit" disabled={saving} className="btn-primary inline-flex items-center gap-2"><Save size={18}/>{saving ? 'Saving...' : editingId ? 'Update Post' : 'Publish Post'}</button><button type="button" onClick={() => setPreview(v => !v)} className="bg-gray-100 px-4 py-2 rounded-lg inline-flex items-center gap-2"><Eye size={18}/>{preview ? 'Hide Preview' : 'Preview'}</button>{editingId && <button type="button" onClick={cancelEdit} className="bg-gray-100 px-4 py-2 rounded-lg">New Post</button>}</div>
          </form>

          <div className="space-y-6">
            {preview && <article className="bg-white rounded-xl shadow-md overflow-hidden"><img src={previewPost.image} alt={previewPost.title} className="w-full h-52 object-cover" onError={e => { e.currentTarget.style.display='none' }} /><div className="p-6"><span className="text-xs font-semibold text-primary-600">{previewPost.category || 'Category'}</span><h2 className="text-2xl font-bold mt-2 mb-3">{previewPost.title || 'Post title'}</h2><p className="text-gray-600 mb-4">{previewPost.excerpt || 'Post excerpt'}</p><p className="text-sm text-gray-500 mb-5">{previewPost.author || 'Author'} · {previewPost.date || 'Date'} · {previewPost.readTime || 'Read time'}</p>{previewPost.content.map((paragraph, i) => <p key={i} className="text-gray-700 leading-7 mb-4">{paragraph}</p>)}</div></article>}

            <div className="bg-white rounded-xl shadow-md p-6"><div className="flex justify-between items-center mb-5"><h2 className="text-2xl font-bold">Published Posts</h2><button onClick={startNew} className="btn-primary inline-flex items-center gap-2"><Plus size={18}/>New</button></div>{!posts.length ? <p className="text-gray-500">No posts found.</p> : <div className="space-y-3">{posts.map(post => <div key={post.id} className="border rounded-lg p-4"><div className="flex gap-3 justify-between"><div className="min-w-0"><h3 className="font-bold truncate">{post.title}</h3><p className="text-sm text-gray-500">{post.category} · {post.date}</p></div><div className="flex gap-2 shrink-0"><button onClick={() => startEdit(post)} className="p-2 rounded bg-gray-100 hover:bg-gray-200" aria-label={`Edit ${post.title}`}><Edit3 size={17}/></button><button onClick={() => removePost(post.id)} className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-100" aria-label={`Delete ${post.title}`}><Trash2 size={17}/></button></div></div></div>)}</div>}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, textarea = false, required = false, placeholder = '' }) {
  return <div><label className="block font-semibold text-gray-800 mb-2">{label}</label>{textarea ? <textarea value={value} onChange={e => onChange(e.target.value)} className="input-field min-h-[110px]" placeholder={placeholder} required={required}/> : <input value={value} onChange={e => onChange(e.target.value)} className="input-field" placeholder={placeholder} required={required}/>}</div>
}
