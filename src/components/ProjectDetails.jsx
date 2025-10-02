import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Home, CheckCircle, Clock, ChevronLeft, ChevronRight, Download, Maximize2, Minimize2 } from 'lucide-react'

export default function ProjectDetails({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [expandedPdfIndex, setExpandedPdfIndex] = useState(null)

  if (!project) return null

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

  // Combine main image with additional images
  const allImages = [project.image, ...(project.additionalImages || [])]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-screen flex items-start justify-center p-4 py-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-6xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div className="flex-1">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                  {project.name}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className={`${status.bg} ${status.color} px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1`}>
                    <status.icon size={16} />
                    <span>{status.label}</span>
                  </span>
                  <span className="text-primary-600 font-bold text-lg">{project.price}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Gallery */}
            <div className="relative bg-gray-900">
              <div className="relative h-[500px] md:h-[600px] bg-gray-900 flex items-center justify-center">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${project.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
                    >
                      <ChevronLeft size={28} className="text-gray-900" />
                    </button>
                    <button
                      onClick={nextImage}
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

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="bg-gray-800 px-4 py-3">
                  <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-3 transition-all ${
                          currentImageIndex === index 
                            ? 'border-primary-400 ring-2 ring-primary-400 scale-105' 
                            : 'border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="text-primary-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Home className="text-primary-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Flats</p>
                    <p className="font-semibold">{project.flats} Flats</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="text-primary-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Completion</p>
                    <p className="font-semibold">{project.completionDate}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold font-heading mb-3">About This Project</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>

              {/* PDF Documents */}
              {project.pdfFiles && project.pdfFiles.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold font-heading mb-4">Project Documents</h3>
                  <div className="space-y-6">
                    {project.pdfFiles.map((pdf, index) => (
                      <div key={index} className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-50 to-primary-100 border-b-2 border-primary-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{pdf.name}</h4>
                              <p className="text-sm text-gray-600">PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setExpandedPdfIndex(expandedPdfIndex === index ? null : index)}
                              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                              {expandedPdfIndex === index ? (
                                <>
                                  <Minimize2 size={20} />
                                  <span>Minimize</span>
                                </>
                              ) : (
                                <>
                                  <Maximize2 size={20} />
                                  <span>Expand</span>
                                </>
                              )}
                            </button>
                            <a
                              href={pdf.path}
                              download
                              className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                              <Download size={20} />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-4">
                          <div className="bg-white rounded-lg overflow-hidden shadow-inner border border-gray-200">
                            <iframe
                              src={`${pdf.path}#view=FitH`}
                              className={`w-full border-0 transition-all duration-300 ${
                                expandedPdfIndex === index ? 'h-[85vh]' : 'h-[600px]'
                              }`}
                              title={pdf.name}
                              style={{ minHeight: expandedPdfIndex === index ? '85vh' : '600px' }}
                            />
                          </div>
                          <div className="mt-3 text-center">
                            <p className="text-sm text-gray-600">
                              {expandedPdfIndex === index 
                                ? 'Click "Minimize" to return to normal view' 
                                : 'Click "Expand" for fullscreen view or scroll within the document viewer to see all pages'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-xl">
                <h3 className="text-2xl font-bold font-heading mb-2">Interested in this project?</h3>
                <p className="mb-4 opacity-90">Get in touch with us for more information or to schedule a site visit.</p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-primary-500 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </a>
              </div>
            </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
