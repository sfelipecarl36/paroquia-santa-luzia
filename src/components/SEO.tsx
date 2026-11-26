
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

type SEOProps = {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string | null
}

export default function SEO({
  title,
  description,
  image = '/images/brasao-paroquia.png',
  type = 'website',
  publishedTime,
}: SEOProps) {
  const location = useLocation()

  const siteUrl = (
    import.meta.env.VITE_SITE_URL ||
    window.location.origin
  ).replace(/\/+$/, '')

  const canonicalUrl = `${siteUrl}${location.pathname}`

  const imageUrl = image.startsWith('http')
    ? image
    : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`

  const nomeSite = 'Paróquia Santa Luzia do Bom Futuro'
  const tituloCompleto = `${title} | ${nomeSite}`

  return (
    <Helmet>
      <title>{tituloCompleto}</title>

      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={nomeSite} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="pt_BR" />

      {type === 'article' && publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
        />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
