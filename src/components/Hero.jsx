import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function Hero({ title, subtitle, image, video, height = 'h-[600px]' }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      {/* Background Video or Image */}
      {video ? (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 text-gray-200">
              {subtitle}
            </p>
          )}
          {isHome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a href="#featured-projects" className="btn-primary">
                Explore Projects
              </a>
              <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-500">
                Contact Us
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator (only on home) */}
      {isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
