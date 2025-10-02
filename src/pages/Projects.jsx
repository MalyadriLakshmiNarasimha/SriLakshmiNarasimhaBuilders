import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import ProjectDetails from '../components/ProjectDetails'
import SEO from '../components/SEO'
import { projects } from '../data/projectsData'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter)

  const displayedProjects = filteredProjects

  return (
    <>
      <SEO 
        title="Projects"
        description="Explore our portfolio of premium residential and commercial real estate projects. Quality construction with timely delivery."
      />
      
      <Hero
        title="Our Projects"
        subtitle="Discover Premium Residential & Commercial Developments"
        image="/images/home_b.jpeg"
        height="h-[500px]"
      />

      <section className="py-20">
        <div className="container-custom">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter size={20} />
              <span className="font-semibold">Filter by:</span>
            </div>
            {filters.map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filter === filterOption.value
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-primary-500">{displayedProjects.length}</span> of{' '}
              <span className="font-semibold">{filteredProjects.length}</span> projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          {displayedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* View More Projects Button */}
              <div className="text-center">
                <Link
                  to="/gallery"
                  className="btn-primary inline-block"
                >
                  View More Projects
                </Link>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-gray-600">No projects found for the selected filter.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Interested in Any of Our Projects?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get in touch with us to schedule a site visit or learn more about our projects
            </p>
            <a href="/contact" className="bg-white text-primary-500 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
              Contact Us Today
            </a>
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetails 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
