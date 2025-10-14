import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * SEO Head Component
 * Atualiza meta tags dinamicamente baseado na seção visualizada
 * Otimizado para PT-PT e PT-BR
 */
function SEOHead({ section = 'home', title, description, keywords, image }) {
  const { t, i18n } = useTranslation()

  // Default SEO data por seção
  const seoData = {
    home: {
      title: 'WebAzul Creative Studio - Desenvolvimento Web & SaaS | Portugal & Brasil',
      description: 'Agência digital PT/BR especializada em SaaS (AutoAzul, ImobiAzul), landing pages e social media. Transformamos negócios com soluções digitais.',
      keywords: 'desenvolvimento web portugal, agência digital braga, saas portugal, autoazul, imobiazul, websites profissionais, desenvolvimento web brasil',
      image: 'https://webazul.pt/webazul-white.png'
    },
    systems: {
      title: 'Sistemas Prontos SaaS - AutoAzul & ImobiAzul | WebAzul',
      description: 'Soluções SaaS completas para automóveis (AutoAzul) e imobiliárias (ImobiAzul). Sistema de gestão pronto com landing page personalizada.',
      keywords: 'autoazul, imobiazul, sistema gestão automóveis, software concessionária, sistema imobiliário, saas portugal, saas brasil',
      image: 'https://webazul.pt/assets/products/autoazul-mockup.svg'
    },
    landingPages: {
      title: 'Landing Pages Profissionais | Otimizadas para Conversão | WebAzul',
      description: 'Criamos landing pages e websites profissionais otimizados para SEO e conversão. Design responsivo, performance alta e resultados garantidos.',
      keywords: 'landing pages portugal, landing pages brasil, websites profissionais, design responsivo, otimização seo, desenvolvimento web',
      image: 'https://webazul.pt/assets/landing-preview.png'
    },
    socialMedia: {
      title: 'Gestão de Social Media | Estratégia & Conteúdo | WebAzul',
      description: 'Gestão completa de redes sociais com estratégia digital, criação de conteúdo autêntico e análise de resultados para PT e BR.',
      keywords: 'gestão social media portugal, gestão social media brasil, marketing digital, estratégia digital, conteúdo redes sociais',
      image: 'https://webazul.pt/assets/social-media-preview.png'
    },
    contact: {
      title: 'Contacto | Comece Seu Projeto Digital | WebAzul Creative Studio',
      description: 'Entre em contacto para transformar sua ideia em realidade digital. Atendemos Portugal e Brasil com soluções personalizadas.',
      keywords: 'contacto webazul, orçamento website, orçamento desenvolvimento web, agência digital braga portugal',
      image: 'https://webazul.pt/webazul-white.png'
    }
  }

  const currentSEO = seoData[section] || seoData.home
  const finalTitle = title || currentSEO.title
  const finalDescription = description || currentSEO.description
  const finalKeywords = keywords || currentSEO.keywords
  const finalImage = image || currentSEO.image

  useEffect(() => {
    // Update document title
    document.title = finalTitle

    // Update meta tags
    updateMetaTag('name', 'description', finalDescription)
    updateMetaTag('name', 'keywords', finalKeywords)

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', finalTitle)
    updateMetaTag('property', 'og:description', finalDescription)
    updateMetaTag('property', 'og:image', finalImage)
    updateMetaTag('property', 'og:url', window.location.href)

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', finalTitle)
    updateMetaTag('name', 'twitter:description', finalDescription)
    updateMetaTag('name', 'twitter:image', finalImage)

    // Update canonical URL
    updateCanonical(window.location.origin + window.location.pathname)

    // Update language meta tag
    updateMetaTag('name', 'language', i18n.language === 'pt' ? 'Portuguese' : i18n.language)
  }, [section, finalTitle, finalDescription, finalKeywords, finalImage, i18n.language])

  // Helper function to update meta tags
  const updateMetaTag = (attr, key, content) => {
    let element = document.querySelector(`meta[${attr}="${key}"]`)
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute(attr, key)
      element.setAttribute('content', content)
      document.getElementsByTagName('head')[0].appendChild(element)
    }
  }

  // Helper function to update canonical link
  const updateCanonical = (url) => {
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', url)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', url)
      document.getElementsByTagName('head')[0].appendChild(canonical)
    }
  }

  return null // This component doesn't render anything
}

export default SEOHead
