import OptimizedImage from '../components/OptimizedImage'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Calendar, Home, CheckCircle, Clock, ChevronLeft, ChevronRight,
  Download, Maximize2, Minimize2, ArrowLeft, Check,
} from 'lucide-react'
import SEO from '../components/SEO'
import { projects as fallbackProjects, galleryProjects as fallbackGalleryProjects } from '../data/projectsData'
import { fetchProjects } from '../utils/projectsApi'

const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'Completed' },
  ongoing: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100', label: 'Ongoing' },
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [allProjects, setAllProjects] = useState([...fallbackProjects, ...fallbackGalleryProjects])
  const project = allProjects.find((p) => String(p.id) === id)
  useEffect(() => { fetchProjects().then(data => setAllProjects([...(data.projects || []), ...(data.galleryProjects || [])])) }, [])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [expandedPdfIndex, setExpandedPdfIndex] = useState(null)

  if (!project) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-3xl font-bold font-heading mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
        <Link to="/projects" className="btn-primary inline-block">Back to Projects</Link>
      </div>
    )
  }

  const status = statusConfig[(project.status || '').toLowerCase()] || statusConfig.ongoing
  const allImages = [project.image, ...(project.additionalImages || [])]

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)

  const handleEnquire = () => {
    navigate('/contact', { state: { projectName: project.name } })
  }

  return (
    <>
      <SEO
        title={project.name}
        description={project.description}
        keywords={`${project.name}, ${project.location}, ${project.category} real estate, Sri Lakshmi Narasimha Builders`}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-gray-900">
        <div className="relative h-[350px] md:h-[550px] bg-gray-900 flex items-center justify-center">
          <OptimizedImage
            src={allImages[currentImageIndex]}
            alt={`${project.name} - Image ${currentImageIndex + 1}`}
            imageClassName="object-contain"
            sizes="(min-width: 1024px) 80vw, 100vw"
            loading="eager"
            className="w-full h-full"
          />
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
              >
                <ChevronLeft size={28} className="text-gray-900" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
              >
                <ChevronRight size={28} className="text-gray-900" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>

        {allImages.length > 1 && (
          <div className="bg-gray-800 px-4 py-3">
            <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? 'border-primary-400 ring-2 ring-primary-400 scale-105'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <OptimizedImage src={img} alt={`Thumbnail ${index + 1}`} sizes="96px" className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`${status.bg} ${status.color} px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1`}>
                  <status.icon size={16} />
                  <span>{status.label}</span>
                </span>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {project.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">{project.name}</h1>
              <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
            </motion.div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="text-primary-500 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Home className="text-primary-500 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Units</p>
                  <p className="font-semibold">{project.units} Units</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="text-primary-500 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="font-semibold">{project.completionDate}</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {project.amenities && project.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-heading mb-4">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700">
                      <Check size={18} className="text-primary-500 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unit Availability */}
            {project.unitAvailability && project.unitAvailability.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-heading mb-4">Unit Availability</h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-700">Size</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-700">Price</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {project.unitAvailability.map((unit) => (
                        <tr key={unit.type}>
                          <td className="px-4 py-3 font-medium text-gray-900">{unit.type}</td>
                          <td className="px-4 py-3 text-gray-600">{unit.size || 'Not specified'}{unit.verified === false && <span className="block text-xs text-amber-700 mt-1">Area data not independently verified</span>}</td>
                          <td className="px-4 py-3 text-gray-600">{unit.price}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                unit.status === 'Available'
                                  ? 'bg-green-100 text-green-700'
                                  : unit.status === 'Limited'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {unit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-2">Pricing shared on request — contact our sales team for the current price list.</p>
              </div>
            )}

            {/* Location Map */}
            {project.mapEmbedUrl && (
              <div>
                <h2 className="text-2xl font-bold font-heading mb-4">Location</h2>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={project.mapEmbedUrl}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${project.name} location`}
                  ></iframe>
                </div>
              </div>
            )}

            {/* PDF Documents / Floor Plans */}
            {project.pdfFiles && project.pdfFiles.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-heading mb-4">Project Documents & Floor Plans</h2>
                <div className="space-y-6">
                  {project.pdfFiles.map((pdf, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-primary-50 to-primary-100 border-b-2 border-primary-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{pdf.name}</h3>
                            <p className="text-sm text-gray-600">PDF Document</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setExpandedPdfIndex(expandedPdfIndex === index ? null : index)}
                            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
                          >
                            {expandedPdfIndex === index ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            <span>{expandedPdfIndex === index ? 'Minimize' : 'Expand'}</span>
                          </button>
                          <a
                            href={pdf.path}
                            download
                            className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
                          >
                            <Download size={18} />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-4">
                        <div className="bg-white rounded-lg overflow-hidden shadow-inner border border-gray-200">
                          <iframe
                            src={`${pdf.path}#view=FitH`}
                            className={`w-full border-0 transition-all duration-300 ${expandedPdfIndex === index ? 'h-[85vh]' : 'h-[500px]'}`}
                            title={pdf.name}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white p-6 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold font-heading mb-2">Interested in {project.name}?</h3>
              <p className="mb-6 opacity-90 text-sm">
                Get in touch with our sales team for pricing, availability, and to schedule a site visit.
              </p>
              <button
                onClick={handleEnquire}
                className="w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Enquire Now
              </button>
              <a
                href="tel:+919989625479"
                className="block text-center mt-3 text-sm underline underline-offset-2 opacity-90 hover:opacity-100"
              >
                or call +91 9989625479
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
