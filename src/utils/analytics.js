/**
 * Analytics Utility
 * Centralized event tracking for GTM, GA4, and Meta Pixel
 */

// Event Categories
export const EventCategory = {
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  NAVIGATION: 'navigation',
  CONTACT: 'contact',
  SERVICE: 'service',
}

// Event Actions
export const EventAction = {
  CLICK: 'click',
  SUBMIT: 'submit',
  VIEW: 'view',
  SCROLL: 'scroll',
  OPEN: 'open',
  SELECT: 'select',
}

/**
 * Track event to Google Tag Manager
 * @param {string} event - Event name
 * @param {object} data - Event data
 */
export const trackEvent = (event, data = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    })
    console.log('📊 Event tracked:', event, data)
  }
}

/**
 * Track conversion event (GA4 + Meta Pixel)
 * @param {string} conversionType - Type of conversion
 * @param {object} data - Additional data
 */
export const trackConversion = (conversionType, data = {}) => {
  // GA4 via GTM
  trackEvent('conversion', {
    conversion_type: conversionType,
    ...data,
  })

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', conversionType, data)
  }
}

/**
 * Track form submission
 * @param {string} formName - Name of the form
 * @param {object} formData - Form data (sanitized)
 */
export const trackFormSubmit = (formName, formData = {}) => {
  trackEvent('form_submit', {
    event_category: EventCategory.CONVERSION,
    event_label: formName,
    form_name: formName,
    ...formData,
  })

  // Meta Pixel Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formName,
      ...formData,
    })
  }
}

/**
 * Track CTA button click
 * @param {string} ctaName - Name/label of the CTA
 * @param {string} location - Where the CTA is located
 */
export const trackCTAClick = (ctaName, location = '') => {
  trackEvent('cta_click', {
    event_category: EventCategory.ENGAGEMENT,
    event_label: ctaName,
    cta_name: ctaName,
    cta_location: location,
  })
}

/**
 * Track service card interaction
 * @param {string} serviceName - Name of the service
 * @param {string} action - Action performed (view, click)
 */
export const trackServiceInteraction = (serviceName, action = EventAction.CLICK) => {
  trackEvent('service_interaction', {
    event_category: EventCategory.SERVICE,
    event_action: action,
    service_name: serviceName,
  })

  // Meta Pixel ViewContent
  if (action === EventAction.VIEW && typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: serviceName,
      content_category: 'Service',
    })
  }
}

/**
 * Track phone/email/whatsapp click
 * @param {string} contactType - Type of contact (phone, email, whatsapp)
 * @param {string} value - Contact value
 */
export const trackContactClick = (contactType, value = '') => {
  trackEvent('contact_click', {
    event_category: EventCategory.CONTACT,
    event_label: contactType,
    contact_type: contactType,
    contact_value: value,
  })

  // Meta Pixel Contact event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_type: contactType,
    })
  }
}

/**
 * Track section view (using Intersection Observer)
 * @param {string} sectionName - Name of the section
 */
export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    event_category: EventCategory.NAVIGATION,
    section_name: sectionName,
  })
}

/**
 * Track scroll depth
 * @param {number} percentage - Scroll depth percentage (25, 50, 75, 100)
 */
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', {
    event_category: EventCategory.ENGAGEMENT,
    event_label: `${percentage}%`,
    scroll_percentage: percentage,
  })
}

/**
 * Track page view (for SPA navigation)
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
export const trackPageView = (pagePath, pageTitle) => {
  // GA4 via GTM
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  })

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

/**
 * Track outbound link click
 * @param {string} url - Destination URL
 * @param {string} linkText - Link text
 */
export const trackOutboundClick = (url, linkText = '') => {
  trackEvent('outbound_click', {
    event_category: EventCategory.NAVIGATION,
    event_label: url,
    link_url: url,
    link_text: linkText,
  })
}

/**
 * Track error
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 */
export const trackError = (errorType, errorMessage = '') => {
  trackEvent('error', {
    event_category: 'error',
    error_type: errorType,
    error_message: errorMessage,
  })
}

// Enhanced Ecommerce-style tracking for services
export const trackServiceListView = (services) => {
  trackEvent('view_item_list', {
    event_category: EventCategory.SERVICE,
    items: services.map((service, index) => ({
      item_name: service.title,
      item_category: 'Service',
      item_list_name: 'Services Grid',
      index: index,
    })),
  })
}

export const trackServiceSelect = (service, index = 0) => {
  trackEvent('select_item', {
    event_category: EventCategory.SERVICE,
    items: [{
      item_name: service.title,
      item_category: 'Service',
      item_list_name: 'Services Grid',
      index: index,
    }],
  })
}

// Cookie consent tracking
export const updateConsentMode = (analytics, marketing) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
    })
  }
}

export default {
  trackEvent,
  trackConversion,
  trackFormSubmit,
  trackCTAClick,
  trackServiceInteraction,
  trackContactClick,
  trackSectionView,
  trackScrollDepth,
  trackPageView,
  trackOutboundClick,
  trackError,
  trackServiceListView,
  trackServiceSelect,
  updateConsentMode,
}
