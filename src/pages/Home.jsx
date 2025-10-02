import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Building2, TrendingUp, CheckCircle, Star } from 'lucide-react'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import ProjectDetails from '../components/ProjectDetails'
import SEO from '../components/SEO'
import { projects } from '../data/projectsData'

export default function Home() {
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

  const featuredProjects = projects.slice(0, 3)

  const stats = [
    { icon: Building2, value: '50+', label: 'Projects Completed' },
    { icon: Users, value: '1000+', label: 'Happy Families' },
    { icon: Award, value: '25+', label: 'Years Experience' },
    { icon: TrendingUp, value: '100%', label: 'Client Satisfaction' },
  ]

  const features = [
    {
      icon: CheckCircle,
      title: 'Quality Construction',
      description: 'Premium materials and expert craftsmanship in every project'
    },
    {
      icon: CheckCircle,
      title: 'Timely Delivery',
      description: 'Committed to delivering projects on schedule'
    },
    {
      icon: CheckCircle,
      title: 'Prime Locations',
      description: 'Strategic locations with excellent connectivity'
    },
    {
      icon: CheckCircle,
      title: 'Transparent Pricing',
      description: 'No hidden costs, complete transparency in pricing'
    },
  ]

  return (
    <>
      <SEO 
        title="Home"
        description="SRI LAKSHMI NARASIMHA BUILDERS - Your trusted partner in premium real estate development. Building dreams into reality."
      />
      
      <Hero
        title="Building Dreams Into Reality"
        subtitle="Premium Real Estate Development with Excellence, Integrity, and Innovation"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
        height="h-screen"
      />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Icon className="text-primary-500" size={32} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We are committed to delivering exceptional quality and value in every project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                  <Icon className="text-primary-500 mb-4" size={40} />
                  <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured-projects" className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Explore our premium residential and commercial developments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          <div className="text-center">
            <a href="/gallery" className="btn-primary">
              View More Projects
            </a>
          </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you find the perfect property that matches your needs and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/projects" className="bg-white text-primary-500 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Browse Projects
              </a>
              <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                Contact Us
              </a>
            </div>
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
