# SRI LAKSHMI NARASIMHA BUILDERS - Real Estate Website

A modern, responsive real estate website built with React, featuring dynamic content, smooth animations, and excellent user experience.

## Features

- **Responsive Design**: Fully responsive across all devices
- **Dynamic Hero Section**: Different images for home and other pages
- **Smart Navigation**: Transparent on home, solid on other pages
- **Project Filtering**: Filter projects by status (All, Ongoing, Completed)
- **Gallery Showcase**: Visual display of all projects
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

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

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
```

## Customization

- **Colors**: Edit `tailwind.config.js` to customize the color scheme
- **Content**: Update files in `src/data/` directory
- **Images**: Place images in `src/assets/` directory
- **Styling**: Modify Tailwind classes or add custom CSS in `src/index.css`

## License

© 2025 SRI LAKSHMI NARASIMHA BUILDERS. All rights reserved.

## Admin blog post management

The admin-only blog editor is available at `/admin/posts` and uses the same JWT admin login as `/admin/submissions`.

- GET `/api/posts` is public so the Blog pages can render published posts.
- POST/PUT/DELETE `/api/posts` require the JWT admin token.
- Posts are stored in `server/data/posts.json` for the current server setup.
- For Render, use a persistent disk (or migrate this store to a database/CMS) if posts must survive service restarts/redeploys.

## Property comparison data safety

The comparison page now reads each property's own stored `unitAvailability` values, never derives one property's area from another, and flags records that belong to the same `propertyGroupId`. Unit records currently marked `verified: false` are displayed as unverified; replace those placeholder values with verified project-specific measurements before treating them as official.
