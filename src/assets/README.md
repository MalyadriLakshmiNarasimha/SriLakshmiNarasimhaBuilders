# Assets Directory

This directory contains all static assets for the SRI LAKSHMI NARASIMHA BUILDERS website.

## Directory Structure

```
assets/
├── images/
│   ├── hero/           # Hero section images
│   ├── projects/       # Project images
│   ├── gallery/        # Gallery images
│   ├── blog/           # Blog post images
│   └── logos/          # Company and partner logos
├── icons/              # Custom icons and SVGs
└── documents/          # Brochures, PDFs, etc.
```

## Image Guidelines

### Hero Images
- **Dimensions**: 1920x1080px (16:9 ratio)
- **Format**: JPG or WebP
- **Size**: < 500KB (optimized)
- **Usage**: Home page and page headers

### Project Images
- **Dimensions**: 800x600px (4:3 ratio)
- **Format**: JPG or WebP
- **Size**: < 200KB
- **Usage**: Project cards and listings

### Gallery Images
- **Dimensions**: 1200x1200px (1:1 ratio)
- **Format**: JPG or WebP
- **Size**: < 300KB
- **Usage**: Gallery grid display

### Logos
- **Format**: SVG (preferred) or PNG with transparency
- **Size**: Vector or high resolution
- **Usage**: Navbar, footer, partners section

## Current Placeholder Images

The website currently uses Unsplash placeholder images. Replace these with your actual project images by:

1. Adding your images to the appropriate subdirectory
2. Updating the image paths in `src/data/projectsData.js`
3. Updating hero images in each page component

## Optimization Tips

- Use WebP format for better compression
- Optimize images before uploading (use tools like TinyPNG, ImageOptim)
- Consider using lazy loading for images below the fold
- Use appropriate image dimensions to avoid unnecessary scaling
