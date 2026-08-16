import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'
import Hero from '../components/Hero'
import SEO from '../components/SEO'

// In dev, Vite proxies /api to the Express server (see vite.config.js).
// In prod on Netlify, /api/* redirects to the Netlify Function of the same name.
// Set VITE_API_URL to override (e.g. a standalone backend host).
const API_URL = import.meta.env.VITE_API_URL || '/api/contact'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/

export default function Contact() {
  const location = useLocation()
  const prefillProject = location.state?.projectName || ''

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: prefillProject ? `Enquiry: ${prefillProject}` : '',
    message: prefillProject ? `Hi, I'm interested in ${prefillProject}. Please share more details.` : '',
    projectName: prefillProject,
    company: '', // honeypot — always left blank by real users
  })

  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (prefillProject) {
      const el = document.getElementById('contact-form-section')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validateClientSide = () => {
    const errors = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name.'
    }
    if (!EMAIL_RE.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!PHONE_RE.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.'
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Please enter a subject.'
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters.'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateClientSide()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) setFieldErrors(data.errors)
        throw new Error(data.message || 'Something went wrong. Please try again.')
      }

      setSubmitStatus('success')
      setStatusMessage(data.message || "Thank you! Your message has been sent successfully. We'll get back to you soon.")
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectName: '',
        company: '',
      })
      setFieldErrors({})
    } catch (err) {
      setSubmitStatus('error')
      setStatusMessage(err.message || 'Failed to send your message. Please try again or contact us by phone.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 6000)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Builder Street', 'Real Estate District', 'City - 500001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@slnbuilders.com', 'support@slnbuilders.com'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
    },
  ]

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, url: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, url: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, url: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  ]

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with SRI LAKSHMI NARASIMHA BUILDERS. Contact us for inquiries, site visits, or any questions about our projects."
      />

      <Hero
        title="Contact Us"
        subtitle="We'd Love to Hear From You"
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
        height="h-[500px]"
      />

      <section id="contact-form-section" className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold font-heading mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Have questions about our projects? Want to schedule a site visit?
                We are here to help! Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-primary-500" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white`}
                        aria-label={social.label}
                      >
                        <Icon size={20} />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160419252!2d78.24323089999999!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">Send us a Message</h2>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-start gap-3 px-4 py-3 rounded-lg mb-6 ${
                        submitStatus === 'success'
                          ? 'bg-green-100 border border-green-400 text-green-700'
                          : 'bg-red-100 border border-red-400 text-red-700'
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {submitStatus === 'success' ? (
                        <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      )}
                      <span>{statusMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {formData.projectName && (
                  <div className="bg-primary-50 text-primary-700 border border-primary-200 px-4 py-2 rounded-lg mb-6 text-sm font-medium">
                    Enquiring about: {formData.projectName}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot field — hidden from real users, catches simple bots */}
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px overflow-hidden"
                  />

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${fieldErrors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                      placeholder="John Doe"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-field ${fieldErrors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                        placeholder="john@example.com"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`input-field ${fieldErrors.phone ? 'border-red-400 focus:ring-red-400' : ''}`}
                        placeholder="+91 98765 43210"
                        aria-invalid={!!fieldErrors.phone}
                        aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                      />
                      {fieldErrors.phone && (
                        <p id="phone-error" className="text-red-600 text-sm mt-1">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`input-field ${fieldErrors.subject ? 'border-red-400 focus:ring-red-400' : ''}`}
                      placeholder="Project Inquiry"
                      aria-invalid={!!fieldErrors.subject}
                      aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                    />
                    {fieldErrors.subject && (
                      <p id="subject-error" className="text-red-600 text-sm mt-1">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`textarea-field ${fieldErrors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
                      placeholder="Tell us about your requirements..."
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    ></textarea>
                    {fieldErrors.message && (
                      <p id="message-error" className="text-red-600 text-sm mt-1">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How can I schedule a site visit?',
                a: 'You can schedule a site visit by calling us, sending an email, or filling out the contact form above. Our team will get back to you within 24 hours to confirm your appointment.'
              },
              {
                q: 'What documents do I need for booking?',
                a: 'You will need identity proof (Aadhar/PAN), address proof, and passport-size photographs. Our sales team will guide you through the complete documentation process.'
              },
              {
                q: 'Do you offer home loans assistance?',
                a: 'Yes, we have tie-ups with leading banks and financial institutions. Our team can help you with the home loan application process and documentation.'
              },
              {
                q: 'What is your payment plan?',
                a: 'We offer flexible payment plans tailored to your needs. The typical structure includes booking amount, construction-linked payments, and possession payment. Contact us for detailed payment schedules.'
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
