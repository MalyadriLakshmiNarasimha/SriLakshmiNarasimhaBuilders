import { useMemo, useState } from 'react'

const WIDTHS = [480, 800, 1200, 1600]

function webpPath(src, suffix) {
  return src.replace(/\.(jpe?g|png)$/i, `${suffix}.webp`)
}

export default function OptimizedImage({ src, alt, className = '', imageClassName = 'object-cover', sizes = '100vw', loading = 'lazy', fetchPriority, ...props }) {
  const [loaded, setLoaded] = useState(false)

  const responsive = useMemo(() => {
    if (!src || !/\.(jpe?g|png)$/i.test(src)) return null
    return {
      placeholder: webpPath(src, '-blur'),
      srcSet: WIDTHS.map((width) => `${webpPath(src, `-${width}w`)} ${width}w`).join(', '),
      fallback: src,
    }
  }, [src])

  if (!responsive) {
    return <img src={src} alt={alt} className={className} loading={loading} fetchPriority={fetchPriority} {...props} />
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url("${responsive.placeholder}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <picture>
        <source type="image/webp" srcSet={responsive.srcSet} sizes={sizes} />
        <img
          src={responsive.fallback}
          srcSet={`${responsive.fallback} 1600w`}
          sizes={sizes}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full ${imageClassName} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      </picture>
    </div>
  )
}
