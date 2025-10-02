# SRI LAKSHMI NARASIMHA BUILDERS - Real Estate Website

A modern, responsive real estate website built with React, featuring dynamic content, smooth animations, and excellent user experience.

## Features

- **Responsive Design**: Fully responsive across all devices
- **Dynamic Hero Section**: Different images for home and other pages
- **Smart Navigation**: Transparent on home, solid on other pages
- **Project Filtering**: Filter projects by status (All, Ongoing, Completed)
- **Gallery Showcase**: Visual display of all projects
- **Direct Email Integration**: Contact form sends emails directly to your inbox (no EmailJS)
- **Auto-Reply System**: Customers receive instant confirmation emails
- **SEO Optimized**: Using react-helmet-async
- **Smooth Animations**: Powered by framer-motion
- **Modern UI**: Built with Tailwind CSS and Lucide icons

## Pages

- **Home**: Hero section with featured projects
- **About**: Company mission, vision, values, and key projects
- **Projects**: Filterable project listings (limited to 5 on initial load)
- **Gallery**: Visual showcase of all projects
- **Blog**: Company news and updates
- **Contact**: Contact form and company information

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Helmet Async
- Lucide React (Icons)
- Vite (Build tool)

## Getting Started

### Frontend Installation

```bash
npm install
```

### Backend Installation (for Contact Form Email)

```bash
cd server
npm install
```

**📧 Email Setup Required**: To enable the contact form email functionality, follow the setup guide in `SETUP_DIRECT_EMAIL.md`

### Development

**Start Backend Server (Terminal 1):**
```bash
cd server
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          # Images, logos, and static files
├── components/      # Reusable components (Navbar, Footer, Hero, etc.)
├── pages/          # Page components
├── data/           # Static data and content
├── App.jsx         # Main app component with routing
├── main.jsx        # Entry point
└── index.css       # Global styles

server/
├── index.js         # Express server with email functionality
├── package.json     # Backend dependencies
├── .env.example     # Environment variables template
└── README.md        # Backend documentation
```

## Customization

- **Colors**: Edit `tailwind.config.js` to customize the color scheme
- **Content**: Update files in `src/data/` directory
- **Images**: Place images in `src/assets/` directory
- **Styling**: Modify Tailwind classes or add custom CSS in `src/index.css`
- **Email Templates**: Modify email HTML in `server/index.js`

## Email Setup

The contact form sends emails directly to your inbox without using EmailJS. This means:

✅ **No "via EmailJS" notice** in emails  
✅ **Professional appearance** - emails come from your Gmail  
✅ **Auto-reply feature** - customers get instant confirmation  
✅ **Free** - no third-party service fees  

**Quick Setup:**
1. Follow instructions in `SETUP_DIRECT_EMAIL.md`
2. Get a Gmail App Password
3. Configure `.env` file in `server/` directory
4. Start both frontend and backend servers

For detailed instructions, see:
- `SETUP_DIRECT_EMAIL.md` - Quick start guide
- `EMAIL_SETUP_GUIDE.md` - Complete setup with production deployment

## License

© 2025 SRI LAKSHMI NARASIMHA BUILDERS. All rights reserved.
