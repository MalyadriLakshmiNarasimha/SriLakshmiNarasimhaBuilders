# Development Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The site will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
SLNB-FS/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images, logos, static files
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SEO.jsx
│   │   └── ScrollToTop.jsx
│   ├── data/              # Static data and content
│   │   └── projectsData.js
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Gallery.jsx
│   │   ├── Blog.jsx
│   │   └── Contact.jsx
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Key Features Implemented

### 1. Dynamic Hero Section
- Different images for home page vs other pages
- Transparent navbar on home, solid on other pages
- Smooth animations with framer-motion

### 2. Responsive Navigation
- Mobile-friendly hamburger menu
- Active page highlighting
- Smooth transitions

### 3. Projects Page
- Filter by status (All, Ongoing, Completed)
- Displays first 5 projects by default
- "Show More" functionality
- Project cards with hover effects

### 4. Gallery Page
- Displays all projects visually
- Filter by category (All, Residential, Commercial)
- Lightbox modal for image viewing
- Grid layout with hover effects

### 5. SEO Optimization
- react-helmet-async for meta tags
- Unique titles and descriptions per page
- Open Graph and Twitter Card support

### 6. Animations
- Framer Motion for smooth page transitions
- Scroll-triggered animations
- Hover effects and micro-interactions

## Customization Guide

### Updating Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your primary color shades
  },
  secondary: {
    // Your secondary color shades
  }
}
```

### Adding/Updating Projects

Edit `src/data/projectsData.js`:

```javascript
export const projects = [
  {
    id: 1,
    name: "Project Name",
    description: "Description",
    location: "Location",
    image: "/path/to/image.jpg",
    units: 48,
    status: "completed", // or "ongoing"
    completionDate: "Month Year",
    category: "residential", // or "commercial"
    features: ["Feature 1", "Feature 2"],
    price: "Price Range"
  }
]
```

### Updating Contact Information

Edit `src/components/Footer.jsx` and `src/pages/Contact.jsx` to update:
- Address
- Phone numbers
- Email addresses
- Social media links
- Working hours

### Adding New Pages

1. Create new page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

Example:
```javascript
// In App.jsx
import NewPage from './pages/NewPage'

<Route path="/new-page" element={<NewPage />} />

// In Navbar.jsx
{ name: 'New Page', path: '/new-page', icon: IconName }
```

## Styling

### Tailwind CSS Classes

The project uses custom Tailwind classes defined in `src/index.css`:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-outline` - Outlined button style
- `.section-title` - Section heading style
- `.section-subtitle` - Section subtitle style
- `.card` - Card container style
- `.input-field` - Form input style
- `.textarea-field` - Textarea style

### Custom Utilities

- `.text-gradient` - Gradient text effect
- `.bg-gradient-primary` - Primary gradient background
- `.bg-gradient-secondary` - Secondary gradient background

## Performance Tips

1. **Image Optimization**: Replace placeholder images with optimized WebP images
2. **Code Splitting**: Vite automatically handles this
3. **Lazy Loading**: Consider lazy loading images below the fold
4. **Caching**: Configure proper caching headers in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Build the project:
```bash
npm run build
```

The `dist/` folder will contain the production-ready files.

### Deploy to:
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **Traditional hosting**: Upload `dist` folder contents

## Troubleshooting

### Port already in use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Support

For issues or questions:
- Check the README.md
- Review component documentation
- Check console for errors
- Verify all dependencies are installed

## Future Enhancements

Consider adding:
- [ ] Blog post detail pages
- [ ] Project detail pages
- [ ] Search functionality
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Property comparison tool
- [ ] Virtual tours
- [ ] Customer testimonials form
- [ ] Newsletter integration
- [ ] Live chat support
