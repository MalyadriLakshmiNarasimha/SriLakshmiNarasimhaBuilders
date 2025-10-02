import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = 'SRI LAKSHMI NARASIMHA BUILDERS', 
  description = 'Premium real estate development company building dreams into reality with excellence, integrity, and innovation.',
  keywords = 'real estate, builders, construction, residential, commercial, property development',
  image = '/og-image.jpg',
  url
}) {
  const fullTitle = title === 'SRI LAKSHMI NARASIMHA BUILDERS' 
    ? title 
    : `${title} | SRI LAKSHMI NARASIMHA BUILDERS`
  
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SRI LAKSHMI NARASIMHA BUILDERS" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  )
}
