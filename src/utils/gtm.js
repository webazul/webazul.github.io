/**
 * Google Tag Manager - Utility Functions
 * Funções para tracking de eventos no GTM
 */

/**
 * Push event to dataLayer
 * @param {string} event - Nome do evento
 * @param {object} data - Dados adicionais do evento
 */
export const pushGTMEvent = (event, data = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data
    })
  }
}

/**
 * Track CTA Click
 * @param {string} ctaName - Nome do CTA
 * @param {string} location - Localização do CTA na página
 */
export const trackCTAClick = (ctaName, location) => {
  pushGTMEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location
  })
}

/**
 * Track Service Click
 * @param {string} serviceName - Nome do serviço
 * @param {string} action - Ação (view, click, etc)
 */
export const trackServiceClick = (serviceName, action = 'click') => {
  pushGTMEvent('service_interaction', {
    service_name: serviceName,
    action: action
  })
}

/**
 * Track Portfolio Project Click
 * @param {string} projectName - Nome do projeto
 * @param {string} projectUrl - URL do projeto
 */
export const trackPortfolioClick = (projectName, projectUrl) => {
  pushGTMEvent('portfolio_click', {
    project_name: projectName,
    project_url: projectUrl
  })
}

/**
 * Track Form Submission
 * @param {string} formName - Nome do formulário
 * @param {object} formData - Dados do formulário (sem informações sensíveis)
 */
export const trackFormSubmit = (formName, formData = {}) => {
  pushGTMEvent('form_submit', {
    form_name: formName,
    service: formData.service || '',
    budget: formData.budget || '',
    timeline: formData.timeline || ''
  })
}

/**
 * Track WhatsApp Click
 * @param {string} source - Origem do clique (widget, button, etc)
 */
export const trackWhatsAppClick = (source = 'widget') => {
  pushGTMEvent('whatsapp_click', {
    source: source
  })
}

/**
 * Track Section View
 * @param {string} sectionName - Nome da seção
 */
export const trackSectionView = (sectionName) => {
  pushGTMEvent('section_view', {
    section_name: sectionName
  })
}

/**
 * Track Scroll Depth
 * @param {number} depth - Profundidade do scroll (25, 50, 75, 90, 100)
 */
export const trackScrollDepth = (depth) => {
  pushGTMEvent('scroll_depth', {
    depth: depth
  })
}

/**
 * Track Social Media Click
 * @param {string} platform - Plataforma (instagram, facebook, etc)
 * @param {string} postUrl - URL do post
 */
export const trackSocialClick = (platform, postUrl) => {
  pushGTMEvent('social_media_click', {
    platform: platform,
    post_url: postUrl
  })
}
