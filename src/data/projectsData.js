export const projects = [
  {
    id: 1,
    name: "Sri Lakshmi arcade",
    description: "Luxury residential apartments with modern amenities and spacious layouts in the heart of the city.",
    location: "Kamala Nagar,Ecil,Hyderabad",
    image: "/images/project1.jpg",
    additionalImages: ["/images/project1/project-1.1.jpg"],
    pdfFiles: [
      { name: "Project Brochure", path: "/images/project1/project-1.pdf" },
      { name: "Floor Plans", path: "/images/project1/project-1.2.pdf" }
    ],
    flats: 10,
    status: "ongoing",
    completionDate: "December 2025"
  },
  {
    id: 2,
    name: "Sri Lakshmi arcade",
    description: "Premium commercial complex with state-of-the-art facilities and strategic location for businesses.",
    location:"Kamala Nagar,Ecil,Hyderabad",
    image: "/images/project2.jpg",
    flats: 10,
    status: "ongoing",
    completionDate: "December 2025"
  },
  {
    id: 3,
    name: "SREE SIRI KALA PALACE",
    description: "Eco-friendly independent villas surrounded by green greenery and modern infrastructure.",
    location: "Sri Nagar,Ecil,Hyderabad",
    image: "/images/project3.jpg",
    flats: 8,
    status: "completed",
    completionDate: "August 2023"
  },
  {
    id: 4,
    name: "Sri Sai Enclave",
    description: "Affordable housing project with quality construction and essential amenities for modern living.",
    location: "Near Skandagiri Temple,Secunderabad",
    image: "/images/project4.jpg",
    flats: 8,
    status: "completed",
    completionDate: "March 2025"
  },
  {
    id: 5,
    name: "KOUSALYA'S SANTUSHTI",
    description: "Modern IT park with cutting-edge infrastructure designed for technology companies.",
    location: "MJ Nagar,Moulali Nagar,Hyderabad",
    image: "/images/project5.jpg",
    flats: 20,
    status: "completed",
    completionDate: "December 2025"
  }
]

// Gallery projects (additional projects shown only in gallery)
export const galleryProjects = [
  {
    id: 6,
    name: "Royal Heights",
    description: "Ultra-luxury penthouses with panoramic city views and world-class amenities.",
    location: "karthikeya Nagar,Hyderabad",
    image: "/images/project6.jpg",
    flats: 8,
    status: "completed",
    completionDate: "May 2023"
  },
  {
    id: 7,
    name: "Sunrise Apartment",
    description: "Contemporary apartment with excellent ventilation and natural lighting.",
    location: "karthikeya Nagar,Hyderabad",
    image: "/images/project7.jpg",
    flats: 72,
    status: "ongoing",
    completionDate: "September 2024"
  },
  {
    id: 8,
    name: "Metro Mall Complex",
    description: "Multi-level shopping and entertainment complex with premium retail spaces.",
    location: "karthikeya Nagar,Hyderabad",
    image: "/images/project8.jpg",
    flats: 150,
    status: "completed",
    completionDate: "January 2023"
  },
  {
    id: 9,
    name: "Skyline Towers",
    description: "Modern high-rise residential complex with stunning city views.",
    location: "Bhaskarao Nagar,Ecil,Hyderabad",
    image: "/images/project9.jpg",
    flats: 180,
    status: "Completed",
    completionDate: "August 2025"
  },
  {
    id: 10,
    name: "Business Hub",
    description: "Premium office spaces designed for modern businesses.",
    location: "Sanikpuri,Ecil,Hyderabad",
    image: "/images/project10.jpg",
    flats: 30,
    status: "Completed",
    completionDate: "November 2025"
  },
  {
    id: 11,
    name: "Garden Residences",
    description: "Spacious apartment with landscaped gardens and recreational facilities.",
    location: "Kokapet, Hyderabad",
    image: "/images/project12.jpg",
    flats: 64,
    status: "completed",
    completionDate: "March 2023"
  }
]

export const blogPosts = [
  {
    title: "Top 10 Things to Consider When Buying Your First Home",
    excerpt: "Buying your first home is an exciting milestone. Here are the essential factors you should consider before making this important decision.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    date: "March 15, 2024",
    author: "Rajesh Kumar",
    category: "Home Buying Tips",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Sustainable Building Practices: Our Commitment to Green Construction",
    excerpt: "Learn about our eco-friendly construction methods and how we're contributing to a sustainable future.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    date: "March 10, 2024",
    author: "Priya Sharma",
    category: "Sustainability",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Real Estate Investment: Why Hyderabad is the Next Big Market",
    excerpt: "Discover why Hyderabad is becoming one of India's hottest real estate investment destinations.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop",
    date: "March 5, 2024",
    author: "Anil Reddy",
    category: "Investment",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Smart Home Technology: The Future of Modern Living",
    excerpt: "Explore how smart home technology is revolutionizing the way we live and interact with our homes.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    date: "February 28, 2024",
    author: "Sneha Patel",
    category: "Technology",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Understanding RERA: Your Rights as a Home Buyer",
    excerpt: "A comprehensive guide to understanding the Real Estate Regulatory Authority and how it protects your interests.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    date: "February 20, 2024",
    author: "Vikram Singh",
    category: "Legal",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Interior Design Trends for 2024",
    excerpt: "Stay ahead of the curve with these exciting interior design trends that are shaping homes in 2024.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    date: "February 15, 2024",
    author: "Meera Nair",
    category: "Design",
    readTime: "6 min read"
  }
]

export const testimonials = [
  {
    id: 1,
    name: "Ramesh Reddy",
    role: "Homeowner, Lakshmi Residency",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    text: "Excellent quality construction and timely delivery. The team was professional and addressed all our concerns promptly. Highly recommended!"
  },
  {
    id: 2,
    name: "Sunita Sharma",
    role: "Investor, Narasimha Towers",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    text: "Best investment decision I've made. The location is perfect and the amenities are top-notch. Great value for money!"
  },
  {
    id: 3,
    name: "Karthik Rao",
    role: "Villa Owner, Green Valley Villas",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    text: "Living in Green Valley Villas has been a dream come true. The eco-friendly features and peaceful environment are exactly what we wanted."
  }
]
