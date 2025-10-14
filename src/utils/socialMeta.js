/**
 * Social Meta Utility
 * Atualiza dinamicamente Open Graph e Twitter Cards para compartilhamento social
 */

/**
 * Atualiza meta tags para compartilhamento social
 * @param {Object} options - Opções de meta tags
 * @param {string} options.title - Título da página
 * @param {string} options.description - Descrição da página
 * @param {string} options.image - URL absoluta da imagem
 * @param {string} options.url - URL absoluta da página
 * @param {string} options.type - Tipo OG (website, article, etc)
 */
export const updateSocialMeta = ({
  title = 'WebAzul | Desenvolvimento Web & SaaS Portugal Brasil',
  description = '🚀 AutoAzul + ImobiAzul: Software completo para automóveis e imobiliárias. Landing pages profissionais. Transforme seu negócio digital! 🇵🇹🇧🇷',
  image = 'https://webazul.pt/og-image.png',
  url = window.location.href,
  type = 'website'
}) => {
  // Open Graph
  updateMetaTag('property', 'og:title', title)
  updateMetaTag('property', 'og:description', description)
  updateMetaTag('property', 'og:image', image)
  updateMetaTag('property', 'og:url', url)
  updateMetaTag('property', 'og:type', type)

  // Twitter
  updateMetaTag('name', 'twitter:title', title)
  updateMetaTag('name', 'twitter:description', description)
  updateMetaTag('name', 'twitter:image', image)
  updateMetaTag('name', 'twitter:url', url)

  // Document title
  document.title = title
}

/**
 * Helper para atualizar meta tags
 */
const updateMetaTag = (attr, key, content) => {
  let element = document.querySelector(`meta[${attr}="${key}"]`)
  if (element) {
    element.setAttribute('content', content)
  } else {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    element.setAttribute('content', content)
    document.head.appendChild(element)
  }
}

/**
 * Meta tags por seção do site
 */
export const SocialMetaData = {
  home: {
    title: 'WebAzul | Desenvolvimento Web & SaaS Portugal Brasil',
    description: '🚀 AutoAzul + ImobiAzul: Software completo para automóveis e imobiliárias. Landing pages profissionais. Transforme seu negócio digital! 🇵🇹🇧🇷',
    image: 'https://webazul.pt/og-image.png',
    url: 'https://webazul.pt/'
  },
  autoazul: {
    title: 'AutoAzul | Sistema de Gestão para Stands Automóveis',
    description: '🚗 Sistema completo para gestão de concessionárias e stands automóveis. CRM integrado, gestão de inventário, leads e vendas. Experimente agora!',
    image: 'https://webazul.pt/og-autoazul.png',
    url: 'https://webazul.pt/#systems'
  },
  imobiazul: {
    title: 'ImobiAzul | Plataforma para Imobiliárias',
    description: '🏠 Plataforma completa para gestão de imobiliárias. Portal personalizado, tour virtual 360°, CRM para leads. Revolucione sua imobiliária!',
    image: 'https://webazul.pt/og-imobiazul.png',
    url: 'https://webazul.pt/#systems'
  },
  landingPages: {
    title: 'Landing Pages Profissionais | Otimizadas para Conversão',
    description: '💼 Criamos landing pages que convertem! Design responsivo, otimização SEO, performance alta. Aumente suas vendas online agora!',
    image: 'https://webazul.pt/og-landing-pages.png',
    url: 'https://webazul.pt/#landing-pages'
  },
  socialMedia: {
    title: 'Gestão de Social Media | Estratégia & Conteúdo',
    description: '📱 Gestão completa de redes sociais com estratégia digital, conteúdo autêntico e análise de resultados para PT e BR. Cresça online!',
    image: 'https://webazul.pt/og-social-media.png',
    url: 'https://webazul.pt/#social-media'
  },
  contact: {
    title: 'Contacto | Comece Seu Projeto Digital | WebAzul',
    description: '📞 Entre em contacto para transformar sua ideia em realidade digital. Atendemos Portugal e Brasil. Consulta gratuita!',
    image: 'https://webazul.pt/og-image.png',
    url: 'https://webazul.pt/#contact'
  }
}

/**
 * Gera botões de compartilhamento social
 * @param {string} url - URL para compartilhar
 * @param {string} title - Título para compartilhar
 */
export const generateSocialShareLinks = (url = window.location.href, title = document.title) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  }
}

/**
 * Abre janela de compartilhamento
 * @param {string} platform - Plataforma (facebook, twitter, etc)
 * @param {string} url - URL para compartilhar
 * @param {string} title - Título para compartilhar
 */
export const shareTo = (platform, url = window.location.href, title = document.title) => {
  const links = generateSocialShareLinks(url, title)
  const shareUrl = links[platform]

  if (!shareUrl) {
    console.error(`Platform "${platform}" not supported`)
    return
  }

  // Email abre diretamente
  if (platform === 'email') {
    window.location.href = shareUrl
    return
  }

  // Outras plataformas abrem popup
  const width = 600
  const height = 600
  const left = (window.innerWidth - width) / 2
  const top = (window.innerHeight - height) / 2

  window.open(
    shareUrl,
    'share',
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  )
}

/**
 * Usa Web Share API se disponível
 * @param {Object} data - Dados para compartilhar
 */
export const nativeShare = async (data = {}) => {
  const shareData = {
    title: data.title || document.title,
    text: data.description || document.querySelector('meta[name="description"]')?.content || '',
    url: data.url || window.location.href
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
      console.log('✅ Shared successfully')
      return true
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('❌ Error sharing:', err)
      }
      return false
    }
  } else {
    console.log('⚠️ Web Share API not supported')
    return false
  }
}

export default {
  updateSocialMeta,
  SocialMetaData,
  generateSocialShareLinks,
  shareTo,
  nativeShare
}
