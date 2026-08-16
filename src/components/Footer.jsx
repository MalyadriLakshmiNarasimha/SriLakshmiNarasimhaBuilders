import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Clock,
  Building2
} from 'lucide-react'

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterState, setNewsletterState] = useState({ status: 'idle', message: '' })
  const currentYear = new Date().getFullYear()


  const subscribeNewsletter = async (event) => {
    event.preventDefault()
    setNewsletterState({ status: 'loading', message: '' })
    try {
      const base = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${base}/api/newsletter/subscribe`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Subscription failed.')
      setNewsletterState({ status: 'success', message: data.message || 'Subscribed successfully.' })
      setNewsletterEmail('')
    } catch (error) {
      setNewsletterState({ status: 'error', message: error.message || 'Please try again later.' })
    }
  }

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  const services = [
    'Residential Construction',
    'Commercial Projects',
    'Interior Design',
    'Property Development',
    'Real Estate Consulting',
    'Project Management',
  ]

  const partners = [
    { name: 'Partner 1', logo: 'https://via.placeholder.com/120x60?text=Partner+1' },
    { name: 'Partner 2', logo: 'https://via.placeholder.com/120x60?text=Partner+2' },
    { name: 'Partner 3', logo: 'https://via.placeholder.com/120x60?text=Partner+3' },
    { name: 'Partner 4', logo: 'https://via.placeholder.com/120x60?text=Partner+4' },
  ]

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Youtube, url: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                <img src="/images/logo.jpg" alt="SL Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  SRI LAKSHMI NARASIMHA
                </h3>
                <p className="text-sm text-primary-400">BUILDERS</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Building dreams into reality with excellence, integrity, and innovation. 
              Your trusted partner in premium real estate development.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-sm flex items-start">
                  <Building2 size={16} className="mr-2 mt-1 text-primary-400 flex-shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <MapPin size={18} className="mr-3 mt-1 text-primary-400 flex-shrink-0" />
                <span>123 Builder Street, Real Estate District, City - 500001</span>
              </li>
              <li className="flex items-center text-sm">
                <Phone size={18} className="mr-3 text-primary-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center text-sm">
                <Mail size={18} className="mr-3 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@slnbuilders.com" className="hover:text-primary-400 transition-colors">
                  info@slnbuilders.com
                </a>
              </li>
              <li className="flex items-start text-sm">
                <Clock size={18} className="mr-3 mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-white font-heading font-semibold text-xl mb-2">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-5">Get new project launches and real estate insights in your inbox.</p>
            <form onSubmit={subscribeNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input type="email" required value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="Your email address" className="input-field flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400" aria-label="Email address" />
              <button type="submit" disabled={newsletterState.status === 'loading'} className="btn-primary disabled:opacity-60">{newsletterState.status === 'loading' ? 'Subscribing...' : 'Subscribe'}</button>
            </form>
            {newsletterState.message && <p className={`text-sm mt-3 ${newsletterState.status === 'error' ? 'text-red-400' : 'text-green-400'}`}>{newsletterState.message}</p>}
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-white font-heading font-semibold text-lg mb-6 text-center">
            Our Trusted Partners
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left">
              © {currentYear} SRI LAKSHMI NARASIMHA BUILDERS. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
