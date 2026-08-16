# Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd c:\Users\laksh\SLNB-FS
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM
- Framer Motion (animations)
- React Helmet Async (SEO)
- Lucide React (icons)
- Tailwind CSS
- Vite (build tool)

### 3. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000` and automatically open in your browser.

## What's Included

### ✅ All Pages Implemented
- **Home** - Hero section, stats, features, featured projects, testimonials
- **About** - Company overview, mission, vision, values, timeline, key projects
- **Projects** - Filterable project listings (All/Ongoing/Completed), limited to 5 initially
- **Gallery** - Visual showcase of all projects with lightbox
- **Blog** - Featured post and blog grid with categories
- **Contact** - Contact form, information, map, FAQ

### ✅ Core Components
- **Navbar** - Responsive with transparent/solid modes
- **Footer** - Contact info, links, partners, social media
- **Hero** - Dynamic hero section with different images per page
- **ProjectCard** - Reusable project display component
- **SEO** - Meta tags and Open Graph support
- **ScrollToTop** - Auto-scroll on route change

### ✅ Features
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- SEO optimized with react-helmet-async
- Modern UI with Tailwind CSS
- Lucide icons throughout
- Form validation
- Image lightbox in gallery
- Project filtering
- Custom color scheme

### ✅ Data Structure
- 8 sample projects (residential & commercial)
- 6 blog posts with categories
- 3 testimonials
- All data in `src/data/projectsData.js`

## Customization Quick Start

### 1. Update Company Information

**Footer & Contact Page:**
- Edit `src/components/Footer.jsx`
- Edit `src/pages/Contact.jsx`

Update:
- Address
- Phone numbers
- Email addresses
- Social media links
- Working hours

### 2. Add Your Projects

Edit `src/data/projectsData.js`:

```javascript
{
  id: 9,
  name: "Your Project Name",
  description: "Project description",
  location: "Location",
  image: "path/to/image.jpg", // Add to src/assets/
  units: 50,
  status: "ongoing", // or "completed"
  completionDate: "Month Year",
  category: "residential", // or "commercial"
  features: ["Feature 1", "Feature 2"],
  price: "₹XX - ₹YY"
}
```

### 3. Update Hero Images

Each page has a hero section. Update images in page files:
- `src/pages/Home.jsx`
- `src/pages/About.jsx`
- `src/pages/Projects.jsx`
- `src/pages/Gallery.jsx`
- `src/pages/Blog.jsx`
- `src/pages/Contact.jsx`

### 4. Customize Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#f5870f', // Your primary color
    // Add other shades
  }
}
```

### 5. Add Your Logo

Replace the "SL" text logo in:
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`

With an image:
```jsx
<img src="/path/to/logo.png" alt="Logo" className="h-12" />
```

## File Structure Overview

```
src/
├── assets/          # Place your images here
├── components/      # Reusable UI components
├── data/           # Project and blog data
├── pages/          # Page components (routes)
├── App.jsx         # Main app with routing
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Development Workflow

### Making Changes

1. **Edit files** - Changes auto-reload in browser
2. **Add images** - Place in `src/assets/`
3. **Update data** - Edit `src/data/projectsData.js`
4. **Test** - Check all pages and responsive views

### Before Deployment

1. **Replace placeholder images** with actual photos
2. **Update all contact information**
3. **Test contact form** (currently simulated)
4. **Update meta descriptions** for SEO
5. **Test on mobile devices**
6. **Run build** to check for errors

```bash
npm run build
```

## Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Start dev server (`npm run dev`)
3. 📝 Update company information
4. 📸 Add your project images
5. ✏️ Customize content
6. 🎨 Adjust colors/styling
7. 🧪 Test thoroughly
8. 🚀 Deploy to production

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Getting Help

- **Documentation**: See `README.md` and `DEVELOPMENT.md`
- **Styling**: Check `src/index.css` for custom classes
- **Data**: Review `src/data/projectsData.js` structure
- **Components**: Examine component files for props and usage

## Production Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import project on Vercel
3. Deploy automatically

### Option 2: Netlify
1. Run `npm run build`
2. Drag `dist` folder to Netlify
3. Configure domain

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder contents
3. Configure web server

## Important Notes

⚠️ **Before Going Live:**
- Replace all placeholder images
- Update contact information
- Connect contact form to backend/email service
- Add Google Analytics (optional)
- Set up proper domain and SSL
- Test on multiple devices and browsers

🎉 **You're all set!** Start the development server and begin customizing your website.
