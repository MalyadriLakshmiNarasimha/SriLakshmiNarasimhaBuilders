import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import OptimizedImage from './OptimizedImage'
import { MapPin, Calendar, Home, CheckCircle, Clock } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  const [compare, setCompare] = useState(false)
  useEffect(() => { const ids = JSON.parse(localStorage.getItem('slnbCompare') || '[]'); setCompare(ids.includes(project.id)) }, [project.id])
  const toggleCompare = () => { const ids = JSON.parse(localStorage.getItem('slnbCompare') || '[]'); const next = compare ? ids.filter(id => id !== project.id) : [...ids, project.id].slice(-4); localStorage.setItem('slnbCompare', JSON.stringify(next)); setCompare(!compare); window.dispatchEvent(new Event('slnb-compare-change')) }

  const statusConfig = {
    completed: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-100',
      label: 'Completed'
    },
    ongoing: {
      icon: Clock,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
      label: 'Ongoing'
    }
  }

  const status = statusConfig[project.status] || statusConfig.ongoing

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <OptimizedImage
          src={project.image}
          alt={project.name}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`${status.bg} ${status.color} px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1`}>
            <status.icon size={16} />
            <span>{status.label}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary-500 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2 text-primary-500" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Home size={16} className="mr-2 text-primary-500" />
            <span>{project.units} Units</span>
          </div>
          {project.completionDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2 text-primary-500" />
              <span>{project.completionDate}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link to={`/projects/${project.id}`} className="btn-primary text-sm text-center block">View Details</Link>
          <button onClick={toggleCompare} className={`text-sm font-semibold rounded-lg border-2 transition-all ${compare ? 'bg-primary-500 border-primary-500 text-white' : 'border-primary-500 text-primary-500 hover:bg-primary-50'}`}>{compare ? 'Compared' : 'Compare'}</button>
        </div>
      </div>
    </motion.div>
  )
}
