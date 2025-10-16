import { useEffect } from 'react'

function SEO({ title, description, keywords, url, image, type = 'website' }) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }

    // Update meta tags
    const updateMetaTag = (selector, content) => {
      if (!content) return

      let element = document.querySelector(selector)
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        const [attr, value] = selector.replace(/[\[\]]/g, '').split('=')
        element.setAttribute(attr, value.replace(/["']/g, ''))
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    }

    // Basic meta tags
    updateMetaTag('meta[name="description"]', description)
    updateMetaTag('meta[name="keywords"]', keywords)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', url)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', url)
      document.head.appendChild(canonical)
    }

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', title)
    updateMetaTag('meta[property="og:description"]', description)
    updateMetaTag('meta[property="og:url"]', url)
    updateMetaTag('meta[property="og:type"]', type)
    if (image) {
      updateMetaTag('meta[property="og:image"]', image)
      updateMetaTag('meta[property="og:image:secure_url"]', image)
    }

    // Twitter tags
    updateMetaTag('meta[name="twitter:title"]', title)
    updateMetaTag('meta[name="twitter:description"]', description)
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', image)
    }

    // Hreflang tags
    const updateHreflang = (hreflang, href) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
      if (link) {
        link.setAttribute('href', href)
      } else {
        link = document.createElement('link')
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', hreflang)
        link.setAttribute('href', href)
        document.head.appendChild(link)
      }
    }

    if (url) {
      updateHreflang('pt', url)
      updateHreflang('pt-PT', url)
      updateHreflang('pt-BR', url)
      updateHreflang('x-default', url)
    }

  }, [title, description, keywords, url, image, type])

  return null
}

export default SEO
