import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './CookieConsent.css'
import { FaTimes, FaShieldAlt, FaCookie } from 'react-icons/fa'
import LegalModal from './LegalModal'

function CookieConsent() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent')
    if (!hasConsent) {
      setTimeout(() => {
        setIsVisible(true)
      }, 2000)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  const closeBanner = () => {
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

        <div className="cookie-actions">
          <button
            className="cookie-btn secondary"
            onClick={acceptEssential}
          >
            {t('cookies.essentialOnly')}
          </button>
          <button
            className="cookie-btn primary"
            onClick={acceptAll}
          >
            {t('cookies.acceptAll')}
          </button>
        </div>
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