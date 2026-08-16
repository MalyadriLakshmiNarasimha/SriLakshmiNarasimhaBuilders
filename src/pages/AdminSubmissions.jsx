import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, User, MessageSquare, Trash2, Download, RefreshCw, AlertTriangle, MailWarning, LogIn, LogOut } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/contact$/, '') : '/api'
const TOKEN_KEY = 'slnb_admin_jwt'

export default function AdminSubmissions() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setSubmissions([])
  }, [])

  const loadSubmissions = useCallback(async () => {
    if (!token) return
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE}/submissions`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) { if (res.status === 401) logout(); throw new Error(data.message || 'Failed to load submissions.') }
      setSubmissions(data.submissions || [])
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [token, logout])

  useEffect(() => { loadSubmissions() }, [loadSubmissions])

  const handleLogin = async (e) => {
    e.preventDefault(); setError('')
    try {
      const res = await fetch(`${API_BASE}/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed.')
      sessionStorage.setItem(TOKEN_KEY, data.token); setToken(data.token); setPassword('')
    } catch (err) { setError(err.message) }
  }


  const updateStatus = async (id, status) => {
    const res = await fetch(`${API_BASE}/submissions/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) })
    if (res.status === 401) return logout()
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return setError(data.message || 'Failed to update status.')
    setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status } : sub))
  }

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return
    const res = await fetch(`${API_BASE}/submissions/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    if (res.status === 401) return logout()
    if (!res.ok) return alert('Failed to delete.')
    setSubmissions(prev => prev.filter(sub => sub.id !== id))
  }

  const exportToCSV = () => {
    if (!submissions.length) return alert('No submissions to export')
    const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Project', 'Status', 'Email Sent', 'Date']
    const csv = [headers.join(','), ...submissions.map(s => [`"${s.name}"`,`"${s.email}"`,`"${s.phone}"`,`"${s.subject}"`,`"${(s.message||'').replace(/"/g,'""')}"`,`"${s.project_name||''}"`,`"${s.status || 'pending'}"`,`"${s.email_sent?'Yes':'No'}"`,`"${new Date(s.created_at).toLocaleString()}"`].join(','))].join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'})); a.download = `contact-submissions-${new Date().toISOString().slice(0,10)}.csv`; a.click()
  }

  if (!token) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.form onSubmit={handleLogin} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4"><LogIn className="text-primary-500" size={28}/></div>
        <h1 className="text-2xl font-bold font-heading mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">Sign in with your JWT-protected admin account.</p>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
        <input value={username} onChange={e=>setUsername(e.target.value)} className="input-field mb-3" placeholder="Username" autoComplete="username" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input-field mb-4" placeholder="Password" autoComplete="current-password" required />
        <button className="w-full btn-primary">Sign In</button>
      </motion.form>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20"><div className="container-custom">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8"><div><h1 className="text-4xl font-bold font-heading mb-2">Admin Dashboard</h1><p className="text-gray-600">Contact leads: {submissions.length}</p></div><div className="flex gap-3"><button onClick={loadSubmissions} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg"><RefreshCw size={18} className={loading?'animate-spin':''}/>Refresh</button><button onClick={exportToCSV} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"><Download size={20}/>Export CSV</button><button onClick={logout} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg"><LogOut size={18}/>Logout</button></div></div>
      {error && <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6"><AlertTriangle size={20}/>{error}</div>}
      {!submissions.length ? <div className="bg-white rounded-xl shadow-md p-12 text-center"><MessageSquare size={64} className="mx-auto text-gray-300 mb-4"/><h2 className="text-2xl font-bold">No Submissions Yet</h2></div> : <div className="space-y-4">{submissions.map((s,index)=><motion.div key={s.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:index*.05}} className="bg-white rounded-xl shadow-md p-6"><div className="flex justify-between items-start mb-4"><div className="flex items-center gap-3"><div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center"><User className="text-primary-500"/></div><div><h3 className="text-xl font-bold">{s.name}</h3><div className="flex items-center gap-2 text-sm text-gray-600"><Calendar size={14}/>{new Date(s.created_at).toLocaleString()}{!s.email_sent&&<span className="text-amber-600 ml-2"><MailWarning size={14} className="inline"/> email delivery failed</span>}</div></div></div><div className="flex items-center gap-2"><select value={s.status || 'pending'} onChange={e=>updateStatus(s.id,e.target.value)} className="input-field py-2 text-sm"><option value="pending">Pending</option><option value="completed">Completed</option></select><button onClick={()=>deleteSubmission(s.id)} className="text-red-500 p-2" aria-label="Delete submission"><Trash2 size={20}/></button></div></div><div className="grid md:grid-cols-2 gap-4 mb-4"><div className="flex items-center gap-2"><Mail size={18} className="text-primary-500"/><a href={`mailto:${s.email}`}>{s.email}</a></div><div className="flex items-center gap-2"><Phone size={18} className="text-primary-500"/><a href={`tel:${s.phone}`}>{s.phone}</a></div></div><div className="border-t pt-4"><h4 className="font-semibold mb-2">Subject: {s.subject}{s.project_name&&<span className="ml-2 text-sm font-normal text-primary-600">({s.project_name})</span>}</h4><p className="whitespace-pre-wrap text-gray-700">{s.message}</p></div></motion.div>)}</div>}
    </div></div>
  )
}
