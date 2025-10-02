import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, TrendingUp } from 'lucide-react'
import Hero from '../components/Hero'
import SEO from '../components/SEO'

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our dealings.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our work, from design to delivery.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do, and their satisfaction is our priority.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace innovation and continuously improve our processes and offerings.'
    },
  ]

  const keyProjects = [
    {
      name: 'Lakshmi Residency',
      image: '/images/project1.jpg',
      description: '48 luxury apartments with world-class amenities'
    },
    {
      name: 'Narasimha Towers',
      image: '/images/project2.jpg',
      description: 'Premium commercial complex in prime location'
    },
    {
      name: 'Green Valley Villas',
      image: '/images/project3.jpg',
      description: 'Eco-friendly independent villas with modern design'
    },
  ]

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about SRI LAKSHMI NARASIMHA BUILDERS - 25+ years of excellence in real estate development with integrity and innovation."
      />
      
      <Hero
        title="About Us"
        subtitle="Building Trust, Creating Landmarks"
        image="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1080&fit=crop"
        height="h-[500px]"
      />

      {/* Company Overview */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">
                SRI LAKSHMI NARASIMHA BUILDERS has been a trusted name in real estate development 
                for over 25 years. We specialize in creating premium residential and commercial 
                properties that combine quality, innovation, and value.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our commitment to excellence has helped us build lasting relationships with our 
                clients and establish ourselves as one of the leading builders in the region. 
                Every project we undertake reflects our dedication to quality construction, 
                timely delivery, and customer satisfaction.
              </p>
              <p className="text-lg text-gray-600">
                With a portfolio of over 50 successfully completed projects and more than 1000 
                happy families, we continue to set new benchmarks in the real estate industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/images/home_a.jpeg"
                alt="Our Team"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Target className="text-primary-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver exceptional real estate solutions that exceed customer expectations 
                through innovative design, quality construction, and transparent business practices. 
                We aim to create sustainable communities that enhance the quality of life for our 
                residents while contributing to the growth of the region.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="text-secondary-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as the most trusted and preferred real estate developer, known 
                for our commitment to quality, innovation, and customer satisfaction. We envision 
                creating landmark projects that stand the test of time and contribute to building 
                better cities and communities for future generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 shadow-lg">
                    <Icon className="text-white" size={36} />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Key Projects</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Some of our most notable developments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading mb-2">{project.name}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
