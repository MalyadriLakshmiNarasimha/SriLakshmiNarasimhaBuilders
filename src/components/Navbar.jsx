import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Info, Building2, Image, BookOpen, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Projects', path: '/projects', icon: Building2 },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Phone },
  ]

  const navbarBg = isHome && !isScrolled 
    ? 'bg-transparent' 
    : 'bg-white shadow-md'

  const textColor = isHome && !isScrolled 
    ? 'text-white' 
    : 'text-gray-900'

  const logoTextColor = isHome && !isScrolled 
    ? 'text-white' 
    : 'text-primary-500'

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
              <img src="/images/logo.jpg" alt="SL Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:block">
              <h1 className={`font-heading font-bold text-xl ${logoTextColor} transition-colors`}>
                SRI LAKSHMI NARASIMHA
              </h1>
              <p className={`text-sm ${textColor} transition-colors`}>BUILDERS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 relative transition-all duration-200 ${
                    isActive
                      ? `${textColor} font-semibold`
                      : textColor
                  } group`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.name}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transition-all duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${textColor} hover:bg-gray-100 transition-colors`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container-custom py-4">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
