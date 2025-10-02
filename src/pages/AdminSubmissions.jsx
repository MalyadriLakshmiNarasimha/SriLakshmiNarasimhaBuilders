import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, User, MessageSquare, Trash2, Download } from 'lucide-react'

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = () => {
    const data = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
    setSubmissions(data.reverse()) // Show newest first
  }

  const deleteSubmission = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const updated = submissions.filter(sub => sub.id !== id)
      localStorage.setItem('contactSubmissions', JSON.stringify(updated.reverse()))
      setSubmissions(updated)
    }
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) {
      localStorage.removeItem('contactSubmissions')
      setSubmissions([])
    }
  }

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions to export')
      return
    }

    const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date']
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        `"${sub.name}"`,
        `"${sub.email}"`,
        `"${sub.phone}"`,
        `"${sub.subject}"`,
        `"${sub.message.replace(/"/g, '""')}"`,
        `"${new Date(sub.timestamp).toLocaleString()}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2">Contact Form Submissions</h1>
            <p className="text-gray-600">Total submissions: {submissions.length}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download size={20} />
              Export CSV
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 size={20} />
              Clear All
            </button>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Submissions Yet</h2>
            <p className="text-gray-600">Contact form submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{submission.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{new Date(submission.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSubmission(submission.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete submission"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={18} className="text-primary-500" />
                    <a href={`mailto:${submission.email}`} className="hover:text-primary-500">
                      {submission.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={18} className="text-primary-500" />
                    <a href={`tel:${submission.phone}`} className="hover:text-primary-500">
                      {submission.phone}
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Subject: {submission.subject}</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{submission.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
