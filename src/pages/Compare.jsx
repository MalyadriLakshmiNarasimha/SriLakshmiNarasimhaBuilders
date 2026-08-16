import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, MapPin, Home, Calendar, X, AlertTriangle } from 'lucide-react'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import { projects as fallbackProjects, galleryProjects as fallbackGalleryProjects } from '../data/projectsData'
import { fetchProjects } from '../utils/projectsApi'

export default function Compare() {
  const navigate = useNavigate()
  const [all, setAll] = useState([...fallbackProjects, ...fallbackGalleryProjects])
  useEffect(() => { fetchProjects().then(data => setAll([...(data.projects || []), ...(data.galleryProjects || [])])) }, [])
  const ids = JSON.parse(localStorage.getItem('slnbCompare') || '[]').map(Number)
  const selected = all.filter(p => ids.includes(p.id))
  const groups = new Set(selected.map(p => p.propertyGroupId).filter(Boolean))
  const samePhysicalProperty = selected.length >= 2 && groups.size === 1 && selected.every(p => p.propertyGroupId)
  const remove = id => { const next = ids.filter(x => x !== id); localStorage.setItem('slnbCompare', JSON.stringify(next)); navigate('/compare', { replace: true }) }
  return <>
    <SEO title="Compare Properties" description="Compare SLNB properties side by side." />
    <Hero title="Compare Properties" subtitle="Compare location, status, units, amenities and availability side by side" image="/images/home_b.jpeg" height="h-[360px]" />
    <section className="py-14"><div className="container-custom">
      <Link to="/projects" className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-8"><ArrowLeft size={18}/> Back to Projects</Link>
      {selected.length < 2 ? <div className="text-center py-20 card p-10"><h2 className="text-2xl font-bold mb-3">Select at least 2 properties</h2><p className="text-gray-600 mb-6">Use Compare on project cards to build a side-by-side comparison.</p><Link to="/projects" className="btn-primary inline-block">Browse Projects</Link></div> : <>
      {samePhysicalProperty && <div className="mb-6 flex gap-3 items-start rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
        <AlertTriangle className="mt-0.5 shrink-0" size={20}/>
        <div><p className="font-semibold">These records belong to the same physical property.</p><p className="text-sm mt-1">They represent different categories/units of the same building. Compare the unit details carefully; values are not assumed to be interchangeable.</p></div>
      </div>}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200"><table className="w-full min-w-[900px] bg-white"><thead><tr><th className="p-5 text-left bg-gray-50 w-44">Property</th>{selected.map(p => <th key={p.id} className="p-5 text-left align-top"><div className="relative"><button onClick={() => remove(p.id)} className="absolute right-0 top-0 text-gray-400 hover:text-red-500" aria-label={`Remove ${p.name}`}><X size={18}/></button><img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-4"/><Link to={`/projects/${p.id}`} className="font-bold text-lg hover:text-primary-500">{p.name}</Link></div></th>)}</tr></thead><tbody>
        <Row label="Location" icon={<MapPin size={17}/>} values={selected.map(p => p.location)} />
        <Row label="Category" values={selected.map(p => p.category)} />
        <Row label="Status" values={selected.map(p => p.status)} />
        <Row label="Units" icon={<Home size={17}/>} values={selected.map(p => `${p.units} units`)} />
        <Row label="Completion" icon={<Calendar size={17}/>} values={selected.map(p => p.completionDate || '—')} />
        <tr><td className="p-5 font-semibold bg-gray-50">Amenities</td>{selected.map(p => <td key={p.id} className="p-5 align-top"><ul className="space-y-2">{(p.amenities || []).map(a => <li key={a} className="flex gap-2 text-sm"><Check size={16} className="text-green-500 mt-0.5 shrink-0"/>{a}</li>)}</ul></td>)}</tr>
        <tr><td className="p-5 font-semibold bg-gray-50">Unit availability</td>{selected.map(p => <td key={p.id} className="p-5 align-top"><ul className="space-y-3">{(p.unitAvailability || []).map(u => <li key={u.type} className="text-sm"><strong>{u.type}</strong><br/><span className="text-gray-500">{u.size || 'Not specified'} · {u.status || 'Not specified'}</span>{u.verified === false && <span className="block mt-1 text-xs text-amber-700">Area data not independently verified</span>}</li>)}</ul></td>)}</tr>
      </tbody></table></div></>}
    </div></section>
  </>
}
function Row({ label, icon, values }) { return <tr className="border-t"><td className="p-5 font-semibold bg-gray-50"><span className="inline-flex items-center gap-2">{icon}{label}</span></td>{values.map((v,i)=><td key={i} className="p-5 capitalize">{v}</td>)}</tr> }
