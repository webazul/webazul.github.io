import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './CookieConsent.css'
import { FaTimes, FaShieldAlt, FaCookie } from 'react-icons/fa'
import LegalModal from './LegalModal'
import { updateConsentMode } from '../utils/analytics'

function CookieConsent() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    try {
      const hasConsent = localStorage.getItem('cookieConsent')

      // Set default consent mode to denied
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          functionality_storage: 'granted',
          personalization_storage: 'denied',
          security_storage: 'granted',
        })
      }

      if (!hasConsent) {
        const showTimer = setTimeout(() => {
          setIsVisible(true)
        }, 2000)

        // Auto-hide after 30 seconds if user doesn't interact (safety fallback)
        const autoHideTimer = setTimeout(() => {
          console.log('Cookie banner auto-closed after 30s timeout')
          setIsVisible(false)
        }, 32000) // 2s delay + 30s = 32s total

        return () => {
          clearTimeout(showTimer)
          clearTimeout(autoHideTimer)
        }
      } else {
        // Load saved preferences and update consent
        try {
          const savedPreferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}')
          if (savedPreferences.analytics || savedPreferences.marketing) {
            updateConsentMode(savedPreferences.analytics, savedPreferences.marketing)
          }
        } catch (parseError) {
          console.error('Error parsing cookie preferences:', parseError)
          // If there's an error parsing, clear the corrupt data
          localStorage.removeItem('cookiePreferences')
          localStorage.removeItem('cookieConsent')
          setIsVisible(true)
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      // If localStorage fails, show banner as fallback
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    const preferences = {
      essential: true,
      analytics: true,
      marketing: true,
    }
    saveCookieConsent('accepted', preferences)
    updateConsentMode(true, true)
    setIsVisible(false)
  }

  const acceptEssential = () => {
    const preferences = {
      essential: true,
      analytics: false,
      marketing: false,
    }
    saveCookieConsent('essential', preferences)
    updateConsentMode(false, false)
    setIsVisible(false)
  }

  const acceptCustom = () => {
    saveCookieConsent('custom', cookiePreferences)
    updateConsentMode(cookiePreferences.analytics, cookiePreferences.marketing)
    setIsVisible(false)
  }

  const saveCookieConsent = (type, preferences) => {
    localStorage.setItem('cookieConsent', type)
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
  }

  const toggleCookieCategory = (category) => {
    if (category === 'essential') return // Cannot disable essential cookies
    setCookiePreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const closeBanner = () => {
    // Close banner and save essential-only consent
    const preferences = {
      essential: true,
      analytics: false,
      marketing: false,
    }
    saveCookieConsent('closed', preferences)
    updateConsentMode(false, false)
    setIsVisible(false)
  }

  const openModal = (type) => {
    setModalType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalType('')
  }

  if (!isVisible) return null

  return (
    <div className="cookie-consent">
      <div className="cookie-backdrop" onClick={closeBanner}></div>
      <div className="cookie-container">
        <div className="cookie-header">
          <div className="cookie-icon">
            <FaCookie />
          </div>
          <button
            className="cookie-close"
            onClick={closeBanner}
            aria-label={t('cookies.closeLabel')}
          >
            <FaTimes />
          </button>
        </div>

        <div className="cookie-content">
          <h3 className="cookie-title">{t('cookies.title')}</h3>
          <p className="cookie-description">
            {t('cookies.text')}
          </p>
          <p className="cookie-links">
            {t('cookies.note')}
            <button onClick={() => openModal('privacy')} className="cookie-link">
              {t('cookies.privacyPolicy')}
            </button>
            {' '}{t('cookies.and')}{' '}
            <button onClick={() => openModal('cookies')} className="cookie-link">
              {t('cookies.cookiePolicy')}
            </button>
          </p>
        </div>

        {!showSettings ? (
          <div className="cookie-actions">
            <button
              className="cookie-btn secondary"
              onClick={acceptEssential}
            >
              {t('cookies.essentialOnly')}
            </button>
            <button
              className="cookie-btn tertiary"
              onClick={() => setShowSettings(true)}
            >
              Personalizar
            </button>
            <button
              className="cookie-btn primary"
              onClick={acceptAll}
            >
              {t('cookies.acceptAll')}
            </button>
          </div>
        ) : (
          <div className="cookie-settings">
            <h4 className="settings-title">Preferências de Cookies</h4>

            <div className="cookie-category">
              <div className="category-header">
                <label className="category-label">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.essential}
                    disabled
                  />
                  <span className="category-name">Essenciais</span>
                </label>
                <span className="category-badge required">Obrigatório</span>
              </div>
              <p className="category-description">
                Cookies necessários para o funcionamento básico do site.
              </p>
            </div>

            <div className="cookie-category">
              <div className="category-header">
                <label className="category-label">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={() => toggleCookieCategory('analytics')}
                  />
                  <span className="category-name">Analytics</span>
                </label>
              </div>
              <p className="category-description">
                Ajudam-nos a entender como os visitantes interagem com o site através de informações anónimas.
              </p>
            </div>

            <div className="cookie-category">
              <div className="category-header">
                <label className="category-label">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.marketing}
                    onChange={() => toggleCookieCategory('marketing')}
                  />
                  <span className="category-name">Marketing</span>
                </label>
              </div>
              <p className="category-description">
                Usados para personalizar anúncios e medir a eficácia das campanhas.
              </p>
            </div>

            <div className="cookie-actions">
              <button
                className="cookie-btn secondary"
                onClick={() => setShowSettings(false)}
              >
                Voltar
              </button>
              <button
                className="cookie-btn primary"
                onClick={acceptCustom}
              >
                Guardar Preferências
              </button>
            </div>
          </div>
        )}
      </div>

      <LegalModal
        isOpen={modalOpen}
        onClose={closeModal}
        type={modalType}
      />
    </div>
  )
}

export default CookieConsent