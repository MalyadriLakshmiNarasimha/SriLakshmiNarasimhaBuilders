import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import AdminSubmissions from './pages/AdminSubmissions'
import AdminProjects from './pages/AdminProjects'
import AdminPosts from './pages/AdminPosts'
import Search from './pages/Search'
import Compare from './pages/Compare'
import ScrollToTop from './components/ScrollToTop'
import Analytics from './components/Analytics'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Analytics />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/admin/submissions" element={<AdminSubmissions />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/posts" element={<AdminPosts />} />
        </Routes>
      </main>
      <Footer />
    <WhatsAppButton />
    </div>
  )
}

export default App
