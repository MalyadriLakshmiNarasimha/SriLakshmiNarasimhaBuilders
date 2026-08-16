import { useEffect, useState } from 'react'
import OptimizedImage from '../components/OptimizedImage'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import SEO from '../components/SEO'
import { blogPosts as fallbackPosts } from '../data/projectsData'
import { getBlogPosts } from '../utils/blogApi'

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blogPosts, setBlogPosts] = useState(fallbackPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts().then(setBlogPosts).finally(() => setLoading(false))
  }, [])

  const post = blogPosts.find((p) => String(p.id) === id)

  if (loading && !post) return <div className="container-custom py-32 text-center"><p className="text-gray-600">Loading article...</p></div>

  if (!post) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-3xl font-bold font-heading mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
        <Link to="/blog" className="btn-primary inline-block">Back to Blog</Link>
      </div>
    )
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)
  const fallbackRelated = relatedPosts.length > 0
    ? relatedPosts
    : blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareLinks = [
    {
      icon: Facebook,
      label: 'Share on Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: Twitter,
      label: 'Share on Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    },
    {
      icon: Linkedin,
      label: 'Share on LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    } catch {
      // Clipboard API unavailable — silently ignore
    }
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, real estate blog, ${post.title}`}
        image={post.image}
      />

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

      <article className="py-12">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mt-4 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>

          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-10"
            loading="eager"
          />

          <div className="prose prose-lg max-w-none">
            {post.content?.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-gray-700 leading-relaxed mb-5"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Social share */}
          <div className="flex items-center gap-3 mt-10 pt-8 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Share:</span>
            {shareLinks.map((share) => {
              const Icon = share.icon
              return (
                <a
                  key={share.label}
                  href={share.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={share.label}
                  className="w-10 h-10 bg-gray-100 hover:bg-primary-500 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={18} />
                </a>
              )
            })}
            <button
              onClick={handleCopyLink}
              aria-label="Copy link"
              className="w-10 h-10 bg-gray-100 hover:bg-primary-500 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              <LinkIcon size={18} />
            </button>
          </div>

          {/* Author bio */}
          {post.authorBio && (
            <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-6 mt-8">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="text-primary-500" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{post.author}</h3>
                <p className="text-gray-600 text-sm">{post.authorBio}</p>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related posts */}
      {fallbackRelated.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold font-heading mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {fallbackRelated.map((related) => (
                <Link key={related.id} to={`/blog/${related.id}`} className="card group block">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={related.image}
                      alt={related.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary-600">{related.category}</span>
                    <h3 className="font-bold text-gray-900 mt-1 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
