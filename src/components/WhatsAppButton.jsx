import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919989625479'
  const message = encodeURIComponent('Hello Sri Lakshmi Narasimha Builders, I would like to know more about your projects.')
  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle size={28} />
    </a>
  )
}
