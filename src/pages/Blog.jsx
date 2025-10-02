import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import { blogPosts } from '../data/projectsData'

export default function Blog() {
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <>
      <SEO 
        title="Blog"
        description="Stay updated with the latest news, insights, and trends in real estate. Read our blog for expert advice and industry updates."
      />
      
      <Hero
        title="News & Updates"
        subtitle="Stay Updated with Our Latest Projects and Real Estate Insights"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
        height="h-[500px]"
      />

      <section className="py-20">
        <div className="container-custom">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="relative h-96 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-semibold">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold font-heading mb-4 hover:text-primary-500 transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{featuredPost.author}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors">
                    <span>Read More</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="text-white" size={16} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{post.author}</span>
                    </div>
                    <button className="text-primary-500 hover:text-primary-600 font-semibold text-sm flex items-center space-x-1 transition-colors">
                      <span>Read</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
